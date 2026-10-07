import React from 'react';
import { Movie } from '../../types/movie';
import { ShieldAlert, Skull, MapPin, Eye, Volume2, Sparkles } from 'lucide-react';

interface OverviewTabProps {
  movie: Movie;
  onUpdateMovie?: (updated: Movie) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ movie }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Logline & Synopsis Highlight */}
      <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-950/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500">
              The Premise & Logline
            </span>
          </div>

          <p className="font-cinzel text-lg sm:text-xl md:text-2xl font-bold text-neutral-100 leading-relaxed mb-6">
            &ldquo;{movie.logline}&rdquo;
          </p>

          <div className="pt-6 border-t border-neutral-800/80">
            <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
              <span>Full Narrative Synopsis</span>
            </h4>
            <div className="text-sm text-neutral-300 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {movie.synopsis}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Rules of Horror & Main Threat Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Rules of Horror */}
        <div className="bg-[#0e0e14] border border-neutral-800/90 hover:border-red-900/60 transition-colors rounded-xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/80">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
                  RULES OF THE HORROR
                </h3>
              </div>
              <span className="text-[11px] font-mono text-red-400/80 uppercase">
                {movie.rulesOfHorror?.length || 4} Immutable Laws
              </span>
            </div>

            <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
              These are the non-negotiable laws governing survival and supernatural consequence in this world. Breaking any rule guarantees lethal escalation.
            </p>

            <ul className="space-y-3.5">
              {movie.rulesOfHorror?.map((rule, index) => (
                <li
                  key={index}
                  className="bg-[#121218] border border-neutral-800/80 rounded-lg p-3.5 flex items-start gap-3 text-xs sm:text-sm text-neutral-200"
                >
                  <span className="font-mono text-red-500 font-bold shrink-0 mt-0.5">
                    0{index + 1}.
                  </span>
                  <span className="leading-relaxed font-sans">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800/60 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
            <span>Violation Consequence</span>
            <span className="text-red-500">Immediate Termination</span>
          </div>
        </div>

        {/* Main Threat Dossier */}
        <div className="bg-[#0e0e14] border border-neutral-800/90 hover:border-red-900/60 transition-colors rounded-xl p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/80">
              <div className="flex items-center gap-2.5">
                <Skull className="w-5 h-5 text-red-500" />
                <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
                  THE MAIN THREAT
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500 uppercase">
                Hostile Anatomy
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-cinzel text-xl font-bold text-red-400 mb-1">
                {movie.mainThreat?.name}
              </h4>
              <span className="font-mono text-xs text-neutral-400 block">
                Classification: {movie.mainThreat?.classification}
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
              <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-3.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-red-400 block mb-1">
                  Physiological & Manifestation Profile
                </span>
                <p className="leading-relaxed text-neutral-300">
                  {movie.mainThreat?.description}
                </p>
              </div>

              <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-3.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Hunting Methodology
                </span>
                <p className="leading-relaxed text-neutral-300">
                  {movie.mainThreat?.huntingMethod}
                </p>
              </div>

              <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-3.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 block mb-1">
                  Vulnerability or Mystery
                </span>
                <p className="leading-relaxed text-neutral-300">
                  {movie.mainThreat?.fatalVulnerabilityOrMystery}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800/60 text-[11px] font-mono text-neutral-500 flex items-center justify-between">
            <span>Threat Classification</span>
            <span className="text-red-500">Apex Entity</span>
          </div>
        </div>

      </div>

      {/* Atmospheric Setting Section */}
      <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-neutral-800/80">
          <MapPin className="w-5 h-5 text-red-500" />
          <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
            ATMOSPHERIC SETTING & DREAD PROFILE
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="font-cinzel text-base font-bold text-neutral-100 mb-2">
                {movie.setting?.name || movie.location}
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.setting?.atmosphericDescription}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-1.5 flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-red-500" />
                <span>Sensory Cues & Environmental Textures</span>
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 italic leading-relaxed">
                &ldquo;{movie.setting?.sensoryDetails}&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-5">
            <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-3">
              Environmental Dread Factors
            </span>
            <ul className="space-y-2.5">
              {movie.setting?.dreadFactors?.map((factor, idx) => (
                <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
