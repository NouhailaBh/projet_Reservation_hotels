import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  numR: { type: Number, required: true },
  userId: { type: String, required: true },
  roomId: { type: String, required: true },
  cardNumber: { type: String, required: false },
  cardHolderName: { type: String, required: false },
  expiryDate: { type: String, required: false },
  cvv: { type: String, required: false },
  statut: { type: String, required: true }, 
  startDate: {type: Date,required: false,},
  endDate: {type: Date,required: false,},
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
