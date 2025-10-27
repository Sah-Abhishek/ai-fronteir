
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const auth_token = localStorage.getItem("auth_token")
  const navigate = useNavigate();

  // Fetch quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/quiz`, {
          headers: {
            "Authorization": `Bearer ${auth_token}`
          }
        }, { withCredentials: true });
        setQuizzes(data.quizzes || []);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Your Quizzes
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No quizzes available yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="py-4 px-6 font-medium">#</th>
                  <th className="py-4 px-6 font-medium">Topics</th>
                  <th className="py-4 px-6 font-medium">Solved</th>
                  <th className="py-4 px-6 font-medium">Marks Obtained</th>
                  <th className="py-4 px-6 font-medium">Generated At</th>
                  <th className="py-4 px-6 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm">
                {quizzes.map((quiz, index) => (
                  <tr
                    key={quiz._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 font-semibold text-gray-600">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {quiz.newsletterId?.topics?.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {quiz.solved ? (
                        <span className="inline-flex items-center text-green-600 font-medium">
                          <CheckCircle className="w-4 h-4 mr-1" /> Solved
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-gray-500 font-medium">
                          <XCircle className="w-4 h-4 mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">{quiz.marksObtained}</td>
                    <td className="py-4 px-6">
                      {new Date(quiz.generatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => navigate(`${quiz._id}`)}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition bg-blue-600 text-white hover:bg-blue-700"
                      >
                        {quiz.solved ? "Reattempt" : "Attempt"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div >
  );
};

export default QuizzesPage;
