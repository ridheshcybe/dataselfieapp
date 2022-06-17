"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeall = exports.remove = exports.insert = exports.count = exports.findall = void 0;
const path_1 = __importDefault(require("path"));
const nedb_1 = __importDefault(require("@seald-io/nedb"));
const db = new nedb_1.default({
    filename: path_1.default.resolve(__dirname, "../db/db.db"),
});
db.loadDatabase();
function findall() {
    return new Promise((r, j) => {
        db.find({}, (err, docs) => {
            if (err)
                return j(err);
            r(docs);
        });
    });
}
exports.findall = findall;
function count(id) {
    return new Promise((r, j) => {
        db.count({ _id: id }, (err, count) => {
            if (err)
                return j(err);
            r(count);
        });
    });
}
exports.count = count;
function insert(newData) {
    return new Promise((r, j) => {
        db.insert(newData, (err, docs) => {
            if (err)
                return j(err);
            r(docs);
        });
    });
}
exports.insert = insert;
function remove(id) {
    return new Promise((r, j) => {
        db.remove({
            _id: id,
        }, {
            multi: true,
        }, (err, numRemoved) => {
            if (err)
                return j(err);
            if (numRemoved == 0)
                return j("id unkown");
            r(numRemoved);
        });
    });
}
exports.remove = remove;
function removeall() {
    return new Promise((r, j) => {
        db.remove({}, { multi: true }, (err, num) => {
            if (err)
                return j(err);
            r(num);
        });
    });
}
exports.removeall = removeall;
