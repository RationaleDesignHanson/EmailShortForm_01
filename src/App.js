import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Calendar, Star, ShoppingBag, Briefcase, Baby, X, CheckCircle, Award, Clock, Mail, Send, Sparkles, Paperclip, FileText, ExternalLink, Zap, AlertTriangle } from 'lucide-react';
import { EnhancedParentCard, EnhancedBusinessCard, EnhancedShoppingCard } from './components/EnhancedCards';
import imageGenerator from './services/imageGenerator';
import { SwipeActionOverlay } from './components/SwipeActionOverlay';
import { BottomSheet } from './components/BottomSheet';
import { FullEmailView } from './components/FullEmailView';
import { ActionCustomizer } from './components/ActionCustomizer';
import { SaveLaterModal } from './components/SaveLaterModal';
import { UnsubscribeModal } from './components/UnsubscribeModal';
import { UnifiedBottomNav } from './components/UnifiedBottomNav';
import { CelebrationScreen } from './components/CelebrationScreen';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { SplayView } from './components/SplayView';
import { SnoozePickerModal } from './components/SnoozePickerModal';
import emailAdapter from './services/emailAdapter';

// Priority Meter Component (liquid glass style)
const PriorityMeter = ({ level, label }) => {
  const configs = {
    critical: { fill: 100, color: 'from-red-500 to-orange-500', glow: 'shadow-red-500/50' },
    high: { fill: 75, color: 'from-orange-500 to-yellow-500', glow: 'shadow-orange-500/50' },
    medium: { fill: 50, color: 'from-yellow-500 to-blue-500', glow: 'shadow-yellow-500/50' },
    low: { fill: 25, color: 'from-blue-500 to-slate-500', glow: 'shadow-blue-500/50' }
  };

  const config = configs[level] || configs.low;

  return (
    <div className="relative w-full">
      <div className="text-white/70 text-xs mb-2 font-medium">{label}</div>
      <div className="relative h-8 bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/20">
        <div 
          className={'absolute inset-y-0 left-0 bg-gradient-to-r ' + config.color + ' transition-all duration-700 ease-out'}
          style={{ width: config.fill + '%' }}
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-xs font-bold drop-shadow-lg">{config.fill}%</span>
        </div>
      </div>
    </div>
  );
};

const generateReply = (card) => {
  if (card.type === 'caregiver') {
    const teacherFirstName = card.dataSources[0]?.from.split(' ')[0] || 'there';
    let body = 'Hi ' + teacherFirstName + ',\n\n';
    
    if (card.requiresSignature) {
      body += 'Thank you so much for sending this along! I have reviewed the permission slip for ' + card.kid.name + ' and I am happy to sign off on it.\n\n';
      if (card.formFields) {
        body += 'I have filled out all the required information:\n';
        card.formFields.forEach(field => {
          body += '• ' + field.label + ': ' + field.autoFillValue + '\n';
        });
      }
      body += '\n' + card.kid.name + ' is really excited about this trip! Please let me know if you need anything else from me.';
    } else if (card.priority === 'critical') {
      body += 'I just saw your message about ' + card.kid.name + '. Thank you for keeping me in the loop! I will make sure to take care of this right away.';
    } else if (card.title.toLowerCase().includes('test') || card.title.toLowerCase().includes('grade')) {
      body += 'Thank you for sharing ' + card.kid.name + ' progress with me! We are so proud of how hard they have been working.\n\nPlease keep us updated on how we can continue supporting their learning at home!';
    } else {
      body += 'Thanks for this update about ' + card.kid.name + '! I really appreciate you keeping me informed.\n\nPlease do not hesitate to reach out if there is anything we can do to support from home.';
    }
    
    body += '\n\nWarm regards';
    
    return {
      subject: 'Re: ' + card.title,
      to: card.dataSources[0]?.from || 'teacher@school.com',
      body: body,
      hasAttachment: card.requiresSignature || false,
      attachmentName: card.requiresSignature ? card.kid.name + '_permission_form_signed.pdf' : null
    };
  } else if (card.type === 'sales_hunter' || card.type === 'transactional_leader' || card.type === 'project_coordinator' || card.type === 'enterprise_innovator') {
    const firstName = card.contact?.name.split(' ')[0] || card.sender?.name || 'there';
    let body = 'Hi ' + firstName + ',\n\n';
    
    if (card.priority === 'critical') {
      body += 'Thanks so much for your interest! I am really excited about the possibility of helping ' + (card.company?.name || 'you') + ' achieve your goals.\n\nI would love to schedule a demo where we can dive into your specific needs.\n\nI have a few times available:\n• Tuesday, 2-4 PM\n• Wednesday, 10 AM-12 PM\n• Thursday, 1-3 PM\n\nLooking forward to our conversation!';
    } else {
      body += 'I hope you are doing well! I wanted to follow up on our conversation.\n\nDo you have time this week to discuss next steps?\n\nThanks again for considering us!';
    }
    
    body += '\n\nBest';
    
    return {
      subject: 'Re: ' + card.title,
      to: card.dataSources[0]?.from || 'contact@company.com',
      body: body,
      hasAttachment: false
    };
  }
  
  return {
    subject: 'Re: ' + card.title,
    to: card.dataSources[0]?.from || 'contact@email.com',
    body: 'Thank you for your message. I will review and get back to you shortly.\n\nBest regards',
    hasAttachment: false
  };
};

