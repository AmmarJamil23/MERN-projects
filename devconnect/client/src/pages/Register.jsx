import React from 'react'
import api from '../api';
import { useNavigate } from 'react-router-dom'
import { useState }  from 'react';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: ""});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.post("/auth/register", form);
        navigate("/login");
    } catch (err){
      alert(err.response?.data?.message || "Registration failed");

    }
  };

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Register</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

        <input className='border p-2' name="name" placeholder='Name' onChange= {handleChange} required   />

         <input
          className="border p-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

           <input
          className="border p-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className='bg-blue-500 text-white p-2 mt-2'>Register</button>

      </form>

      
    </div>
  )
}

export default Register