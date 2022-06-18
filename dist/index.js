"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const api_1 = __importDefault(require("./routes/api"));
const app = express_1.default();
const views = path_1.default.resolve(__dirname, "../public");
//@ts-ignore
app.use("/api",cors(), api_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(views, "index.html"));
});
app.get("/map", (req, res) => {
    res.sendFile(path_1.default.resolve(views, "./map/map.html"));
});
app.get("/logs", (req, res) => {
    res.sendFile(path_1.default.resolve(views, "./logs/index.html"));
});
if (!module.parent) {
    app.listen(8080);
}
exports.default = app;
