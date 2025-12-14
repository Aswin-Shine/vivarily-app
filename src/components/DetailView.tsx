import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Users, Award, Code2, ArrowUpRight, Activity, Server, Zap, 
  ShieldCheck, Database, Cloud, Mic, Briefcase, Smartphone, Monitor, PenTool, CheckCircle2,
  Play, Pause, SkipForward, SkipBack, Volume2, GitBranch, AlertCircle, Download, Globe, Quote, Cpu,
  Terminal, Clock, Circle, BarChart3, Radio, X, Loader2, List, Search, Rocket
} from 'lucide-react';
import { NavItem } from '../types';
import { 
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, 
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar
} from 'recharts';

interface DetailViewProps {
  item: NavItem;
  onBack: () => void;
  onOpenContact?: () => void;
}

// --- Mock Data ---

const trafficData = [
  { name: '00:00', requests: 2400, latency: 120 },
  { name: '04:00', requests: 1398, latency: 110 },
  { name: '08:00', requests: 9800, latency: 140 },
  { name: '12:00', requests: 3908, latency: 200 },
  { name: '16:00', requests: 4800, latency: 180 },
  { name: '20:00', requests: 3800, latency: 150 },
  { name: '23:59', requests: 4300, latency: 130 },
];

const projectDetailData = [
  { name: '10:00', activeUsers: 400, bandwidth: 240 },
  { name: '10:05', activeUsers: 560, bandwidth: 380 },
  { name: '10:10', activeUsers: 340, bandwidth: 220 },
  { name: '10:15', activeUsers: 890, bandwidth: 650 },
  { name: '10:20', activeUsers: 780, bandwidth: 580 },
  { name: '10:25', activeUsers: 450, bandwidth: 300 },
  { name: '10:30', activeUsers: 670, bandwidth: 450 },
  { name: '10:35', activeUsers: 920, bandwidth: 700 },
];

const resourceData = [
  { name: 'API', value: 45, color: '#14b8a6' }, // Teal 500
  { name: 'DB', value: 25, color: '#0f766e' },  // Teal 700
  { name: 'Static', value: 20, color: '#2dd4bf' }, // Teal 400
  { name: 'Other', value: 10, color: '#94a3b8' }, // Slate 400
];

const commits = [
  { id: '8f3a2b1', msg: 'feat: optimize db query', time: '10m ago', author: 'dev_alex' },
  { id: '2c9e1d4', msg: 'fix: hydration error on mobile', time: '45m ago', author: 'sarah_j' },
  { id: '7b5a3c2', msg: 'chore: update dependencies', time: '2h ago', author: 'bot_renovate' },
  { id: '1a2b3c4', msg: 'feat: add dark mode toggle', time: '5h ago', author: 'mike_design' },
];

const liveProjects = [
  {
    id: 'lp-1',
    name: "Orion Payment Gateway",
    sector: "FinTech",
    status: "Live",
    uptime: "99.99%",
    region: "US-East (N. Virginia)",
    load: "45%",
    description: "High-volume transaction processing engine handling $2M+ daily volume with sub-second finality."
  },
  {
    id: 'lp-2',
    name: "Hyperion Logistics",
    sector: "Supply Chain",
    status: "Maintenance",
    uptime: "99.95%",
    region: "EU-West (London)",
    load: "28%",
    description: "Real-time fleet tracking and route optimization system for continental logistics network."
  },
  {
    id: 'lp-3',
    name: "Aegis Health Record",
    sector: "Healthcare",
    status: "Live",
    uptime: "100%",
    region: "Asia-Pacific (Singapore)",
    load: "62%",
    description: "HIPAA-compliant distributed ledger for immutable patient record storage and retrieval."
  },
  {
    id: 'lp-4',
    name: "Nova Stream CDN",
    sector: "Media",
    status: "Live",
    uptime: "99.98%",
    region: "Global Edge",
    load: "89%",
    description: "Adaptive bitrate streaming network optimized for low-latency live event broadcasting."
  }
];

// --- Sub-Components ---

