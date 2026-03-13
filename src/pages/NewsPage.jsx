import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ExternalLink, Clock, Newspaper, Globe } from "lucide-react";
import GlobalPerspectives from "../components/news/GlobalPerspectives";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeTab, setActiveTab] = useState("feed");

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const auth_token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/news`, {
          headers: { Authorization: `Bearer ${auth_token}` },
        });
        setArticles(data.articles || []);
        setTopics(data.topics || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const filtered =
    activeTopic === "all"
      ? articles
      : articles.filter(
          (a) =>
            a.title?.toLowerCase().includes(activeTopic.toLowerCase()) ||
            a.description?.toLowerCase().includes(activeTopic.toLowerCase())
        );

  const tabs = [
    { id: "feed", label: "News Feed", icon: Newspaper },
    { id: "perspectives", label: "Global Perspectives", icon: Globe },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
          <p className="text-gray-500">Fetching latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">News</h1>
          <p className="text-gray-500">Stay informed with your personalized feed and global coverage analysis</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "perspectives" ? (
          <GlobalPerspectives />
        ) : (
          <>
            {/* Topic filters */}
            {topics.length > 0 && (
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setActiveTopic("all")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeTopic === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  All
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setActiveTopic(topic)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                      activeTopic === topic
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">No articles found</p>
              </div>
            ) : (
              <>
                {/* Featured article */}
                <a
                  href={filtered[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-6 group"
                >
                  <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/2 h-56 md:h-72 overflow-hidden">
                        <img
                          src={filtered[0].image}
                          alt={filtered[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      </div>
                      <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                            Featured
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(filtered[0].publishedAt)}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">
                          {filtered[0].title}
                        </h2>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                          {filtered[0].description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-400">{filtered[0].source}</span>
                          <span className="text-indigo-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Articles grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.slice(1).map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { e.target.src = "https://placehold.co/600x300/f3f4f6/9ca3af?text=No+Image"; }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-indigo-600">{article.source}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {timeAgo(article.publishedAt)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
