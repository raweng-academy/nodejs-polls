const mongoose = require('mongoose');
const connection = mongoose.connection;
const uri = process.env.MONGO_DB;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

module.exports = mongoose;