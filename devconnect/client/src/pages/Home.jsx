import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token } = useAuth();

  return (
    <div className="text-center mt-20 space-y-6">
      <h1 className="text-4xl font-bold">DevConnect</h1>
      <p className="text-gray-600 text-lg max-w-xl mx-auto">
        A platform where developers showcase their projects, discover others, and grow together.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        <Link
          to="/explore"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Explore Projects
        </Link>

        {token ? (
          <Link
            to="/dashboard"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}
