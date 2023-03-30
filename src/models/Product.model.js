import moongose from 'mongoose';

const ProductSchema = new moongose.Schema({
  id: String,
  idRestaurant: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  status: String,
});

const Product = moongose.model('Producto', ProductSchema);

export default Product;
