# 03 — Screens & UI
## Exhibition Visitor Log

This document lists every screen in the app, what it contains, and how it behaves.

---

## Visitor Side (Public)

### Screen 1: Visitor Form Page
**Route:** `/` (root)
**Access:** Public — no login required

**Purpose:** The main entry point for visitors. Displays the feedback form.

**Elements:**
- App or exhibition name/header at the top
- Form fields:
  - **Name** — text input, optional
  - **Star Rating** — 1–5 star selector, required
  - **Exhibits Visited** — checkbox list or multi-select, optional
  - **Comments** — textarea for freeform feedback, optional
- **Submit button** — triggers form submission
- Basic validation: at minimum, a rating must be selected before submission is allowed

**Behaviour:**
- Works on mobile and desktop
- Submitting an empty form (no rating selected) shows an inline error
- On successful submission → redirect to Confirmation screen
- Overly long input (e.g. 1000+ characters in comments) is capped or gracefully handled

---

### Screen 2: Submission Confirmation Page
**Route:** `/confirmation` or rendered as a success state on `/`
**Access:** Public — shown after successful form submission

**Purpose:** Lets the visitor know their feedback was received. No further action needed.

**Elements:**
- Thank-you message (e.g. "Thanks for your feedback!")
- Brief note that their response has been saved
- No links to admin, no navigation to other submissions

**Behaviour:**
- Refreshing this page does not resubmit the form
- Visitor can close the tab or navigate away freely

---

## Admin Side (Protected)

### Screen 3: Admin Login Page
**Route:** `/admin` or `/admin/login`
**Access:** Public-facing but gated — entering valid credentials creates a session

**Purpose:** Entry point for the admin. The only way into the admin area.

**Elements:**
- Username field
- Password field
- Login button
- Error message shown for invalid credentials (generic: "Incorrect username or password")

**Behaviour:**
- Successful login → redirect to Admin Dashboard
- Failed login → stays on login page, shows error, clears password field
- If already logged in and visiting this route → redirect to Dashboard

---

### Screen 4: Admin Dashboard
**Route:** `/admin/dashboard`
**Access:** Protected — requires active session

**Purpose:** Central view for the admin. Displays all submissions in one place.

**Elements:**
- Total submission count displayed prominently
- Submission list/table with columns:
  - Visitor name (or "Anonymous" if blank)
  - Star rating
  - Date and time submitted
  - Action: View / Delete
- Sort controls: by date (newest first default), by rating
- Logout button

**Behaviour:**
- Loads all responses from the SQLite database on page load
- Deleting a response shows a confirmation prompt before removing
- After deletion, count and list update immediately
- No session → redirect to `/admin/login`

---

### Screen 5: Individual Response View
**Route:** `/admin/response/:id`
**Access:** Protected — requires active session

**Purpose:** Full detail view of a single submission.

**Elements:**
- Visitor name (or "Anonymous")
- Star rating
- Exhibits selected
- Full written comment
- Submission timestamp and unique ID
- Delete button
- Back to Dashboard link

**Behaviour:**
- Delete triggers a confirmation prompt
- Confirming deletion removes the record and redirects back to Dashboard
- Accessing a non-existent ID shows a not-found message

---

### Screen 6: 404 / Error Page
**Route:** Any unmatched route
**Access:** Public

**Purpose:** Catch-all for broken or mistyped URLs.

**Elements:**
- Simple message indicating the page was not found
- Link back to the visitor form (root `/`)

---

## Screen Map Summary

```
/                          → Visitor Form
/confirmation              → Submission Confirmation

/admin                     → Admin Login
/admin/dashboard           → Admin Dashboard
/admin/response/:id        → Individual Response View

[any other route]          → 404 Error Page
```
