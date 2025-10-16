import React from 'react';
import { Database, Mail, User } from 'lucide-react';

export const DataModeToggle = ({ 
  demoMode, 
  onToggle, 
  availableAccounts, 
  selectedAccount, 
  onAccountChange,
  isAuthenticated 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
      {/* Mode Toggle */}
      <div className="flex">
        <button
          onClick={() => onToggle(true)}
          className={`px-4 py-2 flex items-center gap-2 transition-all ${
            demoMode 
              ? 'bg-blue-600 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Database size={16} />
          <span className="text-sm font-medium">Demo</span>
        </button>
        <button
          onClick={() => onToggle(false)}
          className={`px-4 py-2 flex items-center gap-2 transition-all ${
            !demoMode 
              ? 'bg-green-600 text-white' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Mail size={16} />
          <span className="text-sm font-medium">Gmail</span>
        </button>
      </div>

      {/* Account Selector (only show in Gmail mode) */}
      {!demoMode && (
        <div className="border-t border-slate-700 p-3">
          {isAuthenticated ? (
            <div>
              <div className="text-slate-400 text-xs mb-2">Account:</div>
              <select
                value={selectedAccount}
                onChange={(e) => onAccountChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableAccounts.map(account => (
                  <option key={account.email} value={account.email}>
                    {account.displayName}
                  </option>
                ))}
              </select>
              <div className="text-green-400 text-xs mt-2 flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Gmail mode active
              </div>
            </div>
          ) : (
            <div className="text-center">
              <User size={16} className="text-slate-400 mx-auto mb-2" />
              <div className="text-slate-400 text-xs">Backend not available</div>
              <div className="text-orange-400 text-xs mt-1">Using demo mode</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
