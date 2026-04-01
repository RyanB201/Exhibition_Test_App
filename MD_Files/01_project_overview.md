# 01 — Project Overview
## Exhibition Visitor Log

### What We Are Building

A lightweight web app where visitors to a student exhibition can leave feedback through a simple public form. An admin can log in to a protected dashboard to view, manage, and track all responses in real time.

The app has two distinct sides:

- **Visitor side** — Public. No login. Just a form and a confirmation screen.
- **Admin side** — Protected. Login required. Full access to all submissions.

No data is stored in the browser or locally on any device. Every submission is written to a SQLite database that lives within the project itself — no third-party platforms, no external services.

---

### Why This Exists

Generic tools like Google Forms are limited. They offer no custom branding, no real-time admin control, no ability to flag or filter responses, and they don't match the visual identity of the exhibition. This app is intentional — it feels like part of the event, not an afterthought.

---

### Who Uses It

| User Type | Access | Purpose |
|-----------|--------|---------|
| Visitor | Public, no login | Submits feedback through the form |
| Admin | Private, login required | Views, filters, and manages all responses |

There is only one admin account. No moderator tier, no multi-user roles in this version.

---

### What Is in Scope

- Public visitor feedback form (name optional, rating, exhibit selection, comments)
- Submission confirmation screen
- Admin login with session protection
- Admin dashboard showing all responses
- Ability to delete a response (with confirmation prompt)
- Filter/sort responses by date or rating
- Unique ID and timestamp on every submission
- SQLite database bundled with the project

---

### What Is NOT in This Version

1. Email notifications to admin when a new response arrives
2. Multiple admin accounts or role management
3. Per-exhibit analytics, charts, or breakdowns
4. Visitor-facing view of other responses
5. Soft delete / response recovery / 7-day archive

---

### Tech Constraints

- Database: **SQLite** — file-based, embedded, no external connection required
- No Firebase, Supabase, or any third-party database platform
- Must work on mobile and desktop browsers
- Admin area lives at `/admin` and is fully session-gated
