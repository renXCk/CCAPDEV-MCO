import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import User from './model/User.js';
import Audition from './model/Audition.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

mongoose.connect('mongodb://127.0.0.1:27017/pgt_database')
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- 1. THE RECRUITER'S VIEW (Strictly Talents) ---
app.get('/api/talents', async (req, res) => {
  try {
    // Only find users where role is 'Talent'
    const talents = await User.find({ role: 'Talent' }); 
    res.json(talents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch talents' });
  }
});

// --- 2. THE ADMIN'S VIEW (Everyone) ---
// Add this NEW route specifically for your AdminDashboard.tsx
app.get('/api/admin/users', async (req, res) => {
  try {
    const allUsers = await User.find(); 
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all users' });
  }
});

// --- 2. GET ALL AUDITIONS (Talent View) ---
app.get('/api/auditions', async (req, res) => {
  try {
    // Populate allows us to see the Talent's name instead of just their ID
    const auditions = await Audition.find().populate('slots.talentId', 'name');
    res.json(auditions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch auditions' });
  }
});

// --- ADMIN: CREATE NEW AUDITION DATE ---
app.post('/api/auditions', async (req, res) => {
  try {
    const { title, location, date, slots } = req.body; 
    
    const formattedSlots = slots.map(time => ({ 
      time, 
      status: "Open" 
    }));

    const newAudition = new Audition({ 
      title,     
      location,        
      date, 
      slots: formattedSlots 
    });

    await newAudition.save();
    
    res.json({ success: true, audition: newAudition });
  } catch (err) {
    console.error("❌ ERROR SAVING AUDITION:", err); 
    res.status(500).json({ error: 'Failed to create audition date' });
  }
});

// --- ADMIN: DELETE ENTIRE AUDITION DATE ---
app.delete('/api/auditions/:id', async (req, res) => {
  try {
    await Audition.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Audition deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete audition" });
  }
});

// --- RECRUITER: REMOVE TALENT FROM A SLOT ---
app.post('/api/auditions/remove', async (req, res) => {
  try {
    const { auditionId, slotTime } = req.body;

    const audition = await Audition.findOneAndUpdate(
      { _id: auditionId, "slots.time": slotTime },
      { 
        $set: { 
          "slots.$.talentId": null, 
          "slots.$.status": "Open" 
        } 
      },
      { returnDocument: 'after' }
    );

    res.json({ success: true, audition });
  } catch (err) {
    res.status(500).json({ error: 'Server error during removal' });
  }
});

// --- 3. THE SMART LOGIN (REMOVED THE DUPLICATE) ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (user) {
      // Return the ROLE. This is the most important part for your frontend redirects!
      res.json({ 
        success: true, 
        user: { 
          id: user._id, 
          name: user.name, 
          role: user.role, 
          email: user.email 
        } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
});

// --- 4. SMART REGISTER (Handles Talent, Recruiter, & Admin) ---
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const newUser = new User({
      name,
      email,
      password,
      role: role || 'Talent', 
      // Only Talent gets the singer/profile object
      talentProfile: (role === 'Talent' || !role) ? { 
        talentRole: "Singer", 
        age: "20", 
        headshot: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" 
      } : undefined
    });

    await newUser.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- 5. AUDITION BOOKING 
// This handles the Talent clicking a specific slot
app.post('/api/auditions/book', async (req, res) => {
  try {
    const { auditionId, slotTime, talentId } = req.body;

    // 1. Double-booking check: Does this user already have a slot in this specific audition?
    const existingBooking = await Audition.findOne({
      _id: auditionId,
      "slots.talentId": talentId
    });

    if (existingBooking) {
      return res.status(400).json({ error: "You have already booked a slot in this audition." });
    }

    // 2. Book the slot
    const audition = await Audition.findOneAndUpdate(
      { 
        _id: auditionId, 
        "slots.time": slotTime, 
        "slots.status": "Open" 
      },
      { 
        $set: { 
          "slots.$.talentId": talentId, 
          "slots.$.status": "Booked" 
        } 
      },
      { returnDocument: 'after' } // Fixes the deprecation warning
    );

    if (!audition) {
      return res.status(400).json({ error: "Slot is no longer available." });
    }

    res.json({ success: true, audition });
  } catch (err) {
    res.status(500).json({ error: 'Server error during booking' });
  }
});

// --- REMOVE AUDITION BOOKING ---
app.post('/api/auditions/remove', async (req, res) => {
  try {
    const { auditionId, slotTime } = req.body;

    const audition = await Audition.findOneAndUpdate(
      { _id: auditionId, "slots.time": slotTime },
      { 
        $set: { 
          "slots.$.talentId": null, 
          "slots.$.status": "Open" 
        } 
      },
      { returnDocument: 'after' }
    );

    res.json({ success: true, audition });
  } catch (err) {
    res.status(500).json({ error: 'Server error during removal' });
  }
});

// --- 6. RATING ---
app.post('/api/rate', async (req, res) => {
  try {
    const { talentId, rating, comment } = req.body;
    await User.findByIdAndUpdate(talentId, {
      $push: { "talentProfile.ratings": { score: rating, note: comment } }
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 7. DELETE USER ---
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

// --- UPDATE TALENT VITALS ---
app.put('/api/users/profile', async (req, res) => {
  try {
    const { userId, vitals } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: vitals.name,
          "talentProfile.height": vitals.height,
          "talentProfile.weight": vitals.weight,
          "talentProfile.hairColor": vitals.hairColor,
          "talentProfile.eyeColor": vitals.eyeColor,
        }
      },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// --- ADMIN: UPDATE EXISTING USER ---
app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    // We update the name and email of the specific user ID
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      { name, email }, 
      { new: true }
    );
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// --- ADMIN: UPDATE EXISTING AUDITION ---
app.put('/api/auditions/:id', async (req, res) => {
  try {
    const { title, location, date } = req.body;
    const updatedAudition = await Audition.findByIdAndUpdate(
      req.params.id, 
      { title, location, date }, 
      { new: true }
    );
    res.json({ success: true, audition: updatedAudition });
  } catch (err) {
    res.status(500).json({ error: "Failed to update audition" });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});