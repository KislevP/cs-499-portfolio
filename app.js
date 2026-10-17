const express = require('express');
const path = require('path');
const passport = require('passport'); // Add this line

// Bring in the database connection and models
require('./app_api/models/db');
require('./app_api/config/passport'); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Set up routes
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

// Set up Handlebars
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Serve static assets
app.use(express.static(path.join(__dirname, 'public/travlr')));

// Middleware to parse JSON
app.use(express.json());
app.use(passport.initialize()); // Add this line

// Use the routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});