import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        
        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
