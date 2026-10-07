import React from 'react';
import { Movie } from '../../types/movie';
import { Mic, Volume2, Radio, Music, Sparkles } from 'lucide-react';

interface AudioNarrationTabProps {
  movie: Movie;
}

export const AudioNarrationTab: React.FC<AudioNarrationTabProps> = ({ movie }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Tab Header */}
      <div className="pb-6 border-b border-neutral-800/80">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 mb-1 block">
          Acoustic Design & Spoken Dread
        </span>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
          Narration Monologues & Sound Philosophy
        </h3>
        <p className="mt-1 text-sm text-neutral-400">
          The vocal bookends of the film, soundscape design, and acoustic isolation guidelines.
        </p>
      </div>

      {/* Grid: Prologue & Epilogue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Cold Open Prologue Narration */}
        <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800/80">
              <Mic className="w-5 h-5 text-red-500" />
              <h4 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
                COLD OPEN PROLOGUE WHISPER
              </h4>
            </div>

            <p className="text-xs text-neutral-500 font-mono mb-4">
              Delivered over pitch-black darkness before the title card appears.
            </p>

            <div className="bg-[#121218] border-l-2 border-red-600 rounded-r-lg p-5">
              <p className="font-cinzel text-base sm:text-lg text-neutral-100 italic leading-relaxed">
                &ldquo;{movie.prologueNarration}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800/60 font-mono text-xs text-neutral-500 flex items-center justify-between">
            <span>Audio Staging</span>
            <span className="text-red-400">Binaural Close-Mic Whispering</span>
          </div>
        </div>

        {/* Epilogue Closing Voiceover */}
        <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800/80">
              <Radio className="w-5 h-5 text-red-500" />
              <h4 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
                EPILOGUE CLOSING MONOLOGUE
              </h4>
            </div>

            <p className="text-xs text-neutral-500 font-mono mb-4">
              Delivered over the final lingering shot before the cut to black.
            </p>

            <div className="bg-[#121218] border-l-2 border-red-900 rounded-r-lg p-5">
              <p className="font-cinzel text-base sm:text-lg text-neutral-100 italic leading-relaxed">
                &ldquo;{movie.epilogueNarration}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800/60 font-mono text-xs text-neutral-500 flex items-center justify-between">
            <span>Audio Staging</span>
            <span className="text-red-400">Static-Interrupted Transmission</span>
          </div>
        </div>

      </div>

      {/* Acoustic Soundscape Philosophy */}
      {movie.directorNotes?.soundPhilosophy && (
        <div className="bg-[#0e0e14] border border-neutral-800/90 rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800/80">
            <Volume2 className="w-5 h-5 text-red-500" />
            <h4 className="font-cinzel text-lg font-bold text-neutral-100 tracking-wider">
              ACOUSTIC ARCHITECTURE & SOUND DESIGN PHILOSOPHY
            </h4>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed font-sans mb-6">
            {movie.directorNotes.soundPhilosophy}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-4 font-mono text-xs">
              <span className="text-neutral-500 uppercase block mb-1">Silence Ratio</span>
              <span className="text-red-400 font-bold text-sm">65% Absolute Quiet</span>
            </div>
            <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-4 font-mono text-xs">
              <span className="text-neutral-500 uppercase block mb-1">Sonic Shock Threshold</span>
              <span className="text-red-400 font-bold text-sm">20dB+ Lethal Trigger</span>
            </div>
            <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-4 font-mono text-xs">
              <span className="text-neutral-500 uppercase block mb-1">Score Role</span>
              <span className="text-red-400 font-bold text-sm">Sub-bass Drone & Breath</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
