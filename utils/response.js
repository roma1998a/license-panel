function success(res, message = 'Success', data = null, statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

function error(res, message = 'Error', statusCode = 500, data = null) {
    return res.status(statusCode).json({
        success: false,
        message,
        data
    });
}

module.exports = {
    success,
    error
};
