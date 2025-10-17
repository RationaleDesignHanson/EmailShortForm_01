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

    // Generate fallback gradient based on archetype
    const fallbackBackground = this.getFallbackBackground(email.type, email.priority);

    // If no API key, return fallback
    if (!this.apiKey) {
      this.cache.set(cacheKey, fallbackBackground);
      return fallbackBackground;
    }

    try {
      // For now, return enhanced gradients (Gemini API integration would go here)
      // TODO: Implement actual Gemini API call with this.createImagePrompt(email)
      const enhancedBackground = this.getEnhancedBackground(email.type, email.priority);
      
      this.cache.set(cacheKey, enhancedBackground);
      return enhancedBackground;
    } catch (error) {
      console.error('Error generating background:', error);
      this.cache.set(cacheKey, fallbackBackground);
      return fallbackBackground;
    }
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

  // Enhanced gradients with more sophistication
  getEnhancedBackground(archetype, priority) {
    const baseGradients = {
      caregiver: 'linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)',
      sales_hunter: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 30%, #43e97b 70%, #38f9d7 100%)',
      transactional_leader: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
      project_coordinator: 'linear-gradient(135deg, #f093fb 0%, #f5576c 30%, #4facfe 70%, #00f2fe 100%)',
      enterprise_innovator: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 30%, #f093fb 70%, #667eea 100%)',
      deal_stacker: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 30%, #667eea 70%, #764ba2 100%)',
      status_seeker: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 30%, #f093fb 70%, #f5576c 100%)',
      identity_manager: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 30%, #667eea 70%, #764ba2 100%)'
    };

    return baseGradients[archetype] || baseGradients.caregiver;
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
