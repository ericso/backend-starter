import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserInstance } from '../models/User';
import db from '../database';
import config from '../config';

export const getloggedInUser = (req: Request): Promise<UserInstance> => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return Promise.reject('No access token provided');
  }

  return jwt.verify(
    token,
    config.SECRET,
    (err, decoded) => {
      if (err) {
        return Promise.reject(err);
      }
      return db.User.findOne({ where: { id: decoded.id } });
    }
  );
}
