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
app.use(express.static(publicFolder));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(publicFolder, 'index.html'));
});

const httpServer = http.createServer(app);
httpServer.listen(80, () => console.log(`HTTP server started`));

const httpsServer = https.createServer({
    key: fs.readFileSync('server/credentials/prod.key'),
    cert: fs.readFileSync('server/credentials/prod.crt'),
}, app);
httpsServer.listen(443, () => console.log(`HTTPS server started`));

