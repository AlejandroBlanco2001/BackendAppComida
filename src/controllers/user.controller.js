import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.send('User created');
});

export default router;