import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ description: '', amount: '', category: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/expenses')
            .then(response => setExpenses(response.data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/expenses', form)
            .then(response => setExpenses([...expenses, response.data]));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/expenses/${id}`)
            .then(() => setExpenses(expenses.filter(expense => expense._id !== id)));
    };

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="description" placeholder="Description" onChange={handleChange} />
                <input type="number" name="amount" placeholder="Amount" onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" onChange={handleChange} />
                <button type="submit">Add Expense</button>
            </form>
            <ul>
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.description} - ${expense.amount} - {expense.category}
                        <button style={{backgroundColor:'rgba(23,234,123,0.4)'}}onClick={() => handleDelete(expense._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
