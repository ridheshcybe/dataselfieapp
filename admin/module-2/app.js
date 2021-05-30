var express = require('express'),
    app = express();

app.use(express.static('../../assets/module-2'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.listen(8000, () => {
    console.log('listing');
})