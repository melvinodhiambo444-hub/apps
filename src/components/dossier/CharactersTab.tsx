import React from 'react';
import { Movie, Character } from '../../types/movie';
import { User, AlertTriangle, HeartHandshake, Percent, MessageSquareQuote, Sparkles } from 'lucide-react';

interface CharactersTabProps {
  movie: Movie;
}

export const CharactersTab: React.FC<CharactersTabProps> = ({ movie }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Tab Header Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 mb-1 block">
            Psychological Ensemble
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
            Dramatis Personae & Survival Odds
          </h3>
        </div>
        <div className="font-mono text-xs text-neutral-400">
          <span>Total Dossiers: {movie.characters?.length || 0}</span>
        </div>
      </div>

      {/* Character Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movie.characters?.map((char, index) => (
          <div
            key={char.id || index}
            className="bg-[#0e0e14] border border-neutral-800/90 hover:border-red-900/60 transition-all duration-300 rounded-xl p-6 flex flex-col justify-between hover:shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
          >
            <div>
              {/* Card Header with Unboxed Metadata */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 pb-3 border-b border-neutral-800/80 font-mono">
                <span className="text-red-400 font-semibold">{char.role}</span>
                <span className="text-neutral-500">{char.archetype}</span>
              </div>

              {/* Character Name & Dreamcast */}
              <div className="mb-4">
                <h4 className="font-cinzel text-xl font-bold text-neutral-100 mb-1">
                  {char.name}
                </h4>
                {char.actorInspiration && (
                  <span className="text-xs text-neutral-500 font-mono block">
                    Casting Prototype: {char.actorInspiration}
                  </span>
                )}
              </div>

              {/* Background */}
              <div className="mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                  Origin & Psychological History
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  {char.background}
                </p>
              </div>

              {/* Fatal Flaw / Vulnerability */}
              <div className="bg-[#121218] border border-red-950/40 rounded-lg p-3.5 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mb-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span className="uppercase tracking-wider">Fatal Flaw / Vulnerability</span>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  {char.fatalFlaw}
                </p>
              </div>

              {/* Relationship Dynamics */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mb-1">
                  <HeartHandshake className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="uppercase tracking-wider">Group Friction & Dynamics</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {char.relationshipDynamics}
                </p>
              </div>
            </div>

            {/* Survival Odds Footer */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                Calculated Survival
              </span>
              <span className="font-mono text-xs font-bold text-red-400 px-2.5 py-1 bg-red-950/30 border border-red-900/40 rounded">
                {char.survivalOdds}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Signature Dialogue Quotes Highlight */}
      {movie.keyQuotes && movie.keyQuotes.length > 0 && (
        <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 mt-8">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-neutral-800/80">
            <MessageSquareQuote className="w-5 h-5 text-red-500" />
            <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              KEY SIGNATURE DIALOGUE & MONOLOGUES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movie.keyQuotes.map((q, idx) => (
              <div
                key={idx}
                className="bg-[#121218] border border-neutral-800/80 rounded-lg p-5 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <p className="font-cinzel text-base text-neutral-200 italic leading-relaxed mb-3">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <span className="text-xs text-neutral-400 block font-sans">
                    {q.context}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-800/60 font-mono text-xs text-red-400 flex items-center justify-between">
                  <span>— {q.character}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
