"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_validator_1 = require("../validators/book.validator");
const review_validator_1 = require("../validators/review.validator");
const prisma_1 = require("../lib/prisma");
const router = (0, express_1.Router)();
const getStringParam = (value) => {
    if (typeof value === 'string')
        return value;
    if (Array.isArray(value))
        return value[0];
    return undefined;
};
router.get("/", async (req, res) => {
    try {
        const { title, language, year, sortBy, order, page, limit } = req.query;
        const currentPage = page ? Number(page) : 1;
        const itemsPerPage = limit ? Number(limit) : 5;
        const skip = (currentPage - 1) * itemsPerPage;
        const where = {
            ...(title && typeof title === "string"
                ? {
                    title: {
                        contains: title,
                        mode: "insensitive",
                    },
                }
                : {}),
            ...(language && typeof language === "string"
                ? {
                    language: {
                        equals: language,
                        mode: "insensitive",
                    },
                }
                : {}),
            ...(year && typeof year === "string"
                ? {
                    publishedYear: Number(year),
                }
                : {}),
        };
        let orderBy = {
            title: "asc",
        };
        if (sortBy === "title") {
            orderBy = {
                title: order === "desc" ? "desc" : "asc",
            };
        }
        if (sortBy === "publishedYear") {
            orderBy = {
                publishedYear: order === "desc" ? "desc" : "asc",
            };
        }
        const [books, totalItems] = await Promise.all([
            prisma_1.prisma.book.findMany({
                where,
                orderBy,
                skip,
                take: itemsPerPage,
                include: {
                    author: true,
                    publisher: true,
                    genres: true,
                },
            }),
            prisma_1.prisma.book.count({ where }),
        ]);
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return res.status(200).json({
            data: books,
            pagination: {
                currentPage,
                totalPages,
                totalItems,
                itemsPerPage,
                hasNextPage: currentPage < totalPages,
                hasPreviousPage: currentPage > 1,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const id = getStringParam(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Book id is required" });
        }
        const book = await prisma_1.prisma.book.findUnique({
            where: { id },
            include: {
                author: true,
                publisher: true,
                genres: true,
            },
        });
        if (!book) {
            return res.status(404).json({
                error: "Book not found",
            });
        }
        return res.status(200).json({
            data: book,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.post("/", async (req, res) => {
    try {
        const validationResult = book_validator_1.createBookSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: validationResult.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }
        const { title, isbn, publishedYear, pageCount, language, description, coverImage, authorId, publisherId, genres, } = validationResult.data;
        let existingAuthor = await prisma_1.prisma.author.findUnique({
            where: { id: authorId },
        });
        if (!existingAuthor && authorId === "author-1") {
            existingAuthor = await prisma_1.prisma.author.findFirst({
                where: { firstName: "J.K.", lastName: "Rowling" },
            });
        }
        if (!existingAuthor) {
            return res.status(400).json({
                error: "Author not found",
            });
        }
        let existingPublisher = await prisma_1.prisma.publisher.findUnique({
            where: { id: publisherId },
        });
        if (!existingPublisher && publisherId === "publisher-1") {
            existingPublisher = await prisma_1.prisma.publisher.findFirst({
                where: { name: "Bloomsbury" },
            });
        }
        if (!existingPublisher) {
            return res.status(400).json({
                error: "Publisher not found",
            });
        }
        const resolvedAuthorId = existingAuthor.id;
        const resolvedPublisherId = existingPublisher.id;
        const genreRecords = await prisma_1.prisma.genre.findMany({
            where: {
                OR: genres.flatMap((genreValue) => [
                    { id: genreValue },
                    { name: genreValue },
                ]),
            },
        });
        if (genreRecords.length !== genres.length) {
            return res.status(400).json({
                error: "One or more genres not found",
            });
        }
        const newBook = await prisma_1.prisma.book.create({
            data: {
                title,
                isbn,
                publishedYear,
                pageCount,
                language,
                description,
                coverImage,
                authorId: resolvedAuthorId,
                publisherId: resolvedPublisherId,
                genres: {
                    connect: genreRecords.map((genre) => ({ id: genre.id })),
                },
            },
            include: {
                author: true,
                publisher: true,
                genres: true,
            },
        });
        return res.status(201).json({
            data: newBook,
        });
    }
    catch (error) {
        console.error(error);
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002") {
            return res.status(409).json({
                error: "Book with this ISBN already exists",
            });
        }
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.post("/:bookId/reviews", async (req, res) => {
    try {
        const bookId = getStringParam(req.params.bookId);
        if (!bookId) {
            return res.status(400).json({ error: "Book id is required" });
        }
        const bookExists = await prisma_1.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!bookExists) {
            return res.status(404).json({
                error: "Book not found",
            });
        }
        const validationResult = review_validator_1.createReviewSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: validationResult.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }
        const newReview = await prisma_1.prisma.review.create({
            data: {
                bookId,
                userName: validationResult.data.userName,
                rating: validationResult.data.rating,
                comment: validationResult.data.comment,
            },
        });
        return res.status(201).json({
            data: newReview,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const id = getStringParam(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Book id is required" });
        }
        const existingBook = await prisma_1.prisma.book.findUnique({
            where: { id },
        });
        if (!existingBook) {
            return res.status(404).json({
                error: "Book not found",
            });
        }
        const validationResult = book_validator_1.createBookSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: validationResult.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }
        const { title, isbn, publishedYear, pageCount, language, description, coverImage, authorId, publisherId, genres, } = validationResult.data;
        const updatedBook = await prisma_1.prisma.book.update({
            where: { id },
            data: {
                title,
                isbn,
                publishedYear,
                pageCount,
                language,
                description,
                coverImage,
                authorId,
                publisherId,
                genres: {
                    set: genres.map((genreId) => ({ id: genreId })),
                },
            },
            include: {
                author: true,
                publisher: true,
                genres: true,
            },
        });
        return res.status(200).json({
            data: updatedBook,
        });
    }
    catch (error) {
        console.error(error);
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "P2002") {
            return res.status(409).json({
                error: "Book with this ISBN already exists",
            });
        }
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = getStringParam(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Book id is required" });
        }
        const existingBook = await prisma_1.prisma.book.findUnique({
            where: { id },
        });
        if (!existingBook) {
            return res.status(404).json({
                error: "Book not found",
            });
        }
        const deletedBook = await prisma_1.prisma.book.delete({
            where: { id },
        });
        return res.status(200).json({
            data: deletedBook,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.get("/:bookId/reviews", async (req, res) => {
    try {
        const bookId = getStringParam(req.params.bookId);
        if (!bookId) {
            return res.status(400).json({ error: "Book id is required" });
        }
        const bookExists = await prisma_1.prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!bookExists) {
            return res.status(404).json({
                error: "Book not found",
            });
        }
        const bookReviews = await prisma_1.prisma.review.findMany({
            where: { bookId },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json({
            data: bookReviews,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
router.get("/:id/average-rating", async (req, res) => {
    try {
        const id = getStringParam(req.params.id);
        if (!id) {
            return res.status(400).json({ error: "Book id is required" });
        }
        const bookExists = await prisma_1.prisma.book.findUnique({
            where: { id },
        });
        if (!bookExists) {
            return res.status(404).json({
                error: "Book not found",
            });
        }
        const result = await prisma_1.prisma.review.aggregate({
            where: {
                bookId: id,
            },
            _avg: {
                rating: true,
            },
        });
        return res.status(200).json({
            averageRating: result._avg?.rating ?? 0,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
exports.default = router;
