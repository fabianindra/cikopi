import { sign } from 'jsonwebtoken';
import { repoFindUser } from '../repositories/auth.repository';

const createToken = (payload: object, expiresIn: string): string => {
    const secret = process.env.JWT_SECRET!;
    return sign(payload, secret, { expiresIn });
  };  

export const serviceUserLogin = async (request: any) => {
    const { username, password }: { username: string; password: string } = request;
    try {
      const existingUser = await repoFindUser(username);
  
      if (!existingUser) {
        return {
          status: 401,
          success: false,
          message: 'Invalid username or password',
        };
      }
  
      if (existingUser) {
        const jwtPayload = { username, role: existingUser.role, userid: existingUser.id };
        const token = createToken(jwtPayload, '9h');
        
        return {
          status: 201,
          success: true,
          message: 'Login successfully',
          token: token,
        };
      }
      return {
        status: 401,
        success: false,
        message: 'Invalid username or password',
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: 'Server error',
        error: (error as Error).message,
      };
    }
  };