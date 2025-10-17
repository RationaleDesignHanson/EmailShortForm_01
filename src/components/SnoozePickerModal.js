import React, { useState } from 'react';
import { X, Clock, Check } from 'lucide-react';

export const SnoozePickerModal = ({ email, onSave, onCancel, defaultHours = 1 }) => {
  const [selectedHours, setSelectedHours] = useState(defaultHours);
  const [rememberDuration, setRememberDuration] = useState(false);

  // Hour options from 0.5 to 12
  const hourOptions = [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 
    6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
  ];

  const handleSave = () => {
    onSave(selectedHours, rememberDuration);
  };

  const formatTime = (hours) => {
    if (hours < 1) return `${hours * 60} min`;
    if (hours === 1) return '1 hour';
    const wholeHours = Math.floor(hours);
    const minutes = (hours % 1) * 60;
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours} hours`;
  };

  const getReturnTime = (hours) => {
    const now = new Date();
    const returnTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    return returnTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-700">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Snooze Email</h2>
                <p className="text-white/80 text-sm">When should it return?</p>
              </div>
            </div>
            <button onClick={onCancel} className="text-white/80 hover:text-white">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Email Preview */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
            <div className="text-white font-semibold mb-1 truncate">{email.title}</div>
            <div className="text-slate-400 text-sm truncate">{email.dataSources[0]?.from}</div>
          </div>

          {/* Wheel Selector */}
          <div className="mb-6">
            <div className="text-white font-semibold mb-3">Return in:</div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 max-h-60 overflow-y-auto">
              {hourOptions.map((hours) => (
                <button
                  key={hours}
                  onClick={() => setSelectedHours(hours)}
                  className={`w-full p-3 rounded-lg mb-2 transition-all ${
                    selectedHours === hours
                      ? 'bg-blue-600 text-white scale-105'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{formatTime(hours)}</span>
                    {selectedHours === hours && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm opacity-80">Returns at {getReturnTime(hours)}</span>
                        <Check size={16} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Remember Setting */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberDuration}
                onChange={(e) => setRememberDuration(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Remember this duration</div>
                <div className="text-slate-400 text-xs">Use {formatTime(selectedHours)} as default for future snoozes</div>
              </div>
            </label>
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Clock size={18} />
            Snooze
          </button>
        </div>
      </div>
    </div>
  );
};
