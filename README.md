# Book Library API

This project is a RESTful API for managing books, authors, publishers, genres, and reviews.
It is built using Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **PostgreSQL** (version 12 or higher) - [Download from postgresql.org](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

### Verify Installation

Check that Node.js and npm are installed correctly:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

Check that PostgreSQL is installed:

```bash
psql --version    # Should show PostgreSQL version
```

## Features

- Get all books with filtering, sorting, and pagination
- Get a single book by ID
- Create a new book
- Update a book
- Delete a book
- Add reviews to books
- Get reviews for a book
- Get average rating for a book

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod

## Setup Instructions

## Quick Start (for experienced users)

If you have Node.js and PostgreSQL already set up:

```bash
git clone https://github.com/kioty1/book-library-api.git
cd book-library-api
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Then test: `curl http://localhost:3000/api/v1/books`

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL database

Create a new PostgreSQL database for the project:

```sql
-- Connect to PostgreSQL as admin user and run:
CREATE DATABASE book_library;
-- Or use your preferred database name
```

### 4. Configure environment variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit the `.env` file and update the `DATABASE_URL`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/book_library"
```

Replace:
- `username` with your PostgreSQL username
- `password` with your PostgreSQL password
- `book_library` with your database name (if different)

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Run database migrations

```bash
npx prisma migrate dev
```

### 7. Seed the database with sample data

```bash
npx prisma db seed
```

### 8. Verify database connection

Check that everything is working:

```bash
npx prisma studio  # Opens database browser (optional)
```

Or test the API:

```bash
curl http://localhost:3000/api/v1/books
```

### 9. Start the development server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Running the Server

Express runs on: http://localhost:3000

```bash
npm run dev      # Start development server
```

To stop the server, press `Ctrl+C` in the terminal.

## API Endpoints

## API Endpoints

Books:

GET /api/v1/books
GET /api/v1/books/:id
POST /api/v1/books
PUT /api/v1/books/:id
DELETE /api/v1/books/:id

Query parameters:

title - filter by title  
language - filter by language  
year - filter by published year  
sortBy - title or publishedYear  
order - asc or desc  
page - page number  
limit - items per page  

Reviews:

POST /api/v1/books/:bookId/reviews  
GET /api/v1/books/:bookId/reviews  
GET /api/v1/books/:bookId/average-rating  

## Example cURL Requests

### Get all books with pagination

```bash
curl -X GET "http://localhost:3000/api/v1/books?page=1&limit=10"
```

### Get all books with filtering and sorting

```bash
curl -X GET "http://localhost:3000/api/v1/books?title=harry&language=English&sortBy=title&order=asc"
```

### Get single book by ID

```bash
curl -X GET "http://localhost:3000/api/v1/books/1"
```

### Create a book

```bash
curl -X POST "http://localhost:3000/api/v1/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "isbn": "111111",
    "publishedYear": 2024,
    "pageCount": 150,
    "language": "English",
    "description": "My test book",
    "authorId": "author-1",
    "publisherId": "publisher-1",
    "genres": ["genre-1"]
  }'
```

### Update a book

```bash
curl -X PUT "http://localhost:3000/api/v1/books/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Book",
    "language": "Estonian"
  }'
```

### Delete a book

```bash
curl -X DELETE "http://localhost:3000/api/v1/books/1"
```

### Get average rating for a book

```bash
curl -X GET "http://localhost:3000/api/v1/books/1/average-rating"
```

### Get reviews for a book

```bash
curl -X GET "http://localhost:3000/api/v1/books/1/reviews"
```

### Add a review

```bash
curl -X POST "http://localhost:3000/api/v1/books/1/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "Milana",
    "rating": 2,
    "comment": "Очень сложно!"
  }'
