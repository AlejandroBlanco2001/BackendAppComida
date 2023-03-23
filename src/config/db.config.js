import moongose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const DATABASE = process.env.DATABASE;

moongose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = moongose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

module.exports = db;
