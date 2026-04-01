# Exhibition Visitor Log — Project Review

## Project Summary

A simple web app that lets visitors to a student exhibition leave feedback on what they experienced. Visitors open the app on their phone or laptop, fill out a short form, and submit. An admin can log in to see all responses in one place.

The app has two sides. The visitor side is public — no login, just a form. The admin side is protected — login required to view, manage, and track all submissions. Nothing is stored locally. Every submission is saved to a database and visible to the admin in real time.

---

## Section 1: What Are We Building?

### In one sentence, what does this app do?

- **Maddison:** An application that allows visitors to submit feedback of an event for admins of the event to view in a well-documented, organized order. This application will have two hubspaces, one for visitors which is a form to fill out their feedback, and the other being an account admins can create and log into for viewing feedback, managing the documentation, and sharing it with their colleagues.
- **Ryan:** A web app where exhibition visitors submit feedback, and an admin reviews all responses in real time. Two sides: a public visitor form (no login) and a protected admin area (login required). Data is saved to a database.
- **Joedee:** This app collects user input and saves it to a cloud database.
- **Tyler:** An app that will collect submitted feedback from users and allow for admins to create an account to view said feedback in a more concealed manner.
- **Aliya:** It is an app that allows visitors to submit feedback through a simple form meanwhile, admins can log in to view, manage, and delete all the responses in real time.
- **Quinn:** Application that provides a platform for users to create feedback and supervise by admins.

---

### Who uses it?

- **Maddison:** The main users of this tool are the visitors of the event which will be submitting their feedback forms, and the admins of the event who will be reviewing this feedback received. This could range from business conferences, fandom exhibitions, community events, etc.
- **Ryan:** Two types of users: exhibition visitors (members of the public, students, guests) who submit feedback anonymously or with their name, and an admin (the exhibition organizer or teacher) who logs in to monitor and manage responses.
- **Joedee:** Exhibition visitors willing to participate and exhibition booth owners seeking data to collect and translate into useful information for them to improve their product.
- **Tyler:** Visitors who can use it to submit their feedback and Admins who can review the feedback.
- **Aliya:** App is used by visitors who attend and administrators who evaluate the results.
- **Quinn:** The visitors at the exhibition will be the main audience using the app. The other side is the admin team to gather data input from users.

---

### What problem does it solve — why not just use a spreadsheet or Google Form?

- **Maddison:** This solves the issue of having a professional and organized database for review, as Google Forms are quite limited with what can be done and do not have a separate database from other Google files. Visitors providing feedback will also not need to go through the process of logging into an account, as Google Forms usually requires to collect feedback from the user.
- **Ryan:** Google Forms works but feels generic and gives the organizer no real-time control, no branding customization, no ability to filter or flag responses, and no way to match the exhibition's look and feel.
- **Joedee:** This project solves an issue with professionalism. Having a dedicated app allows for their forms to feel official and planned. They are also not constrained to the capabilities and limitations of other tools and can tailor the app to fit their specific needs.
- **Tyler:** This solution allows for more customization related to the attached application itself and it will be directly accessible to the admins of the application with little to no confusion.
- **Aliya:** Building an app that collects all the visitor feedback and allow admins to review and work with it in real time.
- **Quinn:** The app felt more intentional and helped keep the visual concept of the exhibition intact. This creates a strong visual brand.

---

## Section 2: The Users

### How many types of users are there?

- **Maddison:** There are only two types of users overall, the visitors who will be submitting forms without logging in of their feedback, and the admins who will have accounts they log into for the purpose of managing and reviewing the received comments on their event.
- **Ryan:** Two: Visitor (public, no login) and Admin (private, login required). No moderator or multi-admin tier in this version.
- **Joedee:** There are 2 types of users — visitors (fills out form inputs, does not require login) and admin (has access to all inputted data but requires a login to access the information).
- **Tyler:** There are two: the aforementioned visitor and the admin.
- **Aliya:** 2, visitors and admins.

---

