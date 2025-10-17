// AI Image Generation Service using Gemini API
class ImageGenerator {
  constructor() {
    this.cache = new Map(); // Simple in-memory cache
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  }

  // Generate contextual background image for email card
  async generateBackground(email) {
    const cacheKey = `${email.type}-${email.priority}-${email.id}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Generate enhanced gradient (always use enhanced, not fallback)
    const enhancedBackground = this.getEnhancedBackground(email.type, email.priority);
    
    console.log(`🎨 Generated background for ${email.type}:`, enhancedBackground);
    
    this.cache.set(cacheKey, enhancedBackground);
    return enhancedBackground;
  }

  // Create contextual prompt for AI image generation
  createImagePrompt(email) {
    const basePrompt = "Abstract, professional background image, soft focus, ";
    
    switch (email.type) {
      case 'caregiver':
        return basePrompt + "warm family colors, school/education theme, soft pastels, nurturing atmosphere";
      case 'sales_hunter':
        return basePrompt + "business growth theme, upward trends, professional blue/green tones, success imagery";
      case 'transactional_leader':
        return basePrompt + "executive/corporate theme, clean lines, authoritative colors, leadership imagery";
      case 'project_coordinator':
        return basePrompt + "collaboration theme, timeline/milestone imagery, organized patterns, team colors";
      case 'enterprise_innovator':
        return basePrompt + "innovation/learning theme, bright inspiring colors, knowledge/growth imagery";
      case 'deal_stacker':
        return basePrompt + "commerce/shopping theme, vibrant deal colors, savings/value imagery";
      case 'status_seeker':
        return basePrompt + "travel/luxury theme, premium colors, journey/destination imagery";
      case 'identity_manager':
        return basePrompt + "security/tech theme, protective colors, shield/lock imagery, trust elements";
      default:
        return basePrompt + "neutral professional theme, calming colors";
    }
  }

  // Enhanced gradients with content-aware variations
  getEnhancedBackground(archetype, priority, cardContent = '') {
    // Base gradients per archetype with priority variations
    const archetypeGradients = {
      caregiver: {
        critical: 'linear-gradient(135deg, #ef4444 0%, #dc2626 30%, #f97316 70%, #ea580c 100%)', // Red/orange urgency
        high: 'linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #f093fb 70%, #ec4899 100%)', // Warm attention
        medium: 'linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)', // Purple/pink family
        low: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 30%, #c084fc 70%, #e9d5ff 100%)' // Soft purple
      },
      sales_hunter: {
        critical: 'linear-gradient(135deg, #22c55e 0%, #16a34a 30%, #84cc16 70%, #65a30d 100%)', // Bright green (money)
        high: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #06b6d4 70%, #0891b2 100%)', // Strong blue
        medium: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 30%, #43e97b 70%, #38f9d7 100%)', // Cyan/green growth
        low: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 30%, #8b5cf6 70%, #7c3aed 100%)' // Soft blue
      },
      transactional_leader: {
        critical: 'linear-gradient(135deg, #1e293b 0%, #0f172a 30%, #581c87 70%, #3b0764 100%)', // Dark authority
        high: 'linear-gradient(135deg, #475569 0%, #334155 30%, #667eea 70%, #5b21b6 100%)', // Slate/purple
        medium: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)', // Purple executive
        low: 'linear-gradient(135deg, #64748b 0%, #475569 30%, #94a3b8 70%, #cbd5e1 100%)' // Soft slate
      },
      project_coordinator: {
        critical: 'linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #f97316 70%, #ea580c 100%)', // Orange urgency
        high: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 30%, #14b8a6 70%, #0d9488 100%)', // Teal/cyan
        medium: 'linear-gradient(135deg, #f093fb 0%, #f5576c 30%, #4facfe 70%, #00f2fe 100%)', // Pink/blue collab
        low: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 30%, #c4b5fd 70%, #ddd6fe 100%)' // Soft purple/blue
      },
      enterprise_innovator: {
        critical: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #fb923c 70%, #f97316 100%)', // Golden opportunity
        high: 'linear-gradient(135deg, #c084fc 0%, #a855f7 30%, #e879f9 70%, #f0abfc 100%)', // Bright purple/pink
        medium: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 30%, #f093fb 70%, #667eea 100%)', // Mint/pink innovation
        low: 'linear-gradient(135deg, #ddd6fe 0%, #e9d5ff 30%, #fae8ff 70%, #fdf4ff 100%)' // Soft pastels
      },
      deal_stacker: {
        critical: 'linear-gradient(135deg, #ef4444 0%, #dc2626 30%, #fbbf24 70%, #f59e0b 100%)', // Red/gold URGENT DEAL
        high: 'linear-gradient(135deg, #22c55e 0%, #16a34a 30%, #84cc16 70%, #65a30d 100%)', // Green savings
        medium: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 30%, #667eea 70%, #764ba2 100%)', // Pink/yellow deals
        low: 'linear-gradient(135deg, #fde68a 0%, #fcd34d 30%, #fbbf24 70%, #f59e0b 100%)' // Soft yellow
      },
      status_seeker: {
        critical: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #f97316 70%, #ea580c 100%)', // Gold premium
        high: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 30%, #a855f7 70%, #9333ea 100%)', // Sky blue/purple
        medium: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 30%, #f093fb 70%, #f5576c 100%)', // Cyan/pink luxury
        low: 'linear-gradient(135deg, #bae6fd 0%, #7dd3fc 30%, #ddd6fe 70%, #e9d5ff 100%)' // Soft sky/lavender
      },
      identity_manager: {
        critical: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 30%, #991b1b 70%, #7f1d1d 100%)', // Deep red alert
        high: 'linear-gradient(135deg, #f97316 0%, #ea580c 30%, #dc2626 70%, #b91c1c 100%)', // Orange/red warning
        medium: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 30%, #667eea 70%, #764ba2 100%)', // Yellow/teal security
        low: 'linear-gradient(135deg, #fde047 0%, #facc15 30%, #fef08a 70%, #fef9c3 100%)' // Soft yellow
      }
    };

    const priorityGradients = archetypeGradients[archetype];
    if (priorityGradients) {
      return priorityGradients[priority] || priorityGradients.medium;
    }

    return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
  }

  // Fallback gradients for offline mode
  getFallbackBackground(archetype, priority) {
    const gradients = {
      caregiver: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      sales_hunter: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
      transactional_leader: 'linear-gradient(135deg, #475569 0%, #1e293b 50%, #0f172a 100%)',
      project_coordinator: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
      enterprise_innovator: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
      deal_stacker: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
      status_seeker: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)',
      identity_manager: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)'
    };

    return gradients[archetype] || gradients.caregiver;
  }

  // Clear cache (for development)
  clearCache() {
    this.cache.clear();
  }
}

const imageGenerator = new ImageGenerator();
export default imageGenerator;
