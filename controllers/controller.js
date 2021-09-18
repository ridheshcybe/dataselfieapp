const { findall, count, SendFile, insert, remove, auth } = require('../models/model');

var params = function(req) {
    let q = req.url.split('?'),
        result = {};
    if (q.length >= 2) {
        q[1].split('&').forEach((item) => {
            try {
                result[item.split('=')[0]] = item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]] = '';
            }
        })
    }
    return result;
}

async function gethomeapi(res) {
    try {
        const data = await findall();
        res.writeHead(200, {
            "content-Type": "application/json"
        })
        res.end(JSON.stringify(data))
    } catch (err) {
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.end(err);
    }
}

async function apilines(res) {
    try {
        const data = await findall();
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        var length = data.length + 1;
        res.end(length);
    } catch (e) {
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.end(err);
    }
}

async function apicount(req, res) {
    req.query = params(req);
    try {
        const data = await count(req.query.id)
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(data);
    } catch (e) {
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.end(err);
    }
}

async function sendFile(path, res) {
    try {
        var data = await SendFile(path);
        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
    } catch (err) {
        res.writeHeader(400, { "Content-Type": "text/plain" });
        res.write(err);
        res.end();
    }
}

async function apipost(req, res) {
    var body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        body = JSON.parse(body)
        const unixTimeCreated = new Date().getTime();

        if (JSON.stringify(body).includes("proto")) {
            res.writeHead(400, {
                "content-Type": "text/plain"
            });
            res.end("includes proto which is restricted")
            return;
        }

        if (JSON.stringify(body).includes("constructor.prototype")) {
            res.writeHead(400, {
                "content-Type": "text/plain"
            });
            res.end("includes constructor.prototype which is restricted")
            return;
        }

        const newData = Object.assign({
            "created": unixTimeCreated
        }, req.body);
        insert(newData).then(docs => {
            res.end(docs);
        }).catch(e => {
            res.writeHead(400, {
                "content-Type": "text/plain"
            });
            res.end(err)
        });
    });
}

async function apistatus(res) {
    const data = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date().getTime() / 1000
    }
    res.writeHead(200, {
        "content-Type": "application/json"
    });
    res.end(JSON.stringify(data));
}

async function apidelete(req, res, id) {
    try {
        var authorization = await auth(req)
        if (typeof authorization !== 'boolean') {
            res.end("fek")
            return;

        }
        var removed = await remove(id);
        res.writeHead(200, {
            "content-Type": "application/json"
        });
        res.end(JSON.stringify({ removed, id }));

    } catch (e) {
        switch (e) {
            case "id unkown":
                res.writeHead(404, {
                    "content-Type": "text/plain"
                });
                res.end("id 404")
                break;
            case 'auth doesn\'t match':
                res.writeHead(401, {
                    "content-Type": "text/plain"
                })
                res.end(e)
                break;
            case 'No credentials sent!':
                res.writeHead(401, {
                    "content-Type": "text/plain"
                })
                res.end(e)
                break;

            default:
                res.writeHead(500, {
                    "content-Type": "text/plain"
                });
                return res.end(err)
        }
    }
}

module.exports = {
    gethomeapi,
    apilines,
    apicount,
    apipost,
    apistatus,
    apidelete,
    sendFile
}