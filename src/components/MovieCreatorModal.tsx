import React, { useState } from 'react';
import { X, Sparkles, Wand2, Film, Clock, MapPin, Compass, AlertCircle, Loader2 } from 'lucide-react';
import { GenreOption, ToneOption, Movie } from '../types/movie';
import { HORROR_PRESETS, HorrorPreset } from '../data/ideaPresets';

interface MovieCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMovieCreated: (movie: Movie) => void;
}

const GENRES: GenreOption[] = [
  'Horror',
  'Psychological Horror',
  'Supernatural Horror',
  'Creature Horror',
  'Survival Horror',
  'Sci-Fi Horror',
  'Thriller Horror',
];

const TONES: ToneOption[] = [
  'Terrifying',
  'Dark',
  'Suspenseful',
  'Mysterious',
  'Cinematic',
];

const RUNTIMES = [
  '45 minutes (Short Feature)',
  '85 minutes',
  '95 minutes (Standard Feature)',
  '110 minutes',
  '120 minutes (Epic Feature)',
];

const DEFAULT_LOCATIONS = [
  'Subterranean Transit System Beneath a Blackout City',
  'Abandoned Cold War Arctic Research Facility',
  'Fog-Choked Coastal Fishing Village, Maine',
  'Secluded Appalachian Valley with Dense Woods',
  'Derelict Orbital Salvage Station in Low Orbit',
  'Ancient Gothic Sanatorium in the Swiss Alps',
  'Flooded Submerged Parish in Central Pennsylvania',
];

const LOADING_MESSAGES = [
  'Listening to the silence between words...',
  'Extracting primal fears and establishing core mythos...',
  'Architecting the unbending rules of the horror...',
  'Profiling main characters and psychological fatal flaws...',
  'Composing three acts of escalating dread and tension...',
  'Choreographing cinematic scenes, audio cues, and visual prompts...',
  'Sealing the production dossier...',
];

