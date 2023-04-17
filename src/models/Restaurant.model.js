import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  idAdmin: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String },
  direction: {
    road: { type: String, required: true },
    number: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: Number, required: true },
  },
  phone: { type: String },
  email: { type: String },
  category: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

RestaurantSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

RestaurantSchema.pre('findOne', function () {
  this.where({ isDeleted: false });
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
