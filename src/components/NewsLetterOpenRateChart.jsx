import React, { useState, useEffect } from 'react';
import { Mail, MailOpen } from 'lucide-react';

export default function NewsletterOpenHeatmap() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredNewsletter, setHoveredNewsletter] = useState(null);
  const auth_token = localStorage.getItem('auth_token')
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/analytics/opened`, {
        headers: {
          "Authorization": `Bearer ${auth_token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        // Sort by date, oldest first
        const sorted = [...data.newsletters].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setNewsletters(sorted);
      } else {
        setError('Failed to load newsletter data');
      }
    } catch (err) {
      setError('Error fetching newsletter data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: newsletters.length,
    opened: newsletters.filter(n => n.opened).length,
    unopened: newsletters.filter(n => !n.opened).length,
    openRate: newsletters.length > 0
      ? ((newsletters.filter(n => n.opened).length / newsletters.length) * 100).toFixed(1)
      : 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading newsletter data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800 font-medium">⚠️ {error}</p>
          <button
            onClick={fetchNewsletters}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Analytics</h1>
          <p className="text-gray-600">Track your newsletter open rates at a glance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Mail className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Opened</p>
                <p className="text-2xl font-bold text-blue-600">{stats.opened}</p>
              </div>
              <MailOpen className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unopened</p>
                <p className="text-2xl font-bold text-gray-400">{stats.unopened}</p>
              </div>
              <Mail className="w-8 h-8 text-gray-300" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Open Rate</p>
                <p className="text-2xl font-bold text-green-600">{stats.openRate}%</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Newsletter Activity</h2>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                <span className="text-gray-600">Opened</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-gray-100 border border-gray-200"></div>
                <span className="text-gray-600">Not Opened</span>
              </div>
            </div>
          </div>

          {newsletters.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No newsletters sent yet</p>
            </div>
          ) : (
            <div className="relative">
              <div className="flex flex-wrap gap-2">
                {newsletters.map((newsletter) => (
                  <div
                    key={newsletter._id}
                    className="relative group"
                    onMouseEnter={() => setHoveredNewsletter(newsletter)}
                    onMouseLeave={() => setHoveredNewsletter(null)}
                  >
                    <div
                      className={`w-6 h-6 rounded-sm transition-all duration-200 cursor-pointer ${newsletter.opened
                        ? 'bg-blue-500 hover:bg-blue-600 hover:scale-110'
                        : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:scale-110'
                        }`}
                    />
                  </div>
                ))}
              </div>

              {/* Tooltip */}
              {hoveredNewsletter && (
                <div className="absolute z-10 bg-gray-900 text-white rounded-lg shadow-lg p-4 mt-2 min-w-64">
                  <div className="flex items-center gap-2 mb-2">
                    {hoveredNewsletter.opened ? (
                      <MailOpen className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="font-semibold">
                      {hoveredNewsletter.opened ? 'Opened' : 'Not Opened'}
                    </span>
                  </div>

                  <div className="text-sm text-gray-300 space-y-1">
                    <p><strong>Sent:</strong> {formatDate(hoveredNewsletter.createdAt)}</p>
                    <p><strong>Topics:</strong></p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {hoveredNewsletter.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-700 rounded text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-full left-4 w-2 h-2 bg-gray-900 transform rotate-45 translate-y-1"></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Newsletters</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {newsletters.slice(-5).reverse().map((newsletter) => (
              <div key={newsletter._id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {newsletter.opened ? (
                      <MailOpen className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Mail className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {newsletter.topics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(newsletter.createdAt)}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${newsletter.opened
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                    }`}>
                    {newsletter.opened ? 'Opened' : 'Not Opened'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
