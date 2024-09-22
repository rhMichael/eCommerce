const mongoose = require('mongoose');

mongoose.connect(process.env.mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB Connection Successful');
})

connection.on('error', (err) => {
    console.log('MongoDB Connection is failed')
})

module.exports = connection;