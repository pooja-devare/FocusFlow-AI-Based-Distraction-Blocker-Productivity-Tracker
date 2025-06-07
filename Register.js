import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data.message || 'Error occurred');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /><br />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login Here</Link></p>
    </div>
  );
};

export default Register;