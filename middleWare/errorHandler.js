const logger = require('../logger')

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        status: err.status || 500,
        path: req.originalUrl,
        method: req.method
    });
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 401:
            res.json({
                title: 'Unauthorized',
                message: err.message
            });
            break;
        case 404:
            res.json({
                title: 'Not found',
                message: err.message,

            });
            break;
        case 400:
            res.json({
                title: 'Bad request',
                message: err.message,
                // stackTrace: err.stack

            });
            break;
        case 500:
            res.json({
                title: 'Internal server error',
                message: err.message
            });
            break;
        default:
            break
    }

}

module.exports = errorHandler