//get
var {
    resolve
} = require('path');
var logger = require('morgan');
var Datastore = require('nedb');
var express = require('express');
var rateLimit = require("express-rate-limit");

//set
global.public = resolve(__dirname, './public')
var homelimit = rateLimit({
    windowMs: 11 * 60 * 1000,
    max: 100
});
var apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
var app = express();
var db = new Datastore({
    filename: resolve(__dirname, "../db/db")
});
db.loadDatabase();

//pass functions to app
app.use(logger("dev"));
app.use(express.json({
    limit: '6mb',
    extended: true
}));
app.use(express.urlencoded({
    limit: '5mb',
    extended: true
}));
app.use("/api/", apiLimiter);

// index page
// GET - /
app.get("/", homelimit, (req, res) => {
    res.sendFile(resolve(global.public, './index.html'))
})


app.get('/map/two', homelimit, (req, res) => {
    res.sendFile(resolve(global.public, './map/map.html'))
})

// Show all my submissions
// GET - /logs
app.get("/logs", homelimit, (req, res) => {
    res.sendFile(resolve(global.public, './logs/index.html'))
})

// Map for data visualization
// GET - /map
app.get('/map', homelimit, (req, res) => {
    res.sendFile(resolve(global.public, './map/index.html'));
})

app.get('/api/status', (req, res) => {
    var data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date().getTime() / 1000
    }
    res.status(200).send(data);
});

// Show all my submissions
// our API
// GET - /api
app.get("/api", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.status(400).send(err)
            return;
        }

        res.json(docs);
    });
});

app.get("/api/lines", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.status(400).send(err)
            return;
        }

        var length = docs.length + 1;
        res.json({ length: length });
    });
})

app.get('/api/count', (req, res) => {
    db.count({
        _id: req.query.term || req.query.id
    }, (err, count) => {
        if (err) {
            res.status(400).send(err)
            return;
        };
        res.json(count);
    });
})

// Create a submission
// POST - /api
app.post("/api", (req, res) => {
    var unixTimeCreated = new Date().getTime();

    if (req.body.toString().includes("proto")) {
        res.status(400).send("includes proto which is restricted")
        return;
    }

    if (req.body.toString().includes("varructor.prototype")) {
        res.status(400).send("includes varructor.prototype which is restricted")
        return;
    }

    var newData = Object.assign({
        "created": unixTimeCreated
    }, req.body);

    db.insert(newData, (err, docs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(docs);
    });
})

app.delete("/api/one", (req, res) => {
    var {
        id
    } = req.query;
    var {
        authorization
    } = req.headers;

    if (!authorization) {
        res.status(401).json({
            error: 'No credentials sent!'
        });
        return;
    }

    if (authorization.split(' ')[1] !== process.env['pass']) {
        res.status(403).json({
            error: 'auth doesn\'t match'
        })
        return;
    }

    db.remove({
        _id: id
    }, {
        multi: true
    }, (err, numRemoved) => {
        if (err) {
            res.status(400).json({
                error: err
            });
            return;
        }
        if (numRemoved == 0) {
            res.status(400).json({
                error: 'id unknow'
            });
            return;
        }

        res.send({
            removedn: numRemoved,
            id
        })
    });
})



app.get('/vip', homelimit, (req, res) => {
    var j = req.headers.authorization;


    if (j.split(' ')[1] !== process.env.pass) {
        res.status(401).send('401');
        return;
    }

    require('./vip')(req, res);
})

module.exports = app;
module.exports = app;