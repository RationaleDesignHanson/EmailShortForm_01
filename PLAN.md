# SwipeFeed Enhancement Plan

## Issues to Fix

### 1. Text Readability on Cards
**Problem**: Some card colors (bright yellows, light pastels) make text hard to read
**Solution**: 
- Add darker text shadows (drop-shadow-2xl)
- Increase frosted overlay opacity on bright cards
- Add semi-transparent dark scrim behind text areas
- Test contrast ratios for WCAG compliance

### 2. Consistent Colors Per Archetype
**Problem**: Cards within same archetype have different colors based on priority
**Solution**:
- Each archetype gets ONE signature color scheme
- Priority shown through badges/indicators, not background color
- All caregiver cards = purple/pink gradient
- All sales cards = blue/cyan gradient
- Etc.

### 3. Grey Background Issue
**Problem**: App background is grey instead of photographic
**Solution**:
- Debug: Check if generatePhotographicBackground is being called
- Check if Unsplash URLs are loading correctly
- Verify background style is applying url() correctly
- Add error handling and fallback logging

### 4. Family Splay View
**Problem**: Need to see all family members at once
**Solution**:
- When tapping "Family" archetype, show splay view
- Create separate pile/stack for each person:
  - Emma Chen (8, 3rd grade)
  - Lucas Chen (12, 7th grade)  
  - Zoe Chen (5, kindergarten)
  - David Chen (spouse)
- Each pile shows card count and preview
- Tap pile to drill into that person's emails

### 5. Label Changes
**Problem**: "Family Inbox" too verbose
**Solution**: Change to just "Family" everywhere

### 6. Splash Screen Updates
**Problem**: Copy needs refinement
**Solution**:
- Change "save for later" → "archive for later"
- Remove password hint ("💡 Hint: The password is six ones")

### 7. Zero Logo Redesign
**Problem**: Envelope icon not distinctive enough
**Solution**:
- Create custom "10000" logo
- First "10" = grey/muted
- Middle "0" = bright/active
- Last "00" = grey/muted
- Visual represents getting to "zero" inbox

## Implementation Order

1. Fix text readability (critical UX issue)
2. Debug grey background (visual priority)
3. Consistent archetype colors (visual consistency)
4. Update splash screen copy and logo (polish)
5. Implement family splay view (new feature)

## Technical Approach

### Text Contrast Fix
- Add `text-shadow: 0 2px 8px rgba(0,0,0,0.8)` to all card text
- Increase content overlay from `bg-black/30` to `bg-black/50`
- Add dark scrim behind text blocks

### Background Debug
- Add console.log to track background generation
- Check network tab for Unsplash API calls
- Verify CSS url() syntax in style prop

### Splay View Component
- New `FamilySplayView.js` component
- Grid layout with 4 piles (3 kids + spouse)
- Each pile shows avatar, name, email count
- Click pile → filter cards to that person

### Logo Component
- SVG or styled div with "10000"
- CSS to grey out digits except middle 0
- Gradient on active 0 for visual pop


