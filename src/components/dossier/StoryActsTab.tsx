import React from 'react';
import { Movie } from '../../types/movie';
import { Layers, Flame, Skull, Clapperboard, Compass, Camera } from 'lucide-react';

interface StoryActsTabProps {
  movie: Movie;
}

export const StoryActsTab: React.FC<StoryActsTabProps> = ({ movie }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-6 border-b border-neutral-800/80">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 mb-1 block">
          Dramatic Architecture
        </span>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
          Three-Act Narrative Escalation
        </h3>
        <p className="mt-2 text-sm text-neutral-400">
          Hollywood screenplay structure engineered for sustained psychological dread and catastrophic payoffs.
        </p>
      </div>

      {/* Act 1 */}
      <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 font-mono text-xs flex items-center justify-center font-bold">
              01
            </span>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block">
                Act One
              </span>
              <h4 className="font-cinzel text-xl font-bold text-neutral-100">
                {movie.act1?.title || 'The False Sanctuary'}
              </h4>
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">Pacing: 0 - 25%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                The Setup & The Ordinary World
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act1?.setup}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                Inciting Incident
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act1?.incitingIncident}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                Plot Point 1: The Breach
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act1?.plotPoint1}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                Turning Point Into the Unknown
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act1?.turningPoint}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Act 2 */}
      <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-red-950/60 border border-red-900/60 text-red-400 font-mono text-xs flex items-center justify-center font-bold">
              02
            </span>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-red-400 block">
                Act Two
              </span>
              <h4 className="font-cinzel text-xl font-bold text-neutral-100">
                {movie.act2?.title || 'The Tightening Noose'}
              </h4>
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">Pacing: 25 - 75%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                Rising Tension & Trials
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act2?.risingTension}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                Midpoint Revelation (The Unbearable Truth)
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act2?.midpointRevelation}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
                Climax of Despair
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                {movie.act2?.climaxOfDespair}
              </p>
            </div>

            <div className="bg-[#121218] border border-red-950/40 rounded-lg p-4">
              <span className="font-mono text-xs uppercase tracking-wider text-red-500 block mb-1">
                All Is Lost Moment
              </span>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
                {movie.act2?.allIsLostMoment}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Act 3 */}
      <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded bg-red-900 border border-red-700 text-white font-mono text-xs flex items-center justify-center font-bold shadow-[0_0_10px_rgba(220,38,38,0.5)]">
              03
            </span>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-red-400 block">
                Act Three
              </span>
              <h4 className="font-cinzel text-xl font-bold text-neutral-100">
                {movie.act3?.title || 'The Final Sacraments'}
              </h4>
            </div>
          </div>
          <span className="text-xs font-mono text-neutral-500">Pacing: 75 - 100%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
            <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
              The Climax Confrontation
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {movie.act3?.climaxConfrontation}
            </p>
          </div>

          <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
            <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1">
              The Irreversible Cost of Survival
            </span>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {movie.act3?.costOfSurvival}
            </p>
          </div>
        </div>

        {/* Chilling Final Shot & Resolution */}
        <div className="p-5 bg-gradient-to-r from-red-950/30 via-[#14141d] to-transparent border border-red-900/40 rounded-lg">
          <span className="font-mono text-xs uppercase tracking-wider text-red-400 block mb-1.5 flex items-center gap-2">
            <Skull className="w-4 h-4 text-red-500" />
            <span>The Chilling Final Shot & Lingering Twist</span>
          </span>
          <p className="font-cinzel text-sm sm:text-base text-neutral-200 leading-relaxed mb-3">
            &ldquo;{movie.act3?.finalShot || movie.ending}&rdquo;
          </p>
          <p className="text-xs text-neutral-400 font-sans">
            {movie.ending}
          </p>
        </div>
      </div>

      {/* Director Notes */}
      {movie.directorNotes && (
        <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-neutral-800/80">
            <Camera className="w-5 h-5 text-red-500" />
            <h3 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              DIRECTOR&apos;S CINEMATIC VISION & PALETTE NOTES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-1">
                Color Grade & Palette
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {movie.directorNotes.colorPalette}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-1">
                Cinematography & Framing
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {movie.directorNotes.cinematographyStyle}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-1">
                Sound Design Philosophy
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {movie.directorNotes.soundPhilosophy}
              </p>
            </div>

            <div className="bg-[#121218] border border-neutral-800/70 rounded-lg p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-1">
                Comparative Film Touchstones
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {movie.directorNotes.comparativeFilms}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
