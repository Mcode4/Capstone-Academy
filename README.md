# Capstone Academy

A course-sharing platform where anyone can sign up, publish a course (name, category, description and cover image), browse courses by category, and discuss them in comments. Visitors can also leave a rating and review for the site itself.

This is a solo full-stack capstone project built for **App Academy** (March 2025): a Flask + PostgreSQL REST API and a React + Redux single-page frontend, with image uploads stored in AWS S3.

**Live site:** [capstone-academy.onrender.com](https://capstone-academy.onrender.com)
> The app is hosted on Render's free tier, so it spins down when idle. The first request after a quiet period can take up to a minute while the service wakes up.

## Screenshots

<!-- TODO: add screenshots -->

## Features

- **Authentication** - sign up, log in and log out with session-based auth (Flask-Login) and CSRF protection. A "Demo Login" button on the login page signs in as a seeded demo user.
- **Courses** - create a course with a name, category (Coding, Math, Science, Language or Fun), description and cover image. Course owners can edit or delete their own courses; the API enforces this (403 for anyone else).
- **Browse and filter** - view all courses, filter by category from the navigation menu, see featured courses on the landing page, and open any course for its full details.
- **Comments** - logged-in users can comment on a course and delete their own comments.
- **User profiles** - each user has a profile page listing the courses they have created.
- **Site reviews** - anyone can submit a star rating and short review; the highest-rated reviews are shown on the landing page.
- **Image uploads** - course images are uploaded to an AWS S3 bucket (replaced and cleaned up when a course image is changed).

## Tech Stack

**Frontend** - React 18, Redux (redux-thunk), React Router 6, Vite, Bootstrap, react-icons, plain CSS

**Backend** - Python 3.9, Flask 2.2, Flask-SQLAlchemy / SQLAlchemy 1.4, Flask-Migrate (Alembic), Flask-Login, Flask-WTF (forms + CSRF), Flask-CORS, Gunicorn, boto3

**Database** - PostgreSQL in production (schema-prefixed tables), SQLite works for local development

**Infrastructure** - AWS S3 (image storage), Docker, Render (hosting)

## Database Schema

Four tables are active in the current migration:

| Table | Key columns | Relationships |
| --- | --- | --- |
| `users` | id, first_name, last_name, username (unique), email (unique), hashed_password, image, bio | has many `courses` and `comments` |
| `courses` | id, owner_id, name, category (enum: CODING, MATH, SCIENCE, LANGUAGE, FUN), description, image | belongs to a `user`; has many `comments` (deleted along with the course) |
| `comments` | id, owner_id, course_id, comment | belongs to a `user` and a `course` |
| `site_reviews` | id, first_name, last_name, rating, review | standalone |

All tables also have `createdAt` (and `updatedAt` where applicable). Models for `pages`, `page_contents`, `notifications` and `admins` exist in `app/models/` as groundwork for future features but are not registered or migrated yet.

## API Routes

All routes are served under `/api`. Mutating requests expect the `csrf_token` cookie set by the server.

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/auth/` | - | Return the current user, or 401 |
| POST | `/api/auth/login` | - | Log in with email and password |
| GET | `/api/auth/logout` | - | Log the current user out |
| POST | `/api/auth/signup` | - | Create an account and log in |
| GET | `/api/auth/unauthorized` | - | JSON 401 used by Flask-Login redirects |
| GET | `/api/users/` | - | List all users |
| GET | `/api/users/<id>` | - | Get one user |
| GET | `/api/courses` | - | List all courses |
| GET | `/api/courses/featured` | - | Four featured courses |
| GET | `/api/courses/<owner_id>` | - | List courses created by a user |
| GET | `/api/courses/category/<category>` | - | List courses in a category (`coding`, `math`, `science`, `language`, `fun`) |
| POST | `/api/courses` | Login | Create a course (multipart form with image upload) |
| PUT / PATCH | `/api/courses/edit/<id>` | Owner | Edit a course and replace its image |
| DELETE | `/api/courses/<id>` | Owner | Delete a course |
| GET | `/api/comments/course/<id>` | - | List comments on a course |
| GET | `/api/comments/user/<id>` | - | List comments written by a user |
| POST | `/api/comments` | Login | Add a comment |
| DELETE | `/api/comments/<id>` | Owner | Delete a comment |
| GET | `/api/site-reviews` | - | List all site reviews |
| GET | `/api/site-reviews/highest` | - | Top eight reviews by rating, then date |
| POST | `/api/site-reviews` | - | Submit a site review |
| GET | `/api/docs` | - | Auto-generated list of routes |

## Running Locally

**Prerequisites:** Python 3.9, Pipenv, Node.js and npm. For image uploads you also need an S3 bucket and credentials.

1. Clone the repository and `cd` into it.

2. Install the backend dependencies:

   ```bash
   pipenv install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and fill in your own values. The app reads these variables:

   | Variable | Purpose |
   | --- | --- |
   | `SECRET_KEY` | Flask session / CSRF signing key |
   | `DATABASE_URL` | SQLAlchemy URL, e.g. `sqlite:///dev.db` locally or a PostgreSQL URL |
   | `SCHEMA` | PostgreSQL schema name (snake_case); used when `FLASK_ENV=production` |
   | `FLASK_ENV` | Set to `production` only when deploying |
   | `FLASK_RUN_PORT` | Port for the dev server (the frontend proxy expects `8000`) |
   | `S3_BUCKET`, `S3_KEY`, `S3_SECRET` | AWS S3 bucket name and credentials for image uploads |

   Never commit your `.env` file.

4. Create the tables, seed demo data and start the API:

   ```bash
   pipenv shell
   flask db upgrade
   flask seed all
   flask run
   ```

   The API runs on http://localhost:8000 (port set in `.flaskenv`).

5. In a second terminal, start the frontend:

   ```bash
   cd react-vite
   npm install
   npm run dev
   ```

   Vite proxies `/api` requests to the Flask server on port 8000.

6. Log in with the "Demo Login" button, or with any seeded user.

### Deployment notes

Production runs from the included `Dockerfile` on Render (`flask db upgrade && flask seed all && gunicorn app:app`). The Flask app serves the prebuilt React bundle from `react-vite/dist`, which is why that folder is committed - run `npm run build` in `react-vite` (it runs in watch mode; stop it with Ctrl+C once the bundle is built) and commit the result after frontend changes. Set `SECRET_KEY`, `DATABASE_URL`, `SCHEMA`, `FLASK_ENV=production` and the `S3_*` variables in the Render dashboard.

## Author

Marcellies Armstrong - [@Mcode4](https://github.com/Mcode4)
