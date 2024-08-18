import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided.' });
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = verify(token.replace('Bearer ', ''), secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
  }
};

export default verifyToken;
