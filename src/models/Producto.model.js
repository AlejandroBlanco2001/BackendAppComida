import moongose from 'mongoose';

const ProductoSchema = new moongose.Schema({
  id: String,
  idRestaurant: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  status: String,
});

const Producto = moongose.model('Producto', ProductoSchema);

export default Producto;
