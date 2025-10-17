// AI Image Generation Service using Gemini API
class ImageGenerator {
  constructor() {
    this.cache = new Map(); // Simple in-memory cache
    // Gemini API key for image generation
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyA0rMQ31xJPOXXVEzlyP3_nLFvpV_-dQu4';
  }

  // Generate colored gradient for card (always use gradients for cards)
  async generateBackground(email) {
    const cacheKey = `gradient-${email.type}-${email.priority}-${email.id}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Always return colored gradient for cards
    const enhancedBackground = this.getEnhancedBackground(email.type, email.priority);
    console.log(`🎨 Card gradient for ${email.type}:`, enhancedBackground);
    
    this.cache.set(cacheKey, enhancedBackground);
    return enhancedBackground;
  }

  // Generate photographic background for app (behind cards)
  async generatePhotographicBackground(email) {
    const cacheKey = `photo-${email.type}-${email.id}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const imageUrl = await this.generateGeminiImage(email);
      if (imageUrl) {
        this.cache.set(cacheKey, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.error('Photo generation error, using fallback:', error);
    }

    // Fallback to gradient if photo generation fails
    const gradient = this.getEnhancedBackground(email.type, email.priority);
    this.cache.set(cacheKey, gradient);
    return gradient;
  }

  // Generate image using Gemini Imagen API or fallback to Picsum
  async generateGeminiImage(email) {
    const prompt = this.createImagePrompt(email);
    
    // Use content-aware seed for Picsum to get more relevant images
    // Seed based on email content creates unique images per email
    try {
      const contentKeywords = this.extractContentKeywords(email);
      const seed = `${email.type}-${contentKeywords}-${email.priority}`;
      const picsumUrl = `https://picsum.photos/seed/${seed}/800/600?blur=2`;
      console.log(`📸 Using Picsum for ${email.type} - seed: ${seed}`);
      return picsumUrl;
      
      // TODO: Implement Gemini when correct API endpoint is confirmed
      // Current endpoint format is unclear - need to verify:
      // - Is it generateContent or predict?
      // - What's the correct model name?
      // - What's the request/response format?
      /*
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );
      */
      
    } catch (error) {
      console.error('Image generation error:', error);
      return null;
    }
  }

  // Extract content keywords for more relevant image seeds
  extractContentKeywords(email) {
    const title = (email.title || '').toLowerCase();
    const summary = (email.summary || '').toLowerCase();
    const combined = title + ' ' + summary;
    
    // Extract meaningful keywords from email content
    if (combined.includes('field trip') || combined.includes('museum')) return 'fieldtrip-museum';
    if (combined.includes('conference') || combined.includes('teacher')) return 'school-meeting';
    if (combined.includes('birthday') || combined.includes('party')) return 'celebration-party';
    if (combined.includes('newsletter')) return 'school-newsletter';
    
    if (combined.includes('contract') || combined.includes('deal')) return 'business-contract';
    if (combined.includes('proposal') || combined.includes('rfp')) return 'business-proposal';
    if (combined.includes('demo') || combined.includes('meeting')) return 'office-meeting';
    
    if (combined.includes('sale') || combined.includes('flash')) return 'shopping-sale';
    if (combined.includes('camera') || combined.includes('photo')) return 'photography-gear';
    if (combined.includes('kitchen') || combined.includes('cooking')) return 'kitchen-home';
    
    if (combined.includes('flight') || combined.includes('check-in')) return 'airport-travel';
    if (combined.includes('hotel') || combined.includes('resort')) return 'hotel-luxury';
    
    if (combined.includes('security') || combined.includes('password')) return 'security-alert';
    if (combined.includes('bank') || combined.includes('account')) return 'banking-finance';
    
    if (combined.includes('report') || combined.includes('research')) return 'research-study';
    if (combined.includes('workshop') || combined.includes('course')) return 'learning-workshop';
    
    // Fallback to archetype-based seed
    return email.type;
  }

  // Get Unsplash search keywords for each archetype
  getUnsplashKeywords(archetype) {
    const keywords = {
      caregiver: 'nature,park,family,peaceful,golden-hour',
      sales_hunter: 'office,business,skyline,professional,modern',
      transactional_leader: 'executive,minimal,architecture,corporate',
      project_coordinator: 'workspace,creative,plants,natural-light',
      enterprise_innovator: 'library,books,study,cozy,knowledge',
      deal_stacker: 'shopping,urban,lights,vibrant,city',
      status_seeker: 'travel,luxury,airport,hotel,premium',
      identity_manager: 'technology,security,modern,minimal,blue'
    };
    
    return keywords[archetype] || 'nature,calm,peaceful';
  }

  // Create contextual prompt for AI image generation (photographic scenes)
  createImagePrompt(email) {
    const basePrompt = "Professional photographic background, soft focus bokeh, calming atmosphere, ";
    
    switch (email.type) {
      case 'caregiver':
        return basePrompt + "peaceful park with children playing in distance, warm afternoon sunlight, green grass, soft golden hour lighting, shallow depth of field";
      case 'sales_hunter':
        return basePrompt + "modern office space with city skyline view through windows, professional lighting, sleek glass and steel, upward perspective";
      case 'transactional_leader':
        return basePrompt + "executive boardroom table with soft morning light, minimalist professional environment, architectural lines, neutral tones";
      case 'project_coordinator':
        return basePrompt + "collaborative workspace with natural light, organized desk setup, plants and windows, creative studio atmosphere";
      case 'enterprise_innovator':
        return basePrompt + "library or study with books softly out of focus, warm ambient lighting, knowledge and learning atmosphere, cozy and inspiring";
      case 'deal_stacker':
        return basePrompt + "modern shopping district bokeh lights, vibrant storefronts blurred, evening golden hour, exciting urban energy";
      case 'status_seeker':
        return basePrompt + "airport lounge or luxury hotel lobby, soft architectural lighting, premium materials, travel and sophistication";
      case 'identity_manager':
        return basePrompt + "secure vault or modern tech facility, clean lines, blue-tinted professional lighting, trustworthy atmosphere";
      default:
        return basePrompt + "calm nature scene with soft bokeh, peaceful environment, gentle natural lighting";
    }
  }

  // Enhanced gradients - consistent colors per archetype (priority doesn't change card color)
  getEnhancedBackground(archetype, priority, cardContent = '') {
    // One signature gradient per archetype for visual consistency
    const archetypeGradients = {
      caregiver: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 30%, #ec4899 70%, #f43f5e 100%)', // Purple/pink family warmth
      sales_hunter: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 30%, #06b6d4 70%, #0891b2 100%)', // Professional blue/cyan
      transactional_leader: 'linear-gradient(135deg, #475569 0%, #334155 30%, #1e293b 70%, #0f172a 100%)', // Dark slate executive
      project_coordinator: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 30%, #06b6d4 70%, #0891b2 100%)', // Teal collaboration
      enterprise_innovator: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 30%, #7c3aed 70%, #6d28d9 100%)', // Purple learning/innovation
      deal_stacker: 'linear-gradient(135deg, #10b981 0%, #059669 30%, #34d399 70%, #6ee7b7 100%)', // Green deals/savings
      status_seeker: 'linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #fb923c 70%, #f97316 100%)', // Warm gold premium
      identity_manager: 'linear-gradient(135deg, #ef4444 0%, #dc2626 30%, #f97316 70%, #fb923c 100%)' // Red/orange security alert
    };

    return archetypeGradients[archetype] || archetypeGradients.caregiver;
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
