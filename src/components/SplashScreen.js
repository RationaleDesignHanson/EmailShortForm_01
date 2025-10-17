import React, { useState } from 'react';
import { Mail, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

export const SplashScreen = ({ onEnter }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check password
    if (password === '111111') {
      setTimeout(() => {
        onEnter();
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Incorrect password. Try 111111');
        setIsLoading(false);
      }, 800);
    }
  };

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
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Mail className="text-white" size={48} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-yellow-400" size={32} />
          SwipeFeed
          <Sparkles className="text-yellow-400" size={32} />
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/80 mb-8 leading-relaxed">
          Experience the future of email management through intelligent archetype-based sorting
        </p>

        {/* Demo Badge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-8 border border-white/20">
          <div className="text-white/90 font-semibold mb-2">🎭 Demo Experience</div>
          <div className="text-white/70 text-sm">
            You'll be playing as <strong>Sarah Chen</strong>, a working parent managing family, career, and personal life through SwipeFeed's intelligent email categorization.
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
                Enter SwipeFeed Demo
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Hint */}
        <div className="mt-6 text-white/50 text-sm">
          💡 Hint: The password is six ones
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-white/60">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="font-semibold mb-1">🎯 Smart Sorting</div>
            <div>8 intelligent archetypes</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="font-semibold mb-1">👆 Intuitive Swipes</div>
            <div>Natural gesture controls</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="font-semibold mb-1">🎨 Beautiful UI</div>
            <div>Frosted glass design</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="font-semibold mb-1">⚡ Instant Actions</div>
            <div>One-swipe email handling</div>
          </div>
        </div>
      </div>
    </div>
  );
};
