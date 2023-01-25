export const error_handler = (err, req, res) => {

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status)
    return res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : err.stack
    })
}