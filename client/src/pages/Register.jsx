// client/src/pages/Register.jsx
import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', profile_pic: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    await register(data);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input name="email" type="email" onChange={handleChange} required />
      <input name="password" type="password" onChange={handleChange} required />
      <input name="phone" onChange={handleChange} placeholder="Phone" />
      <input name="profile_pic" type="file" onChange={handleChange} accept="image/*" />
      <button type="submit">Register</button>
    </form>
  );
}
