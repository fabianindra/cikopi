import { Request, Response } from 'express';

export const protectedController = (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { username, role } = user as { username: string; role: string };

  return res.status(200).json({
    success: true,
    message: 'Access granted',
    data: {
      username,
      role,
    },
  });
};
