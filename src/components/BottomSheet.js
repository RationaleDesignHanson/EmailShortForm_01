import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  ShoppingBag, 
  Briefcase, 
  Baby, 
  Award, 
  AlertTriangle, 
  Sparkles,
  X
} from 'lucide-react';

// PriorityMeter removed - not used in this component

export const BottomSheet = ({ 
  isOpen, 
  onClose, 
  activeArchetype, 
  onArchetypeChange, 
  cards, 
  currentEmail 
}) => {
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const archetypeConfigs = {
    transactional_leader: { title: 'Executive Inbox', subtitle: 'Transactional Leader', icon: Briefcase, gradient: 'from-slate-800 via-slate-700 to-slate-900' },
    sales_hunter: { title: 'Job (Sales)', subtitle: 'Sales Pipeline', icon: TrendingUp, gradient: 'from-slate-900 via-blue-900 to-indigo-900' },
    project_coordinator: { title: 'Project Hub', subtitle: 'Project Coordinator', icon: Calendar, gradient: 'from-teal-700 via-cyan-700 to-blue-800' },
    enterprise_innovator: { title: 'Learning Feed', subtitle: 'Learning', icon: Sparkles, gradient: 'from-purple-800 via-violet-800 to-indigo-900' },
    caregiver: { title: 'Family Inbox', subtitle: 'Time-Crunched Caregiver', icon: Baby, gradient: 'from-indigo-600 via-purple-600 to-pink-600' },
    deal_stacker: { title: 'Deals Inbox', subtitle: 'Savvy Deal Stacker', icon: ShoppingBag, gradient: 'from-emerald-600 via-teal-600 to-cyan-600' },
    status_seeker: { title: 'Travel Hub', subtitle: 'Global Status Seeker', icon: Award, gradient: 'from-amber-600 via-orange-600 to-red-600' },
    identity_manager: { title: 'Security Center', subtitle: 'Digital Identity Manager', icon: AlertTriangle, gradient: 'from-red-700 via-rose-700 to-pink-700' }
  };

  const currentConfig = archetypeConfigs[activeArchetype];
  const CurrentIcon = currentConfig?.icon || Briefcase;

  const archetypeGroups = [
      { label: 'Professional', archetypes: [
        { id: 'transactional_leader', label: 'Executive', icon: Briefcase },
        { id: 'sales_hunter', label: 'Job (Sales)', icon: TrendingUp },
        { id: 'project_coordinator', label: 'Projects', icon: Calendar },
        { id: 'enterprise_innovator', label: 'Learning', icon: Sparkles }
      ]},
    { label: 'Consumer', archetypes: [
      { id: 'caregiver', label: 'Family', icon: Baby },
      { id: 'deal_stacker', label: 'Shopping', icon: ShoppingBag },
      { id: 'status_seeker', label: 'Travel', icon: Award },
      { id: 'identity_manager', label: 'Security', icon: AlertTriangle }
    ]}
  ];

  const handleDragStart = (e) => {
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    setDragStart(clientY);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    const offset = clientY - dragStart;
    
    // Only allow downward dragging to close
    if (offset > 0) {
      setDragOffset(offset);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Close if dragged down more than 100px
    if (dragOffset > 100) {
      onClose();
    }
    
    setDragOffset(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl shadow-2xl border-t border-slate-700 max-h-[85vh] overflow-hidden"
        style={{ 
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        <div className="px-6 pb-6 overflow-y-auto max-h-[75vh]">
          {/* Current Archetype Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <CurrentIcon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentConfig?.title}</h2>
                <p className="text-white/70 text-sm">{currentConfig?.subtitle}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white/70 hover:text-white p-2"
            >
              <X size={24} />
            </button>
          </div>



          {/* Archetype Switcher */}
          <div className="mb-6">
            <h3 className="text-white text-lg font-bold mb-4">Switch Archetype</h3>
            {archetypeGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <div className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">{group.label}</div>
                <div className="grid grid-cols-2 gap-2">
                  {group.archetypes.map((type) => {
                    const Icon = type.icon;
                    const typeCards = cards.filter(c => c.type === type.id && c.state !== 'dismissed');
                    const criticalCards = typeCards.filter(c => c.priority === 'critical');
                    const highCards = typeCards.filter(c => c.priority === 'high');
                    const mediumCards = typeCards.filter(c => c.priority === 'medium');
                    const lowCards = typeCards.filter(c => c.priority === 'low');
                    const isActive = activeArchetype === type.id;
                    
                    return (
                      <button 
                        key={type.id} 
                        onClick={() => {
                          onArchetypeChange(type.id);
                          onClose();
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
                          isActive 
                            ? 'bg-blue-600 text-white scale-105' 
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        <Icon size={18} />
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium">{type.label}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {criticalCards.length > 0 && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`${criticalCards.length} Critical Priority Emails\n\nThese emails require immediate attention and action.`);
                              }}
                              className="text-red-400 text-sm font-bold hover:bg-red-500/20 px-1 py-0.5 rounded transition-all"
                            >
                              {criticalCards.length}
                            </button>
                          )}
                          {highCards.length > 0 && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`${highCards.length} High Priority Emails\n\nThese emails are important and should be addressed soon.`);
                              }}
                              className="text-orange-400 text-sm font-bold hover:bg-orange-500/20 px-1 py-0.5 rounded transition-all"
                            >
                              {highCards.length}
                            </button>
                          )}
                          {mediumCards.length > 0 && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`${mediumCards.length} Medium Priority Emails\n\nThese emails can be handled when convenient.`);
                              }}
                              className="text-yellow-400 text-sm font-bold hover:bg-yellow-500/20 px-1 py-0.5 rounded transition-all"
                            >
                              {mediumCards.length}
                            </button>
                          )}
                          {lowCards.length > 0 && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`${lowCards.length} Low Priority Emails\n\nThese emails are informational and can be reviewed later.`);
                              }}
                              className="text-amber-400 text-sm font-bold hover:bg-amber-500/20 px-1 py-0.5 rounded transition-all"
                            >
                              {lowCards.length}
                            </button>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
