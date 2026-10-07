import React from 'react';
import { Film, Plus } from 'lucide-react';
import { AudioAtmosphere } from './AudioAtmosphere';

interface HeaderProps {
  onOpenCreator: () => void;
  onNavigateHome: () => void;
  onScrollToProjects: () => void;
  onScrollToInspirations?: () => void;
  activeView: 'home' | 'dossier';
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreator,
  onNavigateHome,
  onScrollToProjects,
  onScrollToInspirations,
  activeView,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#08080a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Wordmark with original whisper/wave symbol */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-600 rounded"
        >
          {/* Custom Whisper/Wave Icon */}
          <div className="relative w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden group-hover:border-red-900/80 transition-colors">
            <span className="absolute inset-0 bg-gradient-to-t from-red-950/40 to-transparent opacity-60"></span>
            {/* Custom soundwave/silence pulse bars */}
            <div className="relative flex items-center gap-0.5 z-10">
              <span className="w-0.5 h-2 bg-neutral-400 group-hover:bg-red-400 transition-all rounded-full"></span>
              <span className="w-0.5 h-4 bg-neutral-300 group-hover:bg-red-500 transition-all rounded-full"></span>
              <span className="w-0.5 h-5 bg-red-500 group-hover:h-6 transition-all rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              <span className="w-0.5 h-3 bg-neutral-300 group-hover:bg-red-500 transition-all rounded-full"></span>
              <span className="w-0.5 h-1.5 bg-neutral-400 group-hover:bg-red-400 transition-all rounded-full"></span>
            </div>
          </div>
          <span className="font-cinzel text-xl font-bold tracking-[0.25em] text-neutral-100 group-hover:text-red-500 transition-colors">
            WHISPER
          </span>
        </button>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            onClick={onNavigateHome}
            className={`transition-colors hover:text-neutral-100 ${
              activeView === 'home' ? 'text-neutral-100' : 'text-neutral-400'
            }`}
          >
            Studio
          </button>
          <button
            onClick={onScrollToProjects}
            className="transition-colors hover:text-neutral-100 flex items-center gap-1.5"
          >
            <span>My Projects</span>
            <span className="font-mono text-xs px-1.5 py-0.2 bg-neutral-900 border border-neutral-800 rounded text-neutral-400">
              {savedCount}
            </span>
          </button>
          {onScrollToInspirations && (
            <button
              onClick={onScrollToInspirations}
              className="transition-colors hover:text-neutral-100"
            >
              Inspirations
            </button>
          )}
          <a
            href="#story-features"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
              setTimeout(() => {
                const el = document.getElementById('story-features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="transition-colors hover:text-neutral-100"
          >
            Capabilities
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-3">
          <AudioAtmosphere />
          <button
            onClick={onOpenCreator}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-red-700 hover:bg-red-600 active:scale-[0.98] rounded transition-all shadow-[0_0_15px_rgba(185,28,28,0.35)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create a Movie</span>
          </button>
        </div>

      </div>
    </header>
  );
};
