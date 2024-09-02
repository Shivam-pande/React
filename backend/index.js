const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/expense-tracker');

const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

app.get('/expenses', async (req, res) => {
    const expenses = await Expense.find();
    res.json(expenses);
});

app.post('/expenses', async (req, res) => {
    const expense = new Expense(req.body);
    await expense.save();
    res.json(expense);
});

app.put('/expenses/:id', async (req, res) => {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expense);
});

app.delete('/expenses/:id', async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
