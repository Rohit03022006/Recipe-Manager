import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import recipeRoutes from './routes/recipe.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors(
  {
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
));


app.use(express.json());

const port = process.env.PORT || 3000;

if (!process.env.MONGODB) {
  console.error('Error: MONGODB environment variable is required');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB - Database: recipe-manager');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes); 

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.post('/api/test', (req, res) => {
  res.json({ message: 'POST is working!', body: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});