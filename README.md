# Book Library API

This project is a RESTful API for managing books, authors, publishers, genres, and reviews.
It is built using Node.js, Express, TypeScript, Prisma, and PostgreSQL.

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

1. Install dependencies

npm install

2. Configure environment variables

Create a .env file:

DATABASE_URL="your_postgresql_connection_string"

3. Generate Prisma client

npx prisma generate

4. Run migrations

npx prisma migrate dev

5. Seed database

npx prisma db seed

6. Start server

npm run dev

## Running the Server

Express runs on: http://localhost:3000

```bash
npm run dev      # Start development server
```

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
    "rating": 5,
    "comment": "Very good book!"
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

## AI Usage (Prompts Used)

During development, AI tools were used for guidance, debugging, and understanding concepts.

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

Core API functionality implemented
Database integration with Prisma completed
Validation and error handling implemented
API tested using Thunder Client

## Author

Milana Koloskova