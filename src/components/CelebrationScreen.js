import React, { useEffect, useState } from 'react';
import { Trophy, Star, Sparkles, CheckCircle } from 'lucide-react';

export const CelebrationScreen = ({ archetype, onContinue }) => {
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Generate confetti pieces
    const pieces = [];
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        speed: Math.random() * 3 + 2,
        drift: (Math.random() - 0.5) * 2
      });
    }
    setConfettiPieces(pieces);

    // Show content after brief delay
    setTimeout(() => setShowContent(true), 500);

    // Animate confetti
    const interval = setInterval(() => {
      setConfettiPieces(prev => prev.map(piece => ({
        ...piece,
        y: piece.y + piece.speed,
        x: piece.x + piece.drift,
        rotation: piece.rotation + 5
      })).filter(piece => piece.y < 110));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const archetypeConfig = {
    caregiver: {
      title: 'Family Inbox Cleared!',
      subtitle: 'All school and family matters handled',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-yellow-400 to-orange-500'
    },
    sales_hunter: {
      title: 'Sales Pipeline Updated!',
      subtitle: 'All opportunities processed',
      icon: '💼',
      color: 'from-blue-400 to-purple-500'
    },
    deal_stacker: {
      title: 'Shopping Deals Sorted!',
      subtitle: 'Best deals claimed and saved',
      icon: '🛍️',
      color: 'from-green-400 to-blue-500'
    },
    status_seeker: {
      title: 'Travel Plans Organized!',
      subtitle: 'All bookings and status updated',
      icon: '✈️',
      color: 'from-purple-400 to-pink-500'
    },
    identity_manager: {
      title: 'Security Alerts Handled!',
      subtitle: 'All accounts verified and secure',
      icon: '🔒',
      color: 'from-red-400 to-orange-500'
    },
    transactional_leader: {
      title: 'Executive Tasks Complete!',
      subtitle: 'All approvals and decisions made',
      icon: '⚡',
      color: 'from-indigo-400 to-purple-500'
    },
    project_coordinator: {
      title: 'Project Updates Processed!',
      subtitle: 'All team coordination handled',
      icon: '📋',
      color: 'from-teal-400 to-blue-500'
    },
    enterprise_innovator: {
      title: 'Learning Queue Organized!',
      subtitle: 'Knowledge and opportunities sorted',
      icon: '🚀',
      color: 'from-pink-400 to-purple-500'
    }
  };

  const config = archetypeConfig[archetype] || archetypeConfig.caregiver;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Confetti Animation */}
      {confettiPieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            transform: `rotate(${piece.rotation}deg)`,
            transition: 'none'
          }}
        />
      ))}

      {/* Celebration Content */}
      <div className={`text-center transform transition-all duration-1000 ${
        showContent ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        {/* Main Icon */}
        <div className="mb-8">
          <div className={`w-32 h-32 mx-auto bg-gradient-to-br ${config.color} rounded-full flex items-center justify-center text-6xl shadow-2xl animate-bounce`}>
            {config.icon}
          </div>
        </div>

        {/* Trophy and Stars */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Star className="text-yellow-400 animate-pulse" size={32} />
          <Trophy className="text-yellow-500" size={48} />
          <Star className="text-yellow-400 animate-pulse" size={32} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
          {config.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-white/80 mb-8">
          {config.subtitle}
        </p>

        {/* Achievement Badge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="text-green-400" size={24} />
            <span className="text-white font-semibold">Inbox Zero Achieved!</span>
          </div>
          <div className="text-white/70 text-sm">
            You've successfully processed all emails in this category
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <Sparkles size={24} />
          Continue to Next Category
          <Sparkles size={24} />
        </button>

        {/* Fun Stats */}
        <div className="mt-8 text-white/60 text-sm">
          🎉 Great job staying organized! 🎉
        </div>
      </div>
    </div>
  );
};
