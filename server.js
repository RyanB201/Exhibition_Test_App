const express = require('express');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'exhibition-visitor-log-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 4 // 4 hours
  }
}));

// ─── Database Setup ─────────────────────────────────────────────────────────
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const db = new Database(path.join(dbDir, 'exhibition.db'));
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_name TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    exhibits_visited TEXT,
    comment TEXT,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed default admin if none exists
const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get();
if (adminCount.count === 0) {
  const hash = bcrypt.hashSync('exhibition2025', 12);
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)').run('admin', hash);
  console.log('✓ Default admin account created (admin / exhibition2025)');
}

// ─── Auth Middleware ────────────────────────────────────────────────────────
function requireAdmin(req, res, next) {
  if (req.session && req.session.adminId) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// ─── API Routes ─────────────────────────────────────────────────────────────

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: 'Incorrect username or password' });
  }
  req.session.adminId = admin.id;
  req.session.adminUsername = admin.username;
  res.json({ success: true });
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

// Check admin session
app.get('/api/admin/check', (req, res) => {
  if (req.session && req.session.adminId) {
    return res.json({ authenticated: true, username: req.session.adminUsername });
  }
  res.json({ authenticated: false });
});

// Create submission (visitor)
app.post('/api/submissions', (req, res) => {
  let { visitor_name, rating, exhibits_visited, comment } = req.body;

  // Validate rating
  rating = parseInt(rating);
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'A rating between 1 and 5 is required' });
  }

  // Sanitize
  visitor_name = visitor_name ? String(visitor_name).trim().substring(0, 200) : null;
  comment = comment ? String(comment).trim().substring(0, 2000) : null;

  // exhibits_visited should be a JSON array string
  if (exhibits_visited && Array.isArray(exhibits_visited)) {
    exhibits_visited = JSON.stringify(exhibits_visited);
  } else if (exhibits_visited && typeof exhibits_visited === 'string') {
    // already a string, keep it
  } else {
    exhibits_visited = null;
  }

  const stmt = db.prepare(`
    INSERT INTO submissions (visitor_name, rating, exhibits_visited, comment)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(visitor_name, rating, exhibits_visited, comment);

  res.status(201).json({
    success: true,
    id: result.lastInsertRowid
  });
});

// List all submissions (admin only)
app.get('/api/submissions', requireAdmin, (req, res) => {
  const { sort } = req.query;
  let orderClause = 'ORDER BY submitted_at DESC'; // default newest first

  switch (sort) {
    case 'date_asc':    orderClause = 'ORDER BY submitted_at ASC'; break;
    case 'date_desc':   orderClause = 'ORDER BY submitted_at DESC'; break;
    case 'rating_asc':  orderClause = 'ORDER BY rating ASC, submitted_at DESC'; break;
    case 'rating_desc': orderClause = 'ORDER BY rating DESC, submitted_at DESC'; break;
  }

  const submissions = db.prepare(`SELECT * FROM submissions ${orderClause}`).all();
  const count = db.prepare('SELECT COUNT(*) as total FROM submissions').get();

  res.json({ submissions, total: count.total });
});

// Get single submission (admin only)
app.get('/api/submissions/:id', requireAdmin, (req, res) => {
  const submission = db.prepare('SELECT * FROM submissions WHERE id = ?').get(req.params.id);
  if (!submission) {
    return res.status(404).json({ error: 'Response not found' });
  }
  res.json(submission);
});

// Delete submission (admin only)
app.delete('/api/submissions/:id', requireAdmin, (req, res) => {
  const result = db.prepare('DELETE FROM submissions WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Response not found' });
  }
  res.json({ success: true });
});

// ─── HTML Routes ────────────────────────────────────────────────────────────
const publicDir = path.join(__dirname, 'public');

// Serve static files
app.use(express.static(publicDir));

// Visitor form
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Confirmation
app.get('/confirmation', (req, res) => {
  res.sendFile(path.join(publicDir, 'confirmation.html'));
});

// Admin login
app.get('/admin', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin', 'login.html'));
});
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin', 'login.html'));
});

// Admin dashboard
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin', 'dashboard.html'));
});

// Individual response
app.get('/admin/response/:id', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin', 'response.html'));
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'));
});

// ─── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✦ Exhibition Visitor Log`);
  console.log(`  ✦ Running on http://localhost:${PORT}`);
  console.log(`  ✦ Admin: http://localhost:${PORT}/admin\n`);
});