### What can a visitor do?

- **Maddison:** A visitor will not log into the application, and instead will just submit a form for review. This form will allow the user to put down some information about themselves if required by the admin such as emails and full names, answer any questions the admin asks about the event, and be able to leave their own personal comments on the event. They can also enter a competition for providing feedback if the admin hosts such an event on the form.
- **Ryan:** A visitor can open the form, fill in their name (optional), rate their experience, select which exhibits they visited, leave a written comment, and submit — once per session.
- **Joedee:** Visitors will fill out all the information on the form and submit it.
- **Tyler:** A visitor can open the form and input personal contact info, feedback, and leave their own comments about the experience.
- **Aliya:** A visitor can fill out the form, add in their info, their experience, and whatever questions are, leave comments, and then submit it and get a confirmation.

---

### What can an admin do that a visitor cannot?

- **Maddison:** The admin can do a variety of activities with their account, such as logging into their account, changing their profile picture and username of their account, forming groups with their fellow colleagues' accounts for managing and reviewing feedback, create specific forms with answers catered to the feedback they are looking for, provide the option for visitors to receive updates on future events by providing their email and information, and offer the option for visitors to enter giveaway events for providing their feedback.
- **Ryan:** An admin can log in, view all submitted responses in a dashboard, filter or sort by date or rating, flag or delete individual responses, and export the data as a CSV.
- **Joedee:** Admins can view all inputted data whereas visitors can only fill out forms.
- **Tyler:** Admin can log in to see all of the responses and sort them if necessary.
- **Aliya:** An admin can log in to access, view, filter, and delete all visitor responses, which visitors cannot do.

---

## Section 3: The Screens

### List every screen in the app.

- **Maddison:**
  - Visitor hubspace — Admin's form to fill out information on, with specific questions chosen by the admin to answer and a submission button at the bottom.
  - Admin hubspace — Admin login page, Admin home screen, Admin account page, Admin group page, create a form page, manage events page, manage feedback page.
- **Ryan:**
  - Visitor hub: Visitor Form page, Submission Confirmation page.
  - Admin hub: Admin Login page, Admin Dashboard (responses list), Individual Response detail view, and a 404 / Error page.
- **Joedee:**
  - Visitor: Welcome/info page → Form page → Confirmation page.
  - Admin: Login page → Dashboard → Data input lists → Management page.
- **Tyler:**
  - Visitor: Form page → Submission received page.
  - Admin: Login → Home screen → Feedback list → Sorting parameters.

---

### Where does a visitor start? Where do they end up?

- **Maddison:** A visitor starts by scanning a QR code located at the event → phone takes them to the webpage attached to the QR code → the visitor then can see the event's feedback form and is required to answer the questions and fill in the information needed.
- **Ryan:** Visitor opens the link → lands on the feedback form → fills it in → hits Submit → sees a thank-you confirmation screen. Done. No account, no login, no further steps required.
- **Joedee:** Visitors start with the form and end with the submit.
- **Tyler:** Gets the link to the page, takes them to fill out page, type in/click their responses, submit, confirmation, exit.

---

### Where does an admin start? Where do they end up?

- **Maddison:** Admin login page → Admin logs in and is taken to their account home page → Admin connects other members to exhibition group page → Admin creates feedback form for visitors to fill out → Admin and colleagues connected to the group review, organize, and save the feedback.
- **Ryan:** Admin navigates to /admin → enters credentials on the Login page → lands on the Dashboard showing all responses → can click into any response, filter the list, flag entries, or export data → logs out.
- **Joedee:** Admins start with login and end with logout.
- **Tyler:** Login → Home page → Feedback → Sorting.

---

## Section 4: The Data

### What information does the app store?

- **Ryan:** Visitor name (optional), star rating, exhibit selections, written comment, submission timestamp, and a unique submission ID. Admin credentials stored separately and securely (hashed password).
- **Maddison:** Admins contain the rights to the information provided to them by the visitors, and are able to adjust the permissions of what they can do with the information provided to them through listing it on the form.
- **Joedee:** Inputted data.
- **Tyler:** The actual feedback from visitors and the information of the admins.

