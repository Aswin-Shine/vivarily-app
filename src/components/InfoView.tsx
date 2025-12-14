import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Shield, CheckCircle, FileText, Smartphone, PhoneCall } from 'lucide-react';

interface InfoViewProps {
  view: 'terms' | 'contact';
  onBack: () => void;
}

const InfoView: React.FC<InfoViewProps> = ({ view, onBack }) => {
  const isTerms = view === 'terms';

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-screen flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <button 
        onClick={onBack}
        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-12 self-start"
      >
        <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-widest text-xs">Back to Home</span>
      </button>

      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-display font-light text-white mb-6">
          {isTerms ? 'Terms of Service' : 'Contact Us'}
        </h2>
        <div className="w-20 h-1 bg-teal-500 mb-12"></div>

        {isTerms ? (
          <div className="space-y-8 text-slate-300 font-light leading-relaxed">
            <p className="text-lg mb-8">
              Please read these terms and conditions carefully before using Our Service.
            </p>
            
            <div className="bg-slate-900/40 border border-slate-700/50 p-8 rounded-sm">
              <ul className="space-y-6">
                {[
                  { title: "Acceptance of Terms", text: "By accessing and using Vivarily's services, you accept and agree to be bound by the terms and provision of this agreement." },
                  { title: "Intellectual Property", text: "All content, designs, graphics, and code developed by Vivarily remain the intellectual property of Vivarily until full payment and transfer of rights." },
                  { title: "Service Modifications", text: "Vivarily reserves the right to modify, suspend, or discontinue any aspect of our services at any time with prior notice." },
                  { title: "Confidentiality", text: "We are committed to protecting the confidentiality of our clients' proprietary information and trade secrets." },
                  { title: "Limitation of Liability", text: "Vivarily shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from the use of our services." },
                  { title: "Payment Terms", text: "Invoices are due upon receipt. Late payments may incur interest charges as specified in the service agreement." },
                  { title: "Termination", text: "Both parties reserve the right to terminate the service agreement with a 30-day written notice, subject to the terms agreed upon in the specific contract." },
                  { title: "Governing Law", text: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Vivarily is registered." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <strong className="text-white block mb-1 font-display tracking-wide">{item.title}</strong>
                      <span className="text-slate-400 text-sm">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-sm text-slate-500 mt-8 pt-8 border-t border-slate-800">
              Last updated: October 24, 2023
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-xl text-slate-300 font-light mb-8">
                We'd love to hear from you. Whether you have a question about our services, pricing, or just want to say hello, our team is ready to answer all your questions.
              </p>
              
              <div className="space-y-6">
                <div className="group p-6 bg-slate-900/40 border border-slate-700/50 hover:border-teal-500/50 transition-all rounded-sm flex items-start gap-5">
                   <div className="p-3 bg-slate-800 rounded-full group-hover:bg-teal-500/20 transition-colors">
                     <Mail className="w-6 h-6 text-teal-400" />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Email Us</h3>
                     <a href="mailto:vivarily@gmail.com" className="text-xl text-white font-display hover:text-teal-400 transition-colors">vivarily@gmail.com</a>
                     <p className="text-xs text-slate-500 mt-1">We usually reply within 24 hours.</p>
                   </div>
                </div>

                <div className="group p-6 bg-slate-900/40 border border-slate-700/50 hover:border-teal-500/50 transition-all rounded-sm flex items-start gap-5">
                   <div className="p-3 bg-slate-800 rounded-full group-hover:bg-teal-500/20 transition-colors">
                     <Smartphone className="w-6 h-6 text-teal-400" />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile Support</h3>
                     <a href="tel:+919876543210" className="text-xl text-white font-display hover:text-teal-400 transition-colors">+91-9876543210</a>
                     <p className="text-xs text-slate-500 mt-1">Available Mon-Fri, 9am - 6pm IST</p>
                   </div>
                </div>

                <div className="group p-6 bg-slate-900/40 border border-slate-700/50 hover:border-teal-500/50 transition-all rounded-sm flex items-start gap-5">
                   <div className="p-3 bg-slate-800 rounded-full group-hover:bg-teal-500/20 transition-colors">
                     <PhoneCall className="w-6 h-6 text-teal-400" />
                   </div>
                   <div>
                     <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Headquarters (Landline)</h3>
                     <a href="tel:01123456789" className="text-xl text-white font-display hover:text-teal-400 transition-colors">011-2345-6789</a>
                   </div>
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[300px] bg-slate-900/40 border border-slate-700/50 rounded-sm overflow-hidden p-8 flex flex-col justify-center items-center text-center">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay"></div>
                 <div className="relative z-10">
                    <MapPin className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-display text-white mb-2">Visit Our Office</h3>
                    <p className="text-slate-400 mb-6">
                      Tech Park Plaza, Sector 42<br/>
                      Gurugram, Haryana 122002<br/>
                      India
                    </p>
                    <button className="px-6 py-2 border border-teal-500 text-teal-400 text-sm hover:bg-teal-500 hover:text-white transition-all uppercase tracking-wider">
                      Get Directions
                    </button>
                 </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoView;