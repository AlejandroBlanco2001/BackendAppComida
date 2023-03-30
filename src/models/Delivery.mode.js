import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema({
  id: String,
  idRestaurant: String,
  idUser: String,
  date: String,
  total: Number,
  status: String,
  products: {
    type: Array[
      {
        idProduct: String,
        quantity: Number,
      }
    ],
  },
});

const Delivery = mongoose.model('Pedido', DeliverySchema);

export default Delivery;
