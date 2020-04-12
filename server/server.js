const express = require('express');
const path = require('path');
const morgan = require('morgan');
const ip = require('ip');

const app = express();
const publicFolder = path.resolve(__dirname, '..', 'public');
const distFolder = path.resolve(publicFolder, 'dist');

app.use(morgan('dev'));
app.use(express.static(distFolder));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(distFolder, 'index.html'));
});


// app.get('*', (req, res) => {
//     res.redirect('/');
// });

const PORT = process.env.PORT || 5757;
app.listen(PORT, () => {
    console.log(`Server working at:
    http://${ip.address()}:${PORT}
    http://localhost:${PORT}`);
});
