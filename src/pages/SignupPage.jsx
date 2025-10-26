import React, { useState } from 'react';
import { Mail, User, Lock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Use lucide-react for icons. Assuming lucide-react is available.

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    if (!apiUrl) {
      setMessage('Configuration Error: VITE_BACKEND_URL environment variable is not defined.');
      setLoading(false);
      return;
    }

    try {
      // Axios automatically throws for non-2xx statuses
      const response = await axios.post(`${apiUrl}/auth/signup`, formData);

      // Axios automatically parses JSON
      if (response.data?.success) {
        setMessage('Signup successful! Welcome aboard 🎉');
        setFormData({ name: '', email: '', password: '' });
        toast.success("Signup Successful")
        if (response.data.data.token) {
          localStorage.setItem("auth_token", response.data.data.token)
          navigate('/dashboard')
          return
        }
      } else {
        setMessage('Unexpected response from server. Please try again.');
      }

    } catch (error) {
      console.error('API Submission Error:', error);

      // Axios provides detailed error info under error.response
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'A network or server error occurred.';

      setMessage(`Signup failed: ${errorMsg}`);

      // For security, clear password on failure
      setFormData((prev) => ({ ...prev, password: '' }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 md:p-10 border border-gray-100 transition-all duration-300">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Join the <span className="text-sky-600">AI Frontier</span>
          </h1>
          <p className="mt-3 text-lg text-gray-500 font-medium">
            Unlock weekly insights into LLMs, Robotics, and Deep Learning.
          </p>
        </div>

        {/* Message Box */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-medium transition-opacity duration-500 ${message.startsWith('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <User size={16} className="mr-2 text-sky-500" /> Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 placeholder-gray-400 text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Mail size={16} className="mr-2 text-sky-500" /> Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 placeholder-gray-400 text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Lock size={16} className="mr-2 text-sky-500" /> Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="8"
                value={formData.password}
                onChange={handleChange}
                placeholder="Must be 8+ characters"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 placeholder-gray-400 text-gray-900"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Subscribe Now
                <ArrowRight size={20} className="ml-2" />
              </>
            )}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-sky-600 hover:text-sky-800 font-medium">Log in</a>
        </p>


        {/* Footer Text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          By subscribing, you agree to our <a href="#" className="text-sky-600 hover:text-sky-800 font-medium">Terms of Service</a>.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
