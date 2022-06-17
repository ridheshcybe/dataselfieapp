"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apidelete = exports.apistatus = exports.apipost = exports.apicount = exports.apilines = exports.gethomeapi = void 0;
const model = __importStar(require("./model"));
const crypto_1 = require("crypto");
const pass = crypto_1.randomBytes(10).toString("ascii");
async function gethomeapi(res) {
    try {
        const found = await model.findall();
        res.send(found);
    }
    catch (error) {
        res.status(500).send(error.message || error);
    }
}
exports.gethomeapi = gethomeapi;
async function apilines(res) {
    try {
        const data = await model.findall();
        res.send(data.length + 1);
    }
    catch (err) {
        res.status(500).send(err.message || err);
    }
}
exports.apilines = apilines;
async function apicount(req, res) {
    try {
        if (!req.query.id)
            return res.status(404).send("no id found");
        const data = await model.count(req.query.id);
        res.end(data);
    }
    catch (e) {
        res.status(400).end(e);
    }
}
exports.apicount = apicount;
async function apipost(req, res) {
    const newData = Object.assign({
        created: new Date().getTime(),
    }, req.body);
    if (!newData.image)
        return res.send("no Image found");
    if (!newData.location)
        return res.send("no Location found");
    if (!newData.location.lat)
        return res.send("no Lat found");
    if (!newData.location.lon)
        return res.send("no Lon found");
    try {
        const docs = await model.insert(newData);
        res.send(docs);
    }
    catch (error) {
        res.status(400).send(error.message || error);
    }
}
exports.apipost = apipost;
function apistatus(res) {
    res.send({
        uptime: process.uptime(),
        message: "Ok",
        date: new Date().getTime() / 1000,
    });
}
exports.apistatus = apistatus;
async function apidelete(req, res, id) {
    const auth = req.header("auth");
    if (!id)
        return res.status(400).send("no id provided");
    if (!auth)
        return res.sendStatus(401);
    if (auth !== pass)
        return res.sendStatus(401);
    try {
        const removed = await model.remove(id);
        res.send(`removed ${removed} items`);
    }
    catch (err) {
        res.status(500).send(err.message || err);
    }
}
exports.apidelete = apidelete;
