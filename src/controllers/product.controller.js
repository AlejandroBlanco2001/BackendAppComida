import { Product } from '../models';
import restaurantController from './restaurant.controller';

const createProduct = async (req, res) => {
  const { idRestaurant, name, description, category, price } = req.body;
  const product = new Product({
    idRestaurant,
    name,
    description,
    category,
    price,
  });
  try {
    const savedProduct = await product.save();
  } catch (err) {
    res.status(500).json(err);
  }
  res.status(200).json('Product created');
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  let product = null;
  try {
    product = await Product.findById(id);
  } catch (err) {
    res.status(500).json(err);
  }
  res.status(200).json(product);
};

const getAllProducts = async (req, res) => {
  const { restaurant, category } = req.query;
  let products = null;
  if (!restaurant && !category) return res.status(400).json({ message: 'Bad request' });
  try {
    let idRestaurant = restaurantController.getRestaurantByID(restaurant).id;
    console.log(idRestaurant);
    products = await Product.find({
      $or: [{ idRestaurant: idRestaurant }, { category: category }],
    });
  } catch (err) {
    res.status(500).json(err);
  }
  res.status(200).json(products);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, status } = req.body;
  try {
    Product.findByIdAndUpdate(id, {
      name,
      description,
      category,
      price,
      status,
    });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  res.send({ message: 'Product was updated successfully!' });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    Product.findByIdAndUpdate(id, { isDeleted: true });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  res.send({ message: 'Product was deleted successfully!' });
};

export default { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct };
