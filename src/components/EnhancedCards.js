import React from 'react';
import { FileText } from 'lucide-react';

// Enhanced content-sized card with iOS-style frosted glass effect
const EnhancedCard = ({ card, isSeen, onViewEmail, onCustomizeAction, children, backgroundImage, isTopCard = true }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isSeen ? 'opacity-70' : ''
        }`}
        style={{
          background: backgroundImage 
            ? backgroundImage
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* iOS-style frosted glass - heavily blurred background visible through translucent material */}
        <div 
          className={`absolute inset-0 ${
            isTopCard 
              ? 'backdrop-blur-3xl' 
              : 'backdrop-blur-3xl'
          }`}
          style={{
            backgroundColor: isTopCard 
              ? 'rgba(255, 255, 255, 0.15)' 
              : 'rgba(0, 0, 0, 0.85)',
            backdropFilter: isTopCard ? 'blur(40px) saturate(180%)' : 'blur(60px) saturate(120%)',
            WebkitBackdropFilter: isTopCard ? 'blur(40px) saturate(180%)' : 'blur(60px) saturate(120%)',
          }}
        />
        
        {/* Content - only interactive on top card */}
        <div className={`relative p-6 ${isTopCard ? 'cursor-pointer' : 'pointer-events-none'}`}>
          {/* Meta CTA with Change button */}
          <div 
            className="rounded-xl p-3 mb-4 border border-white/30 shadow-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <div className="text-white text-sm font-bold drop-shadow-lg">{card.metaCTA}</div>
              </div>
              {isTopCard && (
                <button 
                  onClick={() => onCustomizeAction && onCustomizeAction(card)}
                  className="text-white px-2 py-1 rounded-lg text-xs font-bold border border-white/40 transition-all ml-2 shadow-md hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  Change
                </button>
              )}
            </div>
          </div>

          {/* Card-specific content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export const EnhancedParentCard = ({ card, isSeen, onViewEmail, onCustomizeAction, isTopCard = true }) => {
  const displayInfo = card.kid || card.sender || { name: 'User', initial: 'U' };
  
  return (
    <EnhancedCard 
      card={card} 
      isSeen={isSeen} 
      onViewEmail={onViewEmail} 
      onCustomizeAction={onCustomizeAction}
      backgroundImage={card.aiBackground}
      isTopCard={isTopCard}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {displayInfo.initial}
          </div>
          <div>
            <button 
              onClick={() => alert(`Email: ${card.dataSources[0]?.from || 'No email available'}`)}
              className="text-left hover:bg-white/10 rounded-lg p-1 -m-1 transition-all"
            >
              <h2 className="text-white text-lg font-bold">{displayInfo.name}</h2>
              <p className="text-white/80 text-sm">{card.timeAgo}</p>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {card.priority === 'critical' && (
            <div className="bg-red-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
              CRITICAL
            </div>
          )}
          {card.priority === 'high' && (
            <div className="bg-orange-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-orange-600">
              HIGH
            </div>
          )}
          {card.priority === 'medium' && (
            <div className="bg-yellow-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
              MEDIUM
            </div>
          )}
          {card.priority === 'low' && (
            <div className="bg-amber-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-amber-600">
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

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-white text-xl font-bold drop-shadow-lg">{card.title}</h3>
        <p className="text-white/90 text-base leading-relaxed drop-shadow-md">{card.summary}</p>

        {card.requiresSignature && (
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3 border border-white/30">
            <FileText className="text-white" size={20} />
            <div>
              <div className="text-white font-semibold text-sm">Signature Required</div>
              <div className="text-white/80 text-xs">Auto-fill ready</div>
            </div>
          </div>
        )}
      </div>
    </EnhancedCard>
  );
};

export const EnhancedBusinessCard = ({ card, isSeen, onViewEmail, onCustomizeAction, isTopCard = true }) => {
  const displayInfo = card.company || card.sender || card.project || card.source || { name: 'Business', initials: 'B' };
  const showMetrics = card.value && card.probability && card.score;
  
  return (
    <EnhancedCard 
      card={card} 
      isSeen={isSeen} 
      onViewEmail={onViewEmail} 
      onCustomizeAction={onCustomizeAction}
      backgroundImage={card.aiBackground}
      isTopCard={isTopCard}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
            {displayInfo.initials || displayInfo.initial}
          </div>
          <div>
            <button 
              onClick={() => alert(`Email: ${card.dataSources[0]?.from || 'No email available'}`)}
              className="text-left hover:bg-white/10 rounded-lg p-1 -m-1 transition-all"
            >
              <h2 className="text-white text-lg font-bold">{displayInfo.name}</h2>
              <p className="text-white/70 text-sm">{card.timeAgo}</p>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {card.priority === 'critical' && (
            <div className="bg-red-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
              HOT
            </div>
          )}
          {card.priority === 'high' && (
            <div className="bg-orange-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-orange-600">
              HIGH
            </div>
          )}
          {card.priority === 'medium' && (
            <div className="bg-yellow-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
              MEDIUM
            </div>
          )}
          {card.priority === 'low' && (
            <div className="bg-amber-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-amber-600">
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

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-white text-xl font-bold drop-shadow-lg">{card.title || card.summary}</h3>
        {card.summary && card.title && (
          <p className="text-white/90 text-base leading-relaxed drop-shadow-md">{card.summary}</p>
        )}
        
        {showMetrics && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="text-center">
                <div className="text-white text-lg font-bold mb-1">{card.score}</div>
                <div className="text-white/70 text-xs">Lead Score</div>
              </div>
              <div className="text-center">
                <div className="text-white text-lg font-bold mb-1">{card.value}</div>
                <div className="text-white/70 text-xs">Deal Value</div>
              </div>
              <div className="text-center">
                <div className="text-white text-lg font-bold mb-1">{card.probability}%</div>
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
    </EnhancedCard>
  );
};

export const EnhancedShoppingCard = ({ card, isSeen, onViewEmail, onCustomizeAction, isTopCard = true }) => {
  const storeName = card.store || card.airline || card.service || 'Store';
  const showPricing = card.salePrice && card.originalPrice;
  
  return (
    <EnhancedCard 
      card={card} 
      isSeen={isSeen} 
      onViewEmail={onViewEmail} 
      onCustomizeAction={onCustomizeAction}
      backgroundImage={card.aiBackground}
      isTopCard={isTopCard}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-white text-lg font-bold">{storeName}</div>
        <div className="flex items-center gap-2">
          {card.priority === 'high' && (
            <div className="bg-orange-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-orange-600">
              HOT DEAL
            </div>
          )}
          {card.priority === 'critical' && (
            <div className="bg-red-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
              URGENT
            </div>
          )}
          {card.urgent && (
            <div className="bg-red-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold animate-pulse border border-red-600">
              {card.expiresIn}
            </div>
          )}
          {card.security && (
            <div className="bg-yellow-500 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold border border-yellow-600">
              SECURITY
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

      {/* Content */}
      <div className="space-y-3">
        {card.productImage && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/30 text-center">
            <div className="text-white text-4xl font-bold mb-2">{card.productImage}</div>
          </div>
        )}

        <h2 className="text-white text-xl font-bold drop-shadow-lg">{card.title}</h2>
        {card.summary && (
          <p className="text-white/90 text-base leading-relaxed drop-shadow-md">{card.summary}</p>
        )}

        {showPricing && (
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-white/30">
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-white text-3xl font-bold">${card.salePrice}</div>
              <div className="text-white/50 text-xl line-through">${card.originalPrice}</div>
            </div>
            <div className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-sm inline-block">
              SAVE ${(card.originalPrice - card.salePrice).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </EnhancedCard>
  );
};
