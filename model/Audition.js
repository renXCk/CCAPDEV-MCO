import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g., "09:00 AM"
  status: { type: String, enum: ['Open', 'Booked'], default: 'Open' },
  talentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

const auditionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true }, // e.g., "2026-03-15"
  slots: [slotSchema]
});

export default mongoose.model('Audition', auditionSchema);