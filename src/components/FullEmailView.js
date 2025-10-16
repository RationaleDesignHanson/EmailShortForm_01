import React from 'react';
import { Reply, Archive, Delete, ChevronLeft } from 'lucide-react';

export const FullEmailView = ({ email, onClose, onReply, onArchive, onDelete }) => {
  if (!email) return null;

  // formatDate function removed - not used

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/50';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/50';
    }
  };

  // Generate full email content based on the card data
  const generateFullEmailContent = (email) => {
    const baseContent = `${email.summary}\n\n`;
    
    if (email.type === 'caregiver' && email.requiresSignature) {
      return baseContent + `This email requires a signature for the field trip permission form. Please review the attached form and provide the necessary information.\n\nRequired fields:\n${email.formFields?.map(field => `• ${field.label}: ${field.autoFillValue}`).join('\n') || ''}\n\nPlease return the signed form by the deadline to ensure your child can participate in this educational opportunity.`;
    }
    
    if (email.type === 'sales_hunter') {
      return baseContent + `We are excited about the opportunity to work together. Based on our initial conversation, this looks like a strong fit for our services.\n\nNext steps:\n• Schedule a demo call\n• Review technical requirements\n• Discuss pricing and timeline\n• Prepare proposal\n\nPlease let us know your availability for a 30-minute demo call this week.`;
    }
    
    if (email.type === 'deal_stacker' && email.promoCode) {
      return baseContent + `This is a limited-time offer with significant savings. The promo code ${email.promoCode} has been automatically applied to your cart.\n\nOffer details:\n• Original price: $${email.originalPrice}\n• Sale price: $${email.salePrice}\n• You save: $${(email.originalPrice - email.salePrice).toFixed(2)}\n• Expires: ${email.expiresIn}\n\nDon't miss out on this exclusive deal!`;
    }
    
    if (email.type === 'identity_manager' && email.security) {
      return baseContent + `This is a security-related notification that requires your immediate attention. Please verify this activity and take appropriate action.\n\n${email.expiresIn ? `This request expires in ${email.expiresIn}.` : ''}\n\nIf you did not initiate this request, please contact our security team immediately.`;
    }
    
    return baseContent + `Please review this message and take the appropriate action. If you have any questions, don't hesitate to reach out.\n\nThank you for your attention to this matter.`;
  };

  const fullContent = generateFullEmailContent(email);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 border-b border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-2 rounded-xl transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">Full Email</h2>
                <p className="text-white/80 text-sm">Complete message details</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(email.priority)}`}>
              {email.priority.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Email Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Email Headers */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="text-slate-400 text-sm">From:</div>
                <div className="text-white font-medium text-right">{email.dataSources[0]?.from}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-slate-400 text-sm">Subject:</div>
                <div className="text-white font-medium text-right">{email.dataSources[0]?.subject || email.title}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-slate-400 text-sm">Date:</div>
                <div className="text-white font-medium">{email.timeAgo}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-slate-400 text-sm">Action:</div>
                <div className="text-white font-medium">{email.hpa}</div>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
            <h3 className="text-white font-semibold mb-3">Message</h3>
            <div className="text-white/90 text-base leading-relaxed whitespace-pre-line">
              {fullContent}
            </div>
          </div>

          {/* Attachments */}
          {email.requiresSignature && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
              <h3 className="text-white font-semibold mb-3">Attachments</h3>
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xs font-bold">PDF</span>
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">Permission Form</div>
                  <div className="text-slate-400 text-xs">Signature required</div>
                </div>
              </div>
            </div>
          )}

          {/* Form Fields Preview */}
          {email.formFields && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
              <h3 className="text-white font-semibold mb-3">Auto-filled Information</h3>
              <div className="space-y-2">
                {email.formFields.map((field, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-slate-400">{field.label}:</span>
                    <span className="text-white font-medium">{field.autoFillValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex gap-3">
          <button 
            onClick={onArchive}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Archive size={18} />
            Archive
          </button>
          <button 
            onClick={onReply}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Reply size={18} />
            Reply
          </button>
          <button 
            onClick={onDelete}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Delete size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
