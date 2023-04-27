import { Delivery } from '../models';

const createDelivery = (req, res) => {
  const { idRestaurant, total, products } = req.body;
  const delivery = new Delivery({
    idRestaurant,
    idUser: req.user.id,
    total,
    status: 'CREADO',
    distanceRestaurantUser: Math.random() * (10 - 0.1) + 0.1,
    products,
  });
  const deliveryCreated = delivery.save();
  deliveryCreated
    ? res.send({ message: 'Delivery was created successfully!' })
    : res.status(500).send({ message: 'Error in creating delivery' });
};

const getDeliveryByID = (req, res) => {
  const { id } = req.params;
  let delivery = null;
  try {
    delivery = Delivery.findById(id);
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(delivery);
};

const getDeliveryByUser = (req, res) => {
  const { id } = req.user;
  const { idRestaurant, begin_date, end_date } = req.query;
  let deliverys = [];
  try {
    deliverys = Delivery.find(
      { idUser: id, status: { $in: ['ENVIADO', 'REALIZADO'] }, idRestaurant: idRestaurant },
      {
        $or: [
          {
            createdAt: {
              $gte: new Date(begin_date),
              $lt: new Date(end_date),
            },
          },
        ],
      }
    );
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(deliverys);
};

const getSentDelivery = (req, res) => {
  let { tipo = 'createdAt', orden = 'desc' } = req.query;
  let delivery = null;
  try {
    delivery = Delivery.find({ status: 'ENVIADO' }).sort({ [tipo]: orden === 'asc' ? 1 : -1 });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(delivery);
};

const updateDelivery = (req, res) => {
  const { id } = req.params;
  try {
    Delivery.findOneAndUpdate({ id: id, status: 'CREADO' }, req.body).exec();
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'Delivery was updated successfully!' });
};

const deleteDelivery = (req, res) => {
  const { id } = req.params;
  try {
    Delivery.findByIdAndUpdate(id, { isDeleted: true }).exec();
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'Delivery was deleted successfully!' });
};

export default {
  createDelivery,
  getDeliveryByID,
  getSentDelivery,
  getDeliveryByUser,
  deleteDelivery,
  updateDelivery,
};
