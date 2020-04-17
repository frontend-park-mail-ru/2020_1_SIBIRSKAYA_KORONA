const http = require('http');
const https = require('https');

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

// INIT HTTPS SERVER
const publicFolder = path.resolve(__dirname, '..', 'public');
const distFolder = path.resolve(publicFolder, 'dist');

const appHttps = express();
appHttps.use(morgan('dev'));
appHttps.use(express.static(distFolder));
appHttps.use(express.static(publicFolder));


appHttps.get('*', (req, res) => {
    res.sendFile(path.resolve(publicFolder, 'index.html'));
});


const httpsServer = https.createServer({
    key: fs.readFileSync('server/credentials/prod.key'),
    cert: fs.readFileSync('server/credentials/prod.crt'),
}, appHttps);
httpsServer.listen(443, () => console.log(`HTTPS server started`));


// INIT HTTP REDIRECT SERVER
const appHttp = express();
appHttp.use(morgan('dev'));

appHttp.get('*', function(req, res) {
    res.redirect('https://' + req.headers.host + req.url);
});

const httpServer = http.createServer(appHttp);
httpServer.listen(80, () => console.log(`HTTP server started`));
