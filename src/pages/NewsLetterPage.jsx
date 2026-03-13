
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = `${backendUrl}/newsletter`; // your backend endpoint

  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("auth_token");
        const res = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNewsletters(res.data.newsletters || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch newsletters");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Newsletters
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Heading
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Topics
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Sent At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Loading newsletters...
                </td>
              </tr>
            ) : newsletters.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No newsletters found.
                </td>
              </tr>
            ) : (
              newsletters.map((newsletter, idx) => (
                <tr
                  key={newsletter._id}
                  onClick={() => navigate(`/newsletter/${newsletter._id}`)}
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {newsletter.heading.length > 50 ? newsletter.heading.slice(0, 50) + "..." : newsletter.heading}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {newsletter.topics.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium ${newsletter.status === "sent"
                        ? "bg-green-500"
                        : "bg-gray-400"
                        }`}
                    >
                      {newsletter.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(newsletter.sentAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
