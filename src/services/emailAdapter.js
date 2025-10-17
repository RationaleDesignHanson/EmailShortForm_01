import axios from 'axios';
import { getCoherentMockData } from './coherentEmailData';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Mock data handled in getFullMockData method

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

  // Get full mock data (all archetypes) - now using coherent story
  getFullMockData() {
    return getCoherentMockData();
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
    // For now, return basic structure
    // TODO: Add archetype-specific data extraction logic
    return {};
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
    // Return the known accounts from your setup
    return [
      { email: 'hanson@rationalework', displayName: 'Hanson (Work)' },
      { email: 'thematthanson@gmail.com', displayName: 'Matt (Personal)' }
    ];
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

const emailAdapter = new EmailAdapter();
export default emailAdapter;
