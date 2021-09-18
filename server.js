//require
const EE = require('events');
const {
    gethomeapi,
    apilines,
    apicount,
    apipost,
    apistatus,
    apidelete,
    sendFile
} = require('./controllers/controller')


var method = {
    get: new EE(),
    post: new EE(),
    delete: new EE()
}

method.get.on("/", (req, res) => {
    sendFile('index.html', res);
})

method.get.on("/map", (req, res) => {
    sendFile('./map/map.html', res)
})

method.get.on("/logs", (req, res) => {
    sendFile('./logs/index.html', res)
})

method.get.on("/api", (req, res) => {
    gethomeapi(res)
})

method.get.on("/api/status", (req, res) => {
    apistatus(res)
})

method.get.on("/api/lines", (req, res) => {
    apilines(res)
})

method.get.on("/api/count", (req, res) => {
    apicount(req, res)
})

method.post.on("/api", (req, res) => {
    apipost(req, res)
});

method.delete.on("/api", (req, res) => {
    var params = params(req);
    var { id } = params;
    apidelete(req, res, id);
})

module.exports = (req, res) => {
    method[req.method.toLowerCase()].emit(req.url, req, res)
}