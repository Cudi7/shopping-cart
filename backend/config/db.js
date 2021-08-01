const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    console.log(`Connected to DB: ${db.host}`);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDb;
