import React, { useState } from 'react';
import { Mail, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const SplashScreen = ({ onEnter }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '111111') {
      onEnter();
    } else {
      setError('');  // Just clear the error
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto p-8">
        {/* Zero Logo - 10000 with middle 0 active */}
        <div className="mb-2">
          <div className="flex items-center justify-center text-7xl font-bold">
            <span className="text-white" style={{ opacity: 0.15, filter: 'blur(2px)' }}>10</span>
            <span className="text-white bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl px-3 py-1 shadow-2xl transform hover:scale-110 transition-all duration-300">0</span>
            <span className="text-white" style={{ opacity: 0.15, filter: 'blur(2px)' }}>00</span>
          </div>
        </div>

        {/* Title - centered under middle zero, shifted 5px left */}
        <h1 className="text-4xl font-bold text-white mb-8" style={{ marginLeft: '-5px' }}>
          zero
        </h1>

        {/* Subtitle */}
        <div className="mb-8">
          <p className="text-2xl font-bold text-white mb-2">
            Clear your inbox fast.
          </p>
          <p className="text-lg text-white/80">
            Swipe to keep, act, or archive for later.
          </p>
        </div>

        {/* Remove Demo Badge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8 border border-white/20">
          <div className="text-white/70 text-sm">
            You're <strong>Sarah Chen</strong>, a working mom managing life through zero's smart, short-form email app.
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter demo password"
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center text-lg"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-3 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entering Demo...
              </>
            ) : (
              <>
                Enter zero demo
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>


      </div>
    </div>
  );
};
