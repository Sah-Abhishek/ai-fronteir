import React from "react";
// Import necessary icons from lucide-react
import { Briefcase, GraduationCap, Code, Globe } from 'lucide-react';

// The options array defines the content and icons for each choice
const options = [
  { value: "Student", label: "Student", icon: GraduationCap, description: "Learning and exploring AI concepts." },
  { value: "Professional", label: "Professional", icon: Briefcase, description: "Applying AI in a current career role." },
  { value: "Hobbyist", label: "Hobbyist", icon: Code, description: "Building small projects or learning for fun." },
  { value: "Researcher", label: "Researcher", icon: Globe, description: "Developing new models and theories." }
];

/**
 * Step 1: User Role/Interest Selection (Self-Contained State)
 * * NOTE: This component manages its own state and passes the collected data 
 * back to the parent via the 'nextStep' function when the user continues.
 * * @param {object} props - Component props
 * @param {function} props.nextStep - Function to advance to the next step, 
 * expected to accept the selected role string.
 */
const Step1 = ({ nextStep }) => {
  const [selectedRole, setSelectedRole] = React.useState(null);

  // Function to handle radio button selection
  const handleSelect = (value) => {
    setSelectedRole(value);
  };



  // Helper to determine if an option is currently selected
  const isSelected = (value) => selectedRole === value;

  // Ensure we have a role selected before enabling the continue button
  const isFormValid = !!selectedRole;

  // Function to pass data back and navigate
  const handleContinue = () => {
    if (isFormValid && nextStep) {
      nextStep({ userType: selectedRole }); // ✅ send an object, not a string
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-8 tracking-tight">
        What best describes your interest in AI?
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
              name="role"
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
        Continue to Topics
      </button>
    </div>
  );
};

export default Step1;