const ProcessDetail = ({ onBack }: { onBack: () => void }) => {
  const steps = [
    {
      id: "01",
      title: "Discovery & Strategy",
      desc: "We dive deep into your business goals, technical requirements, and user needs to build a solid foundation.",
      icon: <Search className="w-6 h-6" />,
      color: "text-blue-400",
      borderColor: "border-blue-500/20",
      bg: "bg-blue-500/10"
    },
    {
      id: "02",
      title: "Architecture & Design",
      desc: "Our architects blueprint scalable systems while designers craft intuitive, engaging user experiences.",
      icon: <PenTool className="w-6 h-6" />,
      color: "text-purple-400",
      borderColor: "border-purple-500/20",
      bg: "bg-purple-500/10"
    },
    {
      id: "03",
      title: "Agile Development",
      desc: "Iterative sprints with regular feedback loops ensure transparency and rapid delivery of features.",
      icon: <Code2 className="w-6 h-6" />,
      color: "text-teal-400",
      borderColor: "border-teal-500/20",
      bg: "bg-teal-500/10"
    },
    {
      id: "04",
      title: "Quality Assurance",
      desc: "Rigorous automated and manual testing guarantees a bug-free, secure, and performant product.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      bg: "bg-emerald-500/10"
    },
    {
      id: "05",
      title: "Deployment & Scale",
      desc: "Seamless CI/CD pipelines and cloud infrastructure management for high-availability launches.",
      icon: <Rocket className="w-6 h-6" />,
      color: "text-orange-400",
      borderColor: "border-orange-500/20",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full pb-20">
      <button 
        onClick={onBack}
        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-widest text-xs font-semibold">Back to Overview</span>
      </button>

      <div className="max-w-4xl mx-auto">
         <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-light text-white mb-6">
              The Engineering <span className="text-teal-400">Process</span>
            </h2>
            <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto">
              From concept to code, our methodology ensures precision, scalability, and speed at every phase of the development lifecycle.
            </p>
         </div>

         <div className="space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-800 hidden md:block"></div>

            {steps.map((step, idx) => (
               <div key={idx} className="relative flex flex-col md:flex-row gap-8 group">
                  <div className="hidden md:flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-full border-2 ${step.borderColor} ${step.bg} ${step.color} flex items-center justify-center shrink-0 z-10 bg-slate-950 transition-transform group-hover:scale-110 duration-500`}>
                          {step.icon}
                      </div>
                  </div>
                  
                  <div className="flex-grow bg-slate-900/40 border border-slate-800 hover:border-teal-500/30 p-8 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="flex items-center gap-4 mb-4 md:hidden">
                         <div className={`w-12 h-12 rounded-full border ${step.borderColor} ${step.bg} ${step.color} flex items-center justify-center shrink-0`}>
                             {step.icon}
                         </div>
                         <div className="text-2xl font-display font-bold text-slate-700">{step.id}</div>
                      </div>
                      
                      <div className="flex justify-between items-start">
                         <h3 className="text-xl font-display text-white mb-2 group-hover:text-teal-400 transition-colors">{step.title}</h3>
                         <div className="text-4xl font-display font-bold text-slate-800 hidden md:block group-hover:text-slate-700 transition-colors">{step.id}</div>
                      </div>
                      
                      <p className="text-slate-400 leading-relaxed">
                         {step.desc}
                      </p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const ServiceDetail = ({ service, onBack, onOpenContact }: { service: any, onBack: () => void, onOpenContact?: () => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full pb-20">
      <button 
        onClick={onBack}
        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-widest text-xs font-semibold">Back to Overview</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Hero & Info */}
        <div className="lg:col-span-7">
           <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-slate-800/50 border border-slate-700 rounded-full flex items-center justify-center text-teal-400">
                {React.cloneElement(service.icon, { size: 40 })}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-light text-white leading-tight">
                  {service.title}
                </h1>
                <div className="h-1 w-20 bg-teal-500 mt-4 rounded-full"></div>
              </div>
           </div>

           <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
             {service.longDesc}
           </p>

           <div className="bg-slate-900/40 border border-slate-800 rounded-sm p-8 mb-8">
              <h3 className="text-lg font-display text-white mb-6 flex items-center gap-2">
                 <Activity size={20} className="text-teal-500" /> Key Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {service.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                       <span className="text-slate-400 text-sm">{feature}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Column: Tech Stack & CTA */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-slate-900/40 border border-slate-800 rounded-sm p-8">
               <h3 className="text-lg font-display text-white mb-6 flex items-center gap-2">
                 <Code2 size={20} className="text-teal-500" /> Technology Stack
               </h3>
               <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono rounded-sm">
                      {tech}
                    </span>
                  ))}
               </div>
           </div>

           <div className="bg-gradient-to-br from-teal-900/20 to-slate-900/40 border border-teal-500/20 rounded-sm p-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               
               <h3 className="text-xl font-display text-white mb-3 relative z-10">Need this service?</h3>
               <p className="text-slate-400 text-sm mb-6 relative z-10">
                 Let's discuss how we can implement {service.title.toLowerCase()} for your specific requirements.
               </p>
               <button 
                 onClick={onOpenContact}
                 className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-sm transition-colors flex items-center justify-center gap-2 relative z-10"
               >
                 Start Consultation <ArrowUpRight size={16} />
               </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const WebsiteView = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  const [showProcess, setShowProcess] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    { 
        icon: <Monitor size={24} />, 
        title: "Web Development", 
        desc: "Scalable, high-performance web applications built with React, Next.js, and Node.",
        longDesc: "We craft high-performance web applications that serve as the digital backbone of your business. Utilizing modern frameworks and best practices, we ensure your web presence is fast, secure, and SEO-friendly.",
        features: ["Single Page Applications (SPA)", "Server-Side Rendering (SSR)", "Progressive Web Apps (PWA)", "Enterprise Admin Dashboards"],
        techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis"]
    },
    { 
        icon: <Smartphone size={24} />, 
        title: "Mobile Solutions", 
        desc: "Native and cross-platform mobile apps for iOS and Android using React Native.",
        longDesc: "Reach your audience on any device with our bespoke mobile solutions. We deliver seamless, native-like experiences across iOS and Android platforms, optimizing for performance and user engagement.",
        features: ["Cross-Platform Development", "Native Module Integration", "Offline-First Architecture", "App Store Optimization"],
        techStack: ["React Native", "Expo", "Swift", "Kotlin", "Firebase"]
    },
    { 
        icon: <Cloud size={24} />, 
        title: "Cloud Architecture", 
        desc: "Secure, robust cloud infrastructure design and management on AWS and Azure.",
        longDesc: "Scale confidently with our cloud architecture services. We design resilient, cost-effective, and secure cloud environments that support your business growth and operational efficiency.",
        features: ["Cloud Migration Strategies", "Serverless Architecture", "DevOps & CI/CD Pipelines", "Infrastructure as Code"],
        techStack: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"]
    },
    { 
        icon: <PenTool size={24} />, 
        title: "UI/UX Design", 
        desc: "User-centric design systems that drive engagement and conversion.",
        longDesc: "Design is not just about looks; it's about how it works. Our design team creates intuitive, accessible, and aesthetically pleasing interfaces that drive user satisfaction and business metrics.",
        features: ["User Research & Persona Building", "Wireframing & Prototyping", "Design Systems", "Usability Testing"],
        techStack: ["Figma", "Adobe XD", "Sketch", "Framer", "Lottie"]
    },
    { 
        icon: <Database size={24} />, 
        title: "Data Engineering", 
        desc: "Big data pipelines, warehousing, and analytics solutions.",
        longDesc: "Unlock the value of your data. We build reliable data pipelines and warehousing solutions that enable real-time analytics and data-driven decision-making for your organization.",
        features: ["ETL/ELT Pipelines", "Data Warehousing", "Real-time Streaming", "Business Intelligence Dashboards"],
        techStack: ["Python", "Apache Kafka", "Snowflake", "dbt", "Airflow"]
    },
    { 
        icon: <ShieldCheck size={24} />, 
        title: "Cybersecurity", 
        desc: "Comprehensive security audits and implementation of best practices.",
        longDesc: "Protect your digital assets with our proactive cybersecurity services. We identify vulnerabilities, implement robust defense mechanisms, and ensure compliance with industry standards.",
        features: ["Vulnerability Assessments", "Penetration Testing", "Security Compliance (GDPR/HIPAA)", "Identity & Access Management"],
        techStack: ["OAuth 2.0", "OWASP ZAP", "Burp Suite", "SonarQube", "HashiCorp Vault"]
    }
  ];

  if (selectedService) {
      return <ServiceDetail service={selectedService} onBack={() => setSelectedService(null)} onOpenContact={onOpenContact} />;
  }

  if (showProcess) {
    return <ProcessDetail onBack={() => setShowProcess(false)} />;
  }

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl md:text-5xl font-display font-light mb-6 text-white leading-tight">
            Forging Digital <span className="text-teal-400">Excellence</span>
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
            We bridge the gap between complex technology and human experience. Our team engineers digital solutions that are not just functional, but transformative.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowProcess(true)}
              className="px-6 py-3 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400 text-slate-300 rounded-sm transition-all"
            >
              Our Process
            </button>
          </div>
        </div>
        <div className="relative h-[300px] lg:h-[400px] bg-slate-900/50 border border-slate-800 rounded-sm overflow-hidden group shadow-2xl">
          <img 
             src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000" 
             alt="Vivarily Engineering" 
             className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-700 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
             <div className="w-12 h-1 bg-teal-500 rounded-full mb-4 shadow-[0_0_10px_rgba(20,184,166,0.6)]"></div>
             <h4 className="text-2xl font-display font-light text-white mb-2">
               Precision in Every Line
             </h4>
             <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
               We write the future of your business with clean, efficient, and scalable code.
             </p>
          </div>

          <div className="absolute top-6 right-6 p-2 bg-slate-950/40 backdrop-blur-md border border-slate-700/50 rounded-full z-10">
             <Code2 className="w-6 h-6 text-teal-400" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] bg-slate-800 flex-grow"></div>
          <h4 className="text-slate-400 uppercase tracking-widest text-sm font-semibold">Our Expertise</h4>
          <div className="h-[1px] bg-slate-800 flex-grow"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedService(service)}
              className="group p-6 bg-slate-900/40 border border-slate-800 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1 rounded-sm cursor-pointer"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-teal-400 mb-4 group-hover:bg-teal-500/10 transition-colors">
                {service.icon}
              </div>
              <h5 className="text-xl font-display text-white mb-2 group-hover:text-teal-400 transition-colors">{service.title}</h5>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.desc}</p>
              
              <div className="flex items-center text-xs font-bold text-teal-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  View Details <ArrowUpRight size={12} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-800">
        {[
          { icon: Users, label: "Clients Served", value: "150+" },
          { icon: CheckCircle2, label: "Projects Done", value: "320+" },
          { icon: Globe, label: "Countries", value: "18" },
          { icon: Award, label: "Awards Won", value: "12" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <stat.icon className="w-6 h-6 text-teal-500 mx-auto mb-3 opacity-80" />
            <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CaseStudyDetail = ({ project, onBack, onOpenContact }: { project: any, onBack: () => void, onOpenContact?: () => void }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="uppercase tracking-widest text-xs font-semibold">Back to Portfolio</span>
        </button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
            <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-teal-500">
                    <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full">{project.category}</span>
                    <span className="text-slate-400 border-l border-slate-700 pl-4">{project.year}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-light text-white leading-[1.1]">
                    {project.title}
                </h1>

                <p className="text-lg text-slate-400 font-light leading-relaxed max-w-xl border-l-2 border-teal-500/50 pl-6">
                    {project.desc} This project represents a milestone in {project.category.toLowerCase()} development, pushing boundaries in performance and user experience.
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                    {['Strategy', 'UX/UI Design', 'Development', 'QA'].map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-500 border border-slate-800 bg-slate-900/50 px-3 py-2 rounded-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-5 relative group">
                 <div className={`absolute -inset-4 opacity-20 blur-3xl rounded-full ${project.color} group-hover:opacity-30 transition-opacity duration-700`}></div>
                 <div className="relative aspect-[4/3] bg-slate-900 border border-slate-800 rounded-sm overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                 </div>
            </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800/50 pt-12">
            <div className="bg-slate-900/20 p-6 border border-slate-800/50 rounded-sm hover:border-teal-500/20 transition-colors">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-teal-500 mb-4">
                    <Activity size={20} />
                </div>
                <h3 className="text-lg font-display text-white mb-3">The Challenge</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Overcoming legacy system limitations to deliver real-time capabilities. The primary goal was to reduce latency while scaling to support millions of concurrent users globally.
                </p>
            </div>
            <div className="bg-slate-900/20 p-6 border border-slate-800/50 rounded-sm hover:border-teal-500/20 transition-colors">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-teal-500 mb-4">
                    <Code2 size={20} />
                </div>
                <h3 className="text-lg font-display text-white mb-3">The Solution</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    A cloud-native architecture utilizing microservices and edge computing. We implemented a custom state management system to ensure data consistency across all client devices.
                </p>
            </div>
             <div className="bg-slate-900/20 p-6 border border-slate-800/50 rounded-sm hover:border-teal-500/20 transition-colors">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-teal-500 mb-4">
                    <Award size={20} />
                </div>
                <h3 className="text-lg font-display text-white mb-3">Key Results</h3>
                <ul className="space-y-3">
                    {[
                        "50% Reduction in Infrastructure Costs",
                        "99.99% System Uptime Achieved",
                        "2.5x Increase in User Engagement"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                             <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                             {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-slate-900 to-slate-900/50 border border-slate-800 rounded-sm">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                     <h4 className="text-xl font-display text-white mb-2">Inspired by this project?</h4>
                     <p className="text-slate-400 text-sm">We can build a tailored solution for your specific business needs.</p>
                 </div>
                 <button 
                   onClick={onOpenContact}
                   className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white transition-colors font-medium text-sm flex items-center gap-2 rounded-sm"
                 >
                    Start Your Project <ArrowUpRight size={16} />
                 </button>
             </div>
        </div>
    </div>
  );
};

const PortfolioView = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    { title: "FinTech Dashboard", category: "Web App", year: "2023", desc: "Real-time financial data visualization for enterprise clients.", color: "bg-blue-600", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { title: "EcoTrack Mobile", category: "iOS / Android", year: "2023", desc: "Sustainability tracking application with gamification elements.", color: "bg-emerald-600", image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=800" },
    { title: "Nebula Stream", category: "Cloud Architecture", year: "2022", desc: "Serverless video streaming infrastructure handling 1M+ concurrent users.", color: "bg-purple-600", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
    { title: "Cipher Secure", category: "Cybersecurity", year: "2022", desc: "AI-driven threat detection system for banking networks.", color: "bg-red-600", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800" },
    { title: "Quantum Analytics", category: "Data Science", year: "2021", desc: "Big data processing pipeline for pharmaceutical research.", color: "bg-indigo-600", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800" },
    { title: "Urban Pulse", category: "Smart City UI", year: "2021", desc: "IoT dashboard for monitoring city utility usage and traffic.", color: "bg-teal-600", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800" },
    { title: "Vitality Health", category: "Healthcare", year: "2020", desc: "HIPAA-compliant telemedicine platform connecting patients with specialists.", color: "bg-rose-500", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" },
    { title: "Horizon Markets", category: "FinTech", year: "2020", desc: "High-frequency algorithmic trading platform with sub-millisecond latency.", color: "bg-amber-500", image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Web') return ['Web App', 'Smart City UI', 'Healthcare', 'FinTech'].includes(project.category);
    if (activeFilter === 'Mobile') return ['iOS / Android'].includes(project.category);
    if (activeFilter === 'Cloud') return ['Cloud Architecture'].includes(project.category);
    if (activeFilter === 'AI/ML') return ['Data Science', 'Cybersecurity'].includes(project.category);
    return false;
  });

  const handleDownloadDeck = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Vivarily_Capabilities_Deck_2024.pdf</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
          .header { border-bottom: 2px solid #0d9488; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
          .logo { font-size: 24px; font-weight: bold; color: #0f172a; letter-spacing: 2px; }
          .subtitle { color: #64748b; font-size: 14px; text-transform: uppercase; }
          h1 { color: #0f172a; font-size: 36px; margin-bottom: 10px; }
          h2 { color: #0d9488; font-size: 20px; margin-top: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
          .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0; }
          .stat-box { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-radius: 4px; }
          .stat-value { font-size: 24px; font-weight: bold; color: #0f172a; }
          .stat-label { font-size: 12px; text-transform: uppercase; color: #64748b; margin-top: 5px; }
          ul { padding-left: 20px; }
          li { margin-bottom: 8px; }
          .footer { margin-top: 60px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">VIVARILY</div>
          <div class="subtitle">Software & App Development</div>
        </div>

        <h1>Capabilities Deck 2024</h1>
        <p>Forging digital excellence through scalable, high-performance technology solutions.</p>

        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-value">98%</div>
            <div class="stat-label">Client Retention Rate</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">320+</div>
            <div class="stat-label">Projects Delivered</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">150+</div>
            <div class="stat-label">Enterprise Clients</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">4.9/5</div>
            <div class="stat-label">Average Client Rating</div>
          </div>
        </div>

        <h2>Core Expertise</h2>
        <ul>
          <li><strong>Web Development:</strong> React, Next.js, TypeScript, Node.js</li>
          <li><strong>Mobile Solutions:</strong> iOS, Android, React Native, Flutter</li>
          <li><strong>Cloud Infrastructure:</strong> AWS, Azure, Google Cloud, Docker, Kubernetes</li>
          <li><strong>Data Engineering:</strong> ETL Pipelines, Big Data Analytics, GraphQL</li>
          <li><strong>Cybersecurity:</strong> Audits, Penetration Testing, Compliance</li>
        </ul>

        <h2>Selected Case Studies</h2>
        <p><strong>FinTech Dashboard (2023)</strong> - Real-time financial data visualization for enterprise clients, reducing reporting time by 40%.</p>
        <p><strong>Nebula Stream (2022)</strong> - Serverless video streaming infrastructure scaling to support 1M+ concurrent users globally.</p>

        <div class="footer">
          &copy; 2024 Vivarily Inc. | Confidential | contact@vivarily.com | +1 (555) 123-4567
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  if (selectedProject) {
    return <CaseStudyDetail project={selectedProject} onBack={() => setSelectedProject(null)} onOpenContact={onOpenContact} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Side: Sticky Header & Filters */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <Briefcase className="text-teal-500" size={20} />
                 <span className="text-teal-500 text-sm font-bold uppercase tracking-widest">Case Studies</span>
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-white mb-6 leading-tight">
                Selected <span className="text-teal-400">Works</span>
              </h3>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                A curated showcase of our most impactful projects. We build digital products that scale, perform, and delight users across the globe.
              </p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
               {['All', 'Web', 'Mobile', 'Cloud', 'AI/ML'].map((filter) => (
                 <button 
                   key={filter} 
                   onClick={() => setActiveFilter(filter)}
                   className={`px-5 py-2 rounded-full text-sm border transition-all duration-300 ${
                     activeFilter === filter 
                       ? 'bg-teal-500/10 text-teal-400 border-teal-500/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]' 
                       : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                   }`}
                 >
                   {filter}
                 </button>
               ))}
            </div>

            {/* CTA Box */}
            <div className="hidden lg:block p-6 bg-slate-900/40 border border-slate-800 rounded-sm mt-8 backdrop-blur-sm">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                 <Download size={16} className="text-teal-500"/> Capabilities Deck
              </h4>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">Download our detailed portfolio in PDF format for offline viewing.</p>
              <button 
                onClick={handleDownloadDeck}
                className="text-teal-400 text-sm flex items-center gap-2 hover:underline decoration-teal-500/50 underline-offset-4 group"
              >
                Download PDF <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
              </button>
            </div>

            {/* Extra Data */}
            <div className="hidden lg:block space-y-6 pt-2">
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-sm">
                      <div className="text-2xl font-display text-teal-400 mb-1">98%</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Client Retention</div>
                   </div>
                   <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-sm">
                      <div className="text-2xl font-display text-teal-400 mb-1">4.9/5</div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Avg Rating</div>
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Core Stack</h4>
                   <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'].map(tech => (
                         <span key={tech} className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                           {tech}
                         </span>
                      ))}
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Industries</h4>
                   <ul className="space-y-2">
                      {['FinTech & Banking', 'Healthcare & BioTech', 'E-Commerce', 'Smart City & IoT'].map((ind, i) => (
                         <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                            <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
                            {ind}
                         </li>
                      ))}
                   </ul>
                </div>

                <div className="pt-6 border-t border-slate-800/50 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Awards & Recognition</h4>
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 group/award">
                         <div className="w-10 h-10 bg-slate-800/50 border border-slate-700 flex items-center justify-center text-yellow-500/80 group-hover/award:text-yellow-400 group-hover/award:border-yellow-500/30 transition-all rounded-sm shrink-0">
                             <Award size={18} />
                         </div>
                         <div>
                             <div className="text-sm text-white font-medium leading-tight group-hover/award:text-yellow-100 transition-colors">Best Innovation 2023</div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">TechCrunch Disrupt</div>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 group/award">
                         <div className="w-10 h-10 bg-slate-800/50 border border-slate-700 flex items-center justify-center text-blue-500/80 group-hover/award:text-blue-400 group-hover/award:border-blue-500/30 transition-all rounded-sm shrink-0">
                             <ShieldCheck size={18} />
                         </div>
                         <div>
                             <div className="text-sm text-white font-medium leading-tight group-hover/award:text-blue-100 transition-colors">Excellence in Security</div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">CyberSec Global</div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="relative p-5 bg-slate-900/30 border border-slate-800 rounded-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
                    <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/50"></div>
                    <Quote className="absolute top-4 right-4 text-slate-800 w-8 h-8" />
                    <p className="text-sm text-slate-300 italic leading-relaxed relative z-10 mb-3">
                       "Vivarily didn't just build an app; they engineered a complete digital transformation for our logistics chain."
                    </p>
                    <div className="flex items-center gap-2 relative z-10">
                        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold">JD</div>
                        <div className="text-xs text-slate-500">
                           <span className="text-teal-400 font-semibold">James Doe</span>, COO at LogiTech
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Horizontal Project Cards */}
        <div className="lg:col-span-8 space-y-4">
          {filteredProjects.map((project, idx) => (
            <div 
              key={idx} 
              className="group relative bg-slate-900/40 border border-slate-800 hover:border-teal-500/30 transition-all duration-500 rounded-sm overflow-hidden flex flex-col md:flex-row hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-teal-500/5 animate-in fade-in slide-in-from-bottom-2"
            >
              {/* Decorative side accent */}
              <div className={`w-full md:w-1 h-1 md:h-auto bg-slate-800 group-hover:${project.color} transition-colors duration-500 order-first`}></div>
              
              {/* Image Section - Compact */}
              <div className="md:w-48 h-40 md:h-auto relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-slate-800/50 cursor-pointer" onClick={() => setSelectedProject(project)}>
                 <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                 <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105 opacity-80 group-hover:opacity-100"
                 />
              </div>

              <div className="p-4 flex-grow flex flex-col justify-center">
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.color} shadow-[0_0_8px_currentColor]`}></span>
                      <span className="text-[10px] font-mono text-teal-500/80 uppercase tracking-wider">{project.category}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono border border-slate-800 px-1.5 py-0.5 rounded">{project.year}</span>
                 </div>
                 
                 <h4 className="text-xl font-display text-white mb-1 group-hover:text-teal-400 transition-colors cursor-pointer" onClick={() => setSelectedProject(project)}>
                   {project.title}
                 </h4>
                 <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                   {project.desc}
                 </p>

                 <div className="flex items-center gap-4 mt-auto">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="text-[10px] font-bold text-white group-hover/btn:text-teal-400 uppercase tracking-widest flex items-center gap-2 group/btn transition-colors"
                    >
                      View Case Study
                      <div className="w-4 h-[1px] bg-slate-700 group-hover/btn:bg-teal-500 group-hover/btn:w-8 transition-all"></div>
                    </button>
                 </div>
              </div>

              {/* Hover icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-2 group-hover:translate-y-0 pointer-events-none">
                 <div className="p-1.5 border border-teal-500/30 bg-teal-500/10 rounded-full">
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                 </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="p-12 text-center border border-slate-800 bg-slate-900/40 rounded-sm">
               <p className="text-slate-500">No projects found for this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const PodcastDetail = ({ podcast, onBack }: { podcast: any, onBack: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (isPlaying && !isDragging) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5)); // Simulate progress
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isDragging]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newProgress = Math.max(0, Math.min(100, (x / width) * 100));
      setProgress(newProgress);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSeek(e);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
         handleSeek(e);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full pb-20">
      <button 
        onClick={onBack}
        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-widest text-xs font-semibold">Back to Podcasts</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Album Art / Visual */}
        <div className="lg:col-span-5">
           <div className="aspect-square bg-slate-900 border border-slate-800 rounded-sm overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20"></div>
              
              {/* Animated Visualizer Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50">
                  {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 bg-teal-500 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{ height: isPlaying ? `${Math.random() * 60 + 20}%` : '20%' }}
                      ></div>
                  ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                 <button 
                   onClick={() => setIsPlaying(!isPlaying)}
                   className="w-20 h-20 bg-teal-600 hover:bg-teal-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-2xl z-10"
                 >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                 </button>
              </div>
           </div>
        </div>

        {/* Info & Controls */}
        <div className="lg:col-span-7 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-[10px] uppercase tracking-widest text-teal-400 font-bold">
                 Episode {podcast.id}
              </span>
              <span className="text-slate-500 text-xs font-mono uppercase tracking-wider">{podcast.date}</span>
           </div>

           <h1 className="text-3xl md:text-5xl font-display font-light text-white mb-6 leading-tight">
              {podcast.title}
           </h1>

           <p className="text-lg text-slate-400 font-light leading-relaxed mb-8 border-l-2 border-teal-500/30 pl-6">
              {podcast.description} Join us as we explore the nuances of this topic with industry experts and uncover actionable insights for your business.
           </p>

           {/* Player Controls */}
           <div className="bg-slate-900/40 border border-slate-800 rounded-sm p-6 backdrop-blur-sm">
               {/* Progress Bar */}
               <div 
                 ref={progressBarRef}
                 className="w-full bg-slate-800 h-1.5 rounded-full mb-4 relative cursor-pointer group py-2 -my-2" // Added padding for better hit area
                 onMouseDown={handleMouseDown}
               >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-slate-800 rounded-full"></div> {/* Track background */}
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-teal-500 rounded-full transition-all duration-100 ease-out pointer-events-none"
                    style={{ width: `${progress}%` }}
                  >
                     <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.5)] ${isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  </div>
               </div>
               
               <div className="flex justify-between text-xs font-mono text-slate-500 mb-6 mt-2">
                  <span>{Math.floor((progress/100) * 45)}:{(Math.floor(((progress/100) * 45 * 60) % 60)).toString().padStart(2, '0')}</span>
                  <span>{podcast.duration}</span>
               </div>

               <div className="grid grid-cols-3 items-center">
                  <div></div> {/* Spacer for centering */}
                  
                  <div className="flex items-center justify-center gap-6">
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <SkipBack size={20} />
                      </button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                      </button>
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <SkipForward size={20} />
                      </button>
                  </div>

                  <div className="flex items-center justify-end gap-3 group/vol">
                      <button 
                        onClick={() => setVolume(volume === 0 ? 80 : 0)} 
                        className="text-slate-500 hover:text-teal-400 transition-colors"
                      >
                        <Volume2 size={16} />
                      </button>
                      <div 
                        className="w-20 h-1 bg-slate-800 rounded-full cursor-pointer relative py-2 -my-2"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const width = rect.width;
                            const newVolume = Math.max(0, Math.min(100, (x / width) * 100));
                            setVolume(newVolume);
                        }}
                      >
                         <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 rounded-full"></div>
                         <div 
                           className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-500 group-hover/vol:bg-teal-500 rounded-full transition-colors" 
                           style={{ width: `${volume}%` }}
                         ></div>
                      </div>
                  </div>
               </div>
           </div>
        </div>
      </div>
      
      {/* Transcript / Notes Stub */}
      <div className="mt-12 border-t border-slate-800 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-6">
             <h3 className="text-xl font-display text-white">Show Notes</h3>
             <div className="prose prose-invert prose-sm text-slate-400">
                <p>In this episode, we discuss:</p>
                <ul className="list-disc pl-5 space-y-2">
                   <li>The current state of technology in the enterprise sector.</li>
                   <li>Challenges faced by CTOs in adopting new frameworks.</li>
                   <li>Case studies from our recent implementations.</li>
                   <li>Future predictions for the next quarter.</li>
                </ul>
             </div>
         </div>
         <div className="space-y-6">
             <h3 className="text-xl font-display text-white">Host</h3>
             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-800 rounded-full overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Host" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <div className="text-white font-medium">David Chen</div>
                    <div className="text-xs text-slate-500 uppercase">CEO, Vivarily</div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

const PodcastView = () => {
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);

  const podcasts = [
    { id: 1, title: "The Future of AI in Enterprise", duration: "45:20", date: "Oct 12, 2023", description: "Discussing the integration of LLMs in legacy systems.", link: "https://www.youtube.com/results?search_query=The+Future+of+AI+in+Enterprise+podcast" },
    { id: 2, title: "Scaling from 0 to 1 Million Users", duration: "38:15", date: "Sep 28, 2023", description: "Architecture patterns that handle massive growth spikes.", link: "https://www.youtube.com/results?search_query=Scaling+from+0+to+1+Million+Users+podcast" },
    { id: 3, title: "Cybersecurity Trends for 2024", duration: "52:00", date: "Sep 15, 2023", description: "Preparing for next-gen threats in a cloud-first world.", link: "https://www.youtube.com/results?search_query=Cybersecurity+Trends+for+2024+podcast" },
    { id: 4, title: "The Psychology of UX Design", duration: "41:30", date: "Aug 30, 2023", description: "How cognitive bias shapes user interfaces and decisions.", link: "https://www.youtube.com/results?search_query=The+Psychology+of+UX+Design+podcast" },
    { id: 5, title: "Green Tech: Sustainable Code", duration: "35:45", date: "Aug 12, 2023", description: "Reducing carbon footprint in cloud computing architectures.", link: "https://www.youtube.com/results?search_query=Green+Tech+Sustainable+Code+podcast" },
    { id: 6, title: "The Rise of Edge Computing", duration: "48:10", date: "Jul 25, 2023", description: "Processing data closer to the source for lower latency.", link: "https://www.youtube.com/results?search_query=The+Rise+of+Edge+Computing+podcast" },
  ];

  if (selectedPodcast) {
    return <PodcastDetail podcast={selectedPodcast} onBack={() => setSelectedPodcast(null)} />;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h3 className="text-3xl md:text-5xl font-display font-light mb-6 text-white leading-tight">
            Voices of <span className="text-teal-400">Innovation</span>
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
            Deep dives into technology, entrepreneurship, and the stories behind our most challenging projects. Join our founders and special guests.
          </p>
          
          {/* Founders Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10 border-l border-slate-800 pl-6">
             {/* David Chen - Founder & CEO */}
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                       <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Founder" className="w-full h-full object-cover" />
                       </div>
                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border border-slate-900 flex items-center justify-center">
                          <Mic size={10} className="text-slate-900" />
                       </div>
                    </div>
                    <div>
                       <div className="text-white font-display text-sm font-medium">David Chen</div>
                       <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Founder & CEO</div>
                    </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                    Former Engineering Lead at Google. Passionate about scalable distributed systems and AI.
                </p>
             </div>

             {/* Elena Rodriguez - Co-Founder & CTO */}
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                       <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700">
                         <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Co-Founder" className="w-full h-full object-cover" />
                       </div>
                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border border-slate-900 flex items-center justify-center">
                          <Mic size={10} className="text-slate-900" />
                       </div>
                    </div>
                    <div>
                       <div className="text-white font-display text-sm font-medium">Elena Rodriguez</div>
                       <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Co-Founder & CTO</div>
                    </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                    PhD in Computational Neuroscience. Expert in neural interfaces and cognitive computing.
                </p>
             </div>
          </div>

          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={() => setSelectedPodcast(podcasts[0])}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-sm transition-colors flex items-center gap-2"
            >
              <Play size={18} fill="currentColor" /> Listen Now
            </button>
            <button 
              onClick={() => window.open('https://www.youtube.com/results?search_query=Vivarily+Podcast', '_blank')}
              className="px-6 py-3 border border-slate-700 hover:border-teal-500/50 hover:text-teal-400 text-slate-300 rounded-sm transition-all"
            >
              Subscribe
            </button>
          </div>

          <div className="pt-8 border-t border-slate-800/50 mt-12">
               <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Activity size={14} className="text-teal-500" /> Subscribers
                      </h4>
                      <div className="text-3xl font-display text-white mb-1">24.5k</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide">Active Listeners</div>
                  </div>
                  <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Globe size={14} className="text-teal-500" /> Global Reach
                      </h4>
                      <div className="text-3xl font-display text-white mb-1">142</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wide">Countries Tuned In</div>
                  </div>
               </div>
               
               <div className="p-5 bg-slate-900/30 border border-slate-800 rounded-sm relative group hover:border-teal-500/20 transition-colors">
                  <Quote className="absolute top-4 right-4 text-slate-800 w-8 h-8 group-hover:text-teal-500/10 transition-colors" />
                  <p className="text-sm text-slate-300 italic leading-relaxed mb-4 relative z-10">
                     "The depth of technical discussion here is unmatched. It's not just hype; it's actual engineering architecture."
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-white">MR</div>
                     <div>
                        <div className="text-xs font-bold text-white">Michael Ross</div>
                        <div className="text-[10px] text-slate-500 uppercase">Senior Architect, CloudScale</div>
                     </div>
                  </div>
               </div>
          </div>
        </div>

        {/* Right Side: Podcast List */}
        <div className="bg-slate-900/30 border border-slate-800 rounded-sm p-6 lg:min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                <h4 className="text-xl font-display text-white">Podcasts</h4>
                <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                     <span className="text-xs font-mono text-teal-500 uppercase tracking-wider">On Air</span>
                </div>
            </div>
            
            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                {podcasts.map((pod) => (
                  <div 
                    key={pod.id} 
                    onClick={() => setSelectedPodcast(pod)}
                    className="group p-4 bg-slate-900/50 border border-slate-800/50 hover:border-teal-500/30 rounded-sm transition-all hover:bg-slate-800 flex items-start gap-4 cursor-pointer"
                  >
                     <div className="mt-1 w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                        <Play size={14} fill="currentColor" />
                     </div>
                     <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                             <h5 className="text-sm font-medium text-white group-hover:text-teal-400 transition-colors line-clamp-1">{pod.title}</h5>
                             <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{pod.duration}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mb-2">{pod.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-600 uppercase tracking-wider">{pod.date}</span>
                            <button className="text-slate-600 hover:text-white transition-colors">
                               <Download size={14} />
                            </button>
                        </div>
                     </div>
                  </div>
                ))}
            </div>
            
            {/* Visualizer at bottom of list */}
            <div className="mt-auto pt-6 flex justify-center items-end gap-1 h-16 opacity-30">
                 {[...Array(30)].map((_, i) => (
                      <div key={i} className="w-1 bg-teal-500 rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const DeploymentLogsModal = ({ onClose }: { onClose: () => void }) => {
  const logs = [
    { time: "14:20:01", type: "INFO", msg: "Starting deployment process for v2.4.1..." },
    { time: "14:20:03", type: "INFO", msg: "Pulling source from git (commit: 8f3a2b1)" },
    { time: "14:20:15", type: "INFO", msg: "Running pre-deployment tests..." },
    { time: "14:20:45", type: "SUCCESS", msg: "Tests passed (42/42)" },
    { time: "14:20:48", type: "INFO", msg: "Building Docker image..." },
    { time: "14:21:30", type: "INFO", msg: "Image built: registry.vivarily.com/app:v2.4.1" },
    { time: "14:21:35", type: "INFO", msg: "Pushing image to container registry..." },
    { time: "14:22:10", type: "INFO", msg: "Updating Kubernetes deployment..." },
    { time: "14:22:15", type: "WARN", msg: "High latency detected in us-east-1 during rollout" },
    { time: "14:22:20", type: "INFO", msg: "Scaling up new pods..." },
    { time: "14:22:45", type: "SUCCESS", msg: "Health checks passed for all regions" },
    { time: "14:22:50", type: "INFO", msg: "Traffic switchover complete" },
    { time: "14:23:00", type: "SUCCESS", msg: "Deployment v2.4.1 successfully live" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-2xl rounded-sm shadow-2xl flex flex-col max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
           <div className="flex items-center gap-3">
              <Terminal size={18} className="text-teal-500" />
              <h3 className="text-sm font-mono text-white uppercase tracking-wider">Deployment Logs</h3>
           </div>
           <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X size={20} />
           </button>
        </div>
        <div className="p-4 overflow-y-auto font-mono text-xs space-y-2 bg-black/50 flex-grow custom-scrollbar">
           {logs.map((log, i) => (
             <div key={i} className="flex gap-3 text-slate-300 border-b border-slate-800/30 pb-1 last:border-0 animate-in slide-in-from-left-2 fade-in duration-300" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="text-slate-600 shrink-0">{log.time}</span>
                <span className={`shrink-0 w-16 ${
                    log.type === 'SUCCESS' ? 'text-emerald-400' : 
                    log.type === 'WARN' ? 'text-amber-400' : 'text-blue-400'
                }`}>[{log.type}]</span>
                <span>{log.msg}</span>
             </div>
           ))}
           <div className="h-4 w-2 bg-teal-500 animate-pulse mt-2"></div>
        </div>
      </div>
    </div>
  );
};

const LiveProjectDetail = ({ project, onBack }: { project: any, onBack: () => void }) => {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
      {showLogs && <DeploymentLogsModal onClose={() => setShowLogs(false)} />}
      <button 
        onClick={onBack}
        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-8"
      >
        <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="uppercase tracking-widest text-xs font-semibold">Back to Dashboard</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-sm">
              <div className="flex justify-between items-start mb-6">
                  <div>
                      <h1 className="text-3xl font-display font-light text-white mb-2">{project.name}</h1>
                      <div className="flex items-center gap-3 text-sm">
                         <span className="text-teal-500 font-mono uppercase tracking-wider">{project.sector}</span>
                         <span className="text-slate-600">•</span>
                         <span className="text-slate-400">{project.region}</span>
                      </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-sm border text-xs uppercase font-bold tracking-wider ${
                      project.status === 'Live' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                   }`}>
                      {project.status}
                  </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8 border-l-2 border-slate-800 pl-4">
                 {project.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-slate-800 pt-6">
                 <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-sm">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Current Load</div>
                    <div className="text-2xl font-mono text-white">{project.load}</div>
                 </div>
                 <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-sm">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Uptime (30d)</div>
                    <div className="text-2xl font-mono text-emerald-400">{project.uptime}</div>
                 </div>
                 <div className="bg-slate-900/50 p-4 border border-slate-800 rounded-sm">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Instances</div>
                    <div className="text-2xl font-mono text-blue-400">12</div>
                 </div>
              </div>
           </div>

           {/* Graphs */}
           <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-sm min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                 <h4 className="text-white font-medium flex items-center gap-2">
                   <Activity size={18} className="text-teal-500" /> Real-time Throughput
                 </h4>
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs">
                       <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                       <span className="text-slate-400">Requests</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                       <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                       <span className="text-slate-400">Bandwidth</span>
                    </div>
                 </div>
              </div>
              <div className="h-[320px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectDetailData}>
                       <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBandwidth" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                       <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                       <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px' }}
                          itemStyle={{ color: '#cbd5e1' }}
                       />
                       <Area type="monotone" dataKey="activeUsers" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                       <Area type="monotone" dataKey="bandwidth" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorBandwidth)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-sm">
               <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Deployment Info</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                     <span className="text-slate-500">Status</span>
                     <span className="text-emerald-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Healthy
                     </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                     <span className="text-slate-500">Version</span>
                     <span className="text-slate-300 font-mono">v2.4.1</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                     <span className="text-slate-500">Last Deploy</span>
                     <span className="text-slate-300">12m ago</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                     <span className="text-slate-500">Region</span>
                     <span className="text-slate-300">{project.region}</span>
                  </div>
               </div>
               <button 
                  onClick={() => setShowLogs(true)}
                  className="w-full mt-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs uppercase font-bold tracking-wider rounded-sm transition-colors border border-slate-700"
               >
                  View Deployment Logs
               </button>
           </div>

           <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-sm">
               <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Recent Alerts</h4>
               <div className="space-y-3">
                  <div className="flex gap-3 items-start p-3 bg-slate-900/50 rounded-sm border border-slate-800/50">
                     <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                     <div>
                        <div className="text-xs text-slate-300 font-medium">Auto-scaling complete</div>
                        <div className="text-[10px] text-slate-500 mt-1">2 mins ago</div>
                     </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 bg-slate-900/50 rounded-sm border border-slate-800/50">
                     <Activity size={16} className="text-blue-500 shrink-0 mt-0.5" />
                     <div>
                        <div className="text-xs text-slate-300 font-medium">Latency normalization</div>
                        <div className="text-[10px] text-slate-500 mt-1">15 mins ago</div>
                     </div>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SystemLogsView = ({ onBack }: { onBack: () => void }) => {
  const [filter, setFilter] = useState<'ALL' | 'ERROR' | 'WARN' | 'INFO'>('ALL');
  
  const logs = [
    { id: 101, time: "14:25:12", level: "INFO", source: "Auth-Service", msg: "Token refresh request validated for user_8829" },
    { id: 102, time: "14:25:10", level: "INFO", source: "Load-Balancer", msg: "Inbound traffic spike detected: 4500 req/s" },
    { id: 103, time: "14:25:08", level: "SUCCESS", source: "DB-Shard-04", msg: "Replication sync completed (45ms)" },
    { id: 104, time: "14:25:05", level: "WARN", source: "Cache-Cluster", msg: "Memory usage at 78% - initiating gc" },
    { id: 105, time: "14:25:01", level: "INFO", source: "API-Gateway", msg: "Rate limit updated for tenant_internal_b" },
    { id: 106, time: "14:24:58", level: "INFO", source: "Monitor-Agent", msg: "Heartbeat received from all regions" },
    { id: 107, time: "14:24:55", level: "ERROR", source: "Payment-Svc", msg: "Timeout waiting for banking provider gateway (retry 1/3)" },
    { id: 108, time: "14:24:50", level: "INFO", source: "Payment-Svc", msg: "Retry scheduled for transaction tx_9928" },
    { id: 109, time: "14:24:42", level: "SUCCESS", source: "Deploy-Bot", msg: "Hotfix v2.4.2 applied to container-registry" },
    { id: 110, time: "14:24:30", level: "INFO", source: "Log-Aggregator", msg: "Flushing buffer to S3 archive..." },
    { id: 111, time: "14:24:15", level: "INFO", source: "Auth-Service", msg: "New session started: admin_user" },
    { id: 112, time: "14:24:01", level: "INFO", source: "Global-Monitor", msg: "Latency check: US-East (12ms), EU-West (24ms), AP-South (45ms)" },
    { id: 113, time: "14:23:55", level: "WARN", source: "Img-Processor", msg: "Queue depth exceeded threshold (500 items)" },
    { id: 114, time: "14:23:56", level: "INFO", source: "Auto-Scaler", msg: "Scaling up Img-Processor pool +2 instances" },
    { id: 115, time: "14:23:40", level: "SUCCESS", source: "Img-Processor", msg: "Queue drained. Processing normal." },
  ];

  const filteredLogs = filter === 'ALL' ? logs : logs.filter(l => l.level === filter);

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full h-full flex flex-col">
       {/* Header with Back Button */}
       <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="uppercase tracking-widest text-xs font-semibold">Back to Dashboard</span>
          </button>
          
          <div className="flex gap-2">
             {['ALL', 'INFO', 'WARN', 'ERROR'].map(f => (
                <button
                   key={f}
                   onClick={() => setFilter(f as any)}
                   className={`px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-wider border transition-all ${
                      filter === f 
                      ? 'bg-teal-500/20 border-teal-500 text-teal-400' 
                      : 'bg-slate-900/50 border-slate-700 text-slate-500 hover:text-slate-300'
                   }`}
                >
                   {f}
                </button>
             ))}
          </div>
       </div>

       {/* Log Terminal Window */}
       <div className="flex-grow bg-slate-950 border border-slate-800 rounded-sm overflow-hidden flex flex-col shadow-2xl min-h-[500px]">
          <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-teal-500" />
                  <span className="text-xs font-mono text-slate-400">system_output.log</span>
              </div>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Live Stream</span>
              </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto font-mono text-xs space-y-3 custom-scrollbar">
             {filteredLogs.map(log => (
                <div key={log.id} className="flex gap-3 hover:bg-slate-900/30 p-1 rounded -mx-1 transition-colors">
                   <span className="text-slate-600 shrink-0 select-none">{log.time}</span>
                   <span className={`shrink-0 w-16 font-bold ${
                      log.level === 'INFO' ? 'text-blue-400' :
                      log.level === 'SUCCESS' ? 'text-emerald-400' :
                      log.level === 'WARN' ? 'text-amber-400' : 'text-red-400'
                   }`}>
                      {log.level}
                   </span>
                   <span className="text-purple-400 shrink-0 w-24 hidden md:block">[{log.source}]</span>
                   <span className="text-slate-300">{log.msg}</span>
                </div>
             ))}
             <div className="h-4 w-2 bg-teal-500 animate-pulse mt-2"></div>
          </div>
       </div>
    </div>
  );
};

const ProjectView = () => {
  const [selectedLiveProject, setSelectedLiveProject] = useState<any>(null);
  const [reportStatus, setReportStatus] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [showSystemLogs, setShowSystemLogs] = useState(false);

  const handleGenerateReport = () => {
    setReportStatus('generating');
    setTimeout(() => {
      setReportStatus('ready');
      setTimeout(() => setReportStatus('idle'), 3000); // Reset after 3 seconds
    }, 2000);
  };

  if (selectedLiveProject) {
    return <LiveProjectDetail project={selectedLiveProject} onBack={() => setSelectedLiveProject(null)} />;
  }

  if (showSystemLogs) {
    return <SystemLogsView onBack={() => setShowSystemLogs(false)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></div>
             <span className="text-teal-500 font-mono text-xs uppercase tracking-widest">System Operational</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
             Live <span className="text-teal-400">Dashboard</span>
          </h3>
          <p className="text-slate-400 mt-2">Real-time metrics from our active client deployments.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setShowSystemLogs(true)}
             className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-2 rounded-sm hover:border-teal-500/50 transition-colors"
           >
             <Terminal size={14} /> View Logs
           </button>
           <button 
             onClick={handleGenerateReport}
             disabled={reportStatus !== 'idle'}
             className={`px-4 py-2 ${reportStatus === 'ready' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-teal-600 hover:bg-teal-500'} text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 min-w-[140px] justify-center`}
           >
             {reportStatus === 'idle' && 'Generate Report'}
             {reportStatus === 'generating' && (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" /> Generating...
                </>
             )}
             {reportStatus === 'ready' && (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Report Ready
                </>
             )}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Traffic Graph */}
         <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-6 rounded-sm min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
               <h4 className="text-white font-medium flex items-center gap-2">
                 <Activity size={18} className="text-teal-500" /> Network Traffic
               </h4>
               <div className="flex gap-2">
                  <span className="text-xs text-slate-500 px-2 py-1 bg-slate-800 rounded">24h</span>
                  <span className="text-xs text-slate-500 px-2 py-1 bg-slate-800 rounded">1h</span>
               </div>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                     <defs>
                        <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                     <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px' }}
                        itemStyle={{ color: '#cbd5e1' }}
                     />
                     <Area type="monotone" dataKey="requests" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
                     <Area type="monotone" dataKey="latency" stroke="#6366f1" strokeWidth={2} fillOpacity={0} fill="transparent" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Resource Usage & Commits */}
         <div className="space-y-6">
             <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-sm h-[250px]">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                   <Cpu size={18} className="text-teal-500" /> Resource Distribution
                </h4>
                <div className="h-[160px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie
                            data={resourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                         >
                            {resourceData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                         </Pie>
                         <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px' }} />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-sm flex-grow">
                 <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <GitBranch size={18} className="text-teal-500" /> Recent Activity
                 </h4>
                 <div className="space-y-4">
                    {commits.map((commit) => (
                       <div key={commit.id} className="flex items-start gap-3 text-sm">
                          <div className="mt-1 w-2 h-2 rounded-full bg-slate-700"></div>
                          <div>
                             <div className="text-slate-300 font-mono text-xs mb-0.5">
                                <span className="text-teal-500">{commit.id}</span> - {commit.msg}
                             </div>
                             <div className="text-slate-500 text-[10px] flex gap-2">
                                <span>{commit.author}</span>
                                <span>•</span>
                                <span>{commit.time}</span>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
             </div>
         </div>
      </div>
      
      {/* Bottom Grid Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 border-t border-slate-800">
          <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-sm">
             <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Uptime</div>
             <div className="text-2xl font-mono text-teal-400">99.98%</div>
          </div>
          <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-sm">
             <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Active Nodes</div>
             <div className="text-2xl font-mono text-blue-400">1,248</div>
          </div>
          <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-sm">
             <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Total Req/s</div>
             <div className="text-2xl font-mono text-purple-400">45.2k</div>
          </div>
          <div className="p-4 bg-slate-900/20 border border-slate-800 rounded-sm">
             <div className="text-slate-500 text-xs uppercase tracking-widest mb-1">Error Rate</div>
             <div className="text-2xl font-mono text-emerald-400">0.02%</div>
          </div>
      </div>

      {/* NEW SYSTEM HEALTH SECTION */}
      <div className="pt-8 border-t border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-display text-white">System Health</h4>
          <button 
             onClick={() => setShowSystemLogs(true)}
             className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-teal-500/50 text-slate-300 text-xs font-mono rounded-sm transition-colors flex items-center gap-2"
          >
            View Full Logs <ArrowUpRight size={14} />
          </button>
        </div>
        
        <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-sm">
           <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
               <span className="text-sm font-mono text-slate-300 uppercase tracking-wide">All Services Operational</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
               {['Database Shards', 'Load Balancers', 'Authentication Service'].map((service, i) => (
                 <div key={i} className="bg-slate-900/50 border border-slate-800 p-4 rounded-sm flex items-center justify-between">
                    <span className="text-xs text-slate-400">{service}</span>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                 </div>
               ))}
             </div>
             
             <div className="mt-2 p-4 bg-slate-950/50 rounded border border-slate-800/50 font-mono text-xs text-slate-500 overflow-hidden">
                <div className="flex gap-2">
                   <span className="text-slate-600">12:45:02</span>
                   <span className="text-teal-500/80">[INFO]</span>
                   <span>Auto-scaling group resized to 15 nodes</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-slate-600">12:44:58</span>
                   <span className="text-teal-500/80">[INFO]</span>
                   <span>Health check passed for region us-east-1</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-slate-600">12:44:12</span>
                   <span className="text-blue-500/80">[DEBUG]</span>
                   <span>Cache latency optimization complete</span>
                </div>
             </div>
           </div>
        </div>
      </div>

      {/* NEW LIVE PROJECTS SECTION */}
      <div className="pt-8 border-t border-slate-800">
         <div className="flex items-center gap-3 mb-6">
            <h4 className="text-xl font-display text-white">Live Projects</h4>
            <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-400 font-mono uppercase tracking-wider">
               Real-time
            </span>
         </div>
         
         <div className="border border-dashed border-blue-500/30 rounded-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveProjects.map((project) => (
                   <div 
                     key={project.id} 
                     onClick={() => setSelectedLiveProject(project)}
                     className="group p-6 bg-slate-950/40 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 transition-all rounded-sm cursor-pointer relative overflow-hidden"
                   >
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                             <h5 className="text-white font-display text-lg group-hover:text-teal-400 transition-colors">{project.name}</h5>
                             {project.status === 'Live' && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>}
                         </div>
                         <div className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                            project.status === 'Live' ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/30' : 'bg-amber-900/20 text-amber-400 border border-amber-900/30'
                         }`}>
                            {project.status}
                         </div>
                      </div>
                      
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-6">
                          {project.sector}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/50">
                         <div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase mb-1">
                                <Globe size={10} /> Region
                            </div>
                            <div className="text-xs text-white font-mono truncate">{project.region}</div>
                         </div>
                         <div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase mb-1">
                                <Activity size={10} /> Uptime
                            </div>
                            <div className="text-xs text-white font-bold font-mono">{project.uptime}</div>
                         </div>
                         <div>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase mb-1">
                                <Zap size={10} /> Load
                            </div>
                            <div className="text-xs text-white font-bold font-mono">{project.load}</div>
                         </div>
                      </div>
                   </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const DetailView: React.FC<DetailViewProps> = ({ item, onBack, onOpenContact }) => {
  const renderContent = () => {
    switch (item.id) {
      case 'website': return <WebsiteView onOpenContact={onOpenContact} />;
      case 'portfolio': return <PortfolioView onOpenContact={onOpenContact} />;
      case 'podcast': return <PodcastView />;
      case 'project': return <ProjectView />;
      default: return <div className="text-white text-center py-20">Content not found</div>;
    }
  };

  return (
    <div className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 py-12 lg:py-20 min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-12">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
        >
          <div className="p-2 border border-slate-700 rounded-full group-hover:border-teal-500 transition-colors bg-slate-900/50 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="uppercase tracking-widest text-xs font-semibold">Back to Home</span>
        </button>
      </div>

      <div className="animate-in fade-in zoom-in-95 duration-500">
        {renderContent()}
      </div>
    </div>
  );
};

export default DetailView;