# 02 — User Flows
## Exhibition Visitor Log

### User Type 1: Visitor

Visitors are members of the public — students, guests, attendees. They have no account and no login. Their entire interaction with the app is the form and the confirmation screen.

**Entry points:**
- Scanning a QR code displayed at the exhibition
- Opening a shared link on their phone or laptop

**Flow:**

```
[Entry: QR code or link]
        ↓
[Visitor Form Page]
  - Name (optional)
  - Star rating (required)
  - Exhibit selection (which exhibits did you visit?)
  - Written comment (optional)
        ↓
[Submit button]
        ↓
[Confirmation / Thank You Screen]
  - Simple message confirming submission was received
  - No further action required
        ↓
[Exit — visitor closes or leaves the page]
```

**Rules:**
- Visitor never logs in
- Visitor never sees other visitors' responses
- Visitor cannot access any admin page — redirected to login if they try
- Re-submission is allowed; each submission gets its own unique ID and timestamp so admin can spot duplicates

---

### User Type 2: Admin

The admin is the exhibition organizer. There is one admin account. They log in to review and manage all feedback collected from visitors.

**Entry point:**
- Navigates directly to `/admin`

**Flow:**

```
[/admin — Admin Login Page]
  - Enter username and password
  - Invalid credentials → error message, stay on login
  - Valid credentials → session created
        ↓
[Admin Dashboard]
  - List of all submissions (name, rating, timestamp)
  - Total submission count displayed
  - Sort by: date (newest/oldest), rating (high/low)
  - Filter options
        ↓
[Individual Response View]  ← optional step
  - Full details of a single submission
  - Delete button available
        ↓
[Delete Confirmation Prompt]
  - "Are you sure?" dialog before deletion
  - Confirm → response removed from database, count updates
  - Cancel → return to dashboard
        ↓
[Logout]
  - Session cleared
  - Redirected to Admin Login Page
```

**Rules:**
- Admin session is required to access any `/admin` route
- No session → immediate redirect to `/admin/login`
- Admin cannot view their own account settings or change credentials in this version
- Admin cannot create or customize the visitor form fields in this version

---

### What Each User Can and Cannot Do

| Action | Visitor | Admin |
|--------|---------|-------|
| Submit feedback | ✅ | ❌ |
| See own submission | ✅ (confirmation only) | ✅ |
| See all submissions | ❌ | ✅ |
| Delete a submission | ❌ | ✅ |
| Sort / filter responses | ❌ | ✅ |
| Log in | ❌ | ✅ |
| Access /admin | ❌ (redirected) | ✅ |
