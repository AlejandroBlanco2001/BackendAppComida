import { User } from '../models/';
import { generateToken, comparePassword, hashPassword } from '../utils/security';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Email: ', email, 'Password: ', password);
  let user = null;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).send({ message: err });
    return;
  }
  if (!user) {
    res.status(404).send({ message: 'User not found' });
    return;
  }
  if (!comparePassword(password, user.password)) {
    res.status(401).send({ message: 'Invalid credentials' });
    return;
  }
  const token = generateToken({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  });
  res
    .cookie('token', token, { httpOnly: true, sameSite: 'none', secure: false })
    .json({ token: token });
};

const registerUser = async (req, res) => {
  const { username, first_name, second_name, password, email, direction, phone, role } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({
    username,
    first_name,
    second_name,
    password: hashedPassword,
    email,
    direction,
    phone,
    role,
  });
  const userCreated = await user.save();
  userCreated
    ? res.send({ message: 'User was created successfully!' })
    : res.status(500).send({ message: 'Error in creating user' });
};

const getUserByID = (req, res) => {
  const { id } = req.params;
  let user = null;
  try {
    user = User.findById(id);
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(user);
};

const getUserByToken = (req, res) => {
  const { id } = req.user;
  let user = null;
  try {
    user = User.findById(id);
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(user);
};

const updateUser = (req, res) => {
  const { username, first_name, second_name, password, email, direction, phone } = req.body;
  try {
    User.findByIdAndUpdate(req.user.id, {
      username,
      first_name,
      second_name,
      password,
      email,
      direction,
      phone,
    }).exec();
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'User was updated successfully!' });
};

const deleteUser = (req, res) => {
  try {
    User.findByIdAndUpdate(req.user.id, { isDeleted: true }).exec();
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'User was deleted successfully!' });
};

export default { registerUser, getUserByID, getUserByToken, updateUser, loginUser, deleteUser };
