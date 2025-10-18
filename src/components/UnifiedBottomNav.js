import React from 'react';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';

export const UnifiedBottomNav = ({ 
  archetypeName,
  emailsLeft,
  onPrevArchetype,
  onNextArchetype,
  onOpenSplay,
  onOpenBottomSheet
}) => {
  const progressPercent = Math.max(0, 100 - (emailsLeft * 5)); // Rough progress

  return (
    <div 
      className="fixed left-1/2 transform -translate-x-1/2 z-40"
      style={{ bottom: 'calc(20px + env(safe-area-inset-bottom))' }}
    >
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Main Navigation Bar */}
        <div className="flex items-center px-4 py-3">
          {/* Previous Archetype */}
          <button 
            onClick={onPrevArchetype}
            className="text-white/70 hover:text-white p-2 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Center Content */}
          <div className="flex-1 px-4">
            <div className="flex items-center justify-center gap-3">
              {/* Archetype Name - tap for splay */}
              <button 
                onClick={onOpenSplay}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                {archetypeName}
              </button>

              <div className="text-white/40">•</div>

              {/* Email Count - tap for bottom sheet */}
              <button 
                onClick={onOpenBottomSheet}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                <Mail size={16} className="text-blue-400" />
                <span className="font-bold">{emailsLeft}</span>
                <span className="text-sm text-white/60">left</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Next Archetype */}
          <button 
            onClick={onNextArchetype}
            className="text-white/70 hover:text-white p-2 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
