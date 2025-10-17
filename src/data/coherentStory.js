// Coherent Demo User Story - Sarah Chen, Working Parent & Professional
// This creates a realistic, consistent persona across all archetypes

export const demoUser = {
  name: 'Sarah Chen',
  email: 'sarah.chen@techcorp.com',
  personal_email: 'sarahc.family@gmail.com',
  
  // Family Details
  family: {
    spouse: { name: 'David Chen', email: 'david.chen@gmail.com' },
    children: [
      { 
        name: 'Emma Chen', 
        age: 8, 
        grade: '3rd Grade', 
        school: 'Riverside Elementary',
        teacher: 'Mrs. Anderson',
        initial: 'E'
      },
      { 
        name: 'Lucas Chen', 
        age: 12, 
        grade: '7th Grade', 
        school: 'Riverside Middle School',
        teacher: 'Mr. Thompson',
        initial: 'L'
      },
      { 
        name: 'Zoe Chen', 
        age: 5, 
        grade: 'Kindergarten', 
        school: 'Little Sprouts Preschool',
        teacher: 'Ms. Rodriguez',
        initial: 'Z'
      }
    ]
  },

  // Professional Details
  work: {
    company: 'TechCorp Solutions',
    position: 'Senior Product Manager',
    team: 'Mobile Innovation',
    manager: 'Jennifer Walsh',
    colleagues: ['Mike Rodriguez', 'Lisa Park', 'James Wilson'],
    clients: [
      { name: 'GlobalTech Industries', contact: 'Robert Kim', value: '$125K', probability: 85 },
      { name: 'Innovate Systems', contact: 'Maria Santos', value: '$89K', probability: 72 },
      { name: 'NextGen Solutions', contact: 'Alex Johnson', value: '$156K', probability: 91 }
    ]
  },

  // Shopping & Lifestyle Preferences
  lifestyle: {
    favoriteStores: ['TechMart', 'ModernHome', 'FashionForward', 'BookNook'],
    travelPreferences: ['United Airlines', 'Marriott Hotels', 'Hertz Rental'],
    subscriptions: ['Netflix', 'Spotify Premium', 'Adobe Creative Suite'],
    interests: ['Photography', 'Hiking', 'Cooking', 'Tech Gadgets']
  },

  // Security & Identity
  security: {
    banks: ['Chase Bank', 'Wells Fargo'],
    creditCards: ['Chase Sapphire', 'American Express'],
    services: ['LastPass', 'Norton Security', 'Apple iCloud']
  }
};

// Helper function to get time ago with realistic timestamps
export const getRealisticTimeAgo = (daysAgo = 0, hoursAgo = 0, minutesAgo = 0) => {
  const now = new Date();
  const targetTime = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
  
  if (daysAgo > 0) {
    return `${daysAgo}d ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo}h ago`;
  } else if (minutesAgo > 5) {
    return `${minutesAgo}m ago`;
  } else {
    return 'Just now';
  }
};

// Coherent email scenarios that tell a story
export const coherentEmailScenarios = {
  // Morning: Urgent family matters
  morning: [
    {
      type: 'caregiver',
      child: 'Emma Chen',
      scenario: 'Field trip permission due today',
      urgency: 'critical',
      timeframe: 'Due by 3 PM'
    },
    {
      type: 'sales_hunter', 
      client: 'GlobalTech Industries',
      scenario: 'Contract renewal meeting moved up',
      urgency: 'high',
      timeframe: 'Meeting in 2 hours'
    }
  ],

  // Afternoon: Business and shopping
  afternoon: [
    {
      type: 'deal_stacker',
      store: 'TechMart',
      scenario: 'Flash sale on photography equipment (Sarah\'s hobby)',
      urgency: 'high',
      timeframe: 'Ends in 4 hours'
    },
    {
      type: 'project_coordinator',
      project: 'Mobile App Launch',
      scenario: 'Team standup notes and action items',
      urgency: 'medium',
      timeframe: 'Review by EOD'
    }
  ],

  // Evening: Personal and family
  evening: [
    {
      type: 'status_seeker',
      service: 'United Airlines',
      scenario: 'Upcoming family vacation check-in available',
      urgency: 'medium',
      timeframe: 'Flight tomorrow morning'
    },
    {
      type: 'identity_manager',
      service: 'Chase Bank',
      scenario: 'Unusual activity detected on family account',
      urgency: 'critical',
      timeframe: 'Immediate action required'
    }
  ]
};
