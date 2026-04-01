# Exhibition Visitor Log

A production-grade visitor feedback and management system for museum exhibitions. This application allows visitors to submit feedback and ratings for specific exhibits, which are then stored in a secure SQLite database and managed through an administrative dashboard.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/RyanB201/Exhibition_Test_App.git
   cd Exhibition_Test_App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

---

## 📝 Accessing Forms

### Visitor Feedback Form
This is the public-facing side of the application where visitors can leave their feedback.
- **URL**: `http://localhost:3000/`
- **Features**: 
  - Rating system (1-5 stars)
  - Exhibit selection
  - Comment box

### Admin Dashboard
The admin area allows you to view, sort, and manage all visitor submissions.
- **URL**: `http://localhost:3000/admin`
- **Default Credentials**:
  - **Username**: `admin`
  - **Password**: `exhibition2025`
- **Features**:
  - Submission summary and total count
  - Sorting by date and rating
  - Detailed response views
  - Submission deletion

---

## 📂 Project Structure

- `server.js`: Express backend with SQLite database logic and authentication.
- `public/`: Static frontend assets (HTML, CSS, JS).
  - `index.html`: Visitor feedback form.
  - `confirmation.html`: Post-submission landing page.
  - `admin/`: Administrative interface screens.
- `db/`: Directory for the SQLite database (`exhibition.db`).
- `css/`: Modern, editorial-inspired styling.
