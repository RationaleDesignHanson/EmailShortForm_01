import React, { useState } from 'react';
import { X, Check, Settings } from 'lucide-react';

export const ActionCustomizer = ({ email, currentAction, onSave, onCancel }) => {
  const [selectedAction, setSelectedAction] = useState(currentAction);

  const actionOptions = {
    caregiver: [
      { id: 'sign_send', label: 'Sign & Send', description: 'Auto-fill form and send reply' },
      { id: 'acknowledge', label: 'Acknowledge', description: 'Send confirmation reply' },
      { id: 'schedule', label: 'Add to Calendar', description: 'Create calendar event' },
      { id: 'save_later', label: 'Save for Later', description: 'Snooze until specified time' },
      { id: 'archive', label: 'Archive', description: 'Mark as read and file' }
    ],
    sales_hunter: [
      { id: 'schedule_demo', label: 'Schedule Demo', description: 'Send available times for demo' },
      { id: 'route_crm', label: 'Route to CRM', description: 'Create lead and mark as processed' },
      { id: 'fast_followup', label: 'Fast Follow-Up', description: 'Send templated response' },
      { id: 'save_later', label: 'Save for Later', description: 'Snooze for follow-up' },
      { id: 'disqualify', label: 'Disqualify', description: 'Mark as not a fit' }
    ],
    transactional_leader: [
      { id: 'review_approve', label: 'Review & Approve', description: 'Open document for approval' },
      { id: 'auto_route', label: 'Auto-Route', description: 'Forward to appropriate team' },
      { id: 'delegate', label: 'Delegate', description: 'Assign to team member' },
      { id: 'save_later', label: 'Save for Later', description: 'Defer to scheduled time' }
    ],
    deal_stacker: [
      { id: 'claim_deal', label: 'Claim Deal', description: 'Open store page with deal applied' },
      { id: 'save_deal', label: 'Save Deal', description: 'Bookmark for later purchase' },
      { id: 'not_interested', label: 'Not Interested', description: 'Dismiss and unsubscribe' },
      { id: 'compare', label: 'Compare Prices', description: 'Check other retailers' }
    ],
    status_seeker: [
      { id: 'check_in', label: 'Check In Now', description: 'Complete check-in process' },
      { id: 'enroll', label: 'Enroll Now', description: 'Join program or challenge' },
      { id: 'save_later', label: 'Save for Later', description: 'Remind me closer to date' }
    ],
    identity_manager: [
      { id: 'verify_identity', label: 'Verify Identity', description: 'Complete security verification' },
      { id: 'confirm_deny', label: 'Confirm or Deny', description: 'Approve or reject activity' },
      { id: 'report_suspicious', label: 'Report Suspicious', description: 'Flag as potential threat' }
    ],
    project_coordinator: [
      { id: 'schedule_review', label: 'Schedule Review', description: 'Book meeting for review' },
      { id: 'file_project', label: 'File by Project', description: 'Tag and organize by project' },
      { id: 'save_later', label: 'Save for Later', description: 'Defer to project timeline' }
    ],
    enterprise_innovator: [
      { id: 'save_later', label: 'Save for Later', description: 'Add to reading list' },
      { id: 'express_interest', label: 'Express Interest', description: 'Send interest reply' },
      { id: 'share_team', label: 'Share with Team', description: 'Forward to relevant colleagues' }
    ]
  };

  const options = actionOptions[email.type] || actionOptions.caregiver;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-700">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Settings className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Customize Action</h2>
                <p className="text-white/80 text-sm">Choose your preferred action</p>
              </div>
            </div>
            <button onClick={onCancel} className="text-white/80 hover:text-white">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedAction(option.label)}
                className={`w-full p-4 rounded-xl border transition-all text-left ${
                  selectedAction === option.label
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold mb-1">{option.label}</div>
                    <div className="text-sm opacity-80">{option.description}</div>
                  </div>
                  {selectedAction === option.label && (
                    <Check size={20} className="text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-700 flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(selectedAction)}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
          >
            Save Action
          </button>
        </div>
      </div>
    </div>
  );
};
