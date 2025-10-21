import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = Router();

// Register: creates a user and returns the user object (no JWT)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email in use' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

// Login: verifies credentials and returns the user object (no JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email } });
});

export default router;
