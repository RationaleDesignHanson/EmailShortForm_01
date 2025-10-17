# Immediate Fixes Needed

## 1. Background Photos Not Working
**Issue**: Unsplash Source API is deprecated (no longer works)
**Options**:
A. Use Unsplash API (requires free API key from unsplash.com/developers)
B. Use placeholder service like Picsum Photos (https://picsum.photos)
C. Use rich gradients as backgrounds (current fallback working)

**Recommended**: Option B - Picsum Photos
- No API key required
- Format: `https://picsum.photos/seed/{archetype}/800/600?blur=2`
- Adds slight blur for background effect
- Consistent per archetype using seed

## 2. Splay View Trigger Wrong
**Current**: Opens when tapping progress counter ("18 emails left")
**Should Be**: Opens when tapping archetype name ("Family")
**Fix**:
- Make archetype name label clickable → opens splay view
- Progress counter → opens bottom sheet (stats/archetype switching)
- Separate the two interaction targets

## 3. Snooze System (Future)
**Soft left swipe** should trigger snooze modal with:
- Wheel picker: 0.5 to 12 hours
- "Remember this duration" checkbox
- Reduces inbox count when snoozed
- Returns after duration

## 4. Enhanced Haptics (Future)
- Soft swipe (100px): `navigator.vibrate(8)`
- Hard swipe (200px): `navigator.vibrate([20, 10, 20])`

## Quick Implementation

### Fix Background Photos (Picsum)
```javascript
// In imageGenerator.js
const keywords = this.getUnsplashKeywords(email.type);
const picsumUrl = `https://picsum.photos/seed/${email.type}/800/600?blur=2`;
return picsumUrl;
```

### Fix Splay View Trigger
```javascript
// In ProgressCounter.js - make archetype name clickable
<button onClick={onOpenSplayView} className="...">
  {archetypeName}
</button>

// Progress counter itself opens bottom sheet
<button onClick={onOpenBottomSheet} className="...">
  {remaining} emails left
</button>
```

