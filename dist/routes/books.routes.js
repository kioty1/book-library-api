"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_1 = require("../data/books");
const reviews_1 = require("../data/reviews");
const book_validator_1 = require("../validators/book.validator");
const review_validator_1 = require("../validators/review.validator");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const { title, language, year, sortBy, order, page, limit } = req.query;
    let filteredBooks = [...books_1.books];
    if (title && typeof title === 'string') {
        filteredBooks = filteredBooks.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (language && typeof language === 'string') {
        filteredBooks = filteredBooks.filter((book) => book.language.toLowerCase() === language.toLowerCase());
    }
    if (year && typeof year === 'string') {
        filteredBooks = filteredBooks.filter((book) => book.publishedYear === Number(year));
    }
    if (sortBy === 'title') {
        filteredBooks.sort((a, b) => {
            if (order === 'desc') {
                return b.title.localeCompare(a.title);
            }
            return a.title.localeCompare(b.title);
        });
    }
    if (sortBy === 'publishedYear') {
        filteredBooks.sort((a, b) => {
            if (order === 'desc') {
                return b.publishedYear - a.publishedYear;
            }
            return a.publishedYear - b.publishedYear;
        });
    }
    const currentPage = page ? Number(page) : 1;
    const itemsPerPage = limit ? Number(limit) : 5;
    const totalItems = filteredBooks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
    return res.status(200).json({
        data: paginatedBooks,
        pagination: {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
        }
    });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const book = books_1.books.find((item) => item.id === id);
    if (!book) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }
    return res.status(200).json({
        data: book
    });
});
router.post('/', (req, res) => {
    const validationResult = book_validator_1.createBookSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            error: 'Validation failed',
            details: validationResult.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }
    const newBook = {
        id: `book-${books_1.books.length + 1}`,
        ...validationResult.data,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    books_1.books.push(newBook);
    return res.status(201).json({
        data: newBook
    });
});
router.post('/:bookId/reviews', (req, res) => {
    const bookId = req.params.bookId;
    const bookExists = books_1.books.some((book) => book.id === bookId);
    if (!bookExists) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }
    const validationResult = review_validator_1.createReviewSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            error: 'Validation failed',
            details: validationResult.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }
    const newReview = {
        id: `review-${reviews_1.reviews.length + 1}`,
        bookId,
        ...validationResult.data,
        createdAt: new Date()
    };
    reviews_1.reviews.push(newReview);
    return res.status(201).json({
        data: newReview
    });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books_1.books.findIndex((item) => item.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }
    const updatedBook = {
        ...books_1.books[bookIndex],
        ...req.body,
        id: books_1.books[bookIndex].id,
        createdAt: books_1.books[bookIndex].createdAt,
        updatedAt: new Date()
    };
    books_1.books[bookIndex] = updatedBook;
    return res.status(200).json({
        data: updatedBook
    });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books_1.books.findIndex((item) => item.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }
    const deletedBook = books_1.books.splice(bookIndex, 1)[0];
    return res.status(200).json({
        data: deletedBook
    });
});
router.get('/:bookId/reviews', (req, res) => {
    const { bookId } = req.params;
    const bookExists = books_1.books.some((book) => book.id === bookId);
    if (!bookExists) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }
    const bookReviews = reviews_1.reviews.filter((review) => review.bookId === bookId);
    return res.status(200).json({
        data: bookReviews
    });
});
router.get('/:id/average-rating', (req, res) => {
    const { id } = req.params;
    const bookExists = books_1.books.some((book) => book.id === id);
    if (!bookExists) {
        return res.status(404).json({
            error: 'Book not found'
        });
    }
    const bookReviews = reviews_1.reviews.filter((review) => review.bookId === id);
    if (bookReviews.length === 0) {
        return res.status(200).json({
            averageRating: 0
        });
    }
    const total = bookReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / bookReviews.length;
    return res.status(200).json({
        averageRating: average
    });
});
exports.default = router;
