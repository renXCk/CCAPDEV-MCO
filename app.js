import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

mongoose.connect('mongodb://127.0.0.1:27017/pgt_database')
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});