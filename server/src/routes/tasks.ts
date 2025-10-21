import { Router } from 'express';
import Task from '../models/Task';
import { Types } from 'mongoose';

const router = Router();

// GET /api/tasks?owner=<ownerId>  - list tasks (optionally filter by owner)
router.get('/', async (req, res) => {
    const ownerId = (req.query.owner as string) || undefined
    const filter: any = {}
    if (ownerId) filter.owner = ownerId
    const tasks = await Task.find(filter)
    res.json(tasks)
})

// POST /api/tasks { title, description, owner }
router.post('/', async (req, res) => {
    const { title, description, owner } = req.body
    if (!title) return res.status(400).json({ message: 'Missing title' })
    const task = await Task.create({ title, description, owner: new Types.ObjectId(owner) })
    res.json(task)
})

// PUT /api/tasks/:id  - update
router.put('/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true })
    if (!task) return res.status(404).json({ message: 'Not found' })
    res.json(task)
})

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) return res.status(404).json({ message: 'Not found' })
    res.json({ success: true })
})

export default router;