export const MovieCreatorModal: React.FC<MovieCreatorModalProps> = ({
  isOpen,
  onClose,
  onMovieCreated,
}) => {
  const [title, setTitle] = useState('');
  const [idea, setIdea] = useState('');
  const [location, setLocation] = useState('');
  const [genre, setGenre] = useState<GenreOption>('Creature Horror');
  const [tone, setTone] = useState<ToneOption>('Terrifying');
  const [runtime, setRuntime] = useState('95 minutes (Standard Feature)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: HorrorPreset) => {
    setTitle(preset.title);
    setIdea(preset.idea);
    setLocation(preset.location);
    setGenre(preset.genre as GenreOption);
    setTone(preset.tone as ToneOption);
    setRuntime(preset.runtime);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) {
      setError('Please provide a movie idea to begin creation.');
      return;
    }

    setError(null);
    setIsGenerating(true);
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2800);

    try {
      const response = await fetch('/api/movie/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim() || undefined,
          idea: idea.trim(),
          location: location.trim() || undefined,
          genre,
          tone,
          runtime,
        }),
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate horror movie.');
      }

      onMovieCreated(data.movie);
      onClose();
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setError(err?.message || 'A catastrophic error occurred during generation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0c0c11] border border-neutral-800 rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] overflow-hidden my-6">
        
        {/* Subtle decorative top red accent border */}
        <div className="h-1 bg-gradient-to-r from-neutral-900 via-red-600 to-neutral-900"></div>

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-800/80 flex items-center justify-between bg-[#0e0e14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-950/60 border border-red-900/50 flex items-center justify-center text-red-500">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-500 block">
                Production Lab
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-neutral-100">
                HORROR MOVIE CREATOR
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isGenerating}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 rounded transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading Overlay */}
        {isGenerating ? (
          <div className="p-12 sm:p-20 text-center flex flex-col items-center justify-center bg-[#0a0a0e] relative min-h-[500px]">
            {/* Ambient red breathing glow */}
            <div className="absolute w-72 h-72 rounded-full bg-red-600/10 blur-3xl pointer-events-none animate-pulse"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full border border-red-900/60 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-red-600/80 border-t-transparent animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-cinzel text-red-500 text-lg font-bold">
                  W
                </div>
              </div>

              <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 mb-2">
                Synthesizing Dread
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-neutral-100 tracking-wider mb-4 max-w-lg">
                Orchestrating Cinematic Horror
              </h3>
              
              <div className="bg-[#121217] border border-neutral-800 px-5 py-3 rounded text-sm font-mono text-neutral-300 min-h-[50px] flex items-center justify-center text-center max-w-md shadow-inner">
                <span className="animate-fade-in key={loadingStep}">
                  {LOADING_MESSAGES[loadingStep]}
                </span>
              </div>

              <p className="mt-8 text-xs text-neutral-500 max-w-sm font-mono">
                Gemini 3.8 Flash is drafting characters, survival rules, 3-act narrative arcs, scenes, and visual prompts.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="p-6 sm:p-8 space-y-7">
            
            {/* Error Notification */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Presets Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>Quick Inspiration Presets:</span>
                </label>
                <span className="text-[11px] text-neutral-500 font-mono">Click to test instant premise</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {HORROR_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="px-3 py-1.5 bg-[#14141c] hover:bg-[#1a1a24] hover:border-red-800/80 border border-neutral-800 text-xs text-neutral-300 rounded transition-all flex items-center gap-1.5 font-medium text-left"
                  >
                    <span className="text-red-500 text-[10px]">●</span>
                    <span>{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Movie Idea Large Text Box */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                Describe your movie idea <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Strange creatures begin hunting people in a city whenever they speak too loudly."
                className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 rounded-lg p-4 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors resize-y leading-relaxed font-sans"
              />
              <p className="mt-1.5 text-[11px] text-neutral-500 font-mono">
                Tip: Include core threats, rules, or fear mechanisms (e.g., sound triggers, reflection delays, isolation).
              </p>
            </div>

            {/* Grid of Inputs: Title & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Movie Title */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Movie Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. THE DECIBEL PROTOCOL"
                  className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                />
                <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                  Leave blank for AI auteur to coin a chilling title
                </span>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Location / Setting
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Blackout Subterranean Chicago Metro"
                  className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
                />
                <div className="mt-1 flex items-center gap-1 overflow-x-auto text-[10px] text-neutral-500 font-mono">
                  <span className="shrink-0">Suggestions:</span>
                  <button
                    type="button"
                    onClick={() => setLocation('Abandoned Cold War Arctic Research Facility')}
                    className="hover:text-red-400 truncate"
                  >
                    Arctic Base ·
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('Subterranean Transit System')}
                    className="hover:text-red-400 truncate"
                  >
                    Subway ·
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocation('Foggy Coastal Island in Maine')}
                    className="hover:text-red-400 truncate"
                  >
                    Coastal Town
                  </button>
                </div>
              </div>
            </div>

            {/* Grid of Selectors: Genre, Tone, Runtime */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Genre */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Genre
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value as GenreOption)}
                  className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none transition-colors"
                >
                  {GENRES.map((g) => (
                    <option key={g} value={g} className="bg-[#121217] text-neutral-200">
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as ToneOption)}
                  className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none transition-colors"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t} className="bg-[#121217] text-neutral-200">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Runtime */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Approximate Runtime
                </label>
                <select
                  value={runtime}
                  onChange={(e) => setRuntime(e.target.value)}
                  className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none transition-colors"
                >
                  {RUNTIMES.map((r) => (
                    <option key={r} value={r} className="bg-[#121217] text-neutral-200">
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Footer with Primary Action */}
            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isGenerating || !idea.trim()}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-white bg-red-700 hover:bg-red-600 active:scale-[0.98] rounded transition-all duration-200 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] disabled:opacity-50 disabled:pointer-events-none"
              >
                <Wand2 className="w-4 h-4 text-red-200" />
                <span>GENERATE MOVIE</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
