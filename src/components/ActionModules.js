import React, { useState } from 'react';
import { X, Check, Calendar, FileText, Send, CreditCard, Folder, Users } from 'lucide-react';

// Universal action modal wrapper
const ActionModal = ({ title, icon: Icon, children, onClose }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-700">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              {Icon && <Icon className="text-white" size={24} />}
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={28} />
          </button>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

// 1. Review & Approve Module
export const ReviewApproveModal = ({ card, onComplete, onCancel }) => {
  const [approved, setApproved] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log(`${approved ? 'Approved' : 'Rejected'}: ${card.title}`);
    onComplete();
  };

  return (
    <ActionModal title="Review & Approve" icon={FileText} onClose={onCancel}>
      {/* Document Preview */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-2">{card.title}</h3>
        <p className="text-slate-400 text-sm">{card.summary}</p>
      </div>

      {/* Approve/Reject */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setApproved(true)}
          className={`p-4 rounded-xl border-2 transition-all ${
            approved === true 
              ? 'bg-green-600 border-green-500 text-white' 
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-green-500'
          }`}
        >
          <Check size={24} className="mx-auto mb-2" />
          <div className="font-semibold">Approve</div>
        </button>
        <button
          onClick={() => setApproved(false)}
          className={`p-4 rounded-xl border-2 transition-all ${
            approved === false 
              ? 'bg-red-600 border-red-500 text-white' 
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-red-500'
          }`}
        >
          <X size={24} className="mx-auto mb-2" />
          <div className="font-semibold">Reject</div>
        </button>
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add comment (optional)"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 min-h-[100px]"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={approved === null}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 disabled:cursor-not-allowed"
      >
        Submit {approved === true ? 'Approval' : approved === false ? 'Rejection' : 'Decision'}
      </button>
    </ActionModal>
  );
};

// 2. Add to Calendar Module
export const AddToCalendarModal = ({ card, onComplete, onCancel }) => {
  const handleAddToCalendar = () => {
    console.log(`Added to calendar: ${card.title}`);
    onComplete();
  };

  return (
    <ActionModal title="Add to Calendar" icon={Calendar} onClose={onCancel}>
      {/* Event Details */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-3">{card.title}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">When:</span>
            <span className="text-white">TBD (from email)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Duration:</span>
            <span className="text-white">1 hour</span>
          </div>
          {card.dataSources?.[0]?.from && (
            <div className="flex justify-between">
              <span className="text-slate-400">With:</span>
              <span className="text-white">{card.dataSources[0].from}</span>
            </div>
          )}
        </div>
      </div>

      {/* Add to Calendar Button */}
      <button
        onClick={handleAddToCalendar}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
      >
        <Calendar size={20} />
        Add to Calendar
      </button>
    </ActionModal>
  );
};

// 3. Sign Form Module (with multi-step for payment)
export const SignFormModal = ({ card, onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [signed, setSigned] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleSign = () => {
    setSigned(true);
    if (card.requiresSignature) {
      setStep(2); // Move to payment step
    } else {
      onComplete();
    }
  };

  const handlePayment = () => {
    console.log(`Payment via ${paymentMethod}`);
    onComplete();
  };

  return (
    <ActionModal title={step === 1 ? "Sign Permission Form" : "Send Payment"} icon={FileText} onClose={onCancel}>
      {step === 1 ? (
        <>
          {/* Form Preview */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
            <h3 className="text-white font-semibold mb-3">Permission Form</h3>
            {card.formFields?.map((field, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-slate-700 last:border-0">
                <span className="text-slate-400 text-sm">{field.label}:</span>
                <span className="text-white text-sm font-medium">{field.autoFillValue}</span>
              </div>
            ))}
          </div>

          {/* Signature */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
            <div className="text-slate-400 text-sm mb-2">Signature:</div>
            <div className="bg-slate-700 rounded-lg p-6 text-center">
              <div className="text-white font-signature text-2xl">Sarah Chen</div>
            </div>
          </div>

          {/* Sign Button */}
          <button
            onClick={handleSign}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
          >
            Sign & Continue
          </button>
        </>
      ) : (
        <>
          {/* Payment Amount */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-4 text-center">
            <div className="text-slate-400 text-sm mb-2">Amount Due</div>
            <div className="text-white text-4xl font-bold">$15.00</div>
            <div className="text-slate-400 text-sm mt-1">Lunch money for field trip</div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-4">
            {['Venmo', 'Zelle', 'Apple Pay'].map(method => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                  paymentMethod === method
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-white hover:border-blue-500'
                }`}
              >
                <span className="font-semibold">{method}</span>
                {paymentMethod === method && <Check size={20} />}
              </button>
            ))}
          </div>

          {/* Send Payment */}
          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <CreditCard size={20} />
            Send ${15} via {paymentMethod || '...'}
          </button>
        </>
      )}
    </ActionModal>
  );
};

// 4. Schedule Meeting Module
export const ScheduleMeetingModal = ({ card, onComplete, onCancel }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = [
    'Tomorrow 2:00 PM',
    'Tomorrow 4:00 PM',
    'Wednesday 10:00 AM',
    'Wednesday 2:00 PM',
    'Thursday 1:00 PM'
  ];

  const handleSchedule = () => {
    console.log(`Scheduled meeting: ${selectedTime}`);
    onComplete();
  };

  return (
    <ActionModal title="Schedule Meeting" icon={Users} onClose={onCancel}>
      {/* Meeting Info */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-2">{card.title}</h3>
        <p className="text-slate-400 text-sm">{card.summary}</p>
      </div>

      {/* Time Slots */}
      <div className="space-y-2 mb-4">
        <div className="text-white font-semibold mb-3">Available Times:</div>
        {timeSlots.map(time => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
              selectedTime === time
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-700 text-white hover:border-blue-500'
            }`}
          >
            <span>{time}</span>
            {selectedTime === time && <Check size={18} />}
          </button>
        ))}
      </div>

      {/* Schedule Button */}
      <button
        onClick={handleSchedule}
        disabled={!selectedTime}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
      >
        Schedule for {selectedTime || '...'}
      </button>
    </ActionModal>
  );
};

// 5. Route to CRM Module
export const RouteToCRMModal = ({ card, onComplete, onCancel }) => {
  const [tags, setTags] = useState([]);

  const availableTags = ['Hot Lead', 'Follow Up', 'Proposal Sent', 'Demo Scheduled'];

  const toggleTag = (tag) => {
    setTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleRoute = () => {
    console.log(`Routed to CRM with tags: ${tags.join(', ')}`);
    onComplete();
  };

  return (
    <ActionModal title="Route to CRM" icon={Folder} onClose={onCancel}>
      {/* Lead Details */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-2">{card.title}</h3>
        {card.company && (
          <div className="text-slate-400 text-sm mb-1">Company: {card.company.name}</div>
        )}
        {card.value && (
          <div className="text-green-400 text-sm font-bold">Deal Value: {card.value}</div>
        )}
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="text-white font-semibold mb-3">Tags:</div>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                tags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Route Button */}
      <button
        onClick={handleRoute}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
      >
        Route to CRM
      </button>
    </ActionModal>
  );
};

// 6. Generic Action Module (fallback)
export const GenericActionModal = ({ action, card, onComplete, onCancel }) => {
  return (
    <ActionModal title={action} icon={Send} onClose={onCancel}>
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-2">{card.title}</h3>
        <p className="text-slate-400 text-sm">{card.summary}</p>
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
      >
        Complete: {action}
      </button>
    </ActionModal>
  );
};
