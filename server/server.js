const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const connection = require('./db');

// Database connection
connection();

app.use(cors());

app.use(bodyParser.json());

app.use('/', require('./routes/authRoutes'));

app.use('/weekend/race', require('./routes/weekendFormat'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
