# Action System Architecture

## Problem
Currently long-swipe only opens generic composer/shopping modals.
Need action-specific modals that match the customized action.

## Solution: Action Module System

### Action Types & Their Modals

**1. Add to Calendar**
- Shows: Event details, date/time, add to calendar button
- Action: Creates calendar event, closes modal

**2. Send Reply**
- Shows: AI-generated reply, edit field, send button
- Action: Sends email, closes modal

**3. Sign Form**
- Shows: Form preview, signature field, submit button
- Action: Signs document, proceeds to next step

**4. Pay Money**
- Shows: Amount, payment methods (Venmo, Zelle, Apple Pay)
- Action: Initiates payment, closes modal

**5. Route to CRM**
- Shows: CRM confirmation, lead details, route button
- Action: Creates CRM entry, marks complete

**6. Schedule Meeting**
- Shows: Available times, calendar integration, schedule button
- Action: Books meeting, sends invite

**7. File by Project**
- Shows: Project list, tags, file button
- Action: Tags and files email

### Multi-Step Actions (Field Trip Example)

**Step 1: Sign Form**
→ Shows form with signature field
→ User signs
→ "Next: Payment"

**Step 2: Pay Money**
→ Shows amount ($15)
→ Payment method selector (Venmo, Zelle, Apple Pay)
→ User selects
→ "Complete"

**Step 3: Confirmation**
→ "Form signed and payment sent!"
→ Email marked complete

## Implementation

### Action Router
```javascript
const executeAction = (action, card) => {
  switch(action) {
    case 'Add to Calendar':
      return <AddToCalendarModal card={card} />;
    case 'Send Reply':
      return <ReplyComposerModal card={card} />;
    case 'Sign & Send':
      return <MultiStepActionModal steps={['sign', 'pay']} card={card} />;
    // etc.
  }
}
```

### Multi-Step Modal Component
```javascript
<MultiStepActionModal 
  steps={[
    { type: 'sign', title: 'Sign Permission Form' },
    { type: 'pay', title: 'Send $15 Lunch Money', amount: 15 }
  ]}
  onComplete={handleComplete}
/>
```

## Priority Implementation

1. Create action-specific modal components
2. Build action router in handleSwipeAction
3. Implement multi-step flow component
4. Add all action types from ActionCustomizer
5. Test each action type

