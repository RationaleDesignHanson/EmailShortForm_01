// Gemini AI Background Generator - Card-to-Image Translation Module
class GeminiBackgroundGenerator {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.cache = new Map();
  }

  // Main method: Generate glass-aesthetic AI background from card data
  async generateBackground(cardData) {
    const cacheKey = `gemini-${cardData.type}-${cardData.id}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const prompt = this.generatePrompt(cardData);
    
    try {
      // Call Gemini API for text-to-image generation
      const imageUrl = await this.callGeminiAPI(prompt);
      
      if (imageUrl) {
        this.cache.set(cacheKey, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.error('Gemini generation failed:', error);
    }

    // Fallback to enhanced gradient
    return null;
  }

  // Generate contextual, glass-aesthetic prompt from card data
  generatePrompt(cardData) {
    const baseStyle = "Soft focus bokeh photography, dreamy abstract atmosphere, ethereal lighting, pastel color palette, minimalist composition, gentle depth of field, glass-compatible aesthetic, no text or logos, ";
    
    const contentContext = this.analyzeCardContent(cardData);
    const archetypeStyle = this.getArchetypeStyle(cardData.type);
    const priorityMood = this.getPriorityMood(cardData.priority);
    
    return baseStyle + contentContext + ", " + archetypeStyle + ", " + priorityMood;
  }

  // Analyze card content to extract scene description
  analyzeCardContent(cardData) {
    const title = (cardData.title || '').toLowerCase();
    const summary = (cardData.summary || '').toLowerCase();
    const combined = title + ' ' + summary;

    // Family/Caregiver scenes
    if (combined.includes('field trip') || combined.includes('museum')) {
      return "museum entrance with warm afternoon sunlight, children silhouettes in soft distance";
    }
    if (combined.includes('conference') || combined.includes('teacher')) {
      return "school hallway with gentle natural window light, blurred doorways, educational warmth";
    }
    if (combined.includes('birthday') || combined.includes('party')) {
      return "celebration balloons floating with soft bokeh, pastel party colors, joyful atmosphere";
    }
    if (combined.includes('newsletter') || combined.includes('announcement')) {
      return "peaceful school courtyard with trees, soft morning light, calm educational environment";
    }

    // Business/Sales scenes
    if (combined.includes('contract') || combined.includes('renewal')) {
      return "modern office windows overlooking city skyline, professional blue-grey atmosphere, confident lighting";
    }
    if (combined.includes('proposal') || combined.includes('rfp')) {
      return "executive boardroom table edge with soft natural light, minimalist professional setting, decisive mood";
    }
    if (combined.includes('demo') || combined.includes('meeting')) {
      return "contemporary conference room with large windows, collaborative atmosphere, inspiring city views";
    }

    // Shopping/Deals scenes
    if (combined.includes('flash') || combined.includes('sale')) {
      return "vibrant shopping street lights bokeh, exciting urban energy with warm golden tones";
    }
    if (combined.includes('camera') || combined.includes('photo') || combined.includes('photography')) {
      return "creative studio workspace with soft warm lighting, camera silhouettes, artistic atmosphere";
    }
    if (combined.includes('kitchen') || combined.includes('cooking') || combined.includes('mixer')) {
      return "modern kitchen counter with soft natural window light, minimalist home atmosphere, warm tones";
    }

    // Travel/Status scenes
    if (combined.includes('flight') || combined.includes('check-in') || combined.includes('airport')) {
      return "ethereal airport terminal with soft bokeh lights, journey atmosphere, gentle blues and whites";
    }
    if (combined.includes('hotel') || combined.includes('resort') || combined.includes('upgrade')) {
      return "luxury hotel lobby with architectural soft lighting, premium materials slightly blurred, sophisticated atmosphere";
    }

    // Security/Identity scenes
    if (combined.includes('password') || combined.includes('security') || combined.includes('reset')) {
      return "modern secure facility with soft blue professional lighting, minimalist tech aesthetic, trustworthy atmosphere";
    }
    if (combined.includes('bank') || combined.includes('account') || combined.includes('transaction')) {
      return "financial institution interior with confident professional lighting, secure atmosphere, clean architecture";
    }

    // Project/Work scenes
    if (combined.includes('sprint') || combined.includes('standup') || combined.includes('blocker')) {
      return "collaborative workspace with plants and natural light, creative team environment, organized energy";
    }
    if (combined.includes('milestone') || combined.includes('review')) {
      return "modern office desk with soft afternoon light, project materials gently out of focus, productive atmosphere";
    }

    // Learning scenes
    if (combined.includes('report') || combined.includes('research') || combined.includes('trends')) {
      return "cozy library setting with books softly out of focus, warm ambient lighting, knowledge atmosphere";
    }
    if (combined.includes('workshop') || combined.includes('course') || combined.includes('learning')) {
      return "inspiring study space with soft window light, educational materials gently blurred, growth atmosphere";
    }

    // Default fallback based on archetype
    return this.getDefaultScene(cardData.type);
  }

  // Get default scene for archetype
  getDefaultScene(archetype) {
    const scenes = {
      caregiver: "peaceful park with children playing in soft distance, warm golden hour sunlight, gentle family atmosphere",
      sales_hunter: "modern office interior with city skyline bokeh, professional blue tones, success atmosphere",
      transactional_leader: "executive workspace with clean minimal lines, authoritative grey tones, leadership presence",
      project_coordinator: "creative workspace with natural light and plants, collaborative orange-teal tones, organized energy",
      enterprise_innovator: "library study area with warm cozy lighting, knowledge purple tones, inspiring growth",
      deal_stacker: "urban shopping district with vibrant bokeh lights, exciting green-gold tones, deal energy",
      status_seeker: "luxury travel lounge with premium soft lighting, sophisticated gold-amber tones, elegant journey",
      identity_manager: "secure modern facility with blue professional lighting, protective atmosphere, trust tones"
    };
    
    return scenes[archetype] || scenes.caregiver;
  }

  // Get archetype-specific style guidance
  getArchetypeStyle(type) {
    const styles = {
      caregiver: "warm family-friendly tones, soft purples and pinks, nurturing gentle atmosphere",
      sales_hunter: "professional blues and cyans, confident upward energy, success-oriented mood",
      transactional_leader: "authoritative slate greys, minimal clean lines, executive presence",
      project_coordinator: "collaborative teal and blue tones, organized creative energy, team atmosphere",
      enterprise_innovator: "inspiring purple and lavender tones, knowledge and growth mood, cozy warmth",
      deal_stacker: "vibrant green and gold tones, exciting savings energy, opportunity atmosphere",
      status_seeker: "premium gold and orange tones, luxury travel mood, sophisticated elegance",
      identity_manager: "protective red and orange tones, secure professional mood, trustworthy atmosphere"
    };
    
    return styles[type] || styles.caregiver;
  }

  // Get priority-based mood adjustments
  getPriorityMood(priority) {
    const moods = {
      critical: "urgent warm lighting with subtle energy, important focal attention",
      high: "strong confident lighting, clear atmospheric presence",
      medium: "balanced comfortable lighting, calm steady atmosphere",
      low: "gentle soft lighting, peaceful relaxed mood"
    };
    
    return moods[priority] || moods.medium;
  }

  // Call Gemini API (will implement when endpoint confirmed)
  async callGeminiAPI(prompt) {
    console.log('🎨 Generated prompt:', prompt);
    
    // TODO: Implement actual Gemini API call
    // For now, return null to use gradient fallback
    // Need to confirm:
    // - Correct endpoint URL
    // - Request format
    // - Response parsing
    
    /*
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateImage?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt,
            parameters: {
              aspectRatio: '16:9',
              style: 'photographic',
              quality: 'standard'
            }
          })
        }
      );
      
      const data = await response.json();
      return data.imageUrl || data.image?.base64;
    } catch (error) {
      console.error('Gemini API error:', error);
      return null;
    }
    */
    
    return null;
  }
}

const geminiGenerator = new GeminiBackgroundGenerator('AIzaSyA0rMQ31xJPOXXVEzlyP3_nLFvpV_-dQu4');
export default geminiGenerator;
