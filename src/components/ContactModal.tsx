import React, { useState } from 'react';
import { X, ChevronRight, Upload, CheckCircle, Loader2 } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
  title: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose, title }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-lg max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto min-h-[400px] flex flex-col justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
            <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-teal-500/30">
              <CheckCircle className="w-10 h-10 text-teal-500 animate-in zoom-in duration-500 delay-100" />
            </div>
            <h3 className="text-2xl font-display font-light text-white mb-2">Request Received!</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-[280px]">
              Thanks for your interest in <strong>{title}</strong>. Our team will review your details and get back to you within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 font-medium transition-colors rounded-sm border border-slate-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-display font-light text-white mb-2">Start a Project</h3>
            <p className="text-slate-400 text-sm mb-6">
              Interested in <strong>{title}</strong>? Tell us about your vision.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500 transition-colors rounded-sm"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500 transition-colors rounded-sm"
                  placeholder="your@email.com"
                />
              </div>

               <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Service Needed</label>
                <div className="relative">
                  <select
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 pr-8 focus:outline-none focus:border-teal-500 transition-colors rounded-sm appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service...</option>
                    <option value="web-dev">Web Development</option>
                    <option value="mobile-app">Mobile App Development</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Project Details</label>
                <textarea
                  required
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-700 text-white px-4 py-2 focus:outline-none focus:border-teal-500 transition-colors rounded-sm resize-none"
                  placeholder="Tell us a bit about what you need..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Project Brief (Optional)</label>
                <div className="relative">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                    />
                    <label 
                        htmlFor="file-upload"
                        className="flex items-center justify-between w-full bg-slate-800 border border-slate-700 border-dashed hover:border-teal-500/50 text-slate-400 px-4 py-3 cursor-pointer transition-colors rounded-sm group"
                    >
                        <span className={`text-sm truncate pr-2 ${fileName ? 'text-teal-400' : 'group-hover:text-slate-300'}`}>
                            {fileName || "Upload file (PDF, DOCX)"}
                        </span>
                        <Upload className="w-4 h-4 text-slate-500 group-hover:text-teal-500 transition-colors flex-shrink-0" />
                    </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 font-medium transition-colors mt-2 rounded-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Request"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;