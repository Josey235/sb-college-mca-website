import React from 'react';
import { 
  Users, 
  Award, 
  Code, 
  Calendar, 
  Briefcase, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      value: "100%",
      label: "Placement Assistance",
      sublabel: "Top MNCs & Tech Unicorns",
      icon: Briefcase,
      color: "text-emerald-400"
    },
    {
      id: 2,
      value: "60+",
      label: "Active MCA Scholars",
      sublabel: "Batch 2026 – 2028",
      icon: Users,
      color: "text-academic-400"
    },
    {
      id: 3,
      value: "12+",
      label: "Expert Faculty",
      sublabel: "Ph.D. & Industry Veterans",
      icon: Award,
      color: "text-amber-400"
    },
    {
      id: 4,
      value: "45+",
      label: "Innovative Projects",
      sublabel: "AI, Web, Cloud & IoT",
      icon: Code,
      color: "text-cyan-400"
    },
    {
      id: 5,
      value: "30+",
      label: "Annual Tech Events",
      sublabel: "Hackathons & Fests",
      icon: Calendar,
      color: "text-purple-400"
    }
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-navy-900/95 backdrop-blur-xl border border-navy-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-navy-950/40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-navy-800">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className={`flex flex-col items-center text-center group transition-transform duration-300 hover:-translate-y-1 ${
                  idx > 0 && idx % 2 === 0 ? 'pt-6 lg:pt-0' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-navy-800/80 border border-navy-700 flex items-center justify-center mb-3 group-hover:border-academic-500/50 group-hover:bg-navy-800 transition-colors">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  {stat.sublabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

