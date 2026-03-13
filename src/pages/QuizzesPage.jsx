import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, Clock, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const auth_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/quiz`, {
          headers: { Authorization: `Bearer ${auth_token}` },
        });
        setQuizzes(data.quizzes || []);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const totalSolved = quizzes.filter((q) => q.solved).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Quizzes</h1>
          <p className="text-gray-500">Test your knowledge from your newsletters</p>
        </div>

        {/* Stats */}
        {!loading && quizzes.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
                  <p className="text-xs text-gray-500">Total Quizzes</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalSolved}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{quizzes.length - totalSolved}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-indigo-500" />
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-600 text-lg font-medium">No quizzes available yet</p>
            <p className="text-gray-400 text-sm mt-1">Quizzes are generated after each newsletter</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {quizzes.map((quiz, index) => {
              const topics = quiz.newsletterId?.topics || [];
              const isSolved = quiz.solved;

              return (
                <div
                  key={quiz._id}
                  onClick={() => navigate(`${quiz._id}`)}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center p-5 gap-4">
                    {/* Number badge */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                      isSolved
                        ? "bg-green-100 text-green-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}>
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        {isSolved ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            <CheckCircle className="w-3 h-3" /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            <Clock className="w-3 h-3" /> Pending
                          </span>
                        )}
                        {isSolved && (
                          <span className="text-xs text-gray-500 font-medium">
                            Score: {quiz.marksObtained}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {topics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-gray-400 mt-1.5">
                        {new Date(quiz.generatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0">
                      <div className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 group-hover:gap-2.5 ${
                        isSolved
                          ? "bg-gray-100 text-gray-700 group-hover:bg-gray-200"
                          : "bg-indigo-600 text-white group-hover:bg-indigo-700"
                      }`}>
                        {isSolved ? "Reattempt" : "Start Quiz"}
                        <ArrowRight className="w-4 h-4 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
