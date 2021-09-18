const {
    resolve
} = require('path');
var resolvee = resolve;
const Datastore = require('nedb');
const fs = require('fs');
const { reject } = require('underscore');
var db = new Datastore({
    filename: resolvee(__dirname, "../db/db.db")
});
db.loadDatabase();

function findall() {
    return new Promise((resolve, reject) => {
        db.find({}, function(err, docs) {
            if (err) return reject(err);
            resolve(docs)
        });
    })
}

function count(f) {
    return new Promise((resolve, reject) => {
        db.count({ _id: f }, function(err, count) {
            if (err) return reject(err)
            resolve(count)
        });
    })
}

var publicc = resolve(__dirname, '../public')

function SendFile(path) {
    return new Promise((resolve, reject) => {
        console.log({
            path,
            publicc
        })
        console.log(resolvee(publicc, `./${path}`))
        fs.readFile(resolvee(publicc, `./${path}`), (err, html) => {
            if (err) {
                reject(err);
            }
            resolve(html)
        });
    })
}

function insert(newData) {
    return new Promise((resolve, reject) => {
        db.insert(newData, (err, docs) => {
            if (err) return reject(err)
            resolve(docs);
        });
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        db.remove({
            _id: id
        }, {
            multi: true
        }, (err, numRemoved) => {
            if (err) return reject(err)
            if (numRemoved == 0) return reject('id unkown')
            resolve(numRemoved)
        })
    });
}

function auth(req) {
    return new Promise((resolve, reject) => {
        var auth = req.getHeader('authorization');
        if (!auth) return reject('No credentials sent!');

        auth = auth.split(' ')[1]
        if (auth !== process.env['pass']) return reject('auth doesn\'t match')
        resolve(true)
    });
}

module.exports = {
    findall,
    count,
    SendFile,
    insert,
    remove,
    auth
}