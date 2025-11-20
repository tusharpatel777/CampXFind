// server/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js'; // Import item routes
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import notificationRoutes from './routes/notificationRoutes.js'; // Import notification routes
import claimRoutes from './routes/claimRoutes.js'; // Import claim routes

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express(); 
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://camp-x-find.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));


app.use(express.json());
// For parsing multipart/form-data (handled by multer for file uploads,
// but express.json handles regular JSON bodies. We might need
// express.urlencoded({ extended: true }) if we send regular form data without files)
// For file uploads, multer handles the body parsing.

// API Routes
app.get('/', (req, res) => {
  res.send('FindIt Backend API is running!');
}); 
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes); // Use item routes
app.use('/api/notifications', notificationRoutes); // Use notification routes
app.use('/api/claims', claimRoutes); // Use claim routes


// Error Handling Middleware (MUST BE AFTER ROUTES)
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access it at: http://localhost:${PORT}`);
});