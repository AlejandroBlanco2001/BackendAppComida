import { Delivery } from '../models';

const createDelivery = (req, res) => {
  const { idRestaurant, total, products } = req.body;
  const delivery = new Delivery({
    idRestaurant,
    idUser: req.user.id,
    total,
    status: 'ENVIADO',
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
  const { idRestaurant, begin_date, end_date } = req.params;
  let deliverys = [];
  try {
    deliverys = Delivery.find({
      $or: [
        { idUser: id, status: { $in: ['ENVIADO', 'REALIZADO'] } },
        { idRestaurant: idRestaurant },
        {
          createdAt: {
            $gte: new Date(begin_date),
            $lt: new Date(end_date),
          },
        },
      ],
    });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(deliverys);
};

const getSentDeliveryByUser = (req, res) => {
  const { id } = req.user;
  let delivery = null;
  try {
    delivery = Delivery.find({ idUser: id, status: 'ENVIADO' });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send(delivery);
};

export default { createDelivery, getDeliveryByID, getSentDeliveryByUser, getDeliveryByUser };
