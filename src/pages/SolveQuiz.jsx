import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OPTION_COLORS = [
  { bg: "bg-red-500", hover: "hover:bg-red-600", selected: "ring-red-300", icon: "▲" },
  { bg: "bg-blue-500", hover: "hover:bg-blue-600", selected: "ring-blue-300", icon: "◆" },
  { bg: "bg-yellow-500", hover: "hover:bg-yellow-600", selected: "ring-yellow-300", icon: "●" },
  { bg: "bg-green-500", hover: "hover:bg-green-600", selected: "ring-green-300", icon: "■" },
];

const SolveQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedAnim, setSelectedAnim] = useState(null);
  const [newsletterId, setNewsletterId] = useState(null);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const auth_token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${apiUrl}/quiz/${id}`, {
          headers: { Authorization: `Bearer ${auth_token}` },
        });
        setQuiz(res.data.quiz);
        setNewsletterId(res.data.quiz.newsletterId);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const questions = quiz?.questions || [];
  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const handleSelect = useCallback((questionId, optionIndex) => {
    if (selectedAnim !== null) return;
    setSelectedAnim(optionIndex);
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));

    setTimeout(() => {
      setSelectedAnim(null);
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((i) => i + 1);
      }
    }, 600);
  }, [selectedAnim, currentIndex, totalQuestions]);

  const handleSubmit = async () => {
    if (!quiz || !questions.length) return;

    const unanswered = totalQuestions - answeredCount;
    if (unanswered > 0) {
      toast.error(`You have ${unanswered} unanswered question${unanswered > 1 ? "s" : ""}!`);
      return;
    }

    const payload = {
      quizId: quiz._id,
      responses: questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: answers[q._id] != null ? answers[q._id] + 1 : null,
      })),
    };

    try {
      setSubmitting(true);
      const res = await axios.post(`${apiUrl}/quiz/submit`, payload, {
        headers: { Authorization: `Bearer ${auth_token}` },
      });
      setResult(res.data);
      setShowResult(true);
      toast.success("Quiz submitted!");
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70 text-lg">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 flex items-center justify-center">
        <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-10">
          <p className="text-white text-xl font-semibold">Quiz not found</p>
          <button onClick={() => navigate("/quiz")} className="mt-4 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Result screen
  if (showResult && result) {
    const score = result.correctAnswers;
    const total = result.totalQuestions;
    const percentage = Math.round((score / total) * 100);
    const isGreat = percentage >= 80;
    const isOk = percentage >= 50;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-lg w-full text-center border border-white/20 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
          {/* Emoji */}
          <div className="text-7xl mb-4">
            {isGreat ? "🏆" : isOk ? "👏" : "💪"}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-2">
            {isGreat ? "Outstanding!" : isOk ? "Good Job!" : "Keep Learning!"}
          </h1>
          <p className="text-white/60 mb-8">Here's how you did</p>

          {/* Score circle */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={isGreat ? "#22c55e" : isOk ? "#eab308" : "#ef4444"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 3.27} 327`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{percentage}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-green-400">{score}</p>
              <p className="text-xs text-white/50 mt-1">Correct</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-red-400">{total - score}</p>
              <p className="text-xs text-white/50 mt-1">Wrong</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-2xl font-bold text-white">{total}</p>
              <p className="text-xs text-white/50 mt-1">Total</p>
            </div>
          </div>

          {/* Review section */}
          <div className="text-left bg-white/5 rounded-xl p-4 mb-8 max-h-80 overflow-y-auto">
            <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-3">Review Answers</h3>
            {result.results?.map((r, i) => {
              const q = questions[i];
              return (
                <div key={i} className={`py-3 ${i > 0 ? "border-t border-white/10" : ""}`}>
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${r.correct ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {r.correct ? "✓" : "✗"}
                    </span>
                    <div className="text-sm flex-1">
                      <p className="text-white/80">{q?.question}</p>
                      {!r.correct && (
                        <>
                          <p className="text-green-400/80 text-xs mt-1">
                            Correct: {q?.option[parseInt(r.correctAnswer) - 1] || `Option ${r.correctAnswer}`}
                          </p>
                          {r.explanation && (
                            <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                              <p className="text-amber-300/90 text-xs leading-relaxed">
                                <span className="font-semibold">Explanation:</span> {r.explanation}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/quiz")}
              className="flex-1 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition"
            >
              All Quizzes
            </button>
            <button
              onClick={handleRead}
              className="flex-1 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition"
            >
              Read Newsletter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-950 flex flex-col">
      {/* Top bar */}
      <div className="px-4 md:px-8 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate("/quiz")}
            className="text-white/60 hover:text-white transition text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Exit
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-sm font-medium">
              {answeredCount}/{totalQuestions} answered
            </span>
            <button
              onClick={handleRead}
              className="px-3 py-1.5 bg-white/10 text-white/80 text-xs rounded-lg hover:bg-white/20 transition font-medium"
            >
              Read Article
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question navigation dots */}
      <div className="px-4 md:px-8 py-3 flex justify-center gap-1.5 flex-wrap">
        {questions.map((q, i) => (
          <button
            key={q._id}
            onClick={() => { setSelectedAnim(null); setCurrentIndex(i); }}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
              i === currentIndex
                ? "bg-white text-purple-900 scale-110 shadow-lg"
                : answers[q._id] != null
                ? "bg-green-500/80 text-white"
                : "bg-white/15 text-white/60 hover:bg-white/25"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 pb-6">
        {/* Question counter */}
        <div className="mb-4">
          <span className="text-white/40 text-sm font-semibold uppercase tracking-widest">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Question text */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 md:px-10 py-6 md:py-8 mb-8 max-w-2xl w-full text-center border border-white/10 shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            {currentQ?.question}
          </h2>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
          {currentQ?.option.map((opt, i) => {
            const color = OPTION_COLORS[i % OPTION_COLORS.length];
            const isSelected = answers[currentQ._id] === i;
            const isAnimating = selectedAnim === i;

            return (
              <button
                key={i}
                onClick={() => handleSelect(currentQ._id, i)}
                disabled={selectedAnim !== null}
                className={`
                  relative ${color.bg} ${color.hover} text-white rounded-xl p-4 md:p-5
                  text-left font-semibold text-base md:text-lg
                  transition-all duration-200 transform
                  ${isAnimating ? "scale-95 ring-4 " + color.selected : "hover:scale-[1.02] active:scale-95"}
                  ${isSelected && !isAnimating ? "ring-2 ring-white/50 shadow-lg" : "shadow-md"}
                  ${selectedAnim !== null && selectedAnim !== i ? "opacity-50" : ""}
                  disabled:cursor-default
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl opacity-70 flex-shrink-0">{color.icon}</span>
                  <span className="leading-snug">{opt}</span>
                </div>
                {isSelected && !isAnimating && (
                  <div className="absolute top-2 right-3 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation & Submit */}
        <div className="flex items-center gap-3 mt-8">
          <button
            onClick={() => { setSelectedAnim(null); setCurrentIndex((i) => Math.max(0, i - 1)); }}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 bg-white/10 text-white/80 rounded-xl font-medium hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => { setSelectedAnim(null); setCurrentIndex((i) => i + 1); }}
              className="px-5 py-2.5 bg-white/10 text-white/80 rounded-xl font-medium hover:bg-white/20 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`px-8 py-2.5 rounded-xl font-bold text-white transition-all ${
                submitting
                  ? "bg-purple-400/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/25"
              }`}
            >
              {submitting ? "Submitting..." : `Submit Quiz (${answeredCount}/${totalQuestions})`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolveQuiz;
