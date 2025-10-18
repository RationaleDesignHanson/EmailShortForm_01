import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, X, Zap, Sparkles, Briefcase, TrendingUp, Calendar, Baby, ShoppingBag, Award, AlertTriangle } from 'lucide-react';

export const OnboardingTutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to zero! 👋',
      content: 'zero helps you clear your inbox fast. We group emails into 8 simple categories so you can swipe through what matters.',
      icon: <Sparkles className="text-yellow-400" size={48} />,
      action: 'Get Started'
    },
    {
      title: 'Meet Sarah Chen 👩‍💼',
      content: "You'll try zero as Sarah — a working parent juggling family, career, and life. These are realistic scenarios you'll recognize.",
      icon: <div className="text-4xl">👨‍👩‍👧‍👦</div>,
      action: 'Continue'
    },
    {
      title: 'Swipe Gestures 👆',
      content: '👉 Right: Mark as seen or take action\n👈 Left: Snooze or skip\n\nShort swipes are safe. Long swipes take bigger actions.',
      icon: (
        <div className="flex items-center gap-8">
          <ArrowRight className="text-green-400" size={40} />
          <div className="text-2xl">•</div>
          <ArrowLeft className="text-purple-400" size={40} />
        </div>
      ),
      gesture: '👁️ Seen  •  💤 Snooze  •  ⚡ Action  •  ✕ Skip',
      action: 'Got It'
    },
    {
      title: 'Smart Categories 🎯',
      content: 'zero automatically sorts emails into 8 simple categories:',
      icon: <div className="text-4xl">🎭</div>,
      categories: [
        { icon: Baby, label: 'Family', gradient: 'from-purple-400 to-pink-500' },
        { icon: Briefcase, label: 'Executive', gradient: 'from-slate-400 to-slate-600' },
        { icon: TrendingUp, label: 'Sales', gradient: 'from-blue-400 to-cyan-500' },
        { icon: Calendar, label: 'Projects', gradient: 'from-teal-400 to-cyan-500' },
        { icon: Sparkles, label: 'Learning', gradient: 'from-purple-400 to-indigo-500' },
        { icon: ShoppingBag, label: 'Shopping', gradient: 'from-green-400 to-emerald-500' },
        { icon: Award, label: 'Travel', gradient: 'from-orange-400 to-yellow-500' },
        { icon: AlertTriangle, label: 'Security', gradient: 'from-red-400 to-orange-500' }
      ],
      action: 'Explore Categories'
    },
    {
      title: 'Ready to Swipe! 🚀',
      content: "You're all set! Start with Sarah's family emails and see how fast zero helps you get to done.",
      icon: <CheckCircle className="text-green-400" size={48} />,
      action: 'Start Swiping'
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900/90 to-purple-900/90 backdrop-blur-xl rounded-3xl max-w-md w-full p-8 border border-white/20 shadow-2xl">
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-white/60 hover:text-white/80 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-white w-6' 
                    : index < currentStep 
                      ? 'bg-green-400' 
                      : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            {currentStepData.icon}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-4">
            {currentStepData.title}
          </h2>

          {/* Content */}
          <p className="text-white/80 leading-relaxed whitespace-pre-line mb-4">
            {currentStepData.content}
          </p>

          {/* Category Buttons (if present) */}
          {currentStepData.categories && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {currentStepData.categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={idx}
                    className={`bg-gradient-to-br ${cat.gradient} p-3 rounded-xl flex items-center gap-2 shadow-lg`}
                  >
                    <Icon size={18} className="text-white" />
                    <span className="text-white font-medium text-sm">{cat.label}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Gesture Indicator */}
          {currentStepData.gesture && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 mb-4">
              <div className="text-white font-semibold text-sm">
                {currentStepData.gesture}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 text-white/60 hover:text-white/80 disabled:text-white/30 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="text-white/50 text-sm">
            {currentStep + 1} of {steps.length}
          </div>

          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
          >
            {currentStepData.action}
            {isLastStep ? <Zap size={16} /> : <ArrowRight size={16} />}
          </button>
        </div>

        {/* Fun Tip */}
        {currentStep === 2 || currentStep === 3 ? (
          <div className="mt-6 text-center text-white/50 text-xs">
            💡 Try the gestures on the demo cards to get a feel for it!
          </div>
        ) : null}
      </div>
    </div>
  );
};
