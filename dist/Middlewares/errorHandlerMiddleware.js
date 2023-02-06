"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors = {
    ValidationError: 400,
    UnauthorizedError: 401,
    NotFoundError: 404,
    SequelizeUniqueConstraintError: 409,
};
const errorHandlerMiddleware = (err, _req, res, _next) => {
    const status = errors[err.name];
    const { message } = err;
    if (!status)
        return res.sendStatus(500);
    res.status(status).json({ message });
};
exports.default = errorHandlerMiddleware;
