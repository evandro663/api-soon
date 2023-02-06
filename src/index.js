"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
var PORT = 3001;
app.get('/', function (req, res) {
    res.status(200).send('Express + Tupescript');
});
app.listen(PORT, function () {
    console.log("Server is listening on ".concat(PORT));
});
