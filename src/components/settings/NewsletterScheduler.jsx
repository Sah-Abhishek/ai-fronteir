import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL; // adjust for your backend

const NewsletterScheduler = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const auth_token = localStorage.getItem("auth_token")

  const schedules = [
    { id: "daily", name: "Daily", detail: "Get the latest news every morning." },
    { id: "weekly", name: "Weekly", detail: "A comprehensive summary every Monday." },
    { id: "biweekly", name: "Biweekly", detail: "Less frequent, deep-dive content (every other week)." },
  ];

  // ✅ Fetch user's current schedule from backend
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`${apiUrl}/settings/newsletterschedule`, {
          headers: {
            "Authorization": `Bearer ${auth_token}`
          }
        }, {
          withCredentials: true, // include cookies / auth token
        });

        if (res.data.success && res.data.data?.frequency) {
          setSchedule(res.data.data.frequency);
        } else {
          setSchedule("weekly"); // default fallback
        }
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setErrorMessage("Could not load your preferences. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // ✅ Save new schedule to backend
  const handleSave = async () => {
    try {
      setSaving(true);
      setErrorMessage(null);

      await axios.post(
        `${apiUrl}/settings/setnewsletterschedule`,
        { frequency: schedule },
        {
          headers: {
            "Authorization": `Bearer ${auth_token}`
          }

        },
        { withCredentials: true }
      );

      setSuccessMessage(`Success! Your newsletter is now set to ${schedule}.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Failed to update schedule:", err);
      setErrorMessage("Something went wrong while saving your preferences.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Loading state (initial fetch)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        Loading your newsletter preferences...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 sm:p-10 w-full font-inter">
      <div className="bg-white shadow-xl border border-gray-100 rounded-xl max-w-4xl divide-y divide-gray-200">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Newsletter Preferences
          </h1>
          <p className="text-gray-500 text-base">
            Schedule your newsletter delivery frequency. You can change this anytime.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-lg">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg">
              {errorMessage}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Delivery Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schedules.map((item) => (
              <div
                key={item.id}
                onClick={() => setSchedule(item.id)}
                className={`p-5 border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center text-center transition duration-300
                  ${schedule === item.id
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md"
                    : "border-gray-300 bg-white text-gray-600 hover:border-indigo-400"
                  }`}
              >
                <span
                  className={
                    schedule === item.id ? "text-indigo-600" : "text-gray-400"
                  }
                >
                  {getIcon(item.id)}
                </span>
                <h3
                  className="font-bold text-lg mt-1"
                  style={{
                    color: schedule === item.id ? "#4F46E5" : "#1F2937",
                  }}
                >
                  {item.name}
                </h3>
                <p className="text-xs mt-1 text-gray-500">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
            Your current selection is set to:{" "}
            <span className="font-semibold text-gray-700 uppercase">
              {schedule}
            </span>
            .
          </div>
        </div>

        <div className="px-6 py-4 sm:px-8 bg-gray-50 flex justify-end rounded-b-xl">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// helper icon renderer
const getIcon = (type) => {
  switch (type) {
    case "daily":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M20 12h2M2 12h2M17.66 6.34l-1.41 1.41M6.34 17.66l-1.41 1.41M17.66 17.66l-1.41-1.41M6.34 6.34l-1.41-1.41"></path>
        </svg>
      );
    case "weekly":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      );
    case "biweekly":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <line x1="10" y1="14" x2="10" y2="18"></line>
        </svg>
      );
    default:
      return null;
  }
};

export default NewsletterScheduler;
