import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Step1 from "../components/onBoardingSteps/Step1";
import Step2 from "../components/onBoardingSteps/Step2";
import Step3 from "../components/onBoardingSteps/Step3";
import SetupWizard from "../components/SteupWizard";
import { useUserStore } from "../store/UserStore";

export default function Dashboard() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardLoading, setWizardLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUserStore();

  // Show wizard only if user hasn't completed onboarding
  useEffect(() => {
    const onboarded = user?.onboardingCompleted;
    if (!onboarded) setIsWizardOpen(true);
  }, []);

  const handleComplete = async (payload) => {
    setWizardLoading(true);

    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        setIsWizardOpen(false);
        return;
      }

      const res = await axios.post(`${apiUrl}/onboard`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success("Onboarding completed successfully 🎉");
        localStorage.setItem("onboard_complete", "true");
        setIsWizardOpen(false);
      }
    } catch (error) {
      console.error("Error onboarding:", error);
      toast.error(
        error.response?.data?.message || "Error completing onboarding"
      );
    } finally {
      setWizardLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 px-6 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-gray-600">
          Here’s a snapshot of your account and subscriptions.
        </p>
      </header>

      {/* Subscribed Topics Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Your Subscribed Topics
        </h2>
        {user?.subscribedTopics?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {user.subscribedTopics.map((topic) => (
              <div
                key={topic}
                className="px-4 py-3 bg-blue-100 text-blue-800 rounded-lg font-medium text-center"
              >
                {topic}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You are not subscribed to any topics yet.</p>
        )}
      </section>

      {/* Onboarding Wizard */}
      <SetupWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onComplete={handleComplete}
        loading={wizardLoading}
      >
        <Step1 />
        <Step2 />
        <Step3 />
      </SetupWizard>
    </div>
  );
}
