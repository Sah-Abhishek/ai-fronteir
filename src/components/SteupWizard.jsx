import React, { useState, cloneElement } from "react";
import { X } from "lucide-react";

const SetupWizard = ({ children, isOpen, onClose, onComplete }) => {
  const steps = React.Children.toArray(children);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const nextStep = (dataFromStep) => {
    // Merge step data into overall formData
    const updatedFormData = {
      ...formData,
      ...dataFromStep,
    };

    if (currentStep < steps.length - 1) {
      // Not the last step - just update formData and move to next step
      setFormData(updatedFormData);
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - complete with the updated data
      setFormData(updatedFormData);
      handleComplete(updatedFormData); // Pass the updated data directly
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleComplete = async (finalData) => {
    try {
      setLoading(true);

      // Call the parent's onComplete with the final data
      await onComplete?.(finalData);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Step tracker */}
        <div className="flex items-center mb-6">
          {steps.map((_, index) => (
            <div key={index} className="flex-1">
              <div
                className={`h-2 rounded-full transition-colors ${index <= currentStep ? "bg-sky-600" : "bg-gray-300"
                  }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-[150px]">
          {cloneElement(steps[currentStep], {
            nextStep,
            prevStep,
            currentStep,
            formData,
            setFormData,
            loading,
          })}
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
