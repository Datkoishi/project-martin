// Middleware để ghi log lỗi
function errorLogger(err, req, res, next) {
    console.error(`Error: ${err.message}`);
    next(err); // Chuyển tiếp lỗi đến các middleware tiếp theo nếu có
}

module.exports = errorLogger;
