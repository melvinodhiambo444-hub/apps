import React, { useState } from 'react';
import { Movie } from '../../types/movie';
import { X, Sparkles, Wand2, Loader2, AlertCircle } from 'lucide-react';

interface RefineModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
  onMovieRefined: (updatedMovie: Movie) => void;
}

const REFINE_PRESETS = [
  'Make the ending much darker with a chilling psychological twist.',
  'Add a shocking interpersonal betrayal in the Act 2 midpoint revelation.',
  'Intensify the acoustic silence rules and sound vulnerabilities.',
  'Deepen the tragic backstory and fatal flaw of the protagonist.',
  'Ramp up the tension and visceral dread in the Act 3 climax.',
];

export const RefineModal: React.FC<RefineModalProps> = ({
  isOpen,
  onClose,
  movie,
  onMovieRefined,
}) => {
  const [instruction, setInstruction] = useState('');
  const [targetSection, setTargetSection] = useState('whole');
  const [isRefining, setIsRefining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;

    setIsRefining(true);
    setError(null);

    try {
      const response = await fetch('/api/movie/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movie,
          instruction: instruction.trim(),
          targetSection,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to refine movie.');
      }

      onMovieRefined(data.movie);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Error occurred during refinement.');
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c0c11] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-8">
        
        <div className="h-1 bg-gradient-to-r from-neutral-900 via-red-600 to-neutral-900"></div>

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-800/80 flex items-center justify-between bg-[#0e0e14]">
          <div className="flex items-center gap-2.5">
            <Wand2 className="w-5 h-5 text-red-500" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-500 block">
                AI Script Doctor
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-100">
                Refine Dossier with AI
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isRefining}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 rounded transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isRefining ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
            <h4 className="font-cinzel text-xl font-bold text-neutral-100 mb-2">
              Rewriting & Recalibrating Dossier...
            </h4>
            <p className="font-mono text-xs text-neutral-400 max-w-md">
              Gemini 3.8 Flash is modifying character dynamics, plot beats, and tone according to your direction.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRefine} className="p-6 sm:p-8 space-y-6">
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Direction Presets */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                Quick Director Notes:
              </label>
              <div className="flex flex-wrap gap-2">
                {REFINE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInstruction(preset)}
                    className="px-2.5 py-1.5 text-xs text-neutral-300 bg-[#121218] hover:bg-[#181822] hover:border-red-900 border border-neutral-800 rounded transition-all text-left"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Instruction */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                Specific Refinement Instruction
              </label>
              <textarea
                rows={4}
                required
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g. Introduce a secondary entity in the tunnels, make character Marcus's sister a victim of the same threat, and add a shocking twist to the final scene."
                className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 focus:ring-1 focus:ring-red-600/50 rounded-lg p-3.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Target Area */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Focus Area
              </label>
              <select
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value)}
                className="w-full bg-[#121217] border border-neutral-800 focus:border-red-600 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none"
              >
                <option value="whole">Whole Movie & Consistent Integration</option>
                <option value="ending">Ending & Climax Payoff</option>
                <option value="characters">Characters & Psychological Conflicts</option>
                <option value="scenes">Cinematic Scenes & Audio Cues</option>
                <option value="rulesOfHorror">Rules of the Horror & Threat Lore</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isRefining || !instruction.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 active:scale-[0.98] rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply AI Refinement</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
