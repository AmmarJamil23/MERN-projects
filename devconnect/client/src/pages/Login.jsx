import React from 'react'
import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate();
   const [form, setForm] = useState({email: "", password: ""});

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value});
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");


    } catch (err) {
      alert(err.response?.data?.message || "Login failed");

    }
   }

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Login</h1>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <input
          className="border p-2"
          name="email"
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

        <button className='bg-green-500 text-white p-2'>Login</button>
      </form>
    </div>
  )
}

export default Login