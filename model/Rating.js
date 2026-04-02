import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  talentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  notes: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Rating', ratingSchema);