import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects/my");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p._id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p>{p.description}</p>
              <p className="text-sm text-gray-600">{p.techStack?.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
