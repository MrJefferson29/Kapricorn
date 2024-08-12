const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const npkRoutes = require('./Routes/NPK');
const { setupSerialPort } = require('./serial');
const cors = require('cors');

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(bodyParser.json());


app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});


app.use('/', npkRoutes);


const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


setupSerialPort(port);


function gracefulShutdown() {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
