import { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setForm({
        ...res.data,
        skills: res.data.skills?.join(", ") || "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      await api.put("/auth/profile", payload);
      alert("Profile updated!");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">My Profile</h1>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        
        <textarea
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short bio"
        />

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
        />

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="github"
          value={form.github}
          onChange={handleChange}
          placeholder="GitHub URL"
        />

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition">
          Save Profile
        </button>
      </form>
    </div>
  );
}
