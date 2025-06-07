import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [focusedMinutes, setFocusedMinutes] = useState('');
  const [distractionsBlocked, setDistractionsBlocked] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:5000/api/productivity', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRecords(res.data))
      .catch(err => setError('Failed to fetch records'));
  }, [token]);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/productivity/add',
      { focusedMinutes: Number(focusedMinutes), distractionsBlocked: Number(distractionsBlocked) },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => {
        setRecords([res.data, ...records]);
        setFocusedMinutes('');
        setDistractionsBlocked('');
      })
      .catch(err => setError('Failed to add record'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <h2>FocusFlow Dashboard</h2>
      <button onClick={logout}>Logout</button>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={submitHandler}>
        <input
          type="number"
          placeholder="Focused Minutes"
          value={focusedMinutes}
          onChange={e => setFocusedMinutes(e.target.value)}
          required
          min={0}
        />
        <input
          type="number"
          placeholder="Distractions Blocked"
          value={distractionsBlocked}
          onChange={e => setDistractionsBlocked(e.target.value)}
          required
          min={0}
        />
        <button type="submit">Add Record</button>
      </form>

      <h3>Productivity Records</h3>
      <ul>
        {records.map(record => (
          <li key={record._id}>
            Date: {new Date(record.date).toLocaleDateString()} - Focused: {record.focusedMinutes} mins, Distractions Blocked: {record.distractionsBlocked}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;