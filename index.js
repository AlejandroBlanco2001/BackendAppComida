import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

app.get('/prueba', async (req, res) => {
  console.log('Test1');
  res.status(200).json({ message: 'Success' });
});

app.post('/prueba', async (req, res) => {
  res.status(200).json({ message: 'Hola' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

app.listen(8080);
