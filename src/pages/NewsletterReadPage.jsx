
import React, { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const NewsletterReadPage = () => {
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth_token = localStorage.getItem('auth_token')

  // Replace this with the actual newsletterId or get it from route params
  const newsletterId = "69002f0770401647fc8e5924";

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await fetch(`${apiUrl}/newsletter/${newsletterId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth_token}`
          },
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to fetch newsletter");
        }

        setNewsletter(data.newsletter);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [newsletterId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading newsletter...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          {newsletter.heading}
        </h1>
        {/* <p className="text-gray-700 mb-4"> */}
        {/*   Recipient: <span className="font-medium">{newsletter.recipientEmail}</span> */}
        {/* </p> */}

        <div className="mb-4">
          <h2 className="font-semibold text-gray-800 mb-2">Topics:</h2>
          <div className="flex flex-wrap gap-2">
            {newsletter.topics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="prose max-w-full">
          {/* Render the HTML content safely */}
          <div dangerouslySetInnerHTML={{ __html: newsletter.htmlContent }} />
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Sent at: {new Date(newsletter.sentAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NewsletterReadPage;
