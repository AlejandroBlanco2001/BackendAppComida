import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
const db = require('./src/config/db.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
