const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: './config/config.env' });

const app = express();

// Conect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//app.use('api/ratings', require('./routes/ratings'));
app.use('/api/comments', require('./routes/comments'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
