# Contributing to Job Board Starter

Thank you for your interest in contributing! Here's how you can help:

## Getting Started

1. Fork the repo
2. Clone it to your machine
3. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes
5. Run tests and linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add some feature'`
7. Push to the branch: `git push origin feature/your-feature-name`
8. Submit a pull request

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Set up MongoDB:

- Install MongoDB locally or create a MongoDB Atlas account
- Get your connection string

3. Create a `.env.local` file:

```env
MONGODB_URI=mongodb://localhost:27017/bordful
MONGODB_DB_NAME=bordful
```

4. Run the development server:

```bash
npm run dev
```

## Project Structure

```
app/
  layout.tsx          # Root layout with Geist font
  page.tsx           # Home page with job listings
  jobs/
    [id]/
      page.tsx       # Individual job page
lib/
  db.ts           # MongoDB connection
  models/         # MongoDB schemas
  types/          # TypeScript type definitions
  utils/
    formatDate.ts   # Date formatting utilities
components/
  jobs/
    JobCard.tsx     # Job listing card
    JobSearch.tsx   # Search component
```

## Code Style

- Use TypeScript
- Follow ESLint rules
- Use double quotes for strings
- Use semicolons
- Write meaningful commit messages

Thank you for contributing!
