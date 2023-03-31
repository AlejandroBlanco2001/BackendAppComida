import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
};

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
