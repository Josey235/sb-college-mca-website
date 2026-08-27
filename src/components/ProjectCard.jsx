import React from 'react';
import { 
  Github, 
  ExternalLink, 
  Users, 
  Layers, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      
      {/* Thumbnail */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelect(project)}>
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-navy-900/90 text-academic-300 border border-academic-400/30 backdrop-blur-md">
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-400 text-navy-950 flex items-center gap-1 shadow">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelect(project)}
            className="text-lg font-bold text-navy-900 font-display group-hover:text-academic-600 transition-colors cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>

          <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Team Members & Footer Links */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 truncate max-w-[170px]" title={project.teamMembers.join(", ")}>
            <Users className="w-3.5 h-3.5 text-academic-500 shrink-0" />
            <span className="truncate">{project.teamMembers.join(", ")}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                aria-label={`${project.title} GitHub Source`}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            
            {project.demo && (
              <a 
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-academic-600 hover:bg-slate-100 transition-colors"
                aria-label={`${project.title} Live Demo`}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => onSelect(project)}
              className="p-1.5 rounded-lg text-academic-600 hover:bg-academic-50 font-semibold text-xs flex items-center gap-0.5 ml-1"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

