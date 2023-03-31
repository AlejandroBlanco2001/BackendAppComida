const checkUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized request' });
  }
};
