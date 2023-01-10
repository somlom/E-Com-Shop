export const error_handler = (err, req, res, next) => {

    const status = res.statusCode ? res.statusCode : 500;

    return res.status(status).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : err.stack
    })
}