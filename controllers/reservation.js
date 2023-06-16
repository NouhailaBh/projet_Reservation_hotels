import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
  try {
    const {numR, userId, roomId, cardNumber, cardHolderName, expiryDate, cvv ,statut,startDate,endDate} = req.body;

    const reservation = new Reservation({
      numR,
      userId,
      roomId,
      cardNumber,
      cardHolderName,
      expiryDate,
      cvv,
      statut,
      startDate,
      endDate,
    });

    const savedReservation = await reservation.save();

    res.status(201).json({ reservationId: reservation._id });
  } catch (error) {
  
    res.status(500).json({ error: 'An error occurred while saving the reservation.' });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().exec();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations.' });
  }
};
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    res.json(reservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la réservation." });
  }
};

export const getUserReservations = async (req, res) => {
  try {
    const userId = req.params.userId;

    const reservations = await Reservation.find({ userId }).exec();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations.' });
  }
};


