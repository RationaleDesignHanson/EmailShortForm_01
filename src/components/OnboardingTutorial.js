import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Eye, CheckCircle, X, Zap, Sparkles } from 'lucide-react';

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
      title: 'Swipe Right: Take Action 👉',
      content: 'Short swipe right = Mark as seen\nLong swipe right = Take immediate action\n\nUse this for emails that need your attention or response.',
      icon: <ArrowRight className="text-green-400" size={48} />,
      gesture: '👁️ Seen  •  ⚡ Action',
      action: 'Got It'
    },
    {
      title: 'Swipe Left: Organize 👈',
      content: 'Short swipe left = Mark as done\nLong swipe left = Skip/dismiss\n\nUse this to clear emails or save for later.',
      icon: <ArrowLeft className="text-blue-400" size={48} />,
      gesture: '✓ Done  •  ✕ Skip',
      action: 'Understood'
    },
    {
      title: 'Smart Categories 🎯',
      content: 'zero automatically sorts emails into 8 simple categories:\n• Family & Caregiving\n• Sales & Business\n• Shopping & Deals\n• Travel & Status\n• Security & Identity\n• Executive Leadership\n• Project Coordination\n• Learning & Innovation',
      icon: <div className="text-4xl">🎭</div>,
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