---

### Who owns each piece of data?

- **Ryan:** Submissions belong to the exhibition organizer (admin). Visitors have no account, so they have no ownership or retrieval rights after submitting. Admin credentials belong to the admin account holder.
- **Maddison:** Admins contain the rights to the information provided to them by the visitors, and are able to adjust the permissions of what they can do with the information.

---

### If you delete a visitor response, what else should disappear?

- **Ryan:** Deleting a visitor response removes the record entirely from the database (no soft delete or archive in this version). The submission count on the dashboard updates immediately to reflect the removal.
- **Maddison:** Whether a visitor cancels out of the form before submitting, the feedback is completely deleted from the database. If an admin deletes feedback, they are prompted with a message that they can retrieve it within seven days before permanent deletion. The data deleted is all of the information collected on that specific form, and the count towards submissions is removed.
- **Joedee:** Deleting a response shouldn't be automatic — an "are you sure" pop-up should appear first, then a confirmation of deletion if the admin chooses to delete.
- **Tyler:** Removes everything associated with the response, including any and all information submitted with it.

---

## Section 5: The Rules

### When can a visitor see other visitors' responses?

- **Ryan:** Visitors only ever see their own form and their own confirmation screen. There is no feed, leaderboard, or shared view of any kind.
- **Maddison:** A visitor can only review the responses of other visitors if the admin allows it through their own social channels, otherwise all feedback is confidential. The personal data visitors provide, such as names and emails, is never viewable to others aside from the admins.
- **Joedee:** Never. It's not necessary for visitors to see other responses. In fact, seeing other responses could corrupt the data by creating influence in a visitor submitting their own responses.
- **Tyler:** They cannot. They can only view their own as they are writing it.

---

### Can a visitor access the admin area?

- **Ryan:** Any attempt to navigate to /admin without a valid session redirects immediately to the Admin Login page. Visitors cannot view, guess, or brute-force their way to response data.

---

### What happens if a visitor submits the form twice?

- **Ryan:** The app allows re-submission, but each submission gets its own unique ID and timestamp so the admin can spot duplicates easily and delete one if needed.
- **Maddison:** If the form does not require the visitor's personal information such as their email to define them as a specific visitor, their form is still submitted and the admin must delete it. If an email is connected to the submission, the application will only allow them to submit once.
- **Joedee:** The form will not allow for multiple responses.
- **Tyler:** It will be submitted as normal, and the admin will sort it out.

---

## Section 6: What Is NOT In This Version

### Name three things you would like to add in the future.

- **Ryan:**
  1. Visitor email notifications — admin does not get an alert when a new response arrives.
  2. Multi-admin accounts — only one set of admin credentials, no role management.
  3. Exhibit-by-exhibit analytics — no charts or breakdowns per exhibit, just a raw response list.
- **Maddison:** To expand further on the application, it could be transformed into an application that not only allows admins to receive and document feedback, but all sorts of aspects to their event:
  1. Ability to document sales made during the admin's event.
  2. Ability to document and organize collaborators or renters of spaces at the admin's event.
  3. Ability to track the amount of people attending the event.
- **Tyler:**
  1. Visible feedback of other users upon submission for guests.
  2. More specific search parameters for admins.
  3. A notification system.

---

## Testing Checklist

### Test 1 — UI and Visual
Does it look right? Is the form easy to understand? Are buttons labelled clearly? Does it work on mobile? Is anything confusing, broken, or missing visually?

### Test 2 — Features and Functionality
Does everything actually work? Submit a response, check it saves. Log in as admin, check the list loads. Delete a response, check it disappears. Filter or search if that exists.

### Test 3 — Edge Cases and Breaking It
What happens when you submit an empty form? What if you put 1000 characters in a field? What if you try to access the admin URL without logging in? What if you refresh mid-flow?
