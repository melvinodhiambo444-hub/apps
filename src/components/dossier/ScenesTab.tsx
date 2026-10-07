import React, { useState } from 'react';
import { Movie, Scene } from '../../types/movie';
import { Clapperboard, Copy, Check, Volume2, Camera, Sparkles, FileText, Loader2, AlertCircle } from 'lucide-react';

interface ScenesTabProps {
  movie: Movie;
  onUpdateSceneScript: (sceneNumber: number, script: string) => void;
  onOpenScreenplayView: (sceneNumber?: number) => void;
}

export const ScenesTab: React.FC<ScenesTabProps> = ({
  movie,
  onUpdateSceneScript,
  onOpenScreenplayView,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generatingScriptScene, setGeneratingScriptScene] = useState<number | null>(null);
  const [scriptError, setScriptError] = useState<string | null>(null);

  const handleCopyPrompt = (promptText: string, index: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGenerateScript = async (scene: Scene) => {
    setGeneratingScriptScene(scene.sceneNumber);
    setScriptError(null);

    try {
      const response = await fetch('/api/movie/scene-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieTitle: movie.title,
          scene,
          characters: movie.characters,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate scene screenplay.');
      }

      onUpdateSceneScript(scene.sceneNumber, data.script);
    } catch (err: any) {
      console.error(err);
      setScriptError(err?.message || 'Error generating script for this scene.');
    } finally {
      setGeneratingScriptScene(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Tab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 mb-1 block">
            Cinematography & Storyboards
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
            Cinematic Scenes & Visual Prompts
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            Shot-by-shot suspense breakdowns with camera movements, silence design, and ready-to-render visual AI prompts.
          </p>
        </div>

        <button
          onClick={() => onOpenScreenplayView()}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded transition-colors whitespace-nowrap self-start md:self-auto"
        >
          <FileText className="w-3.5 h-3.5 text-red-400" />
          <span>Open Full Screenplay Mode</span>
        </button>
      </div>

      {scriptError && (
        <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{scriptError}</span>
        </div>
      )}

      {/* Scenes List */}
      <div className="space-y-8">
        {movie.scenes?.map((scene, index) => {
          const isGeneratingThis = generatingScriptScene === scene.sceneNumber;
          const hasScript = Boolean(scene.generatedScript);

          return (
            <div
              key={scene.sceneNumber || index}
              className="bg-[#0e0e14] border border-neutral-800/90 hover:border-red-900/60 transition-colors rounded-xl p-6 sm:p-8"
            >
              {/* Scene Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded bg-red-950/50 border border-red-900/40 text-red-400 font-mono text-xs flex items-center justify-center font-bold">
                    {String(scene.sceneNumber).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block font-semibold">
                      {scene.slugline}
                    </span>
                    <h4 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-100">
                      {scene.title}
                    </h4>
                  </div>
                </div>

                {/* Intensity Tension Bar */}
                <div className="flex items-center gap-3 bg-[#121218] px-3.5 py-1.5 rounded-lg border border-neutral-800 shrink-0">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase">
                    Tension:
                  </span>
                  <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-neutral-500 via-amber-500 to-red-600 h-full rounded-full transition-all"
                      style={{ width: `${(scene.intensity / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs font-bold text-red-400">
                    {scene.intensity}/10
                  </span>
                </div>
              </div>

              {/* Action Description */}
              <div className="mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Action & Narrative Beat
                </span>
                <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                  {scene.actionDescription}
                </p>
              </div>

              {/* Dialogue Snippet */}
              {scene.dialogueSnippet && (
                <div className="bg-[#121218] border-l-2 border-red-700 rounded-r-lg p-4 mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-red-400 block mb-1">
                    Key Dialogue Exchange
                  </span>
                  <pre className="font-courier text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">
                    {scene.dialogueSnippet}
                  </pre>
                </div>
              )}

              {/* Sound Design and Camera Directions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-red-400 mb-1.5">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="uppercase tracking-wider">Sound & Silence Design Cue</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {scene.soundDesignCue}
                  </p>
                </div>

                <div className="bg-[#121218] border border-neutral-800/80 rounded-lg p-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-1.5">
                    <Camera className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="uppercase tracking-wider">Camera Direction & Framing</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {scene.cameraDirection}
                  </p>
                </div>
              </div>

              {/* Visual Prompt for Storyboard / Concept Art */}
              <div className="bg-[#14141c] border border-neutral-800 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                    <Sparkles className="w-3.5 h-3.5 text-red-500" />
                    <span className="uppercase tracking-wider">Concept Art / Storyboard Visual Prompt</span>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt(scene.visualPrompt, index)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded transition-colors"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-neutral-300 font-mono bg-[#0b0b0e] p-3 rounded border border-neutral-900 leading-relaxed">
                  {scene.visualPrompt}
                </p>
              </div>

              {/* Generated Screenplay Scene Drawer or Button */}
              {hasScript ? (
                <div className="bg-[#0b0b0f] border border-red-950/60 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-800">
                    <span className="font-mono text-xs text-red-400 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Full Screenplay Scene (Generated)</span>
                    </span>
                    <button
                      onClick={() => onOpenScreenplayView(scene.sceneNumber)}
                      className="text-xs text-neutral-400 hover:text-neutral-200 underline font-mono"
                    >
                      View in Script Room →
                    </button>
                  </div>
                  <div className="font-courier text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto pr-2">
                    {scene.generatedScript}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleGenerateScript(scene)}
                    disabled={isGeneratingThis}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-neutral-200 bg-neutral-900 hover:bg-neutral-800 hover:border-red-900/60 border border-neutral-800 rounded transition-all disabled:opacity-50"
                  >
                    {isGeneratingThis ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
                        <span>Drafting Hollywood Screenplay...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-3.5 h-3.5 text-red-400" />
                        <span>Generate Hollywood Screenplay Script</span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
