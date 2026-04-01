"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    isbn: zod_1.z.string().min(1, 'ISBN is required'),
    publishedYear: zod_1.z.number().int().positive('Published year must be a positive number'),
    pageCount: zod_1.z.number().int().positive('Page count must be a positive number'),
    language: zod_1.z.string().min(1, 'Language is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    coverImage: zod_1.z.string().optional(),
    authorId: zod_1.z.string().min(1, 'Author ID is required'),
    publisherId: zod_1.z.string().min(1, 'Publisher ID is required'),
    genres: zod_1.z.array(zod_1.z.string()).min(1, 'At least one genre is required')
});
