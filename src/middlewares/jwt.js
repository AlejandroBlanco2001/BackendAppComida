import * as jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized request' });
  }
  req['user'] = decoded;
  next();
};

export default { verifyToken };
