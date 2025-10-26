
import React from "react";
// Import necessary icons from lucide-react
import { Search, Youtube, Users, Compass } from 'lucide-react';

// The options array defines the content and icons for each choice
const options = [
  { value: "SearchEngine", label: "Search Engine (Google/Bing)", icon: Search, description: "Found us through a specific search term." },
  { value: "SocialMedia", label: "Social Media (X/LinkedIn)", icon: Users, description: "Saw a post or an ad on a platform." },
  { value: "YouTube", label: "YouTube/Podcast", icon: Youtube, description: "Heard about us from a creator or show." },
  { value: "Recommendation", label: "Friend/Colleague", icon: Compass, description: "Direct recommendation from someone you know." }
];

/**
 * Step 2: Acquisition Source Selection (Self-Contained State)
 * * NOTE: This component manages its own state and passes the collected data 
 * back to the parent via the 'nextStep' function when the user continues.
 * * @param {object} props - Component props
 * @param {function} props.nextStep - Function to advance to the next step, 
 * expected to accept the selected source string.
 */
const Step2 = ({ nextStep }) => {
  const [selectedSource, setSelectedSource] = React.useState(null);

  // Function to handle radio button selection
  const handleSelect = (value) => {
    setSelectedSource(value);
  };

  // Helper to determine if an option is currently selected
  const isSelected = (value) => selectedSource === value;

  // Check if a source has been selected to enable the continue button
  const isFormValid = !!selectedSource;

  // Function to pass data back and navigate
  const handleContinue = () => {
    if (isFormValid && nextStep) {
      nextStep({ source: selectedSource });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-8 tracking-tight">
        How did you hear about the AI Frontier?
      </h2>

      {/* 2x2 Grid Layout for Options */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              p-5 border-2 rounded-xl cursor-pointer transition-all duration-200
              flex flex-col items-center text-center h-full group
              ${isSelected(option.value)
                ? 'border-sky-600 bg-sky-50 shadow-lg ring-4 ring-sky-100'
                : 'border-gray-200 hover:border-sky-300 hover:bg-gray-50'
              }
            `}
          >
            {/* Hidden native radio input */}
            <input
              type="radio"
              name="source"
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => handleSelect(option.value)}
              // This input must be hidden so the styled label acts as the interface
              className="hidden"
            />

            {/* Icon and Text Content */}
            <option.icon
              className={`w-8 h-8 mb-2 transition-colors duration-200 
                ${isSelected(option.value) ? 'text-sky-600' : 'text-gray-500 group-hover:text-sky-500'}
              `}
              aria-hidden="true"
            />
            <span className={`font-semibold text-lg leading-tight ${isSelected(option.value) ? 'text-sky-800' : 'text-gray-700'}`}>
              {option.label}
            </span>
            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
          </label>
        ))}
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isFormValid}
        className={`mt-10 w-full max-w-lg px-6 py-3 font-semibold text-white rounded-xl transition-all duration-300
          ${isFormValid
            ? 'bg-sky-600 hover:bg-sky-700 shadow-md transform hover:scale-[1.01]'
            : 'bg-gray-400 cursor-not-allowed shadow-inner'
          }
        `}
      >
        Continue to Final Step
      </button>
    </div>
  );
};

export default Step2;
