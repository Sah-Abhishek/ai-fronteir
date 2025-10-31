import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SolveQuiz = () => {
  const { id } = useParams(); // quiz id from URL
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [newsletterId, setNewsletterId] = useState(null);


  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const auth_token = localStorage.getItem("auth_token");

  // Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${apiUrl}/quiz/${id}`, {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
        setQuiz(res.data.quiz);
        setNewsletterId(res.data.quiz.newsletterId); // <--- updated
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  // Select option handler
  const handleSelect = (questionId, selectedOptionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptionIndex,
    }));
  };

  // Submit answers
  const handleSubmit = async () => {
    if (!quiz || !quiz.questions?.length) return;

    const payload = {
      quizId: quiz._id,
      responses: quiz.questions.map((q) => ({
        questionId: q._id,
        selectedAnswer:
          answers[q._id] != null ? answers[q._id] + 1 : null, // Safe null check
      })),
    };

    try {
      setSubmitting(true);
      await axios.post(`${apiUrl}/quiz/submit`, payload, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });

      toast.success("Quiz submitted successfully!");
      navigate("/quiz");
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      toast.error("Quiz submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRead = () => {
    if (!newsletterId) {
      toast.error("Newsletter not available yet");
      return;
    }
    navigate(`/newsletter/${newsletterId}`);
  };

  // Cancel
  const handleCancel = () => navigate("/quiz");

  if (loading)
    return <div className="p-10 text-gray-500">Loading quiz...</div>;

  if (!quiz)
    return <div className="p-10 text-red-500">Quiz not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex  items-center justify-between ">
        <h1 className="text-3xl font-bold m-6"> Quiz Attempt</h1>
        <div className="m-4">
          <button
            onClick={handleRead}
            className="px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
          >
            Read
          </button>
        </div>
      </div>


      {quiz.questions?.map((q) => (
        <div
          key={q._id}
          className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <h2 className="font-semibold mb-3 text-gray-800">
            {q.number}. {q.question}
          </h2>

          <ul className="space-y-2">
            {q.option.map((opt, i) => {
              const selected = answers[q._id] === i;
              return (
                <li
                  key={i}
                  onClick={() => handleSelect(q._id, i)}
                  className={`cursor-pointer border p-2 rounded-md transition-all ${selected
                    ? "border-blue-500 bg-blue-100 text-blue-900"
                    : "border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {opt}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleCancel}
          disabled={submitting}
          className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`px-5 py-2 rounded-lg text-white transition ${submitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SolveQuiz;
