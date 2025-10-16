import React, { useState } from 'react';
import { X, Clock, Check } from 'lucide-react';

export const SaveLaterModal = ({ email, onSave, onCancel }) => {
  const [selectedTime, setSelectedTime] = useState('6h');
  const [rememberSetting, setRememberSetting] = useState(false);

  const timeOptions = [
    { id: '1h', label: '1 Hour', description: 'Remind me in 1 hour' },
    { id: '3h', label: '3 Hours', description: 'Remind me in 3 hours' },
    { id: '6h', label: '6 Hours', description: 'Default reminder time' },
    { id: '1d', label: 'Tomorrow', description: 'Remind me tomorrow morning' },
    { id: '3d', label: '3 Days', description: 'Remind me in 3 days' },
    { id: '1w', label: '1 Week', description: 'Remind me next week' },
    { id: 'custom', label: 'Custom', description: 'Choose specific date/time' }
  ];

  const handleSave = () => {
    const snoozeData = {
      duration: selectedTime,
      rememberUntilTomorrow: rememberSetting,
      scheduledFor: getScheduledTime(selectedTime)
    };
    onSave(snoozeData);
  };

  const getScheduledTime = (duration) => {
    const now = new Date();
    switch (duration) {
      case '1h': return new Date(now.getTime() + 1 * 60 * 60 * 1000);
      case '3h': return new Date(now.getTime() + 3 * 60 * 60 * 1000);
      case '6h': return new Date(now.getTime() + 6 * 60 * 60 * 1000);
      case '1d': 
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(9, 0, 0, 0); // 9 AM tomorrow
        return tomorrow;
      case '3d': return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      case '1w': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      default: return new Date(now.getTime() + 6 * 60 * 60 * 1000);
    }
  };

  const formatScheduledTime = (duration) => {
    const time = getScheduledTime(duration);
    return time.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-700">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Save for Later</h2>
                <p className="text-white/80 text-sm">When should we remind you?</p>
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
            <div className="text-white font-semibold mb-1">{email.title}</div>
            <div className="text-slate-400 text-sm">{email.dataSources[0]?.from}</div>
          </div>

          {/* Time Options */}
          <div className="space-y-3 mb-6">
            {timeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedTime(option.id)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  selectedTime === option.id
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold mb-1">{option.label}</div>
                    <div className="text-sm opacity-80">{option.description}</div>
                    {selectedTime === option.id && (
                      <div className="text-xs opacity-70 mt-1">
                        Scheduled for: {formatScheduledTime(option.id)}
                      </div>
                    )}
                  </div>
                  {selectedTime === option.id && (
                    <Check size={20} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Remember Setting */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberSetting}
                onChange={(e) => setRememberSetting(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
              />
              <div>
                <div className="text-white font-medium">Remember this setting</div>
                <div className="text-slate-400 text-sm">Use this timing for similar emails until tomorrow morning</div>
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
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
};
