import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/projeto';
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (_req, res) => res.send({ status: 'ok' }));
