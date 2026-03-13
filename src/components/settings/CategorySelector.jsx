import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cpu, Briefcase, FlaskConical, Heart, Film, Trophy, Landmark, Leaf, GraduationCap, Palette } from "lucide-react";
import { useUserStore } from "../../store/UserStore";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const categories = [
  { value: "Technology", label: "Technology", icon: Cpu, description: "Latest in tech, gadgets, software, and innovation." },
  { value: "Business", label: "Business & Finance", icon: Briefcase, description: "Markets, startups, economy, and industry trends." },
  { value: "Science", label: "Science", icon: FlaskConical, description: "Discoveries, research, space, and breakthroughs." },
  { value: "Health", label: "Health & Wellness", icon: Heart, description: "Medicine, fitness, mental health, and nutrition." },
  { value: "Entertainment", label: "Entertainment", icon: Film, description: "Movies, music, gaming, and pop culture." },
  { value: "Sports", label: "Sports", icon: Trophy, description: "Scores, highlights, and stories from the sports world." },
  { value: "Politics", label: "Politics", icon: Landmark, description: "Government, policy, elections, and world affairs." },
  { value: "Environment", label: "Environment", icon: Leaf, description: "Climate, sustainability, and environmental news." },
  { value: "Education", label: "Education", icon: GraduationCap, description: "Learning, skills, courses, and academic trends." },
  { value: "Culture", label: "Arts & Culture", icon: Palette, description: "Art, literature, history, and cultural stories." },
];

const CategorySelector = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const auth_token = localStorage.getItem("auth_token");
  const { user, setUser, token } = useUserStore();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(`${apiUrl}/settings/topics`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });

        if (res.data.success && res.data.data?.subscribedTopics) {
          setSelectedTopics(res.data.data.subscribedTopics);
        }
      } catch (err) {
        console.error("Failed to fetch topics:", err);
        setErrorMessage("Could not load your topic preferences. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleToggle = (value) => {
    setSelectedTopics((prev) =>
      prev.includes(value)
        ? prev.filter((t) => t !== value)
        : [...prev, value]
    );
  };

  const handleSave = async () => {
    if (selectedTopics.length === 0) {
      setErrorMessage("Please select at least one topic.");
      return;
    }

    try {
      setSaving(true);
      setErrorMessage(null);

      const res = await axios.post(
        `${apiUrl}/settings/settopics`,
        { topics: selectedTopics },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );

      if (res.data.success) {
        setSuccessMessage("Your topic preferences have been updated!");
        if (user) {
          setUser({ ...user, subscribedTopics: selectedTopics }, token);
        }
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update topics:", err);
      setErrorMessage("Something went wrong while saving your preferences.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500">
        Loading your topic preferences...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 sm:p-10 w-full font-inter">
      <div className="bg-white shadow-xl border border-gray-100 rounded-xl max-w-4xl divide-y divide-gray-200">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Topic Preferences
          </h1>
          <p className="text-gray-500 text-base">
            Choose the AI topics you're interested in. Your newsletter content will be personalized based on your selections.
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
            Select Your Topics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const isSelected = selectedTopics.includes(cat.value);
              return (
                <div
                  key={cat.value}
                  onClick={() => handleToggle(cat.value)}
                  className={`p-5 border-2 rounded-lg cursor-pointer flex flex-col items-center text-center transition duration-300
                    ${isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md"
                      : "border-gray-300 bg-white text-gray-600 hover:border-indigo-400"
                    }`}
                >
                  <cat.icon
                    className={`w-8 h-8 mb-2 transition-colors duration-200 ${
                      isSelected ? "text-indigo-600" : "text-gray-400"
                    }`}
                  />
                  <h3
                    className="font-bold text-base mt-1"
                    style={{
                      color: isSelected ? "#4F46E5" : "#1F2937",
                    }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-xs mt-1 text-gray-500">{cat.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
            Currently selected:{" "}
            {selectedTopics.length > 0 ? (
              <span className="font-semibold text-gray-700">
                {selectedTopics
                  .map((t) => categories.find((c) => c.value === t)?.label || t)
                  .join(", ")}
              </span>
            ) : (
              <span className="text-red-500 font-medium">None selected</span>
            )}
          </div>
        </div>

        <div className="px-6 py-4 sm:px-8 bg-gray-50 flex justify-end rounded-b-xl">
          <button
            onClick={handleSave}
            disabled={saving || selectedTopics.length === 0}
            className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
