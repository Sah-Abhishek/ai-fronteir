import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/UserStore';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <-- toggle state
  const { setUser } = useUserStore();
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
      const response = await axios.post(`${apiUrl}/auth/login`, formData);

      if (response.data?.success) {
        setMessage('Login successful! Welcome back 🎉');
        toast.success('Login Successful');

        if (response.data.data.token) {
          localStorage.setItem('auth_token', response.data.data.token);
          setUser(response.data.data.user);
          navigate('/dashboard');
          return;
        }
      } else {
        setMessage('Unexpected response from server. Please try again.');
      }
    } catch (error) {
      console.error('API Submission Error:', error);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'A network or server error occurred.';

      setMessage(`Login failed: ${errorMsg}`);
      setFormData(prev => ({ ...prev, password: '' })); // clear password on error
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
            Welcome Back to <span className="text-sky-600">AI Frontier</span>
          </h1>
          <p className="mt-3 text-lg text-gray-500 font-medium">
            Log in to access insights into LLMs, Robotics, and Deep Learning.
          </p>
        </div>

        {/* Message Box */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-medium transition-opacity duration-500 ${message.startsWith('Login successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

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

          {/* Password Field with Eye Toggle */}
          <div>
            <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Lock size={16} className="mr-2 text-sky-500" /> Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength="8"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150 placeholder-gray-400 text-gray-900"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
                Log In
                <ArrowRight size={20} className="ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <a href="/signup" className="text-sky-600 hover:text-sky-800 font-medium">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
