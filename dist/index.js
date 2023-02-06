"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware_1 = __importDefault(require("./Middlewares/errorHandlerMiddleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3001;
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Express + Tupescript');
});
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
app.use(errorHandlerMiddleware_1.default);
