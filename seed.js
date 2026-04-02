import mongoose from 'mongoose';
import User from './model/User.js';
import Audition from './model/Audition.js';

async function seedDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/pgt_database');
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Audition.deleteMany({});

    // 1. Create 5 Sample Talents
    const talents = await User.insertMany([
      { name: "Emma Johnson", email: "emma@test.com", password: "password123", role: "Talent", talentProfile: { talentRole: "Singer", age: 24, height: "5'6\"", weight: "125 lbs", hairColor: "Blonde", eyeColor: "Green" } },
      { name: "Marcus Williams", email: "marcus@test.com", password: "password123", role: "Talent", talentProfile: { talentRole: "Dancer", age: 28, height: "5'10\"", weight: "165 lbs", hairColor: "Black", eyeColor: "Brown" } },
      { name: "Sofia Martinez", email: "sofia@test.com", password: "password123", role: "Talent", talentProfile: { talentRole: "Singer", age: 22, height: "5'4\"", weight: "115 lbs", hairColor: "Brown", eyeColor: "Hazel" } },
      { name: "James Chen", email: "james@test.com", password: "password123", role: "Talent", talentProfile: { talentRole: "Dancer", age: 26, height: "5'9\"", weight: "155 lbs", hairColor: "Black", eyeColor: "Brown" } },
      { name: "Olivia Brown", email: "olivia@test.com", password: "password123", role: "Talent", talentProfile: { talentRole: "Singer", age: 25, height: "5'7\"", weight: "135 lbs", hairColor: "Auburn", eyeColor: "Blue" } }
    ]);

    // 2. Create Sample Recruiters & Admins
    await User.insertMany([
      { name: "Agent Smith", email: "smith@pgt.com", password: "password123", role: "Recruiter" },
      { name: "Admin Jane", email: "admin@pgt.com", password: "admin123", role: "Admin" }
    ]);

    // 3. Create 5 Sample Schedule Slots
    await Audition.create({
      title: "PGT Season 7 – Singer Auditions",
      location: "Studio A",
      date: "2026-03-15",
      slots: [
        { time: "09:00 AM", status: "Booked", talentId: talents[0]._id },
        { time: "09:30 AM", status: "Open", talentId: null },
        { time: "10:00 AM", status: "Open", talentId: null },
        { time: "10:30 AM", status: "Booked", talentId: talents[1]._id },
        { time: "11:00 AM", status: "Open", talentId: null }
      ]
    });

    console.log('🎉 Database successfully seeded with 5+ sample records!');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seedDB();