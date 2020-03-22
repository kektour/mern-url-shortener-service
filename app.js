'use strict';

const path = require('path');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/link', require('./routes/links'));
app.use('/', require('./routes/redirect'));

if (config.get('NODE_ENV') === 'prod') {
  app.use('/', express.static(path.join('client', 'build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = config.get('port') || 5000;

async function connect() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.log(`Server error: ${e.message}`);
    process.exit(1);
  }
}
connect();

app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}...`);
});