```

## Response Formats

### Successful Response - Books List with Pagination

```json
{
  "data": [
    {
      "id": "1",
      "title": "Harry Potter",
      "isbn": "9780747532699",
      "publishedYear": 1997,
      "pageCount": 309,
      "language": "English",
      "description": "A young wizard...",
      "authorId": "1",
      "publisherId": "1",
      "createdAt": "2024-01-01T10:00:00Z",
      "updatedAt": "2024-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 47,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Successful Response - Single Book

```json
{
  "id": "1",
  "title": "Harry Potter",
  "isbn": "9780747532699",
  "publishedYear": 1997,
  "pageCount": 309,
  "language": "English",
  "description": "A young wizard...",
  "authorId": "1",
  "publisherId": "1",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z"
}
```

### Validation Error (400)

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "isbn",
      "message": "Invalid ISBN format"
    },
    {
      "field": "publishedYear",
      "message": "Must be a positive number"
    }
  ]
}
```

### Resource Not Found (404)

```json
{
  "error": "Book not found",
  "details": [
    {
      "message": "Book with ID 999 does not exist"
    }
  ]
}
```

### Conflict Error - Duplicate ISBN (409)

```json
{
  "error": "Conflict",
  "details": [
    {
      "field": "isbn",
      "message": "ISBN already exists in the database"
    }
  ]
}
```

### Internal Server Error (500)

```json
{
  "error": "Internal server error",
  "details": [
    {
      "message": "Database connection failed"
    }
  ]
}
```

## Testing the API

After starting the server, you can test the API endpoints:

### Check if server is running

```bash
curl http://localhost:3000/
```

Expected response:
```json
{
  "message": "Book Library API is running"
}
```

### Get all books

```bash
curl http://localhost:3000/api/v1/books
```

### Create a test book

```bash
curl -X POST "http://localhost:3000/api/v1/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "isbn": "999999999",
    "publishedYear": 2024,
    "pageCount": 150,
    "language": "English",
    "description": "Test book for API testing",
    "authorId": "author-1",
    "publisherId": "publisher-1",
    "genres": ["genre-1"]
  }'
```

## Troubleshooting

### Common Issues

#### 1."Error: P1001: Can't reach database server"

**Solution:**
- Make sure PostgreSQL is running
- Check your DATABASE_URL in `.env` file
- Verify database credentials are correct
- Ensure the database exists

#### 2."Error: Prisma client could not be generated"

**Solution:**
```bash
npx prisma generate
```

#### 3."Error: There are pending migrations"

**Solution:**
```bash
npx prisma migrate dev
```

#### 4."Port 3000 is already in use"

**Solution:**
- Kill the process using port 3000, or
- Change the port in `src/app.ts` and update README

#### 5. "Module not found" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

If you encounter database connection issues:

1. **Check PostgreSQL service:**
   ```bash
   # On Windows
   services.msc
   # Look for "postgresql" service and ensure it's running
   ```

2. **Verify connection:**
   ```bash
   psql -h localhost -U your_username -d your_database
   ```

3. **Reset database (if needed):**
   ```bash
   npx prisma migrate reset
   npx prisma db seed
   ```

### Environment Variables

Make sure your `.env` file contains:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
NODE_ENV="development"
PORT=3000
```

## Project Structure

```
book-library-api/
├── src/
│   ├── app.ts  #Main application file
│   ├── lib/
│   │   └── prisma.ts  #Prisma client configuration
│   ├── middlewares/
│   │   └── error.middleware.ts # Error handling middleware
│   ├── models/ # TypeScript interfaces
│   ├── routes/
│   │   └── books.routes.ts    # API routes
│   ├── validators/      #Zod validation schemas
│   └── data/     # Mock data (for reference)
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── seed.ts    #Database seeding script
│   └── migrations/        # Database migrations
├── .env.example       # Environment variables template
├── package.json      # Dependencies and scripts
└── README.md     # This file
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server (after build)

## Development

### Adding new features

1. Update Prisma schema if needed
2. Run migrations: `npx prisma migrate dev`
3. Update TypeScript models
4. Add validation schemas
5. Implement routes
6. Update README with new endpoints

### Code Style

- Use TypeScript strict mode
- No `any` types allowed
- Follow REST API conventions
- Use meaningful variable names
- Add error handling for all operations

## AI Usage (Prompts Used)

During development, AI tools were used for guidance, debugging, and understanding concepts.

- setting up Express + TypeScript project
- generating CRUD endpoints for Books
- implementing Reviews and average rating logic
- adding filtering, sorting and pagination
- implementing validation using Zod
- setting up Prisma ORM and PostgreSQL
- debugging routing and runtime errors

Prisma and database:
- How to configure Prisma with PostgreSQL using environment variables
- Fix Prisma error multiple datasources defined
- How to write a seed script in Prisma with TypeScript
- How to avoid unique constraint errors in Prisma seed

Backend development:
- How to implement filtering sorting and pagination in Express API
- How to validate request body using Zod in Express
- How to structure REST API routes for books and reviews

Debugging:
- Why am I getting validation error in Zod
- How to handle duplicate ISBN in API
- Fix 404 error when fetching resource by id in Express

Code improvement:
- How to refactor code to use Prisma instead of in memory arrays
- How to implement upsert logic in Prisma
- How to prevent duplicate data in seed script

Testing:
- How to test REST API endpoints using Thunder Client
- What is the correct format for query parameters in Express


## Notes

AI was used only as a support tool for understanding, debugging, and improving the code.
All implementation and testing were done independently.

## Project Status

 **Core API functionality implemented**  
 **Database integration with Prisma completed**  
 **Validation and error handling implemented**  
 **API tested and working**  
 **Documentation complete**  
 **Ready for deployment**

## Author

Maksim Ljubimov