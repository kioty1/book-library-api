"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const details = err.details || [];
    console.error('[Error]', {
        status,
        message,
        details,
        stack: err.stack
    });
    if (details.length > 0) {
        return res.status(status).json({
            error: message,
            details
        });
    }
    res.status(status).json({
        error: message
    });
};
exports.errorHandler = errorHandler;
