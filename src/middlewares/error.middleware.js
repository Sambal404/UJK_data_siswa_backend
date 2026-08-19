// /src/middlewares/error.middleware.js

const { ZodError } = require('zod');
const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
    
    if (err instanceof ZodError ) {

        return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Request validation failed.",
            details: err.issues.map( issue => ({
                field: issue.path.join('.'),
                message: issue.message,
            })),
        });

    }

    if (err.statusCode && err.code) {

        return res.status(err.statusCode).json({
            success: false,
            code: err.code,
            message: err.message
        })

    }

    logger.error({
        err,
        method: req.method,
        url: req.originalUrl,
    });

    return res.status(500).json({
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error.",
    });

}

module.exports = errorHandler