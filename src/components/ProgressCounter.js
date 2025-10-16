import React from 'react';
import { Mail, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProgressCounter = ({ 
  totalEmails, 
  processedEmails, 
  currentArchetype, 
  archetypeName,
  onOpenBottomSheet, 
  onPrevArchetype, 
  onNextArchetype 
}) => {
  const remaining = totalEmails - processedEmails;
  const progressPercent = totalEmails > 0 ? (processedEmails / totalEmails) * 100 : 0;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-3">
      {/* Previous Archetype Button */}
      <button 
        onClick={onPrevArchetype}
        className="bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90 text-white p-3 rounded-2xl shadow-2xl border border-slate-700 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Progress Counter with Archetype Name */}
      <div className="flex flex-col items-center gap-2">
        {/* Current Archetype Name */}
        <div className="bg-slate-900/90 backdrop-blur-xl text-white px-4 py-1 rounded-xl shadow-xl border border-slate-700">
          <span className="text-sm font-medium text-slate-300">{archetypeName}</span>
        </div>
        
        {/* Progress Counter */}
        <button 
          onClick={onOpenBottomSheet}
          className="bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90 text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-700 transition-all"
        >
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-blue-400" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{remaining}</span>
              <TrendingDown size={16} className="text-green-400" />
              <span className="text-sm text-slate-400">emails left</span>
            </div>
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden ml-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Next Archetype Button */}
      <button 
        onClick={onNextArchetype}
        className="bg-slate-900/90 backdrop-blur-xl hover:bg-slate-800/90 text-white p-3 rounded-2xl shadow-2xl border border-slate-700 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