const ShoppingActionModal = ({ card, onComplete, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceedToStore = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const loyaltyPoints = Math.floor(card.salePrice * 10);
  const earnedMiles = Math.floor(card.salePrice * 2);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => {
      if (e.target === e.currentTarget) onCancel();
    }}>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Ready to Purchase</h2>
                <p className="text-white/80 text-sm">Everything pre-filled for you</p>
              </div>
            </div>
            <button onClick={onCancel} className="text-white/80 hover:text-white">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{card.productImage}</div>
              <div className="flex-1">
                <h3 className="text-white text-xl font-bold mb-1">{card.title}</h3>
                <p className="text-slate-400 text-sm">{card.store}</p>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <div className="text-white text-4xl font-bold">${card.salePrice}</div>
              <div className="text-slate-400 text-xl line-through">${card.originalPrice}</div>
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {card.discount}% OFF
              </div>
            </div>
          </div>

          {card.promoCode && (
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900 text-xs font-semibold mb-1">PROMO CODE PRE-APPLIED</div>
                  <div className="text-slate-900 text-2xl font-mono font-bold">{card.promoCode}</div>
                </div>
                <div className="bg-white/30 text-slate-900 px-4 py-2 rounded-lg font-bold">Applied</div>
              </div>
            </div>
          )}

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={20} />
              You'll Earn
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="text-blue-400" size={20} />
                  <div>
                    <div className="text-white font-medium">Loyalty Points</div>
                    <div className="text-slate-400 text-xs">Redeemable later</div>
                  </div>
                </div>
                <div className="text-white text-xl font-bold">{loyaltyPoints}</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="text-purple-400" size={20} />
                  <div>
                    <div className="text-white font-medium">Frequent Buyer Miles</div>
                    <div className="text-slate-400 text-xs">2x miles</div>
                  </div>
                </div>
                <div className="text-white text-xl font-bold">{earnedMiles}</div>
              </div>
            </div>
          </div>

          {card.urgent && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3">
              <Clock className="text-red-400" size={24} />
              <div>
                <div className="text-red-400 font-bold">Expires in {card.expiresIn}</div>
                <div className="text-slate-300 text-sm">Lock in this price now</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex gap-3">
          <button type="button" onClick={onCancel} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold">
            Maybe Later
          </button>
          <button type="button" onClick={handleProceedToStore} disabled={isProcessing} className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Opening...
              </>
            ) : (
              <>
                <ExternalLink size={20} />
                Go to {card.store}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ReplyComposer = ({ card, onSend, onCancel }) => {
  const [reply, setReply] = useState(generateReply(card));
  const [isSending, setIsSending] = useState(false);
  const [showFormPreview, setShowFormPreview] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      onSend();
      setIsSending(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => {
      if (e.target === e.currentTarget) onCancel();
    }}>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Compose Reply</h2>
                <p className="text-white/80 text-sm">AI-generated, ready to edit</p>
              </div>
            </div>
            <button onClick={onCancel} className="text-white/80 hover:text-white">
              <X size={28} />
            </button>
          </div>

          {card.requiresSignature && (
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
              <FileText className="text-white" size={20} />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">Form Auto-filled</div>
                <div className="text-white/70 text-xs">Digital signature included</div>
              </div>
              <button onClick={() => setShowFormPreview(!showFormPreview)} className="text-white/80 hover:text-white text-xs underline">
                {showFormPreview ? 'Hide' : 'Preview'}
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {showFormPreview && card.formFields && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                Auto-filled Form Data
              </h3>
              <div className="space-y-2">
                {card.formFields.map((field, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-400">{field.label}:</span>
                    <span className="text-white font-medium">{field.autoFillValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">To</label>
            <input type="email" value={reply.to} onChange={(e) => setReply({ ...reply, to: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-2">Subject</label>
            <input type="text" value={reply.subject} onChange={(e) => setReply({ ...reply, subject: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-slate-400 text-sm font-medium">Message</label>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Sparkles size={14} />
                <span>AI-generated</span>
              </div>
            </div>
            <textarea ref={textareaRef} value={reply.body} onChange={(e) => setReply({ ...reply, body: e.target.value })} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[250px] resize-none" />
          </div>

          {reply.hasAttachment && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
              <Paperclip className="text-blue-400" size={20} />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{reply.attachmentName}</div>
                <div className="text-slate-400 text-xs">Signed form attached</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex gap-3">
          <button type="button" onClick={onCancel} className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold">
            Cancel
          </button>
          <button type="button" onClick={handleSend} disabled={isSending} className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
            {isSending ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Reply
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const generateInitialCards = () => {
  const getTimeAgo = (daysAgo, hoursAgo = 0) => {
    if (daysAgo === 0 && hoursAgo < 1) return 'Just now';
    if (daysAgo === 0) return hoursAgo + 'h ago';
    if (daysAgo === 1) return 'Yesterday';
    if (daysAgo < 7) return daysAgo + 'd ago';
    return Math.floor(daysAgo / 7) + 'w ago';
  };

  return [
    // P1: Transactional Leader
    { id: 'tl1', type: 'transactional_leader', state: 'unseen', priority: 'critical', hpa: 'Review & Approve', sender: { name: 'Finance Dept', initial: 'F' }, timeAgo: getTimeAgo(0, 1), title: 'Q4 Budget Approval Required', summary: 'Department budget requests need executive sign-off by EOD', metaCTA: 'Swipe Right: Quick Approve', dataSources: [{ subject: 'Budget Approval', from: 'finance@company.com', date: getTimeAgo(0, 1) }] },

    { id: 'tl2', type: 'transactional_leader', state: 'unseen', priority: 'high', hpa: 'Auto-Route', sender: { name: 'HR Systems', initial: 'H' }, timeAgo: getTimeAgo(0, 3), title: 'New Hire Onboarding - Sarah Chen', summary: 'Final approval needed for new Engineering Manager start date', metaCTA: 'Swipe Right: Delegate to HR', dataSources: [{ subject: 'Onboarding Approval', from: 'hr@company.com', date: getTimeAgo(0, 3) }] },

    // P2: Sales Hunter  
    { id: 'sh1', type: 'sales_hunter', state: 'unseen', priority: 'critical', hpa: 'Schedule Demo', company: { name: 'TechCorp Industries', initials: 'TC' }, industry: 'SaaS', timeAgo: getTimeAgo(0, 3), score: 95, value: '$85K', probability: 90, contact: { name: 'Sarah Chen', initials: 'SC', role: 'VP Operations' }, summary: 'Ready to schedule demo, budget approved, decision timeline confirmed', metaCTA: 'Swipe Right: Send Demo Times', dataSources: [{ subject: 'Ready to Move Forward', from: 'sarah.chen@techcorp.com', date: getTimeAgo(0, 3) }] },

    { id: 'sh2', type: 'sales_hunter', state: 'unseen', priority: 'critical', hpa: 'Route to CRM', company: { name: 'DataFlow Systems', initials: 'DF' }, industry: 'Analytics', timeAgo: getTimeAgo(0, 5), score: 88, value: '$120K', probability: 85, contact: { name: 'James Wilson', initials: 'JW', role: 'CTO' }, summary: 'RFP due Friday - requesting proposal submission', metaCTA: 'Swipe Right: Route to CRM & Tag Urgent', dataSources: [{ subject: 'RFP Submission', from: 'j.wilson@dataflow.com', date: getTimeAgo(0, 5) }] },

    // P3: Project Coordinator
    { id: 'pc1', type: 'project_coordinator', state: 'unseen', priority: 'critical', hpa: 'Schedule Review', project: { name: 'Website Redesign', code: 'WR-2024' }, client: { name: 'Acme Corp', initials: 'AC' }, timeAgo: getTimeAgo(0, 2), title: 'Client Milestone Review - Due Friday', summary: 'Design mockups need approval before development phase begins', metaCTA: 'Swipe Right: Schedule Review', dataSources: [{ subject: 'Milestone Approval', from: 'client@acme.com', date: getTimeAgo(0, 2) }] },

    { id: 'pc2', type: 'project_coordinator', state: 'unseen', priority: 'high', hpa: 'File by Project', project: { name: 'Mobile App Launch', code: 'MAL-2024' }, client: { name: 'Beta Users', initials: 'B' }, timeAgo: getTimeAgo(0, 4), title: 'Beta Testing Feedback Summary', summary: '47 users submitted feedback, 3 critical bugs identified', metaCTA: 'Swipe Left: Tag & File by Project', dataSources: [{ subject: 'Beta Feedback', from: 'testing@company.com', date: getTimeAgo(0, 4) }] },

    // P4: Enterprise Innovator
    { id: 'ei1', type: 'enterprise_innovator', state: 'unseen', priority: 'medium', hpa: 'Save for Later', source: { name: 'MIT Tech Review', initials: 'MT' }, timeAgo: getTimeAgo(1), title: 'AI Trends Report Q4 2024', summary: 'Comprehensive analysis of emerging AI technologies and market applications', metaCTA: 'Swipe Left: Save for Deep Read', dataSources: [{ subject: 'Industry Newsletter', from: 'newsletter@mittr.com', date: getTimeAgo(1) }] },

    { id: 'ei2', type: 'enterprise_innovator', state: 'unseen', priority: 'high', hpa: 'Express Interest', source: { name: 'Innovation Labs', initials: 'IL' }, timeAgo: getTimeAgo(0, 6), title: 'Partnership Opportunity - Stanford Research', summary: 'Joint research proposal on next-gen ML applications', metaCTA: 'Swipe Right: Express Interest', dataSources: [{ subject: 'Partnership Inquiry', from: 'labs@stanford.edu', date: getTimeAgo(0, 6) }] },

    // C1: Time-Crunched Caregiver
    { id: 'cc1', type: 'caregiver', state: 'unseen', priority: 'critical', hpa: 'Sign & Send', kid: { name: 'Sophie Martinez', initial: 'S', grade: '3rd Grade' }, timeAgo: getTimeAgo(0, 2), title: 'Field Trip Permission - Due Wednesday', summary: 'Museum visit Friday requires signed form by Wed 5 PM', metaCTA: 'Swipe Right: Quick Sign & Send', requiresSignature: true, formFields: [{ label: 'Student Name', autoFillValue: 'Sophie Martinez' }, { label: 'Parent/Guardian', autoFillValue: 'Parent Name' }, { label: 'Emergency Contact', autoFillValue: '(555) 123-4567' }], dataSources: [{ subject: 'Field Trip Permission', from: 'Mrs. Anderson', date: getTimeAgo(0, 2) }] },

    { id: 'cc2', type: 'caregiver', state: 'unseen', priority: 'high', hpa: 'Acknowledge', kid: { name: 'Max Rodriguez', initial: 'M', grade: '6th Grade' }, timeAgo: getTimeAgo(0, 5), title: 'Assignment Past Due - Math Homework', summary: 'Homework from last week not submitted, submit by Friday for partial credit', metaCTA: 'Swipe Right: Acknowledge & Confirm', dataSources: [{ subject: 'Missing Assignment Alert', from: 'Mr. Thompson', date: getTimeAgo(0, 5) }] },

    // C2: Savvy Deal Stacker
    { id: 'ds1', type: 'deal_stacker', state: 'unseen', priority: 'high', hpa: 'Claim Deal', store: 'TechMart', timeAgo: getTimeAgo(0, 1), title: 'Flash Sale: Premium Headphones', productImage: 'Headphones', aiBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', originalPrice: 299.99, salePrice: 149.99, discount: 50, urgent: true, expiresIn: '6 hours', metaCTA: 'Swipe Right: Claim Deal Now', promoCode: 'AUDIO50', features: ['50% off', 'Free shipping'], dataSources: [{ subject: 'FLASH SALE', from: 'deals@techmart.com', date: getTimeAgo(0, 1) }] },

    { id: 'ds2', type: 'deal_stacker', state: 'unseen', priority: 'low', hpa: 'Not Interested', store: 'FashionHub', timeAgo: getTimeAgo(1), title: 'Extra 30% Off Fall Collection', productImage: 'Apparel', aiBackground: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', originalPrice: 120.00, salePrice: 59.99, discount: 50, urgent: false, expiresIn: '3 days', metaCTA: 'Swipe Left: Dismiss', features: ['Stacks with sale', 'Free shipping $50+'], dataSources: [{ subject: 'Fall Sale', from: 'style@fashionhub.com', date: getTimeAgo(1) }] },

    // Add some low priority items to other archetypes
    { id: 'tl3', type: 'transactional_leader', state: 'unseen', priority: 'low', hpa: 'File for Reference', sender: { name: 'IT Updates', initial: 'I' }, timeAgo: getTimeAgo(2), title: 'Monthly Security Report', summary: 'Routine security metrics and system updates for your review', metaCTA: 'Swipe Left: File for Reference', dataSources: [{ subject: 'Security Report', from: 'security@company.com', date: getTimeAgo(2) }] },

    { id: 'cc3', type: 'caregiver', state: 'unseen', priority: 'low', hpa: 'Archive', kid: { name: 'Sophie Martinez', initial: 'S', grade: '3rd Grade' }, timeAgo: getTimeAgo(3), title: 'Weekly Newsletter', summary: 'School newsletter with upcoming events and general announcements', metaCTA: 'Swipe Left: Archive', dataSources: [{ subject: 'Weekly Newsletter', from: 'newsletter@school.edu', date: getTimeAgo(3) }] },

    // C3: Global Status Seeker
    { id: 'ss1', type: 'status_seeker', state: 'unseen', priority: 'critical', hpa: 'Check In Now', airline: 'United Airlines', timeAgo: getTimeAgo(0, 1), title: 'Flight Check-in Available - SFO to NYC', summary: 'Check in now for tomorrow\'s 6:45 AM departure, upgrade available', metaCTA: 'Swipe Right: Check In & Upgrade', flightDetails: { number: 'UA 1234', from: 'SFO', to: 'JFK', date: 'Tomorrow 6:45 AM' }, dataSources: [{ subject: 'Check-in Available', from: 'united@airlines.com', date: getTimeAgo(0, 1) }] },

    { id: 'ss2', type: 'status_seeker', state: 'unseen', priority: 'high', hpa: 'Enroll Now', airline: 'Marriott Bonvoy', timeAgo: getTimeAgo(0, 3), title: 'Elite Status Challenge Opportunity', summary: 'Fast-track to Platinum status with 10 qualifying stays', metaCTA: 'Swipe Right: Enroll Now', dataSources: [{ subject: 'Status Challenge', from: 'bonvoy@marriott.com', date: getTimeAgo(0, 3) }] },

    // C4: Digital Identity Manager
    { id: 'idm1', type: 'identity_manager', state: 'unseen', priority: 'critical', hpa: 'Verify Identity', service: 'Amazon', timeAgo: getTimeAgo(0, 0), title: 'Password Reset Request', summary: 'Someone requested a password reset for your account', metaCTA: 'Swipe Right: Verify Identity', security: true, expiresIn: '15 minutes', dataSources: [{ subject: 'Password Reset', from: 'security@amazon.com', date: getTimeAgo(0, 0) }] },

    { id: 'idm2', type: 'identity_manager', state: 'unseen', priority: 'high', hpa: 'Confirm or Deny', service: 'PayPal', timeAgo: getTimeAgo(0, 2), title: 'New Device Login Detected', summary: 'Login from iPhone in San Francisco, CA', metaCTA: 'Swipe Right: Confirm or Deny', security: true, dataSources: [{ subject: 'Security Alert', from: 'security@paypal.com', date: getTimeAgo(0, 2) }] }
  ];
};

const Dashboard = ({ type, cards, onViewFeed }) => {
  const typeCards = cards.filter(c => c.type === type && c.state !== 'dismissed');
  const criticalCount = typeCards.filter(c => c.priority === 'critical').length;
  const highCount = typeCards.filter(c => c.priority === 'high').length;
  const unseenCount = typeCards.filter(c => c.state === 'unseen').length;

  const configs = {
    transactional_leader: { title: 'Executive Inbox', subtitle: 'Transactional Leader', icon: Briefcase, gradient: 'from-slate-800 via-slate-700 to-slate-900' },
    sales_hunter: { title: 'Job (Sales)', subtitle: 'Sales Pipeline', icon: TrendingUp, gradient: 'from-slate-900 via-blue-900 to-indigo-900' },
    project_coordinator: { title: 'Project Hub', subtitle: 'Project Coordinator', icon: Calendar, gradient: 'from-teal-700 via-cyan-700 to-blue-800' },
    enterprise_innovator: { title: 'Learning Feed', subtitle: 'Learning', icon: Sparkles, gradient: 'from-purple-800 via-violet-800 to-indigo-900' },
    caregiver: { title: 'Family', subtitle: 'Time-Crunched Caregiver', icon: Baby, gradient: 'from-indigo-600 via-purple-600 to-pink-600' },
    deal_stacker: { title: 'Deals Inbox', subtitle: 'Savvy Deal Stacker', icon: ShoppingBag, gradient: 'from-emerald-600 via-teal-600 to-cyan-600' },
    status_seeker: { title: 'Travel Hub', subtitle: 'Global Status Seeker', icon: Award, gradient: 'from-amber-600 via-orange-600 to-red-600' },
    identity_manager: { title: 'Security Center', subtitle: 'Digital Identity Manager', icon: AlertTriangle, gradient: 'from-red-700 via-rose-700 to-pink-700' }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={'min-h-screen bg-gradient-to-br ' + config.gradient + ' p-6'}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
          <Icon className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{config.title}</h1>
          <p className="text-white/70 text-sm">{config.subtitle}</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6 border border-white/20 shadow-xl">
        <div className="text-white/80 text-sm mb-4 font-medium">Priority Distribution</div>
        <div className="space-y-4">
          <PriorityMeter level="critical" label={'Critical (' + criticalCount + ')'} />
          <PriorityMeter level="high" label={'High (' + highCount + ')'} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="text-3xl font-bold text-white mb-1">{criticalCount}</div>
          <div className="text-white/70 text-sm">Critical</div>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="text-3xl font-bold text-white mb-1">{unseenCount}</div>
          <div className="text-white/70 text-sm">Unseen</div>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="text-3xl font-bold text-white mb-1">{typeCards.length}</div>
          <div className="text-white/70 text-sm">Total</div>
        </div>
      </div>

      <button onClick={onViewFeed} className="w-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white py-4 rounded-2xl font-bold text-lg mb-4 border border-white/30 shadow-lg transition-all">
        View Feed ({typeCards.length} items)
      </button>
    </div>
  );
};

// Helper functions
const extractDomain = (email) => {
  try {
    return email.split('@')[1]?.toLowerCase() || '';
  } catch {
    return '';
  }
};

const isPromotionalSender = (domain) => {
  const promotionalKeywords = ['deals', 'offers', 'sale', 'promo', 'marketing', 'newsletter', 'noreply'];
  return promotionalKeywords.some(keyword => domain.includes(keyword));
};

const App = () => {
  // App State Management
  const [appState, setAppState] = useState('splash'); // 'splash', 'onboarding', 'feed', 'celebration'
  const [view, setView] = useState('feed');
  const [activeType, setActiveType] = useState('caregiver');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [showShoppingModal, setShowShoppingModal] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showFullEmail, setShowFullEmail] = useState(false);
  const [showActionCustomizer, setShowActionCustomizer] = useState(false);
  const [showSaveLater, setShowSaveLater] = useState(false);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [skipTracker, setSkipTracker] = useState({}); // Track skips by sender domain
  const [completedArchetypes, setCompletedArchetypes] = useState([]);
  const [interactionCount, setInteractionCount] = useState(0);
  const [appBackground, setAppBackground] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)');
  const [showSplayView, setShowSplayView] = useState(false);
  const [splayFilter, setSplayFilter] = useState(null);
  const [showSnoozePicker, setShowSnoozePicker] = useState(false);
  const [snoozeDuration, setSnoozeDuration] = useState(1); // Default 1 hour
  const [hasSetSnoozeDuration, setHasSetSnoozeDuration] = useState(false); // Track if user set preference

  const archetypes = ['caregiver', 'transactional_leader', 'sales_hunter', 'project_coordinator', 'enterprise_innovator', 'deal_stacker', 'status_seeker', 'identity_manager'];
  
  // Apply splay filter if active - exclude seen, snoozed, dismissed cards
  let filteredCards = cards.filter(c => 
    c.type === activeType && 
    c.state !== 'dismissed' && 
    c.state !== 'deleted' && 
    c.state !== 'archived' && 
    c.state !== 'seen' &&
    c.state !== 'snoozed'
  );
  if (splayFilter) {
    filteredCards = filteredCards.filter(splayFilter.filter);
  }
  
  // Debug logging (only log when count changes)
  // console.log(`📊 Total cards: ${cards.length}, Filtered for ${activeType}: ${filteredCards.length}`);

  // Archetype configs for naming
  const configs = {
    transactional_leader: { title: 'Executive' },
    sales_hunter: { title: 'Sales' },
    project_coordinator: { title: 'Projects' },
    enterprise_innovator: { title: 'Learning' },
    caregiver: { title: 'Family' },
    deal_stacker: { title: 'Deals' },
    status_seeker: { title: 'Travel' },
    identity_manager: { title: 'Security' }
  };

  const SNAP_THRESHOLD = 200;
  const SNAP_ZONE = 20;

  // Initialize with coherent demo data and generate backgrounds
  useEffect(() => {
    console.log('🔄 App state changed to:', appState);
    
    if (appState === 'feed' && cards.length === 0) {
      console.log('🚀 Initializing cards...');
      
      const initializeCards = async () => {
        try {
          const coherentCards = emailAdapter.getFullMockData();
          console.log('📧 Loaded coherent cards:', coherentCards?.length || 0, 'emails');
          
          if (!coherentCards || coherentCards.length === 0) {
            console.error('❌ No cards returned from emailAdapter!');
            return;
          }
          
          // Generate AI backgrounds for each card
          const cardsWithBackgrounds = await Promise.all(
            coherentCards.map(async (card) => {
              const aiBackground = await imageGenerator.generateBackground(card);
              return { ...card, aiBackground };
            })
          );
          
          console.log('🎨 Cards with backgrounds:', cardsWithBackgrounds.length);
          setCards(cardsWithBackgrounds);
        } catch (error) {
          console.error('❌ Error initializing cards:', error);
        }
      };

      initializeCards();
    }
  }, [appState, cards.length]);

  // Check for archetype completion and trigger celebration
  useEffect(() => {
    if (filteredCards.length === 0 && cards.length > 0 && appState === 'feed') {
      if (!completedArchetypes.includes(activeType)) {
        setCompletedArchetypes([...completedArchetypes, activeType]);
        setAppState('celebration');
      }
    }
  }, [filteredCards.length, cards.length, activeType, completedArchetypes, appState]);

  // Generate photographic app background based on current card content
  useEffect(() => {
    const generateAppBackground = async () => {
      const currentCard = filteredCards[currentIndex];
      if (currentCard) {
        // Generate photographic scene related to card content
        const photoUrl = await imageGenerator.generatePhotographicBackground(currentCard);
        setAppBackground(`url(${photoUrl})`);
      } else {
        // Fallback to archetype scene if no card
        const photoUrl = await imageGenerator.generatePhotographicBackground({ type: activeType, priority: 'medium', id: 'app-bg' });
        setAppBackground(`url(${photoUrl})`);
      }
    };
    
    if (appState === 'feed') {
      generateAppBackground();
    }
  }, [activeType, appState, currentIndex, filteredCards]);

  // Don't auto-mark cards as seen - only when user explicitly swipes right
  // This was causing all cards to disappear immediately
  /*
  useEffect(() => {
    if (view === 'feed' && filteredCards[currentIndex]) {
      const card = filteredCards[currentIndex];
      if (card.state === 'unseen') {
        setCards(prev => prev.map(c => c.id === card.id ? { ...c, state: 'seen' } : c));
      }
    }
  }, [currentIndex, view, filteredCards]);
  */

  const switchArchetype = (direction) => {
    const currentIdx = archetypes.indexOf(activeType);
    let newIdx;
    
    if (direction === 'next') {
      newIdx = (currentIdx + 1) % archetypes.length;
    } else {
      newIdx = (currentIdx - 1 + archetypes.length) % archetypes.length;
    }
    
    setActiveType(archetypes[newIdx]);
    setCurrentIndex(0);
  };

  const handleUndo = () => {
    if (lastAction) {
      setCards(prev => prev.map(c => 
        c.id === lastAction.cardId ? { ...c, state: lastAction.previousState } : c
      ));
      setShowUndo(false);
      setLastAction(null);
    }
  };

  const handleSwipeAction = (direction, isLong) => {
    const card = filteredCards[currentIndex];
    if (!card) return;

    let newState;
    let actionLabel;

    if (direction === 'right') {
      if (isLong) {
        // Long right = Action Modal (for complex actions)
        if (card.type === 'deal_stacker' || card.type === 'status_seeker') {
          setCurrentCard(card);
          setShowShoppingModal(true);
          return;
        } else {
          setCurrentCard(card);
          setShowComposer(true);
          return;
        }
      } else {
        // Short right = Mark as Seen (removes from pile)
        newState = 'seen';
        actionLabel = '👁️ Marked as Seen';
      }
    } else if (direction === 'left') {
      if (isLong) {
        // Long left = Skip/Dismiss
        newState = 'dismissed';
        actionLabel = '✕ Dismissed';
        
        // Track skips for unsubscribe detection
        const senderDomain = extractDomain(card.dataSources[0]?.from || '');
        if (senderDomain) {
          const newSkipCount = (skipTracker[senderDomain] || 0) + 1;
          setSkipTracker(prev => ({ ...prev, [senderDomain]: newSkipCount }));
          
          // Check if we should show unsubscribe modal
          if (newSkipCount >= 3 && isPromotionalSender(senderDomain)) {
            setCurrentCard({ ...card, senderDomain, skipCount: newSkipCount });
            setShowUnsubscribe(true);
            return;
          }
        }
      } else {
        // Short left = Snooze
        if (!hasSetSnoozeDuration) {
          // First time - show picker modal
          setCurrentCard(card);
          setShowSnoozePicker(true);
          return;
        } else {
          // Use remembered duration - snooze immediately
          const snoozeUntil = new Date(Date.now() + snoozeDuration * 60 * 60 * 1000);
          newState = 'snoozed';
          actionLabel = `💤 Snoozed for ${snoozeDuration < 1 ? snoozeDuration * 60 + ' min' : snoozeDuration + 'h'}`;
          
          setCards(prev => prev.map(c => 
            c.id === card.id ? { ...c, state: 'snoozed', snoozeUntil } : c
          ));
          
          setLastAction({
            cardId: card.id,
            previousState: card.state,
            action: actionLabel
          });
          
          setShowUndo(true);
          setTimeout(() => setShowUndo(false), 3000);
          
          moveToNext();
          return;
        }
      }
    }

    setLastAction({
      cardId: card.id,
      previousState: card.state,
      action: actionLabel
    });

    setCards(prev => prev.map(c => c.id === card.id ? { ...c, state: newState } : c));
    
    
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 3000);

    moveToNext();
  };

  const moveToNext = () => {
    setTimeout(() => {
      // DON'T INCREMENT - when a card is removed, the next card slides into current position
      // Just stay at currentIndex and let React re-render with the new filtered array
      console.log(`✅ Card removed - staying at index ${currentIndex}`);
      
      // Check if we've run out of cards (will trigger celebration via useEffect)
      const remainingCards = cards.filter(c => 
        c.type === activeType && 
        c.state !== 'dismissed' && 
        c.state !== 'deleted' && 
        c.state !== 'archived' && 
        c.state !== 'seen' &&
        c.state !== 'snoozed'
      ).length;
      
      if (remainingCards === 0) {
        console.log('🎉 No more cards in archetype');
      }
    }, 300);
  };

  const handleSendReply = () => {
    setCards(prev => prev.map(c => c.id === currentCard.id ? { ...c, state: 'replied' } : c));
    setShowComposer(false);
    setCurrentCard(null);
    moveToNext();
  };

  const handleShoppingComplete = () => {
    setCards(prev => prev.map(c => c.id === currentCard.id ? { ...c, state: 'converted' } : c));
    setShowShoppingModal(false);
    setCurrentCard(null);
    moveToNext();
  };

  const handleCustomizeAction = (card) => {
    setCurrentCard(card);
    setShowActionCustomizer(true);
  };

  // App State Handlers
  const handleSplashComplete = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = () => {
    setAppState('feed');
  };

  const handleCelebrationContinue = () => {
    // Move to next archetype or back to feed
    const currentIndex = archetypes.indexOf(activeType);
    const nextIndex = (currentIndex + 1) % archetypes.length;
    setActiveType(archetypes[nextIndex]);
    setCurrentIndex(0);
    setAppState('feed');
  };

  // Splay View Handlers
  const handleOpenSplayView = () => {
    setShowSplayView(true);
  };

  const handleCloseSplayView = () => {
    setShowSplayView(false);
    setSplayFilter(null);
  };

  const handleSelectSplayGroup = (group) => {
    setSplayFilter(group);
    setShowSplayView(false);
    setCurrentIndex(0);
  };

  const handleSaveAction = (newAction) => {
    if (currentCard) {
      setCards(prev => prev.map(c => {
        if (c.id === currentCard.id) {
          // Update both hpa and metaCTA to reflect new action
          return {
            ...c,
            hpa: newAction,
            metaCTA: `Swipe Right: ${newAction}`
          };
        }
        return c;
      }));
    }
    setShowActionCustomizer(false);
    setCurrentCard(null);
  };

  const handleSaveLater = (snoozeData) => {
    if (currentCard) {
      setCards(prev => prev.map(c => 
        c.id === currentCard.id ? { ...c, state: 'snoozed', snoozeUntil: snoozeData.scheduledFor } : c
      ));
    }
    setShowSaveLater(false);
    setCurrentCard(null);
    moveToNext();
  };

  const handleSnooze = (hours, remember) => {
    if (currentCard) {
      const snoozeUntil = new Date(Date.now() + hours * 60 * 60 * 1000);
      setCards(prev => prev.map(c => 
        c.id === currentCard.id ? { ...c, state: 'snoozed', snoozeUntil } : c
      ));
      
      // Save duration preference
      setSnoozeDuration(hours);
      if (remember) {
        setHasSetSnoozeDuration(true); // Don't show picker again
      }
      
      setLastAction({
        cardId: currentCard.id,
        previousState: currentCard.state,
        action: `💤 Snoozed for ${hours < 1 ? hours * 60 + ' min' : hours + 'h'}`
      });
      
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 3000);
    }
    setShowSnoozePicker(false);
    setCurrentCard(null);
    moveToNext();
  };

  const handleDragStart = (e) => {
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    
    let offsetX = clientX - dragStart.x;
    const offsetY = clientY - dragStart.y;

    const absOffsetX = Math.abs(offsetX);
    const prevAbsOffsetX = Math.abs(dragOffset.x);
    
    // Magnetic snapping with haptic feedback
    if (absOffsetX > SNAP_THRESHOLD - SNAP_ZONE && absOffsetX < SNAP_THRESHOLD + SNAP_ZONE) {
      const snapDirection = offsetX > 0 ? 1 : -1;
      offsetX = (SNAP_THRESHOLD + 10) * snapDirection;
      
      if (prevAbsOffsetX < SNAP_THRESHOLD - SNAP_ZONE || prevAbsOffsetX > SNAP_THRESHOLD + SNAP_ZONE) {
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      }
    }
    
    // Enhanced 2-level haptic feedback
    // Level 1: Soft swipe threshold (100px) - Light haptic
    if (absOffsetX > 100 && prevAbsOffsetX <= 100) {
      if (navigator.vibrate) {
        navigator.vibrate(8); // Light vibration for soft swipe
      }
    }
    
    // Level 2: Hard swipe threshold (200px) - Strong haptic
    if (absOffsetX > 200 && prevAbsOffsetX <= 200) {
      if (navigator.vibrate) {
        navigator.vibrate([20, 10, 20]); // Strong pattern for hard swipe
      }
    }

    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const isHorizontal = Math.abs(dragOffset.x) > Math.abs(dragOffset.y);
    const isLongSwipe = Math.abs(dragOffset.x) > 200;

    if (isHorizontal && Math.abs(dragOffset.x) > 100) {
      // Haptic feedback on action confirmation
      if (navigator.vibrate) {
        if (isLongSwipe) {
          navigator.vibrate([15, 10, 15]);
        } else {
          navigator.vibrate(20);
        }
      }
      handleSwipeAction(dragOffset.x > 0 ? 'right' : 'left', isLongSwipe);
    } else if (!isHorizontal && Math.abs(dragOffset.y) > 100) {
      if (dragOffset.y < 0) {
        setCurrentIndex(prev => Math.min(prev + 1, filteredCards.length - 1));
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }

    setDragOffset({ x: 0, y: 0 });
  };

  // Dashboard view with archetype selection
  if (view === 'dashboard') {
    const archetypeGroups = [
      { label: 'Professional', archetypes: [
        { id: 'transactional_leader', label: 'Executive', icon: Briefcase },
        { id: 'sales_hunter', label: 'Job (Sales)', icon: TrendingUp },
        { id: 'project_coordinator', label: 'Projects', icon: Calendar },
        { id: 'enterprise_innovator', label: 'Learning', icon: Sparkles }
      ]},
      { label: 'Consumer', archetypes: [
        { id: 'caregiver', label: 'Family', icon: Baby },
        { id: 'deal_stacker', label: 'Shopping', icon: ShoppingBag },
        { id: 'status_seeker', label: 'Travel', icon: Award },
        { id: 'identity_manager', label: 'Security', icon: AlertTriangle }
      ]}
    ];

    return (
      <div className="w-full h-screen bg-slate-950 overflow-y-auto">
        <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h2 className="text-white text-lg font-bold mb-3">Select Archetype</h2>
            {archetypeGroups.map((group) => (
              <div key={group.label} className="mb-4">
                <div className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">{group.label}</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {group.archetypes.map((type) => {
                    const Icon = type.icon;
                    const typeCards = cards.filter(c => c.type === type.id && c.state !== 'dismissed');
                    return (
                      <button 
                        key={type.id} 
                        onClick={() => setActiveType(type.id)} 
                        className={'flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-xl font-medium transition-all ' + (activeType === type.id ? 'bg-blue-600 text-white scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700')}
                      >
                        <Icon size={20} />
                        <span className="text-sm">{type.label}</span>
                        <span className="text-xs opacity-70">{typeCards.length}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Dashboard type={activeType} cards={cards} onViewFeed={() => setView('feed')} />
      </div>
    );
  }

  // Render different app states FIRST (before any content checks)
  if (appState === 'splash') {
    return <SplashScreen onEnter={handleSplashComplete} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingTutorial onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'celebration') {
    return (
      <CelebrationScreen 
        archetype={activeType} 
        onContinue={handleCelebrationContinue} 
      />
    );
  }

  // Show splay view when user taps progress counter (to organize by sub-categories)
  if (showSplayView) {
    return (
      <SplayView 
        archetype={activeType}
        cards={cards.filter(c => c.type === activeType && c.state !== 'dismissed' && c.state !== 'deleted' && c.state !== 'archived')}
        onSelectGroup={handleSelectSplayGroup}
        onBack={handleCloseSplayView}
      />
    );
  }

  // Inbox Zero state (only show when in feed mode and actually have processed cards)
  if (filteredCards.length === 0 && cards.length > 0 && appState === 'feed') {
    return (
      <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Inbox Zero!</h2>
          <p className="text-slate-400 mb-4">All {activeType} items processed</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setView('dashboard')} className="bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold">
              Dashboard
            </button>
            <button onClick={() => switchArchetype('next')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
              Next Archetype
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate progress
  const totalEmails = cards.length;
  const processedEmails = cards.filter(c => ['read', 'processed', 'dismissed', 'replied', 'converted'].includes(c.state)).length;

  // Main swipe feed
  return (
    <div 
      className="w-full h-screen relative overflow-hidden"
      style={{
        background: appBackground,
        backgroundSize: '120%',
        animation: 'subtleBackgroundMove 20s ease-in-out infinite',
      }}
    >
      {/* Add keyframes for background animation */}
      <style>{`
        @keyframes subtleBackgroundMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      
      {/* Subtle vignette for depth (doesn't block photos) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      {/* Unified Bottom Navigation */}
      <UnifiedBottomNav 
        archetypeName={splayFilter ? splayFilter.name : (configs[activeType]?.title || 'Unknown')}
        emailsLeft={filteredCards.length}
        onPrevArchetype={() => switchArchetype('prev')}
        onNextArchetype={() => switchArchetype('next')}
        onOpenSplay={handleOpenSplayView}
        onOpenBottomSheet={() => setShowBottomSheet(true)}
      />

      {/* Modals */}
      {showComposer && currentCard && <ReplyComposer card={currentCard} onSend={handleSendReply} onCancel={() => { setShowComposer(false); setCurrentCard(null); }} />}
      {showShoppingModal && currentCard && <ShoppingActionModal card={currentCard} onComplete={handleShoppingComplete} onCancel={() => { setShowShoppingModal(false); setCurrentCard(null); }} />}
      {showBottomSheet && <BottomSheet isOpen={showBottomSheet} onClose={() => setShowBottomSheet(false)} activeArchetype={activeType} onArchetypeChange={setActiveType} cards={cards} currentEmail={filteredCards[currentIndex]} />}
      {showFullEmail && currentCard && <FullEmailView email={currentCard} onClose={() => { setShowFullEmail(false); setCurrentCard(null); }} onReply={() => { setShowFullEmail(false); setShowComposer(true); }} onArchive={() => { setShowFullEmail(false); handleSwipeAction('left', false); }} onDelete={() => { setShowFullEmail(false); handleSwipeAction('left', true); }} />}
      {showActionCustomizer && currentCard && <ActionCustomizer email={currentCard} currentAction={currentCard.hpa} onSave={handleSaveAction} onCancel={() => { setShowActionCustomizer(false); setCurrentCard(null); }} />}
      {showSaveLater && currentCard && <SaveLaterModal email={currentCard} onSave={handleSaveLater} onCancel={() => { setShowSaveLater(false); setCurrentCard(null); }} />}
      {showSnoozePicker && currentCard && <SnoozePickerModal email={currentCard} defaultHours={snoozeDuration} onSave={handleSnooze} onCancel={() => { setShowSnoozePicker(false); setCurrentCard(null); }} />}
      {showUnsubscribe && currentCard && <UnsubscribeModal senderInfo={{ domain: currentCard.senderDomain, email: currentCard.dataSources[0]?.from }} skipCount={currentCard.skipCount} onUnsubscribe={() => { setShowUnsubscribe(false); setCurrentCard(null); }} onHide={() => { setShowUnsubscribe(false); setCurrentCard(null); }} onKeep={() => { setShowUnsubscribe(false); setCurrentCard(null); }} onCancel={() => { setShowUnsubscribe(false); setCurrentCard(null); }} />}

      {showUndo && lastAction && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4">
          <span>{lastAction.action}</span>
          <button onClick={handleUndo} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
            Undo
          </button>
        </div>
      )}

      <div className="relative w-full h-full flex items-center justify-center z-10">
        {filteredCards.map((card, index) => {
          const offset = (index - currentIndex) * 8; // Tighter stacking
          const adjustedOffsetY = offset + (isDragging && index === currentIndex ? (dragOffset.y / window.innerHeight) * 100 : 0);
          const adjustedOffsetX = isDragging && index === currentIndex ? dragOffset.x : 0;
          const isHorizontal = Math.abs(dragOffset.x) > Math.abs(dragOffset.y);
          
          // Orderly stack with slight misalignment
          const isTopCard = index === currentIndex;
          
          // Debug: Log ALL top cards to track advancement
          if (isTopCard) {
            console.log(`🎴 Rendering card ${index} as TOP CARD (currentIndex: ${currentIndex}, card.id: ${card.id})`);
          }
          
          const rotation = isDragging && index === currentIndex 
            ? (dragOffset.x / 30) 
            : (!isTopCard ? (index % 3 === 0 ? -2 : index % 3 === 1 ? 1.5 : -1) : 0); // 2-3 degree variations
          const scale = isTopCard ? 1 : 1.03; // Background cards slightly larger (edges peek out)
          const scatter = !isTopCard ? (index % 2 === 0 ? 3 : -3) : 0; // Subtle horizontal shift
          
          // Calculate reveal progress for next card (0 to 0.8)
          const swipeProgress = isDragging && isTopCard ? Math.min(Math.abs(dragOffset.x) / 300, 1) : 0;
          const nextCardReveal = index === currentIndex + 1 ? swipeProgress * 0.8 : 0;
          
          return (
            <div 
              key={card.id} 
              className="absolute" 
              style={{ 
                transform: `translateY(${adjustedOffsetY}px) translateX(${adjustedOffsetX + scatter}px) rotate(${rotation}deg) scale(${scale})`, 
                opacity: Math.abs(index - currentIndex) > 2 ? 0 : 1, // Show 3 cards max
                zIndex: filteredCards.length - Math.abs(index - currentIndex), 
                transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                top: '50%',
                left: '50%',
                marginTop: '-200px',
                marginLeft: '-200px'
              }}
              // Only top card is interactive
              onMouseDown={isTopCard ? handleDragStart : undefined}
              onMouseMove={isTopCard ? handleDragMove : undefined}
              onMouseUp={isTopCard ? handleDragEnd : undefined}
              onTouchStart={isTopCard ? handleDragStart : undefined}
              onTouchMove={isTopCard ? handleDragMove : undefined}
              onTouchEnd={isTopCard ? handleDragEnd : undefined}
            >
              <div className="relative">
                {(card.type === 'caregiver') && <EnhancedParentCard card={card} isSeen={card.state !== 'unseen'} onViewEmail={() => { setCurrentCard(card); setShowFullEmail(true); }} onCustomizeAction={handleCustomizeAction} isTopCard={isTopCard} revealProgress={nextCardReveal} />}
                
                {(card.type === 'sales_hunter' || card.type === 'transactional_leader' || card.type === 'project_coordinator' || card.type === 'enterprise_innovator' || card.type === 'identity_manager') && <EnhancedBusinessCard card={card} isSeen={card.state !== 'unseen'} onViewEmail={() => { setCurrentCard(card); setShowFullEmail(true); }} onCustomizeAction={handleCustomizeAction} isTopCard={isTopCard} revealProgress={nextCardReveal} />}
                
                {(card.type === 'deal_stacker' || card.type === 'status_seeker') && <EnhancedShoppingCard card={card} isSeen={card.state !== 'unseen'} onViewEmail={() => { setCurrentCard(card); setShowFullEmail(true); }} onCustomizeAction={handleCustomizeAction} isTopCard={isTopCard} revealProgress={nextCardReveal} />}

                {isTopCard && isHorizontal && Math.abs(dragOffset.x) > 50 && (
                  <SwipeActionOverlay direction={dragOffset.x > 0 ? 'right' : 'left'} cardType={card.type} swipeDistance={dragOffset.x} />
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default App;
