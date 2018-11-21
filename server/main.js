const http = require('http')
    , app = require('express')()
    , wines = require('./service/wines');

const hostname = '127.0.0.1' // localhost
    , port = 5000;

app.get('/wines', wines.findAll);
app.get('/wines/:id', wines.findById);
app.post('/wines', wines.insertWine);
app.put('/wines/:id', wines.updateWine);
app.delete('/wines/:id', wines.deleteWine);

http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
