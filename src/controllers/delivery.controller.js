import { Delivery } from '../models';

const createDelivery = (req, res) => {
  const { idRestaurant, total, products } = req.body;
  const delivery = new Delivery({
    idRestaurant,
    idUser: req.user.id,
    total,
    status: 'CREADO',
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
      { idUser: id, status: { $in: ['ENVIADO', 'REALIZADO'] } },
      {
        $or: [
          { idRestaurant: idRestaurant },
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
  let delivery = null;
  try {
    delivery = Delivery.find({ status: 'ENVIADO' });
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

const markStatusDelivery = (req, res) => {
  const { id } = req.params;
  let delivery = Delivery.findById(id);
  switch (delivery.status) {
    case 'ENVIADO':
      delivery.status = 'ACEPTADO';
      break;
    case 'RECIBIDO':
      delivery.status = 'EN DIRECCIÓN';
      break;
    case 'EN DIRECCIÓN':
      delivery.status = 'REALIZADO';
      break;
    default:
      return res.status(500).send({ message: 'Error in updating delivery' });
  }
  res.send({ message: 'Delivery was updated successfully!' });
};

const markStatusAdmin = (req, res) => {
  const { id } = req.params;
  try {
    Delivery.findByIdAndUpdate(id, { status: 'RECIBIDO' });
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({ message: 'Delivery was updated successfully!' });
};
export default {
  createDelivery,
  getDeliveryByID,
  getSentDelivery,
  getDeliveryByUser,
  deleteDelivery,
  updateDelivery,
  markStatusDelivery,
  markStatusAdmin,
};
