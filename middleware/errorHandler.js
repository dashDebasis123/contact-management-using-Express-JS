const {constants} = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({ title: "Resource Not Found", message: err.message, stackTrace: err.stack });
            break;
        case constants.SERVER_ERROR:
            res.status(statusCode).json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            res.status(statusCode).json({ title: "Unauthorized Access", message: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.status(statusCode).json({ title: "Forbidden Access", message: err.message, stackTrace: err.stack });
            break;
        default:
            console.log("no error ")
            break;
    }

};

module.exports = errorHandler;