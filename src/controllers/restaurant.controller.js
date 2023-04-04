import { Restaurant } from '../models/';

const createRestaurant = async (req, res) => {
  const { name, description, phone, direction, email, logo } = req.body;
  const restaurant = new Restaurant({
    idAdmin: req.user.id,
    name,
    description,
    phone,
    direction,
    email,
    category,
  });
  const restaurantCreated = await restaurant.save();
  restaurantCreated
    ? res.send({ message: 'Restaurant was created successfully!' })
    : res.status(500).send({ message: 'Error in creating restaurant' });
};

const getRestaurantByID = (req, res) => {
  const { id } = req.params;
  let restaurant = null;
  try {
    restaurant = Restaurant.findById(id);
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(restaurant);
};

const getAllRestaurants = async (req, res) => {
  const { category, name } = req.query;
  let restaurants = null;
  const regex = new RegExp(name, 'i');
  try {
    Restaurant.find({ $or: [{ category: category }, { name: { $regex: regex } }] }).sort({
      stars: 'descending',
    });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(restaurants);
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, description, phone, direction, email, logo } = req.body;
  try {
    Restaurant.findByIdAndUpdate(id, {
      name,
      description,
      direction,
      phone,
      email,
    });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'Restaurant was updated successfully!' });
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  try {
    Restaurant.findByIdAndUpdate(id, { isDeleted: true });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'Restaurant was deleted successfully!' });
};

export default {
  createRestaurant,
  getRestaurantByID,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
