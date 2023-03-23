import mongoose from 'mongoose';

const PedidoSchema = new mongoose.Schema({
  id: String,
  idRestaurant: String,
  idUser: String,
  date: String,
  total: Number,
  status: String,
  products: Array,
});

const Pedido = mongoose.model('Pedido', PedidoSchema);

export default Pedido;
