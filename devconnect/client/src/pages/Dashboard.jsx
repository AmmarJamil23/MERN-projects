import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    livelink: "",   // renamed
  });

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/projects/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/projects",
        {
          ...form,
          techStack: form.techStack.split(",").map((t) => t.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        livelink: "",
      });

      fetchProjects();
      alert("Project added!");
    } catch (err) {
      console.log(err);
      alert("Failed to add project");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">My Projects</h1>

      <form className="space-y-3 border p-4 rounded" onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="techStack"
          placeholder="Tech stack (comma-separated e.g. React, Node)"
          value={form.techStack}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="githubLink"
          placeholder="GitHub Link"
          value={form.githubLink}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full rounded focus:outline-blue-500"
          name="livelink"
          placeholder="Live Link"
          value={form.livelink}
          onChange={handleChange}
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition">
          Add Project
        </button>
      </form>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p>{p.description}</p>
              <p className="text-sm text-gray-600">
                {p.techStack?.join(", ")}
              </p>
              <div className="text-sm">
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    GitHub
                  </a>
                )}
                {" | "}
                {p.livelink && (
                  <a
                    href={p.livelink}
                    className="text-green-500 underline"
                    target="_blank"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
