import React from 'react';
import { ChevronRight } from 'lucide-react';
import { demoUser } from '../data/coherentStory';

export const SplayView = ({ archetype, cards, onSelectGroup, onBack }) => {
  // Define groupings for each archetype
  const getGroupings = () => {
    switch (archetype) {
      case 'caregiver':
        // Group by family member
        return [
          {
            id: 'emma',
            name: 'Emma Chen',
            subtitle: '8 years • 3rd Grade',
            icon: '👧',
            gradient: 'from-pink-400 to-rose-500',
            filter: (card) => card.kid?.name === 'Emma Chen'
          },
          {
            id: 'lucas',
            name: 'Lucas Chen',
            subtitle: '12 years • 7th Grade',
            icon: '👦',
            gradient: 'from-blue-400 to-indigo-500',
            filter: (card) => card.kid?.name === 'Lucas Chen'
          },
          {
            id: 'zoe',
            name: 'Zoe Chen',
            subtitle: '5 years • Kindergarten',
            icon: '👶',
            gradient: 'from-purple-400 to-pink-500',
            filter: (card) => card.kid?.name === 'Zoe Chen'
          },
          {
            id: 'david',
            name: 'David Chen',
            subtitle: 'Spouse',
            icon: '👨',
            gradient: 'from-green-400 to-emerald-500',
            filter: (card) => card.kid?.name === demoUser.family.spouse.name || card.sender?.name === demoUser.family.spouse.name
          },
          {
            id: 'general',
            name: 'General Family',
            subtitle: 'School & Community',
            icon: '🏠',
            gradient: 'from-yellow-400 to-orange-500',
            filter: (card) => card.kid?.name === 'All Children' || !card.kid
          }
        ];

      case 'sales_hunter':
        // Group by client company
        return [
          {
            id: 'globaltech',
            name: 'GlobalTech Industries',
            subtitle: '$125K • 85% Close',
            icon: '🏢',
            gradient: 'from-green-400 to-emerald-500',
            filter: (card) => card.company?.name?.includes('GlobalTech')
          },
          {
            id: 'innovate',
            name: 'Innovate Systems',
            subtitle: '$89K • 72% Close',
            icon: '🚀',
            gradient: 'from-blue-400 to-cyan-500',
            filter: (card) => card.company?.name?.includes('Innovate')
          },
          {
            id: 'nextgen',
            name: 'NextGen Solutions',
            subtitle: '$156K • 91% Close',
            icon: '⚡',
            gradient: 'from-purple-400 to-pink-500',
            filter: (card) => card.company?.name?.includes('NextGen')
          },
          {
            id: 'prospects',
            name: 'New Prospects',
            subtitle: 'Incoming Leads',
            icon: '📊',
            gradient: 'from-orange-400 to-red-500',
            filter: (card) => !card.company?.name
          }
        ];

      case 'deal_stacker':
        // Group by store/brand
        return [
          {
            id: 'techmart',
            name: 'TechMart',
            subtitle: 'Electronics & Gadgets',
            icon: '💻',
            gradient: 'from-blue-400 to-purple-500',
            filter: (card) => card.store === 'TechMart'
          },
          {
            id: 'modernhome',
            name: 'ModernHome',
            subtitle: 'Kitchen & Home',
            icon: '🏠',
            gradient: 'from-green-400 to-teal-500',
            filter: (card) => card.store === 'ModernHome'
          },
          {
            id: 'fashion',
            name: 'Fashion & Apparel',
            subtitle: 'Clothing Stores',
            icon: '👗',
            gradient: 'from-pink-400 to-rose-500',
            filter: (card) => card.store?.includes('Fashion') || card.productImage === 'Apparel'
          },
          {
            id: 'other',
            name: 'Other Deals',
            subtitle: 'Various Merchants',
            icon: '🛍️',
            gradient: 'from-yellow-400 to-orange-500',
            filter: (card) => !['TechMart', 'ModernHome'].includes(card.store)
          }
        ];

      case 'transactional_leader':
        // Group by department/team
        return [
          {
            id: 'direct-reports',
            name: 'Direct Reports',
            subtitle: 'Team Managers',
            icon: '👥',
            gradient: 'from-blue-400 to-indigo-500',
            filter: (card) => card.sender?.name?.includes('Manager') || card.company?.name === demoUser.work.company
          },
          {
            id: 'executives',
            name: 'Executive Team',
            subtitle: 'C-Suite & Directors',
            icon: '👔',
            gradient: 'from-purple-400 to-pink-500',
            filter: (card) => card.sender?.name?.includes(demoUser.work.manager)
          },
          {
            id: 'departments',
            name: 'Departments',
            subtitle: 'Finance, HR, IT',
            icon: '🏢',
            gradient: 'from-teal-400 to-cyan-500',
            filter: (card) => card.sender?.name?.includes('Dept') || card.sender?.name?.includes('Systems')
          }
        ];

      case 'project_coordinator':
        // Group by project
        return [
          {
            id: 'mobile-app',
            name: 'Mobile App Launch',
            subtitle: 'Active Sprint',
            icon: '📱',
            gradient: 'from-blue-400 to-purple-500',
            filter: (card) => card.project?.name?.includes('Mobile')
          },
          {
            id: 'q1-planning',
            name: 'Q1 Planning',
            subtitle: 'Upcoming Quarter',
            icon: '📅',
            gradient: 'from-green-400 to-teal-500',
            filter: (card) => card.project?.name?.includes('Q1')
          },
          {
            id: 'other-projects',
            name: 'Other Projects',
            subtitle: 'Various Initiatives',
            icon: '📋',
            gradient: 'from-orange-400 to-red-500',
            filter: (card) => !card.project?.name?.includes('Mobile') && !card.project?.name?.includes('Q1')
          }
        ];

      case 'enterprise_innovator':
        // Group by content type
        return [
          {
            id: 'workshops',
            name: 'Workshops & Events',
            subtitle: 'Learning Opportunities',
            icon: '🎓',
            gradient: 'from-purple-400 to-pink-500',
            filter: (card) => card.title?.includes('Workshop') || card.title?.includes('Event')
          },
          {
            id: 'research',
            name: 'Research & Reports',
            subtitle: 'Industry Insights',
            icon: '📊',
            gradient: 'from-blue-400 to-cyan-500',
            filter: (card) => card.title?.includes('Report') || card.title?.includes('Research')
          },
          {
            id: 'partnerships',
            name: 'Partnerships',
            subtitle: 'Collaboration Opportunities',
            icon: '🤝',
            gradient: 'from-green-400 to-teal-500',
            filter: (card) => card.title?.includes('Partnership') || card.title?.includes('Collab')
          }
        ];

      case 'status_seeker':
        // Group by travel type
        return [
          {
            id: 'flights',
            name: 'Flights & Airlines',
            subtitle: 'Air Travel',
            icon: '✈️',
            gradient: 'from-sky-400 to-blue-500',
            filter: (card) => card.airline?.includes('Airlines') || card.title?.includes('Flight')
          },
          {
            id: 'hotels',
            name: 'Hotels & Stays',
            subtitle: 'Accommodations',
            icon: '🏨',
            gradient: 'from-purple-400 to-pink-500',
            filter: (card) => card.airline?.includes('Marriott') || card.airline?.includes('Hotel') || card.title?.includes('Resort')
          },
          {
            id: 'car-rental',
            name: 'Car Rental & Transport',
            subtitle: 'Ground Transportation',
            icon: '🚗',
            gradient: 'from-orange-400 to-red-500',
            filter: (card) => card.airline?.includes('Hertz') || card.title?.includes('Rental')
          }
        ];

      case 'identity_manager':
        // Group by service type
        return [
          {
            id: 'banking',
            name: 'Banking & Finance',
            subtitle: 'Financial Accounts',
            icon: '💳',
            gradient: 'from-green-400 to-emerald-500',
            filter: (card) => card.service?.includes('Bank') || card.service?.includes('Chase')
          },
          {
            id: 'security',
            name: 'Security Services',
            subtitle: 'Password & Auth',
            icon: '🔐',
            gradient: 'from-red-400 to-orange-500',
            filter: (card) => card.service?.includes('LastPass') || card.service?.includes('Norton')
          },
          {
            id: 'accounts',
            name: 'Online Accounts',
            subtitle: 'E-commerce & Services',
            icon: '🌐',
            gradient: 'from-blue-400 to-purple-500',
            filter: (card) => card.service && !card.service.includes('Bank') && !card.service.includes('LastPass')
          }
        ];

      default:
        return [];
    }
  };

  const groupings = getGroupings();
  const groupedCards = groupings.map(group => ({
    ...group,
    cards: cards.filter(group.filter),
    count: cards.filter(group.filter).length
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-10">
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={onBack}
            className="text-white/70 hover:text-white flex items-center gap-2 mb-4 transition-colors"
          >
            ← Back to Feed
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Select Category
          </h1>
          <p className="text-white/70 text-sm">
            Tap a pile to view those emails
          </p>
        </div>
      </div>

      {/* Splay Grid */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {groupedCards.map((group) => (
            <button
              key={group.id}
              onClick={() => group.count > 0 && onSelectGroup(group)}
              disabled={group.count === 0}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                group.count > 0
                  ? 'bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/40 hover:scale-105 cursor-pointer'
                  : 'bg-white/5 backdrop-blur-lg border-white/10 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${group.gradient} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
                {group.icon}
              </div>

              {/* Name */}
              <h3 className="text-white font-bold text-lg mb-1">{group.name}</h3>
              <p className="text-white/60 text-sm mb-3">{group.subtitle}</p>

              {/* Email Count Badge */}
              <div className="flex items-center justify-center gap-2">
                <div className={`px-3 py-1 rounded-full font-bold text-sm ${
                  group.count > 0 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/10 text-white/40'
                }`}>
                  {group.count} {group.count === 1 ? 'email' : 'emails'}
                </div>
              </div>

              {/* Arrow indicator */}
              {group.count > 0 && (
                <div className="absolute top-4 right-4">
                  <ChevronRight className="text-white/40" size={20} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
