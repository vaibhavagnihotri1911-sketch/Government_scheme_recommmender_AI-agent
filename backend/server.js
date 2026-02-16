const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/govtt')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  predictions: Number
});
const User = mongoose.model('User', userSchema);

// ML Prediction endpoint
app.post('/api/predict', async (req, res) => {
  const { features } = req.body; // ML input data
  const prediction = Math.random() > 0.5 ? 1 : 0; // Mock ML
  
  const user = new User({ name: 'HackathonUser', email: 'user@govtt.com', predictions });
  await user.save();
  
  res.json({ prediction, message: '✅ ML prediction saved!' });
});

app.get('/', (req, res) => res.json({message: 'GovTT Backend + MongoDB LIVE!'}));
app.get('/api/health', (req, res) => res.json({status: '✅ LIVE!'}));

app.listen(5000, () => console.log('🚀 Backend: http://localhost:5000'));
