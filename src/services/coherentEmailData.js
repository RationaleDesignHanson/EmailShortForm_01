import { demoUser, getRealisticTimeAgo } from '../data/coherentStory';

// Coherent mock data for Sarah Chen's realistic email experience
export const getCoherentMockData = () => {
  return [
    // === CAREGIVER ARCHETYPE - Sarah's Family Management ===
    { 
      id: 'cc1', 
      type: 'caregiver', 
      state: 'unseen', 
      priority: 'critical', 
      hpa: 'Sign & Send', 
      kid: demoUser.family.children[0], // Emma Chen, 8, 3rd Grade
      timeAgo: getRealisticTimeAgo(0, 2), 
      title: 'Field Trip Permission - Due Today 3 PM', 
      summary: 'Science Museum visit Friday requires signed permission form and $15 lunch money', 
      metaCTA: 'Swipe Right: Quick Sign & Send', 
      requiresSignature: true, 
      formFields: [
        { label: 'Student Name', autoFillValue: 'Emma Chen' }, 
        { label: 'Parent/Guardian', autoFillValue: 'Sarah Chen' }, 
        { label: 'Emergency Contact', autoFillValue: '(555) 234-5678' }
      ], 
      dataSources: [{ subject: 'URGENT: Field Trip Permission Due Today', from: 'Mrs. Anderson <anderson@riverside-elem.edu>', date: getRealisticTimeAgo(0, 2) }] 
    },
    { 
      id: 'cc2', 
      type: 'caregiver', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Schedule Meeting', 
      kid: demoUser.family.children[1], // Lucas Chen, 12, 7th Grade
      timeAgo: getRealisticTimeAgo(0, 4), 
      title: 'Parent-Teacher Conference Request', 
      summary: 'Mr. Thompson would like to discuss Lucas\'s recent improvement in math and potential advanced placement', 
      metaCTA: 'Swipe Right: Schedule Meeting', 
      dataSources: [{ subject: 'Great News About Lucas - Let\'s Chat!', from: 'Mr. Thompson <thompson@riverside-middle.edu>', date: getRealisticTimeAgo(0, 4) }] 
    },
    { 
      id: 'cc3', 
      type: 'caregiver', 
      state: 'unseen', 
      priority: 'medium', 
      hpa: 'RSVP', 
      kid: demoUser.family.children[2], // Zoe Chen, 5, Kindergarten
      timeAgo: getRealisticTimeAgo(0, 6), 
      title: 'Birthday Party Invitation - Mia\'s 6th Birthday', 
      summary: 'Saturday 2-4 PM at Bounce Zone. Pizza, cake, and fun activities planned!', 
      metaCTA: 'Swipe Right: RSVP Yes', 
      dataSources: [{ subject: 'You\'re Invited! Mia\'s Birthday Party', from: 'Jennifer Park <jpark.family@gmail.com>', date: getRealisticTimeAgo(0, 6) }] 
    },
    { 
      id: 'cc4', 
      type: 'caregiver', 
      state: 'unseen', 
      priority: 'low', 
      hpa: 'Archive', 
      kid: { name: 'All Children', initial: 'A' }, 
      timeAgo: getRealisticTimeAgo(1), 
      title: 'Riverside Schools Weekly Newsletter', 
      summary: 'Upcoming events: Book fair next week, picture day reminders, and cafeteria menu updates', 
      metaCTA: 'Swipe Left: Archive', 
      dataSources: [{ subject: 'Weekly Newsletter - October Edition', from: 'Riverside Schools <newsletter@riverside-schools.edu>', date: getRealisticTimeAgo(1) }] 
    },

    // === SALES HUNTER ARCHETYPE - Sarah's Professional Sales ===
    { 
      id: 'sh1', 
      type: 'sales_hunter', 
      state: 'unseen', 
      priority: 'critical', 
      hpa: 'Join Meeting', 
      company: { name: demoUser.work.clients[0].name, initials: 'GT' }, 
      timeAgo: getRealisticTimeAgo(0, 1), 
      title: 'Contract Renewal Meeting Moved to 2 PM Today', 
      summary: `${demoUser.work.clients[0].contact} moved our ${demoUser.work.clients[0].value} renewal discussion up due to budget approval deadline`, 
      metaCTA: 'Swipe Right: Join Meeting Now', 
      value: demoUser.work.clients[0].value, 
      probability: demoUser.work.clients[0].probability, 
      score: 95,
      dataSources: [{ subject: 'URGENT: Meeting Time Change', from: `${demoUser.work.clients[0].contact} <rkim@globaltech.com>`, date: getRealisticTimeAgo(0, 1) }] 
    },
    { 
      id: 'sh2', 
      type: 'sales_hunter', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Send Proposal', 
      company: { name: demoUser.work.clients[1].name, initials: 'IS' }, 
      timeAgo: getRealisticTimeAgo(0, 3), 
      title: 'Ready for Final Proposal Review', 
      summary: `${demoUser.work.clients[1].contact} confirmed budget approval - requesting final proposal by EOD`, 
      metaCTA: 'Swipe Right: Send Proposal', 
      value: demoUser.work.clients[1].value, 
      probability: demoUser.work.clients[1].probability, 
      score: 88,
      dataSources: [{ subject: 'Green Light for Proposal!', from: `${demoUser.work.clients[1].contact} <msantos@innovatesys.com>`, date: getRealisticTimeAgo(0, 3) }] 
    },
    { 
      id: 'sh3', 
      type: 'sales_hunter', 
      state: 'unseen', 
      priority: 'medium', 
      hpa: 'Schedule Follow-up', 
      company: { name: demoUser.work.clients[2].name, initials: 'NS' }, 
      timeAgo: getRealisticTimeAgo(0, 5), 
      title: 'Post-Demo Follow-up Requested', 
      summary: `${demoUser.work.clients[2].contact} loved yesterday's demo and wants to discuss implementation timeline`, 
      metaCTA: 'Swipe Right: Schedule Call', 
      value: demoUser.work.clients[2].value, 
      probability: demoUser.work.clients[2].probability, 
      score: 92,
      dataSources: [{ subject: 'Fantastic Demo Yesterday!', from: `${demoUser.work.clients[2].contact} <ajohnson@nextgensol.com>`, date: getRealisticTimeAgo(0, 5) }] 
    },

    // === DEAL STACKER ARCHETYPE - Sarah's Shopping Preferences ===
    { 
      id: 'ds1', 
      type: 'deal_stacker', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Claim Deal', 
      store: demoUser.lifestyle.favoriteStores[0], // TechMart
      timeAgo: getRealisticTimeAgo(0, 1), 
      title: 'Flash Sale: Canon Camera Lens (Your Wishlist Item)', 
      productImage: '📷', 
      originalPrice: 899.99, 
      salePrice: 549.99, 
      discount: 39, 
      urgent: true, 
      expiresIn: '4 hours', 
      metaCTA: 'Swipe Right: Buy Now', 
      promoCode: 'PHOTO39', 
      features: ['39% off', 'Free shipping', 'Your wishlist'], 
      dataSources: [{ subject: 'Your Wishlist Item is ON SALE!', from: 'deals@techmart.com', date: getRealisticTimeAgo(0, 1) }] 
    },
    { 
      id: 'ds2', 
      type: 'deal_stacker', 
      state: 'unseen', 
      priority: 'medium', 
      hpa: 'Compare Prices', 
      store: demoUser.lifestyle.favoriteStores[1], // ModernHome
      timeAgo: getRealisticTimeAgo(0, 3), 
      title: 'Kitchen Upgrade Sale - Stand Mixer 40% Off', 
      productImage: '🍰', 
      originalPrice: 399.99, 
      salePrice: 239.99, 
      discount: 40, 
      urgent: false, 
      expiresIn: '2 days', 
      metaCTA: 'Swipe Right: Compare & Buy', 
      features: ['Perfect for baking', 'Multiple attachments'], 
      dataSources: [{ subject: 'Kitchen Essentials Sale', from: 'offers@modernhome.com', date: getRealisticTimeAgo(0, 3) }] 
    },
    { 
      id: 'ds3', 
      type: 'deal_stacker', 
      state: 'unseen', 
      priority: 'low', 
      hpa: 'Not Interested', 
      store: 'FashionForward', 
      timeAgo: getRealisticTimeAgo(1), 
      title: 'Fall Wardrobe Refresh - 30% Off Everything', 
      productImage: '👗', 
      originalPrice: 159.99, 
      salePrice: 111.99, 
      discount: 30, 
      urgent: false, 
      expiresIn: '1 week', 
      metaCTA: 'Swipe Left: Not Now', 
      features: ['Seasonal styles', 'Free returns'], 
      dataSources: [{ subject: 'Fall Collection Sale', from: 'style@fashionforward.com', date: getRealisticTimeAgo(1) }] 
    },

    // === STATUS SEEKER ARCHETYPE - Sarah's Travel & Lifestyle ===
    { 
      id: 'ss1', 
      type: 'status_seeker', 
      state: 'unseen', 
      priority: 'critical', 
      hpa: 'Check In Now', 
      airline: demoUser.lifestyle.travelPreferences[0], // United Airlines
      timeAgo: getRealisticTimeAgo(0, 2), 
      title: 'Family Vacation Check-in Available - Upgrade Offer', 
      summary: 'Flight UA 1847 to Orlando tomorrow 8:30 AM - Premium seats available for family of 5', 
      metaCTA: 'Swipe Right: Check In & Upgrade', 
      flightDetails: { number: 'UA 1847', from: 'SFO', to: 'MCO', date: 'Tomorrow 8:30 AM', passengers: 5 }, 
      dataSources: [{ subject: 'Check-in Now Available + Upgrade Offer', from: 'checkin@united.com', date: getRealisticTimeAgo(0, 2) }] 
    },
    { 
      id: 'ss2', 
      type: 'status_seeker', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Book Now', 
      airline: demoUser.lifestyle.travelPreferences[1], // Marriott Hotels
      timeAgo: getRealisticTimeAgo(0, 4), 
      title: 'Orlando Resort Upgrade Available', 
      summary: 'Complimentary suite upgrade for your Disney World family trip - 2-bedroom villa with kitchen', 
      metaCTA: 'Swipe Right: Accept Upgrade', 
      dataSources: [{ subject: 'Complimentary Suite Upgrade Offer', from: 'rewards@marriott.com', date: getRealisticTimeAgo(0, 4) }] 
    },

    // === IDENTITY MANAGER ARCHETYPE - Sarah's Security & Accounts ===
    { 
      id: 'im1', 
      type: 'identity_manager', 
      state: 'unseen', 
      priority: 'critical', 
      hpa: 'Verify Now', 
      service: demoUser.security.banks[0], // Chase Bank
      timeAgo: getRealisticTimeAgo(0, 1), 
      title: 'Unusual Activity Detected - Family Account', 
      summary: 'Large purchase attempt from Orlando, FL - $2,847 at Disney Store. Was this you?', 
      metaCTA: 'Swipe Right: Verify Purchase', 
      security: true,
      dataSources: [{ subject: 'SECURITY ALERT: Verify Transaction', from: 'security@chase.com', date: getRealisticTimeAgo(0, 1) }] 
    },
    { 
      id: 'im2', 
      type: 'identity_manager', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Update Password', 
      service: demoUser.security.services[0], // LastPass
      timeAgo: getRealisticTimeAgo(0, 3), 
      title: 'Password Security Checkup Complete', 
      summary: 'Found 12 weak passwords and 3 compromised accounts. One-click fix available.', 
      metaCTA: 'Swipe Right: Fix Passwords', 
      dataSources: [{ subject: 'Security Checkup Results', from: 'security@lastpass.com', date: getRealisticTimeAgo(0, 3) }] 
    },

    // === TRANSACTIONAL LEADER ARCHETYPE - Sarah's Executive Work ===
    { 
      id: 'tl1', 
      type: 'transactional_leader', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Review & Approve', 
      company: { name: demoUser.work.company, initials: 'TC' }, 
      timeAgo: getRealisticTimeAgo(0, 2), 
      title: 'Q4 Budget Approval Required - Mobile Team', 
      summary: `${demoUser.work.manager} needs your approval for $340K mobile innovation budget before board meeting`, 
      metaCTA: 'Swipe Right: Review & Approve', 
      dataSources: [{ subject: 'URGENT: Q4 Budget Approval Needed', from: `${demoUser.work.manager} <jwalsh@techcorp.com>`, date: getRealisticTimeAgo(0, 2) }] 
    },
    { 
      id: 'tl2', 
      type: 'transactional_leader', 
      state: 'unseen', 
      priority: 'medium', 
      hpa: 'Delegate Task', 
      company: { name: demoUser.work.company, initials: 'TC' }, 
      timeAgo: getRealisticTimeAgo(0, 4), 
      title: 'Client Presentation Deck - Final Review', 
      summary: `${demoUser.work.colleagues[0]} completed the GlobalTech presentation deck for tomorrow's meeting`, 
      metaCTA: 'Swipe Right: Review & Delegate', 
      dataSources: [{ subject: 'Presentation Ready for Review', from: `${demoUser.work.colleagues[0]} <mrodriguez@techcorp.com>`, date: getRealisticTimeAgo(0, 4) }] 
    },

    // === PROJECT COORDINATOR ARCHETYPE - Sarah's Team Management ===
    { 
      id: 'pc1', 
      type: 'project_coordinator', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Update Timeline', 
      project: { name: 'Mobile App Launch', initials: 'MA' }, 
      timeAgo: getRealisticTimeAgo(0, 1), 
      title: 'Sprint Review Complete - 2 Blockers Identified', 
      summary: `${demoUser.work.colleagues[1]} reports API integration delayed, ${demoUser.work.colleagues[2]} needs design approval`, 
      metaCTA: 'Swipe Right: Address Blockers', 
      dataSources: [{ subject: 'Sprint Review: Action Items', from: `${demoUser.work.colleagues[1]} <lpark@techcorp.com>`, date: getRealisticTimeAgo(0, 1) }] 
    },
    { 
      id: 'pc2', 
      type: 'project_coordinator', 
      state: 'unseen', 
      priority: 'medium', 
      hpa: 'Schedule Meeting', 
      project: { name: 'Q1 Planning', initials: 'Q1' }, 
      timeAgo: getRealisticTimeAgo(0, 3), 
      title: 'Stakeholder Alignment Session Needed', 
      summary: 'Marketing and Engineering have different Q1 priorities - need alignment meeting this week', 
      metaCTA: 'Swipe Right: Schedule Alignment', 
      dataSources: [{ subject: 'Q1 Priority Alignment Needed', from: `${demoUser.work.colleagues[2]} <jwilson@techcorp.com>`, date: getRealisticTimeAgo(0, 3) }] 
    },

    // === ENTERPRISE INNOVATOR / LEARNING ARCHETYPE - Sarah's Growth ===
    { 
      id: 'ei1', 
      type: 'enterprise_innovator', 
      state: 'unseen', 
      priority: 'medium', 
      hpa: 'Save for Later', 
      source: { name: 'MIT Tech Review', initials: 'MT' }, 
      timeAgo: getRealisticTimeAgo(0, 6), 
      title: 'AI Product Management Trends - Q4 2024 Report', 
      summary: 'How leading product teams are integrating AI into mobile experiences - 47-page deep dive', 
      metaCTA: 'Swipe Left: Save for Deep Read', 
      dataSources: [{ subject: 'AI in Product Management Report', from: 'newsletter@technologyreview.com', date: getRealisticTimeAgo(0, 6) }] 
    },
    { 
      id: 'ei2', 
      type: 'enterprise_innovator', 
      state: 'unseen', 
      priority: 'high', 
      hpa: 'Register Now', 
      source: { name: 'Stanford Innovation', initials: 'SI' }, 
      timeAgo: getRealisticTimeAgo(0, 8), 
      title: 'Executive AI Workshop - Limited Seats Available', 
      summary: 'Stanford\'s 2-day intensive on AI strategy for product leaders. Dec 14-15, only 20 spots left.', 
      metaCTA: 'Swipe Right: Register Now', 
      dataSources: [{ subject: 'Last Call: AI Strategy Workshop', from: 'executive-ed@stanford.edu', date: getRealisticTimeAgo(0, 8) }] 
    }
  ];
};
