# 04 — Database Schema
## Exhibition Visitor Log

### Database: SQLite

The database is a single SQLite file bundled inside the project directory. No external connection, no third-party platform. The file is created automatically when the app first runs if it does not already exist.

**File location (suggested):** `./db/exhibition.db`

---

## Tables

### Table 1: `submissions`

Stores every visitor feedback response.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique submission ID |
| `visitor_name` | TEXT | NULLABLE | Visitor's name — optional, null if not provided |
| `rating` | INTEGER | NOT NULL, CHECK (1–5) | Star rating between 1 and 5 |
| `exhibits_visited` | TEXT | NULLABLE | Comma-separated list or JSON array of selected exhibits |
| `comment` | TEXT | NULLABLE | Freeform written feedback |
| `submitted_at` | TEXT | NOT NULL, DEFAULT current timestamp | ISO 8601 timestamp of submission |

**Example row:**
```
id: 1
visitor_name: "Jordan"
rating: 4
exhibits_visited: "Robotics, 3D Printing, AI Demo"
comment: "Loved the robotics section, really impressive!"
submitted_at: "2025-04-01T14:32:00Z"
```

**Notes:**
- `visitor_name` stored as null (not empty string) when not provided — display as "Anonymous" in the UI
- `exhibits_visited` stored as a JSON string (e.g. `["Robotics", "3D Printing"]`) for easy parsing
- `submitted_at` stored as TEXT in ISO 8601 format for portability across SQLite versions
- Hard delete only — no `deleted_at` or soft-delete column in this version

---

### Table 2: `admins`

Stores admin login credentials. Single row in this version.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Admin account ID |
| `username` | TEXT | NOT NULL, UNIQUE | Admin username |
| `password_hash` | TEXT | NOT NULL | Bcrypt-hashed password — never store plain text |
| `created_at` | TEXT | NOT NULL, DEFAULT current timestamp | Account creation timestamp |

**Example row:**
```
id: 1
username: "admin"
password_hash: "$2b$12$..."
created_at: "2025-03-15T09:00:00Z"
```

**Notes:**
- Password is always hashed using bcrypt before storage
- Plain text passwords are never written to the database under any circumstance
- Only one admin row expected; the app does not have a registration flow
- Admin account is seeded manually or via a setup script on first run

---

## Relationships

There are no foreign key relationships between `submissions` and `admins`. Submissions are standalone records owned collectively by whoever holds the admin credentials.

```
submissions         admins
-----------         ------
id (PK)             id (PK)
visitor_name        username
rating              password_hash
exhibits_visited    created_at
comment
submitted_at
```

---

## Seed / Setup

On first run, the app should:

1. Create `./db/exhibition.db` if it does not exist
2. Run the `CREATE TABLE IF NOT EXISTS` statements for both tables
3. Check if any row exists in `admins` — if not, insert a default admin using a hashed password from an environment variable or a one-time setup script

**Example setup SQL:**
```sql
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
```

---

## Data Rules

- **Delete behaviour:** Deleting a submission via the admin dashboard removes the row permanently. No archive, no recovery. The dashboard count reflects the change immediately.
- **Duplicate submissions:** Allowed — each gets its own `id` and `submitted_at`. Admin identifies duplicates visually and deletes as needed.
- **Visitor data access:** Visitors have no read access to the database. Only the admin session can query `submissions`.
- **Admin data access:** Admin credentials are never exposed to the visitor-facing side of the app.
