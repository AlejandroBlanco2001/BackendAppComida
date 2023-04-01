import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema(
  {
    idRestaurant: { type: String, required: true },
    idUser: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },
    products: {
      type: [
        {
          idProduct: String,
          quantity: Number,
        },
      ],
      unique: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

DeliverySchema.pre('find', function () {
  this.where({ isDeleted: false });
});

DeliverySchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

DeliverySchema.pre('findByIdAndUpdate', function () {
  this.where({ status: 'CREADO' });
});

const Delivery = mongoose.model('Deliver', DeliverySchema);

export default Delivery;
