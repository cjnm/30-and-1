# MongoDB Setup Guide

This guide will help you set up MongoDB for your Bordful application.

## Prerequisites

- Node.js installed
- MongoDB installed locally or access to MongoDB Atlas

## Local MongoDB Setup

### 1. Install MongoDB

**macOS (using Homebrew):**

```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Ubuntu/Debian:**

```bash
sudo apt-get install mongodb
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### 2. Start MongoDB Service

**macOS:**

```bash
brew services start mongodb/brew/mongodb-community
```

**Ubuntu/Debian:**

```bash
sudo systemctl start mongod
```

**Windows:**
MongoDB should start automatically as a service.

## MongoDB Atlas Setup (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string from the "Connect" button
5. Replace `<password>` with your database user password

## Environment Configuration

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Update your MongoDB connection string in `.env.local`:

**For local MongoDB:**

```env
MONGODB_URI=mongodb://localhost:27017/bordful
MONGODB_DB_NAME=bordful
```

**For MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bordful?retryWrites=true&w=majority
MONGODB_DB_NAME=bordful
```

## Database Setup

### 1. Seed Sample Data

Run the seeding script to add sample jobs:

```bash
npm run db:seed
```

### 2. Migrate from Airtable (Optional)

If you have existing data in Airtable, you can migrate it:

```bash
npm run db:migrate
```

Make sure your Airtable credentials are set in `.env.local`:

```env
AIRTABLE_ACCESS_TOKEN=your_token_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=Jobs
```

## API Endpoints

The following API endpoints are available:

- `GET /api/jobs` - List jobs with filtering and pagination
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/[id]` - Get a specific job
- `PUT /api/jobs/[id]` - Update a job
- `DELETE /api/jobs/[id]` - Delete a job
- `GET /api/job-alerts` - Get job alerts for an email
- `POST /api/job-alerts` - Create a job alert

## Database Schema

### Jobs Collection

- `title` (string, required)
- `company` (string, required)
- `location` (string, required)
- `description` (string, required)
- `requirements` (array of strings)
- `salary` (object with min, max, currency)
- `type` (enum: full-time, part-time, contract, internship)
- `remote` (boolean)
- `tags` (array of strings)
- `applicationUrl` (string)
- `applicationEmail` (string)
- `postedAt` (date)
- `expiresAt` (date)
- `isActive` (boolean)
- `featured` (boolean)

### Job Alerts Collection

- `email` (string, required)
- `keywords` (array of strings)
- `location` (string)
- `jobType` (enum)
- `remote` (boolean)
- `salaryMin` (number)
- `isActive` (boolean)
- `frequency` (enum: daily, weekly, instant)
- `lastSent` (date)

## Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000` with MongoDB integration ready to use.

## Troubleshooting

### Connection Issues

- Ensure MongoDB is running
- Check your connection string format
- Verify network access (for Atlas)
- Check firewall settings

### Authentication Issues

- Verify username/password for Atlas
- Ensure database user has proper permissions
- Check IP whitelist settings in Atlas

### Performance

- MongoDB automatically creates indexes for better query performance
- Consider adding custom indexes for your specific query patterns
- Monitor query performance in production
