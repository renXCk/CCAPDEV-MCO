import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // We will hash this in Phase 3
  role: { type: String, enum: ['Admin', 'Recruiter', 'Talent'], required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  joinedDate: { type: Date, default: Date.now },
  
  // These fields only apply if the user is a Talent
  talentProfile: {
    talentRole: { type: String, enum: ['Singer', 'Dancer', 'Actor', 'Model', 'Magician', 'Other'] },
    age: { type: Number },
    height: { type: String },
    weight: { type: String },
    hairColor: { type: String },
    eyeColor: { type: String },
    headshot: { type: String }, // URL to image
    media: {
  photos: { type: [{ type: String }], default: [] },
  videos: { type: [{ type: String }], default: [] },
  resume: { type: String }
  }
  }
});

export default mongoose.model('User', userSchema);