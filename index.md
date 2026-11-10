<img src="doc/landing.png" alt="Digits Contact Manager landing page">

# Digits Contact Manager

Digits is a contact manager for keeping contact details and timestamped notes. Each account sees its own contacts, while administrators can review all contacts and registered users.

## Installation

### Requirements

- Node.js and npm
- PostgreSQL

### Setup

1. Install the project dependencies from the repository root:

   ```sh
   npm install
   ```

2. Create a PostgreSQL database for the app. This example names it `digits`:

   ```sh
   createdb digits
   ```

3. Copy `sample.env` to `.env`. Update `DATABASE_URL` with your PostgreSQL connection details and set `AUTH_SECRET` to a private random value. Do not commit `.env`.

4. Create the database tables and load the development sample accounts and contacts:

   ```sh
   npx prisma migrate dev
   npm run seed
   ```

   The seed includes `john@foo.com` and `admin@foo.com` (password: `changeme`). These are development credentials; do not use them in a deployed environment.

5. Start the development server:

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Pages

- **Home (`/`)** — introduces the contact manager's multiple-user access, contact details, and timestamped notes. Use the Login menu to sign in or register.
- **Sign in (`/auth/signin`)** — authenticate with an existing account to open your contact list.
- **Sign up (`/auth/signup`)** — create an account with an email and password; new accounts can then add their own contacts.
- **Add Contact (`/add`)** — save a contact's name, address, image URL, and description.
- **List Contacts (`/list`)** — view the contacts belonging to your account. From a contact, edit its details or add and review notes with timestamps.
- **Edit Contact (`/edit/contact/[id]`)** — update a contact's saved details.
- **Admin (`/admin`)** — available to administrators; displays all contacts and a table of registered users and roles.
- **Change Password (`/auth/change-password`)** — verify and change the password for the signed-in account.
- **Sign out (`/auth/signout`)** — confirm signing out or cancel and return to the app.
- **Not authorized (`/not-authorized`)** — explains that the current account does not have permission to access a restricted page.

## Development

- Run ESLint with `npm run lint`.
- Run the end-to-end browser tests with `npm run playwright`.
- Apply future Prisma schema changes with `npx prisma migrate dev`.
