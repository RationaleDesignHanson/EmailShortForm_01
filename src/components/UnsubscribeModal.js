import React, { useState } from 'react';
import { X, Mail, AlertTriangle, Check, Clock } from 'lucide-react';

export const UnsubscribeModal = ({ senderInfo, skipCount, onUnsubscribe, onHide, onKeep, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnsubscribe = async () => {
    setIsProcessing(true);
    try {
      await onUnsubscribe();
    } finally {
      setIsProcessing(false);
    }
  };

  const getSenderName = () => {
    if (senderInfo.domain) {
      return senderInfo.domain.replace(/^(deals|offers|newsletter|noreply)\./, '').replace('.com', '');
    }
    return senderInfo.name || 'this sender';
  };

  const getContentType = () => {
    const domain = senderInfo.domain || '';
    if (domain.includes('deals') || domain.includes('offers') || domain.includes('sale')) {
      return 'promotional emails';
    }
    if (domain.includes('newsletter') || domain.includes('news')) {
      return 'newsletters';
    }
    if (domain.includes('noreply') || domain.includes('no-reply')) {
      return 'automated emails';
    }
    return 'emails';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-700">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Unsubscribe?</h2>
                <p className="text-white/80 text-sm">You've skipped {skipCount} emails</p>
              </div>
            </div>
            <button onClick={onCancel} className="text-white/80 hover:text-white">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Pattern Detection */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-orange-400" size={20} />
              <div className="text-white font-semibold">Pattern Detected</div>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed">
              You've skipped <span className="text-white font-bold">{skipCount} {getContentType()}</span> from{' '}
              <span className="text-white font-bold">{getSenderName()}</span> recently.
            </div>
          </div>

          {/* Sender Info */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
            <div className="text-white font-semibold mb-2">From: {getSenderName()}</div>
            <div className="text-slate-400 text-sm">{senderInfo.email}</div>
            <div className="text-slate-400 text-xs mt-1">
              Content type: {getContentType()}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <button
              onClick={handleUnsubscribe}
              disabled={isProcessing}
              className="w-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Unsubscribing...
                </>
              ) : (
                <>
                  <X size={18} />
                  Unsubscribe from {getSenderName()}
                </>
              )}
            </button>

            <button
              onClick={() => onHide(30)}
              className="w-full p-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Clock size={18} />
              Hide for 30 days
            </button>

            <button
              onClick={onKeep}
              className="w-full p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Check size={18} />
              Keep showing these
            </button>
          </div>

          <div className="mt-4 text-center">
            <div className="text-slate-400 text-xs">
              This won't affect your Gmail inbox - only what you see in SwipeFeed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
