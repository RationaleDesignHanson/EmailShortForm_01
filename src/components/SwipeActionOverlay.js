import React from 'react';
import { Check, X, Send, Heart } from 'lucide-react';

export const SwipeActionOverlay = ({ direction, cardType, swipeDistance }) => {
  const isLongSwipe = Math.abs(swipeDistance) > 200;
  
  const getConfigGroup = (type) => {
    if (['caregiver'].includes(type)) return 'parent';
    if (['deal_stacker', 'status_seeker'].includes(type)) return 'shopping';
    return 'business';
  };
  
  const configGroup = getConfigGroup(cardType);
  
  const configs = {
    parent: {
      right: {
        short: { icon: Check, label: '👁️ Seen', color: 'bg-blue-500', bgColor: 'bg-blue-500/20' },
        long: { icon: Send, label: '⚡ Action', color: 'bg-green-600', bgColor: 'bg-green-600/30' }
      },
      left: {
        short: { icon: Check, label: '✓ Done', color: 'bg-slate-500', bgColor: 'bg-slate-500/20' },
        long: { icon: X, label: '✕ Skip', color: 'bg-red-600', bgColor: 'bg-red-600/30' }
      }
    },
    business: {
      right: {
        short: { icon: Check, label: '👁️ Seen', color: 'bg-blue-500', bgColor: 'bg-blue-500/20' },
        long: { icon: Send, label: '⚡ Action', color: 'bg-green-600', bgColor: 'bg-green-600/30' }
      },
      left: {
        short: { icon: Check, label: '✓ Done', color: 'bg-slate-500', bgColor: 'bg-slate-500/20' },
        long: { icon: X, label: '✕ Skip', color: 'bg-red-600', bgColor: 'bg-red-600/30' }
      }
    },
    shopping: {
      right: {
        short: { icon: Check, label: '👁️ Seen', color: 'bg-blue-500', bgColor: 'bg-blue-500/20' },
        long: { icon: Heart, label: '⚡ Action', color: 'bg-pink-600', bgColor: 'bg-pink-600/30' }
      },
      left: {
        short: { icon: Check, label: '✓ Done', color: 'bg-slate-500', bgColor: 'bg-slate-500/20' },
        long: { icon: X, label: '✕ Skip', color: 'bg-red-600', bgColor: 'bg-red-600/30' }
      }
    }
  };

  const actionType = isLongSwipe ? 'long' : 'short';
  const config = configs[configGroup]?.[direction]?.[actionType];
  
  if (!config) return null;

  const Icon = config.icon;
  const opacity = Math.min(Math.abs(swipeDistance) / 150, 1);

  return (
    <>
      {/* Card-level background overlay */}
      <div 
        className={'absolute inset-0 flex items-center justify-center transition-opacity backdrop-blur-sm rounded-3xl ' + config.bgColor}
        style={{ opacity: opacity * 0.3 }}
      />

      {/* Global centered feedback - positioned relative to viewport */}
      <div 
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        style={{ opacity: opacity }}
      >
        <div className={'bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl text-white px-8 py-6 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center gap-4'}>
          <Icon size={48} strokeWidth={2.5} />
          <div className="text-center">
            <div className="text-xl font-bold mb-1">{config.label}</div>
            {isLongSwipe && (
              <div className="text-sm opacity-75 animate-pulse">Release to confirm</div>
            )}
          </div>
        </div>
      </div>

      {/* Side indicator for direction clarity */}
      <div className={'absolute top-1/3 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 backdrop-blur-md border border-white/30 ' + config.color + ' ' + (direction === 'left' ? 'left-4' : 'right-4')}>
        <Icon size={20} />
        <span>{direction === 'left' ? '←' : '→'}</span>
      </div>
    </>
  );
};
