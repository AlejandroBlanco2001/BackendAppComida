import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema(
  {
    idRestaurant: { type: String, required: true },
    idUser: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: 'active' },
    products: {
      type: [
        {
          idProduct: String,
          quantity: Number,
        },
      ],
      unique: true,
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model('Pedido', DeliverySchema);

export default Delivery;
