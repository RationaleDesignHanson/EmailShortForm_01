import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Mock data import (for demo mode)
const generateMockEmails = () => {
  const getTimeAgo = (daysAgo, hoursAgo = 0) => {
    if (daysAgo === 0 && hoursAgo < 1) return 'Just now';
    if (daysAgo === 0) return hoursAgo + 'h ago';
    if (daysAgo === 1) return 'Yesterday';
    if (daysAgo < 7) return daysAgo + 'd ago';
    return Math.floor(daysAgo / 7) + 'w ago';
  };

  return [
    // Sample emails for demo - using the same data from App.js
    { id: 'demo-1', type: 'caregiver', state: 'unseen', priority: 'critical', hpa: 'Sign & Send', kid: { name: 'Sophie Martinez', initial: 'S', grade: '3rd Grade' }, timeAgo: getTimeAgo(0, 2), title: 'Field Trip Permission - Due Wednesday', summary: 'Museum visit Friday requires signed form by Wed 5 PM', metaCTA: 'Swipe Right: Quick Sign & Send', requiresSignature: true, formFields: [{ label: 'Student Name', autoFillValue: 'Sophie Martinez' }, { label: 'Parent/Guardian', autoFillValue: 'Parent Name' }, { label: 'Emergency Contact', autoFillValue: '(555) 123-4567' }], dataSources: [{ subject: 'Field Trip Permission', from: 'Mrs. Anderson', date: getTimeAgo(0, 2) }] }
  ];
};

