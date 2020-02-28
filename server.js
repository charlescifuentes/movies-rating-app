const express = require('express');
//const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Conect Database
//connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', function(req, res) {
  res.send('Hello World!');
});

//app.use('api/ratings', require('./routes/ratings'));
//app.use('api/comments', require('./routes/commnents'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
