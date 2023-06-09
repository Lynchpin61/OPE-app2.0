const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth')

const reviewRoutes = require('./routes/review')

const crawlRoutes = require('./routes/crawl')

const translateRoutes = require('./routes/translate')

const errorController = require('./controllers/error')

const app = express();

const ports = process.env.PORT || 3000;

app.use(cors()); // to communicate with Machine Learning API

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
         'GET, POST, PUT, DELETE'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
         'Content-Type, Authorization'
    );
    next();
});

app.use('/auth', authRoutes);

app.use('/review', reviewRoutes);

app.use('/crawl', crawlRoutes);

app.use('/translate', translateRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log( `Listening on port ${ports}`));