class EmailAdapter {
  constructor() {
    this.demoMode = true;
    this.userEmail = null;
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Toggle between demo and real data
  setDemoMode(enabled) {
    this.demoMode = enabled;
  }

  // Set user email for real data mode
  setUserEmail(email) {
    this.userEmail = email;
  }

  // Get emails (demo or real)
  async getEmails(maxResults = 50) {
    if (this.demoMode) {
      console.log('📧 Using demo mode - loading mock emails');
      return this.getFullMockData();
    }

    if (!this.userEmail) {
      throw new Error('User email not set for real data mode');
    }

    console.log(`📧 Fetching real emails for: ${this.userEmail}`);

    try {
      const response = await this.apiClient.get(`/api/users/${this.userEmail}/emails`, {
        params: { maxResults }
      });
      
      console.log(`📧 Received ${response.data.emails?.length || 0} emails from backend`);
      return this.transformBackendEmails(response.data.emails || []);
    } catch (error) {
      console.error('❌ Error fetching real emails:', error.message);
      console.log('🔄 Falling back to demo mode');
      // Fallback to demo mode on error
      this.demoMode = true;
      return this.getFullMockData();
    }
  }

  // Get full mock data (all archetypes)
  getFullMockData() {
    // Import the full mock data from App.js generateInitialCards
    const getTimeAgo = (daysAgo, hoursAgo = 0) => {
      if (daysAgo === 0 && hoursAgo < 1) return 'Just now';
      if (daysAgo === 0) return hoursAgo + 'h ago';
      if (daysAgo === 1) return 'Yesterday';
      if (daysAgo < 7) return daysAgo + 'd ago';
      return Math.floor(daysAgo / 7) + 'w ago';
    };

    return [
      // P1: Transactional Leader (3 emails)
      { id: 'tl1', type: 'transactional_leader', state: 'unseen', priority: 'critical', hpa: 'Review & Approve', sender: { name: 'Finance Dept', initial: 'F' }, timeAgo: getTimeAgo(0, 1), title: 'Q4 Budget Approval Required', summary: 'Department budget requests need executive sign-off by EOD', metaCTA: 'Swipe Right: Quick Approve', dataSources: [{ subject: 'Budget Approval', from: 'finance@company.com', date: getTimeAgo(0, 1) }] },
      { id: 'tl2', type: 'transactional_leader', state: 'unseen', priority: 'high', hpa: 'Auto-Route', sender: { name: 'HR Systems', initial: 'H' }, timeAgo: getTimeAgo(0, 3), title: 'New Hire Onboarding - Sarah Chen', summary: 'Final approval needed for new Engineering Manager start date', metaCTA: 'Swipe Right: Delegate to HR', dataSources: [{ subject: 'Onboarding Approval', from: 'hr@company.com', date: getTimeAgo(0, 3) }] },
      { id: 'tl3', type: 'transactional_leader', state: 'unseen', priority: 'low', hpa: 'File for Reference', sender: { name: 'IT Updates', initial: 'I' }, timeAgo: getTimeAgo(2), title: 'Monthly Security Report', summary: 'Routine security metrics and system updates for your review', metaCTA: 'Swipe Left: File for Reference', dataSources: [{ subject: 'Security Report', from: 'security@company.com', date: getTimeAgo(2) }] },

      // P2: Sales Hunter (3 emails)
      { id: 'sh1', type: 'sales_hunter', state: 'unseen', priority: 'critical', hpa: 'Schedule Demo', company: { name: 'TechCorp Industries', initials: 'TC' }, industry: 'SaaS', timeAgo: getTimeAgo(0, 3), score: 95, value: '$85K', probability: 90, contact: { name: 'Sarah Chen', initials: 'SC', role: 'VP Operations' }, summary: 'Ready to schedule demo, budget approved, decision timeline confirmed', metaCTA: 'Swipe Right: Send Demo Times', dataSources: [{ subject: 'Ready to Move Forward', from: 'sarah.chen@techcorp.com', date: getTimeAgo(0, 3) }] },
      { id: 'sh2', type: 'sales_hunter', state: 'unseen', priority: 'critical', hpa: 'Route to CRM', company: { name: 'DataFlow Systems', initials: 'DF' }, industry: 'Analytics', timeAgo: getTimeAgo(0, 5), score: 88, value: '$120K', probability: 85, contact: { name: 'James Wilson', initials: 'JW', role: 'CTO' }, summary: 'RFP due Friday - requesting proposal submission', metaCTA: 'Swipe Right: Route to CRM & Tag Urgent', dataSources: [{ subject: 'RFP Submission', from: 'j.wilson@dataflow.com', date: getTimeAgo(0, 5) }] },
      { id: 'sh3', type: 'sales_hunter', state: 'unseen', priority: 'medium', hpa: 'Follow Up', company: { name: 'StartupCo', initials: 'SC' }, industry: 'Tech', timeAgo: getTimeAgo(1), score: 72, value: '$45K', probability: 60, contact: { name: 'Alex Kim', initials: 'AK', role: 'Founder' }, summary: 'Initial interest expressed, needs follow-up call', metaCTA: 'Swipe Right: Schedule Follow-Up', dataSources: [{ subject: 'Re: Demo Request', from: 'alex@startupco.io', date: getTimeAgo(1) }] },

      // P3: Project Coordinator (2 emails)
      { id: 'pc1', type: 'project_coordinator', state: 'unseen', priority: 'critical', hpa: 'Schedule Review', project: { name: 'Website Redesign', code: 'WR-2024' }, client: { name: 'Acme Corp', initials: 'AC' }, timeAgo: getTimeAgo(0, 2), title: 'Client Milestone Review - Due Friday', summary: 'Design mockups need approval before development phase begins', metaCTA: 'Swipe Right: Schedule Review', dataSources: [{ subject: 'Milestone Approval', from: 'client@acme.com', date: getTimeAgo(0, 2) }] },
      { id: 'pc2', type: 'project_coordinator', state: 'unseen', priority: 'high', hpa: 'File by Project', project: { name: 'Mobile App Launch', code: 'MAL-2024' }, client: { name: 'Beta Users', initials: 'B' }, timeAgo: getTimeAgo(0, 4), title: 'Beta Testing Feedback Summary', summary: '47 users submitted feedback, 3 critical bugs identified', metaCTA: 'Swipe Left: Tag & File by Project', dataSources: [{ subject: 'Beta Feedback', from: 'testing@company.com', date: getTimeAgo(0, 4) }] },

      // P4: Enterprise Innovator / Learning (2 emails)
      { id: 'ei1', type: 'enterprise_innovator', state: 'unseen', priority: 'medium', hpa: 'Save for Later', source: { name: 'MIT Tech Review', initials: 'MT' }, timeAgo: getTimeAgo(1), title: 'AI Trends Report Q4 2024', summary: 'Comprehensive analysis of emerging AI technologies and market applications', metaCTA: 'Swipe Left: Save for Deep Read', dataSources: [{ subject: 'Industry Newsletter', from: 'newsletter@mittr.com', date: getTimeAgo(1) }] },
      { id: 'ei2', type: 'enterprise_innovator', state: 'unseen', priority: 'high', hpa: 'Express Interest', source: { name: 'Innovation Labs', initials: 'IL' }, timeAgo: getTimeAgo(0, 6), title: 'Partnership Opportunity - Stanford Research', summary: 'Joint research proposal on next-gen ML applications', metaCTA: 'Swipe Right: Express Interest', dataSources: [{ subject: 'Partnership Inquiry', from: 'labs@stanford.edu', date: getTimeAgo(0, 6) }] },

      // C1: Caregiver (3 emails)
      { id: 'cc1', type: 'caregiver', state: 'unseen', priority: 'critical', hpa: 'Sign & Send', kid: { name: 'Sophie Martinez', initial: 'S', grade: '3rd Grade' }, timeAgo: getTimeAgo(0, 2), title: 'Field Trip Permission - Due Wednesday', summary: 'Museum visit Friday requires signed form by Wed 5 PM', metaCTA: 'Swipe Right: Quick Sign & Send', requiresSignature: true, formFields: [{ label: 'Student Name', autoFillValue: 'Sophie Martinez' }, { label: 'Parent/Guardian', autoFillValue: 'Parent Name' }, { label: 'Emergency Contact', autoFillValue: '(555) 123-4567' }], dataSources: [{ subject: 'Field Trip Permission', from: 'Mrs. Anderson', date: getTimeAgo(0, 2) }] },
      { id: 'cc2', type: 'caregiver', state: 'unseen', priority: 'high', hpa: 'Acknowledge', kid: { name: 'Max Rodriguez', initial: 'M', grade: '6th Grade' }, timeAgo: getTimeAgo(0, 5), title: 'Assignment Past Due - Math Homework', summary: 'Homework from last week not submitted, submit by Friday for partial credit', metaCTA: 'Swipe Right: Acknowledge & Confirm', dataSources: [{ subject: 'Missing Assignment Alert', from: 'Mr. Thompson', date: getTimeAgo(0, 5) }] },
      { id: 'cc3', type: 'caregiver', state: 'unseen', priority: 'low', hpa: 'Archive', kid: { name: 'Sophie Martinez', initial: 'S', grade: '3rd Grade' }, timeAgo: getTimeAgo(3), title: 'Weekly Newsletter', summary: 'School newsletter with upcoming events and general announcements', metaCTA: 'Swipe Left: Archive', dataSources: [{ subject: 'Weekly Newsletter', from: 'newsletter@school.edu', date: getTimeAgo(3) }] },

      // C2: Deal Stacker (3 emails)
      { id: 'ds1', type: 'deal_stacker', state: 'unseen', priority: 'high', hpa: 'Claim Deal', store: 'TechMart', timeAgo: getTimeAgo(0, 1), title: 'Flash Sale: Premium Headphones', productImage: 'Headphones', aiBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', originalPrice: 299.99, salePrice: 149.99, discount: 50, urgent: true, expiresIn: '6 hours', metaCTA: 'Swipe Right: Claim Deal Now', promoCode: 'AUDIO50', features: ['50% off', 'Free shipping'], dataSources: [{ subject: 'FLASH SALE', from: 'deals@techmart.com', date: getTimeAgo(0, 1) }] },
      { id: 'ds2', type: 'deal_stacker', state: 'unseen', priority: 'low', hpa: 'Not Interested', store: 'FashionHub', timeAgo: getTimeAgo(1), title: 'Extra 30% Off Fall Collection', productImage: 'Apparel', aiBackground: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', originalPrice: 120.00, salePrice: 59.99, discount: 50, urgent: false, expiresIn: '3 days', metaCTA: 'Swipe Left: Dismiss', features: ['Stacks with sale', 'Free shipping $50+'], dataSources: [{ subject: 'Fall Sale', from: 'style@fashionhub.com', date: getTimeAgo(1) }] },
      { id: 'ds3', type: 'deal_stacker', state: 'unseen', priority: 'medium', hpa: 'Compare Prices', store: 'ElectroWorld', timeAgo: getTimeAgo(0, 8), title: 'Limited Time: 4K Monitor Deal', productImage: 'Monitor', aiBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', originalPrice: 899.99, salePrice: 549.99, discount: 39, urgent: false, expiresIn: '2 days', metaCTA: 'Swipe Right: Compare & Buy', dataSources: [{ subject: 'Monitor Deal Alert', from: 'deals@electroworld.com', date: getTimeAgo(0, 8) }] },

      // C3: Status Seeker (2 emails)
      { id: 'ss1', type: 'status_seeker', state: 'unseen', priority: 'critical', hpa: 'Check In Now', airline: 'United Airlines', timeAgo: getTimeAgo(0, 1), title: 'Flight Check-in Available - SFO to NYC', summary: 'Check in now for tomorrow\'s 6:45 AM departure, upgrade available', metaCTA: 'Swipe Right: Check In & Upgrade', flightDetails: { number: 'UA 1234', from: 'SFO', to: 'JFK', date: 'Tomorrow 6:45 AM' }, dataSources: [{ subject: 'Check-in Available', from: 'united@airlines.com', date: getTimeAgo(0, 1) }] },
      { id: 'ss2', type: 'status_seeker', state: 'unseen', priority: 'high', hpa: 'Enroll Now', airline: 'Marriott Bonvoy', timeAgo: getTimeAgo(0, 3), title: 'Elite Status Challenge Opportunity', summary: 'Fast-track to Platinum status with 10 qualifying stays', metaCTA: 'Swipe Right: Enroll Now', dataSources: [{ subject: 'Status Challenge', from: 'bonvoy@marriott.com', date: getTimeAgo(0, 3) }] },

      // C4: Identity Manager (2 emails)
      { id: 'idm1', type: 'identity_manager', state: 'unseen', priority: 'critical', hpa: 'Verify Identity', service: 'Amazon', timeAgo: getTimeAgo(0, 0), title: 'Password Reset Request', summary: 'Someone requested a password reset for your account', metaCTA: 'Swipe Right: Verify Identity', security: true, expiresIn: '15 minutes', dataSources: [{ subject: 'Password Reset', from: 'security@amazon.com', date: getTimeAgo(0, 0) }] },
      { id: 'idm2', type: 'identity_manager', state: 'unseen', priority: 'high', hpa: 'Confirm or Deny', service: 'PayPal', timeAgo: getTimeAgo(0, 2), title: 'New Device Login Detected', summary: 'Login from iPhone in San Francisco, CA', metaCTA: 'Swipe Right: Confirm or Deny', security: true, dataSources: [{ subject: 'Security Alert', from: 'security@paypal.com', date: getTimeAgo(0, 2) }] }
    ];
  }

  // Transform backend email format to SwipeFeed format
  transformBackendEmails(backendEmails) {
    return backendEmails.map(email => ({
      id: email.id,
      type: this.mapToArchetype(email),
      state: 'unseen',
      priority: this.determinePriority(email),
      hpa: this.generateHPA(email),
      timeAgo: this.formatTimeAgo(email.internalDate),
      title: email.subject || 'No Subject',
      summary: email.denoisedSnippet || email.snippet || 'No preview available',
      metaCTA: this.generateMetaCTA(email),
      dataSources: [{
        subject: email.subject,
        from: email.from,
        date: email.date
      }],
      // Add archetype-specific fields based on email content
      ...this.extractArchetypeFields(email)
    }));
  }

  // Map email to archetype (simplified - would use AI classification in production)
  mapToArchetype(email) {
    const subject = (email.subject || '').toLowerCase();
    const from = (email.from || '').toLowerCase();
    
    if (subject.includes('field trip') || subject.includes('school') || from.includes('school')) {
      return 'caregiver';
    }
    if (subject.includes('demo') || subject.includes('sales') || from.includes('sales')) {
      return 'sales_hunter';
    }
    if (subject.includes('budget') || subject.includes('approval') || from.includes('finance')) {
      return 'transactional_leader';
    }
    if (subject.includes('deal') || subject.includes('sale') || from.includes('deals')) {
      return 'deal_stacker';
    }
    if (subject.includes('flight') || subject.includes('check-in') || from.includes('airlines')) {
      return 'status_seeker';
    }
    if (subject.includes('password') || subject.includes('security') || from.includes('security')) {
      return 'identity_manager';
    }
    if (subject.includes('project') || subject.includes('milestone') || from.includes('client')) {
      return 'project_coordinator';
    }
    
    return 'enterprise_innovator'; // Default to learning
  }

  // Determine priority based on email content
  determinePriority(email) {
    const subject = (email.subject || '').toLowerCase();
    const snippet = (email.snippet || '').toLowerCase();
    
    if (subject.includes('urgent') || subject.includes('asap') || subject.includes('immediate')) {
      return 'critical';
    }
    if (subject.includes('important') || subject.includes('due') || snippet.includes('deadline')) {
      return 'high';
    }
    if (subject.includes('fyi') || subject.includes('newsletter') || subject.includes('update')) {
      return 'low';
    }
    
    return 'medium'; // Default
  }

  // Generate High Priority Action
  generateHPA(email) {
    const archetype = this.mapToArchetype(email);
    const priority = this.determinePriority(email);
    
    if (priority === 'critical') {
      switch (archetype) {
        case 'caregiver': return 'Sign & Send';
        case 'sales_hunter': return 'Schedule Demo';
        case 'transactional_leader': return 'Review & Approve';
        case 'identity_manager': return 'Verify Identity';
        default: return 'Take Action';
      }
    }
    
    switch (archetype) {
      case 'caregiver': return 'Acknowledge';
      case 'sales_hunter': return 'Route to CRM';
      case 'transactional_leader': return 'Auto-Route';
      case 'deal_stacker': return 'Claim Deal';
      case 'status_seeker': return 'Check In Now';
      case 'identity_manager': return 'Confirm or Deny';
      case 'project_coordinator': return 'File by Project';
      case 'enterprise_innovator': return 'Save for Later';
      default: return 'Review';
    }
  }

  // Generate meta-CTA
  generateMetaCTA(email) {
    const hpa = this.generateHPA(email);
    const archetype = this.mapToArchetype(email);
    
    if (archetype === 'deal_stacker' || archetype === 'status_seeker') {
      return `Swipe Right: ${hpa}`;
    }
    
    return `Swipe Right: ${hpa}`;
  }

  // Extract archetype-specific fields
  extractArchetypeFields(email) {
    const archetype = this.mapToArchetype(email);
    const fields = {};
    
    // Add archetype-specific data extraction logic here
    // For now, return basic structure
    
    return fields;
  }

  // Format timestamp
  formatTimeAgo(internalDate) {
    if (!internalDate) return 'Unknown';
    
    const emailDate = new Date(parseInt(internalDate));
    const now = new Date();
    const diffMs = now - emailDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  }

  // Check if user has valid credentials
  async checkAuthentication(userEmail) {
    try {
      const response = await this.apiClient.get(`/api/users/${userEmail}/status`);
      return response.data.hasCredentials;
    } catch (error) {
      return false;
    }
  }

  // Get available user accounts
  async getAvailableAccounts() {
    try {
      // This would list available credential files
      // For now, return the known accounts from your setup
      return [
        { email: 'hanson@rationalework', displayName: 'Hanson (Work)' },
        { email: 'thematthanson@gmail.com', displayName: 'Matt (Personal)' }
      ];
    } catch (error) {
      return [];
    }
  }

  // Process emails through backend pipeline
  async processEmails(userEmail, options = {}) {
    try {
      const response = await this.apiClient.post(`/api/users/${userEmail}/process`, {
        maxEmails: options.maxEmails || 50,
        outputFormats: ['card'],
        includeMultipleFormats: false
      });
      
      return response.data;
    } catch (error) {
      console.error('Error processing emails:', error);
      throw error;
    }
  }
}

export default new EmailAdapter();
