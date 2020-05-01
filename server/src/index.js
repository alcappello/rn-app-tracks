require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');

const authRouter = require('./routes/authRoutes');
const trackRouter = require('./routes/trackRoutes');


mongoose.connect('mongodb://mongo/tracks', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', error => {
  console.error('Error connecting to MongoDB: ', error);
});


const app = express();
app.use(bodyParser.json());

app.use(authRouter);
app.use(trackRouter);


app.listen(3000, async () => {
  const url = await ngrok.connect(3000);
  console.log(`Listening to 3000. External URL: ${url}`);
});
