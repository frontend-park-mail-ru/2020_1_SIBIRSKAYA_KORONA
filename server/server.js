const express = require('express');
const path = require('path');
const morgan = require('morgan');


const app = express();

const root = path.resolve(__dirname, '..');
const publicFolder = path.resolve(__dirname, '..', 'public');
const staticFolder = path.resolve(__dirname, '..', 'static');


app.use(morgan('dev'));

app.use(express.static(root));
app.use(express.static(publicFolder));
app.use(express.static(staticFolder));

app.get('/', (req, res, next) => {
    res.sendfile(path.resolve(publicFolder + 'index.html'));
    next();
});

const PORT = process.env.PORT || 5757;
app.listen(PORT, () => console.log(`Server working at http://localhost:${PORT}`));
