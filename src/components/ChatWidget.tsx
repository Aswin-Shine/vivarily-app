import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Minus, X } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 How can we help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "Thanks for your message! Our team is currently reviewing your inquiry and will get back to you shortly.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[320px] sm:w-[380px] h-[500px] max-h-[70vh] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse absolute -right-0.5 -bottom-0.5 border border-slate-800"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                    <MessageCircle size={16} className="text-teal-400" />
                 </div>
              </div>
              <div>
                 <span className="font-display text-white text-sm tracking-wide block">Vivarily Support</span>
                 <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Typically replies in 5m</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded-md"
              aria-label="Close chat"
            >
              <Minus size={18} />
            </button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-teal-600 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-slate-800 text-slate-200 rounded-2xl rounded-tl-sm border border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow bg-slate-900 border border-slate-700 rounded-md px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-500"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="p-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-md transition-all active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all z-50 hover:scale-105 active:scale-95 group ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-teal-600 text-white'}`}
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-bounce-subtle" />}
      </button>
    </>
  );
};

export default ChatWidget;