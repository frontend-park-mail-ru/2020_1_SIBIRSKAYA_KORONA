const http = require('http');
const https = require('https');

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');


const app = express();
const publicFolder = path.resolve(__dirname, '..', 'public');
const distFolder = path.resolve(publicFolder, 'dist');

app.use(morgan('dev'));
app.use(express.static(distFolder));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(distFolder, 'index.html'));
});

// TODO(Alexandr): dev server
// const isDev = process.env.NODE_ENV === 'development';
const isDev = true;

let certificate;
let privateKey;
if (isDev) {
    certificate = fs.readFileSync('server/credentials/test.crt');
    privateKey = fs.readFileSync('server/credentials/test.key');
} else {
    certificate = fs.readFileSync('server/credentials/prod.crt');
    privateKey = fs.readFileSync('server/credentials/prod.key');
}

const httpServer = http.createServer(app);
httpServer.listen(5555, () => console.log(`HTTP server started`));


const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
httpsServer.listen(8787, () => console.log(`HTTPS server started`));

