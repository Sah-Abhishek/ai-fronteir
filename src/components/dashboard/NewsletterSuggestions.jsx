import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsletterSuggestions = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchSuggestedNewsletters = async () => {
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/newsletter/suggestions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setNewsletters(res.data.newsletters || []);
        } else {
          setError("Unexpected response format from server");
        }
      } catch (err) {
        console.error("Error fetching suggested newsletters:", err);
        setError(
          err.response?.data?.message ||
          "Failed to load suggested newsletters."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedNewsletters();
  }, [token, apiUrl]);

  const handleRead = (id) => {
    navigate(`/newsletter/${id}`);
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Suggested Newsletters
      </h2>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading suggestions...
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-6">{error}</div>
      ) : newsletters.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          No suggested newsletters found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 text-left border-b">Heading</th>
                <th className="px-4 py-3 text-left border-b">Topics</th>
                <th className="px-4 py-3 text-left border-b">Created At</th>
                <th className="px-4 py-3 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {newsletters.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-150 border-b"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {item.heading
                      ? item.heading.length > 50
                        ? item.heading.slice(0, 50) + "..."
                        : item.heading
                      : "Untitled Newsletter"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {item.topics.map(t => (
                      <span key={t} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md mr-1">
                        {t}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(item.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleRead(item._id)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
                    >
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterSuggestions;
