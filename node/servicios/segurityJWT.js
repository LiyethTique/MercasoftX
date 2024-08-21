import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateJWT = (Id_User) => {
    return jwt.sign({ Id_User }, process.env.JWT_SECRET, {
      expiresIn: '24h' 
    });
  };