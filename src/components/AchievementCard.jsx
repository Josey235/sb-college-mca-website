import React from 'react';
import { 
  Trophy, 
  Award, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';

export default function AchievementCard({ achievement }) {
  const getIcon = (category) => {
    switch (category) {
      case 'Hackathons': return Trophy;
      case 'Research Papers': return FileText;
      case 'Placements': return CheckCircle2;
      case 'Certifications': return Award;
      default: return Sparkles;
    }
  };

  const Icon = getIcon(achievement.category);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      
      {/* Top Banner / Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-navy-950">
        <img 
          src={achievement.image} 
          alt={achievement.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-900/90 text-academic-300 border border-academic-500/30 backdrop-blur-md flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 text-academic-400" />
            {achievement.category}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-navy-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
            {achievement.year}
          </span>
        </div>

        {/* Distinction Stamp */}
        {achievement.badge && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold bg-amber-400 text-navy-950 shadow">
              ★ {achievement.badge}
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-navy-900 font-display group-hover:text-academic-600 transition-colors">
            {achievement.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {achievement.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Recipient / Team:</span>
          <span className="font-bold text-navy-800 truncate max-w-[200px]">{achievement.recipient}</span>
        </div>

      </div>

    </div>
  );
}

