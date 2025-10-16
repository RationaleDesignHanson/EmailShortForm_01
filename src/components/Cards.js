import React from 'react';
import { ChevronRight, FileText, DollarSign, Target, Eye } from 'lucide-react';

export const ParentCard = ({ card, isSeen, onViewEmail, onCustomizeAction }) => {
  const displayInfo = card.kid || card.sender || { name: 'User', initial: 'U' };
  
  return (
    <div className={'h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl relative ' + (isSeen ? 'opacity-70' : '')}>
      <div className="p-6 pb-20 h-full overflow-auto">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-3 mb-4 border-2 border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="text-white text-sm font-bold">{card.metaCTA}</div>
            </div>
            <button 
              onClick={() => onCustomizeAction && onCustomizeAction(card)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-1 rounded-lg text-xs font-bold border border-white/30 transition-all ml-2"
            >
              Change
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {displayInfo.initial}
            </div>
            <div>
              <button 
                onClick={() => alert(`Email: ${card.dataSources[0]?.from || 'No email available'}`)}
                className="text-left hover:bg-white/10 rounded-lg p-1 -m-1 transition-all"
              >
                <h2 className="text-white text-xl font-bold">{displayInfo.name}</h2>
                <p className="text-white/80 text-sm">{card.timeAgo}</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {card.priority === 'critical' && (
                <div className="bg-red-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
                  CRITICAL
                </div>
              )}
              {card.priority === 'high' && (
                <div className="bg-orange-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-orange-600">
                  HIGH
                </div>
              )}
              {card.priority === 'medium' && (
                <div className="bg-yellow-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
                  MEDIUM
                </div>
              )}
              {card.priority === 'low' && (
                <div className="bg-amber-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-amber-600">
                  LOW
                </div>
              )}
              <button 
                onClick={onViewEmail}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/30 transition-all"
              >
                View
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-white text-2xl font-bold mb-3">{card.title}</h3>
        <p className="text-white/90 text-lg mb-4">{card.summary}</p>

        {card.requiresSignature && (
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 mb-4 border border-white/30">
            <FileText className="text-white" size={24} />
            <div>
              <div className="text-white font-semibold">Signature Required</div>
              <div className="text-white/80 text-sm">Auto-fill ready</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation removed - now handled by global progress counter */}
    </div>
  );
};

export const BusinessCard = ({ card, isSeen, onViewEmail, onCustomizeAction }) => {
  const displayInfo = card.company || card.sender || card.project || card.source || { name: 'Business', initials: 'B' };
  const showMetrics = card.value && card.probability && card.score;
  
  return (
    <div className={'h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl relative ' + (isSeen ? 'opacity-70' : '')}>
      <div className="p-6 pb-20 h-full overflow-auto">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-3 mb-4 border-2 border-white/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="text-white text-sm font-bold">{card.metaCTA}</div>
            </div>
            <button 
              onClick={() => onCustomizeAction && onCustomizeAction(card)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-1 rounded-lg text-xs font-bold border border-white/30 transition-all ml-2"
            >
              Change
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {displayInfo.initials || displayInfo.initial}
            </div>
            <div>
              <button 
                onClick={() => alert(`Email: ${card.dataSources[0]?.from || 'No email available'}`)}
                className="text-left hover:bg-white/10 rounded-lg p-1 -m-1 transition-all"
              >
                <h2 className="text-white text-xl font-bold">{displayInfo.name}</h2>
                <p className="text-white/70 text-sm">{card.timeAgo}</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="flex items-center gap-2">
              {card.priority === 'critical' && (
                <div className="bg-red-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
                  HOT
                </div>
              )}
              {card.priority === 'high' && (
                <div className="bg-orange-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-orange-600">
                  HIGH
                </div>
              )}
              {card.priority === 'medium' && (
                <div className="bg-yellow-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
                  MEDIUM
                </div>
              )}
              {card.priority === 'low' && (
                <div className="bg-amber-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-amber-600">
                  LOW
                </div>
              )}
              <button 
                onClick={onViewEmail}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/30 transition-all"
              >
                View
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-white text-2xl font-bold mb-4">{card.title || card.summary}</h3>
        {card.summary && card.title && (
          <p className="text-white/90 text-base mb-4">{card.summary}</p>
        )}
        
        {showMetrics && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <div className="text-white text-2xl font-bold mb-1">{card.score}</div>
                <div className="text-white/70 text-xs">Lead Score</div>
              </div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold mb-1">{card.value}</div>
                <div className="text-white/70 text-xs">Deal Value</div>
              </div>
              <div className="text-center">
                <div className="text-white text-2xl font-bold mb-1">{card.probability}%</div>
                <div className="text-white/70 text-xs">Close Rate</div>
              </div>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                style={{ width: `${card.probability}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation removed - now handled by global progress counter */}
    </div>
  );
};

export const ShoppingCard = ({ card, isSeen, onViewEmail, onCustomizeAction }) => {
  const storeName = card.store || card.airline || card.service || 'Store';
  const showPricing = card.salePrice && card.originalPrice;
  
  return (
    <div className={'h-full rounded-3xl overflow-hidden relative shadow-2xl ' + (isSeen ? 'opacity-70' : '')}>
      <div className="absolute inset-0" style={{ background: card.aiBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      
      <div className="relative h-full">
        <div className="p-6 pb-20 h-full overflow-auto">
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-3 mb-4 border-2 border-white/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <div className="text-white text-sm font-bold">{card.metaCTA}</div>
              </div>
              <button 
                onClick={() => onCustomizeAction && onCustomizeAction(card)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-1 rounded-lg text-xs font-bold border border-white/30 transition-all ml-2"
              >
                Change
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-white text-lg font-bold">{storeName}</div>
            <div className="flex gap-2">
              {card.priority === 'high' && (
                <div className="bg-orange-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-orange-600">
                  HOT DEAL
                </div>
              )}
              {card.priority === 'critical' && (
                <div className="bg-red-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
                  URGENT
                </div>
              )}
              {card.urgent && (
                <div className="bg-red-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
                  {card.expiresIn}
                </div>
              )}
              {card.security && (
                <div className="bg-yellow-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
                  SECURITY
                </div>
              )}
              {card.priority === 'medium' && (
                <div className="bg-yellow-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
                  MEDIUM
                </div>
              )}
              {card.priority === 'low' && (
                <div className="bg-amber-500 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-bold border border-amber-600">
                  LOW
                </div>
              )}
              <button 
                onClick={onViewEmail}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-2 py-1 rounded-full text-xs font-bold border border-white/30 transition-all"
              >
                View
              </button>
            </div>
          </div>

          {card.productImage && (
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 mb-4 border border-white/30 min-h-[200px] flex items-center justify-center">
              <div className="text-white text-6xl font-bold">{card.productImage}</div>
            </div>
          )}

          <h2 className="text-white text-3xl font-bold mb-4">{card.title}</h2>
          {card.summary && (
            <p className="text-white/90 text-lg mb-4">{card.summary}</p>
          )}

          {showPricing && (
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 mb-4">
              <div className="flex items-baseline gap-3 mb-3">
                <div className="text-white text-5xl font-bold">${card.salePrice}</div>
                <div className="text-white/50 text-2xl line-through">${card.originalPrice}</div>
              </div>
              <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold inline-block">
                SAVE ${(card.originalPrice - card.salePrice).toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Bottom navigation removed - now handled by global progress counter */}
      </div>
    </div>
  );
};