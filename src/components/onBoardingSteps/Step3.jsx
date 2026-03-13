import React, { useState } from "react";
import { Cpu, Briefcase, FlaskConical, Heart, Film, Trophy, Landmark, Leaf, GraduationCap, Palette } from "lucide-react";

const options = [
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

const Step3 = ({ nextStep }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleSelect = (value) => {
    setSelectedTopics((prevTopics) =>
      prevTopics.includes(value)
        ? prevTopics.filter((topic) => topic !== value)
        : [...prevTopics, value]
    );
  };

  const isSelected = (value) => selectedTopics.includes(value);
  const isFormValid = selectedTopics.length > 0;

  const handleContinue = () => {
    if (isFormValid) {
      nextStep({ topics: selectedTopics }); // ✅ Sends the latest data immediately
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-8 tracking-tight">
        What topics are you most interested in?
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        Select all that apply to personalize your newsletter content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              p-4 border-2 rounded-xl cursor-pointer transition-all duration-200
              flex items-start h-full group
              ${isSelected(option.value)
                ? "border-sky-600 bg-sky-50 shadow-lg ring-4 ring-sky-100"
                : "border-gray-200 hover:border-sky-300 hover:bg-gray-50"
              }
            `}
          >
            <input
              type="checkbox"
              name="topics"
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => handleSelect(option.value)}
              className="hidden"
            />

            <option.icon
              className={`w-5 h-5 mt-1 mr-3 flex-shrink-0 transition-colors duration-200 
                ${isSelected(option.value)
                  ? "text-sky-600"
                  : "text-gray-500 group-hover:text-sky-500"
                }`}
              aria-hidden="true"
            />

            <div>
              <span
                className={`font-semibold leading-snug ${isSelected(option.value) ? "text-sky-800" : "text-gray-700"
                  }`}
              >
                {option.label}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={!isFormValid}
        className={`mt-10 w-full max-w-xl px-6 py-3 font-semibold text-white rounded-xl transition-all duration-300
          ${isFormValid
            ? "bg-sky-600 hover:bg-sky-700 shadow-md transform hover:scale-[1.01]"
            : "bg-gray-400 cursor-not-allowed shadow-inner"
          }
        `}
      >
        Complete Setup
      </button>

      {selectedTopics.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Selected: {selectedTopics.join(", ")}
        </div>
      )}
    </div>
  );
};

export default Step3;
