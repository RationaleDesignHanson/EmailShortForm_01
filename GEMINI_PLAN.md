# Gemini AI Background Generation Plan

## Module: Card-to-Image Translation

### Purpose
Convert email card data into AI-generated imagery that:
1. Matches email content contextually
2. Complements glassy, frosted aesthetic
3. Creates immersive, professional atmosphere

## Gemini Integration Strategy

### API Endpoint Research Needed
Current uncertainties:
- Correct endpoint URL
- Request/response format
- Model name (is it imagen-3.0 or different?)
- Authentication method

### Prompt Engineering for Glass Aesthetic

**Style Guidelines for All Prompts:**
- "Soft focus bokeh background"
- "Dreamy, abstract, ethereal"
- "Pastel tones with gentle gradients"
- "Minimalist, clean composition"
- "Subtle depth of field"
- "No sharp edges or text"
- "Glass-compatible aesthetic"

### Content-Specific Prompts

**Family/Caregiver:**
- Field Trip: "Soft focus museum entrance with warm lighting, children silhouettes in distance, dreamy bokeh, pastel colors"
- Teacher Conference: "Abstract school hallway with soft natural light, blurred doorways, gentle educational atmosphere"
- Birthday Party: "Ethereal party balloons with soft bokeh, pastel celebration colors, dreamy atmosphere"

**Sales/Business:**
- Contract Meeting: "Abstract modern office windows with city bokeh, soft blue-grey tones, professional atmosphere"
- Proposal: "Dreamy boardroom table with soft light, minimal composition, confident blue tones"

**Shopping/Deals:**
- Flash Sale: "Abstract shopping lights bokeh, vibrant but soft, exciting energy, warm tones"
- Photography Gear: "Soft focus camera equipment silhouettes, creative atmosphere, warm studio lighting"

**Travel/Status:**
- Airport: "Ethereal airport terminal with soft bokeh lights, travel atmosphere, gentle blues"
- Hotel: "Dreamy luxury lobby with soft architectural lighting, premium materials blurred"

**Security/Identity:**
- Password Alert: "Abstract secure facility with soft blue lighting, minimal tech aesthetic, trustworthy atmosphere"

## Implementation Module Structure

```javascript
class GeminiBackgroundGenerator {
  generatePrompt(cardData) {
    const baseStyle = "Soft focus bokeh background, dreamy abstract, ethereal, pastel tones, minimalist, glass-compatible aesthetic, ";
    const contentContext = this.analyzeCardContent(cardData);
    const archetypeStyle = this.getArchetypeStyle(cardData.type);
    const priorityMood = this.getPriorityMood(cardData.priority);
    
    return baseStyle + contentContext + archetypeStyle + priorityMood;
  }
  
  analyzeCardContent(cardData) {
    // Extract subject, action, entities from card
    // Return contextual scene description
  }
  
  getArchetypeStyle(type) {
    // Return color palette and atmosphere per archetype
  }
  
  getPriorityMood(priority) {
    // Subtle mood adjustments (warm/cool tones, light/dark)
  }
}
```

## Next Steps

1. Research correct Gemini API endpoint
2. Implement prompt translation module
3. Test AI generation with sample emails
4. Refine prompts based on results
5. Add error handling and caching

## Fallback Strategy

While Gemini is being set up:
- Use sophisticated multi-layer gradients
- Add CSS filters for texture
- Create contextual color schemes
- Maintain glass aesthetic compatibility

