# SwipeFeed Improvements Queue

## Critical Fixes

### 1. Background Image Not Showing (Grey Rectangle Issue)
**Problem**: App background is grey, Unsplash photos not displaying
**Root Cause**: Likely z-index layering - dark overlay covering images
**Solution**:
- Check if dark overlay (`bg-black/40`) is blocking images
- Verify Unsplash URLs are loading (check Network tab)
- Reduce overlay opacity or remove it
- Ensure background image has proper z-index

### 2. Soft Left Swipe = Snooze (Not Archive)
**Current**: Left swipe = "Done/Processed"
**New**: Left swipe = "Snooze"
**Implementation**:
- Rename action from "Done" to "Snooze"
- After first snooze, show time picker modal
- Wheel selector: 0.5 to 12 hours range
- Remember setting as default for subsequent snoozes
- Snoozed emails reduce inbox count
- Emails return after snooze duration

### 3. Enhanced Haptic Feedback
**Current**: Single haptic level
**New**: Two intensity levels
- **Soft swipe** (100px): Light haptic (5-10ms vibration)
- **Hard swipe** (200px): Strong haptic (20-30ms vibration)
- More tactile differentiation between actions

### 4. Fix Drop Shadow Inconsistency
**Problem**: Some cards have overly strong shadows (e.g., family field trip)
**Solution**:
- Standardize all drop shadows
- Headings: `text-shadow: 0 2px 4px rgba(0,0,0,0.3)`
- Body: `text-shadow: 0 1px 2px rgba(0,0,0,0.2)`
- Subtle but readable across all gradient backgrounds

### 5. Card Content Reveal Enhancement
**Current**: Background cards have hidden content (opacity: 0)
**New**: Show blurred, semi-transparent preview
- Content at 20% opacity on background cards
- Apply blur filter to background card content
- Creates depth and preview of upcoming cards
- Progressive reveal: 20% → 80% as swipe progresses

### 6. Hide Features UI on Splash Screen
**Problem**: Bottom feature grid visible on intro screen
**Solution**: Remove or hide the 2x2 feature grid from splash screen

## Implementation Order

1. **Fix grey background** (critical visual issue)
2. **Fix drop shadows** (visual consistency)
3. **Card content preview** (UX enhancement)
4. **Snooze system** (feature change)
5. **Enhanced haptics** (polish)
6. **Hide splash features** (cleanup)

## Technical Notes

### Snooze Modal Component
```javascript
<SnoozeModal 
  defaultHours={rememberedDuration}
  onSave={(hours, remember) => {
    // Save snooze
    // Store remember preference
  }}
/>
```

### Haptic Levels
```javascript
// Soft swipe
if (absOffsetX > 100) {
  navigator.vibrate(8); // Light
}
// Hard swipe  
if (absOffsetX > 200) {
  navigator.vibrate([20, 10, 20]); // Strong pattern
}
```

### Background Card Preview
```javascript
// In EnhancedCard
<div style={{
  opacity: isTopCard ? 1 : 0.2,
  filter: isTopCard ? 'none' : 'blur(2px)'
}}>
  {children}
</div>
```

