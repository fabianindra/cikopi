import express from 'express';
import verifyToken from '@/middleware/verifyToken';

const routerProtect = express.Router();

routerProtect.post('/protected-endpoint', verifyToken, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default routerProtect;
