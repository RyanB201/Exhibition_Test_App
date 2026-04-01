# 05 — Rules, Edge Cases & Testing
## Exhibition Visitor Log

This document covers the access rules, data rules, and test scenarios for the app. Use this as the checklist when building and verifying the app in Google AI Studio.

---

## Access Rules

### Visitor Access
- Visitors may access `/` and `/confirmation` only
- Visitors may NOT access any route under `/admin`
- Any direct navigation to `/admin` or `/admin/dashboard` without an active session redirects immediately to `/admin/login`
- There is no way for a visitor to read, list, or retrieve any other visitor's submission

### Admin Access
- Admin must authenticate at `/admin/login` before accessing any admin route
- A valid session must exist for all `/admin/*` routes
- Session expires on logout — admin is redirected to `/admin/login`
- If the admin session expires mid-use, the next protected page load redirects to login

---

## Data Rules

| Rule | Behaviour |
|------|-----------|
| Name field is optional | Stored as null; displayed as "Anonymous" in admin view |
| Rating is required | Form cannot be submitted without a rating selected |
| Duplicate submissions are allowed | Each gets a unique ID and timestamp; admin handles cleanup manually |
| Deleting a response is permanent | Hard delete from SQLite; no recovery, no archive |
| Delete requires confirmation | "Are you sure?" prompt must appear before deletion executes |
| Admin password is hashed | Bcrypt only; plain text never written to the database |
| Visitors cannot see each other's data | No shared feed, leaderboard, or response list on the visitor side |

---

## Edge Cases

### Form Submission
| Scenario | Expected Behaviour |
|----------|--------------------|
| Visitor submits with no rating | Inline validation error; form does not submit |
| Visitor submits with name only, no rating | Same — rating is the only required field |
| Visitor submits a fully blank form | Blocked; error shown asking for a rating |
| Visitor enters 1000+ characters in comment | Input is either capped at a max character limit or accepted and stored in full — decision to be made during build |
| Visitor refreshes the confirmation page | Does not resubmit; confirmation state is displayed without re-triggering the database write |
| Visitor submits twice | Both submissions are saved; admin spots the duplicate by timestamp |

### Admin Login
| Scenario | Expected Behaviour |
|----------|--------------------|
| Admin enters wrong password | Error message shown; password field cleared; stays on login page |
| Admin enters wrong username | Same generic error — do not reveal whether username or password was wrong |
| Admin leaves session open and returns later | If session has not expired, dashboard loads normally |
| Admin navigates to `/admin/dashboard` without logging in | Redirected to `/admin/login` |
| Admin tries to access a response ID that doesn't exist | Not-found message shown; link back to dashboard |

### Deletion
| Scenario | Expected Behaviour |
|----------|--------------------|
| Admin clicks Delete on a response | Confirmation prompt appears |
| Admin confirms deletion | Record removed from DB; dashboard list and count update immediately |
| Admin cancels deletion | Nothing changes; admin stays on current view |
| Admin deletes a response that was already deleted (stale UI) | Graceful error — "Response not found"; dashboard refreshes |

### Navigation
| Scenario | Expected Behaviour |
|----------|--------------------|
| User navigates to a route that doesn't exist | 404 page shown with link back to `/` |
| Visitor manually types `/admin` | Redirected to `/admin/login` |
| Admin manually types `/` | Visitor form loads normally (no restriction on public routes) |

---

## Testing Checklist

### Test Group 1 — UI and Visual
- [ ] Visitor form loads correctly on mobile (phone screen widths)
- [ ] Visitor form loads correctly on desktop
- [ ] All form fields are clearly labelled
- [ ] Submit button is visible and clearly labelled
- [ ] Star rating selector is tappable on mobile
- [ ] Confirmation screen displays after submission
- [ ] Admin login page is clean and functional
- [ ] Admin dashboard displays a list of responses
- [ ] Response count is shown on the dashboard
- [ ] Individual response view shows all fields
- [ ] Delete button is clearly labelled with a confirmation prompt
- [ ] 404 page displays for unknown routes

### Test Group 2 — Features and Functionality
- [ ] Submit a visitor response → check it appears in admin dashboard
- [ ] Submit a response with no name → confirm it shows as "Anonymous" in admin
- [ ] Log in as admin with correct credentials → dashboard loads
- [ ] Log in with wrong credentials → error shown, stays on login
- [ ] Click a response in the dashboard → individual view loads correctly
- [ ] Delete a response → it disappears from the dashboard and count decreases
- [ ] Sort by date newest → most recent appears first
- [ ] Sort by date oldest → earliest appears first
- [ ] Sort by rating → responses ordered accordingly
- [ ] Log out → session cleared, redirected to login

### Test Group 3 — Edge Cases and Breaking It
- [ ] Submit form with no rating → error shown, not submitted
- [ ] Submit a fully blank form → error shown, not submitted
- [ ] Paste 1000+ characters into the comment field → handled gracefully
- [ ] Navigate to `/admin/dashboard` while not logged in → redirect to login
- [ ] Navigate to a non-existent response URL → not-found message
- [ ] Navigate to `/nonexistent-route` → 404 page
- [ ] Refresh the confirmation page → does not resubmit
- [ ] Submit the form twice in a row → both appear in admin as separate entries

---

## Out of Scope (Do Not Build in This Version)

These were identified by the team as desirable future features but are explicitly excluded from this build:

1. Email notifications when a new visitor response is submitted
2. Multiple admin accounts or role-based permissions
3. Per-exhibit analytics, charts, or data breakdowns
4. Visible response feed for visitors after submission
5. Advanced search parameters beyond sort by date/rating
6. Soft delete or response recovery (all deletes are permanent)
7. Admin profile settings (username/password change, profile picture)
8. Event management, sales tracking, or attendee counting
