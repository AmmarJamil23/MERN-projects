import { useEffect, useState } from "react";
import api from "../api";

export default function Explore() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div
              key={p._id}
              className="p-4 border rounded shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p>{p.description}</p>
              <p className="text-sm text-gray-600 mb-1">
                {p.techStack?.join(", ")}
              </p>
              <p className="text-sm">
                <strong>By:</strong> {p.user?.name} ({p.user?.email})
              </p>
              <div className="text-sm mt-2">
                {p.githubLink && (
                  <a
                    href={p.githubLink}
                    className="text-blue-500 underline"
                    target="_blank"
                  >
                    GitGitHub
                  </a>
                )}
                {" | "}
                {p.liveLink && (
                  <a
                    href={p.liveLink}
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
