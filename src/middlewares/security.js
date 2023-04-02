const checkUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized request' });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized request' });
  }
};

const checkDeliveryMan = (req, res, next) => {
  if (req.user && req.user.role === 'DELIVERYMAN') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized request' });
  }
};

const checkNotDelivery = (req, res, next) => {
  if (req.user && req.user.role !== 'DELIVERYMAN') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized request' });
  }
};

export default { checkUser, checkAdmin, checkDeliveryMan, checkNotDelivery };
