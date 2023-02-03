export const error_handler = (err, req, res, next) => {
    console.log(err)

    return res.status(res.statusCode ? res.statusCode : 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : err.stack
    })
}