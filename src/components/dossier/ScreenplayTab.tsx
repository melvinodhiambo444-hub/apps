import React, { useState } from 'react';
import { Movie, Scene } from '../../types/movie';
import { generateMoviePdf } from '../../utils/pdfExport';
import { FileText, Download, Printer, Wand2, Loader2, Check, Copy } from 'lucide-react';

interface ScreenplayTabProps {
  movie: Movie;
  onUpdateSceneScript: (sceneNumber: number, script: string) => void;
  initialSceneNumber?: number;
}

export const ScreenplayTab: React.FC<ScreenplayTabProps> = ({
  movie,
  onUpdateSceneScript,
  initialSceneNumber,
}) => {
  const [selectedSceneNumber, setSelectedSceneNumber] = useState<number>(
    initialSceneNumber || movie.scenes?.[0]?.sceneNumber || 1
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedScene = movie.scenes?.find((s) => s.sceneNumber === selectedSceneNumber) || movie.scenes?.[0];

  const handleDownloadPdf = () => {
    setIsExportingPdf(true);
    setTimeout(() => {
      try {
        generateMoviePdf(movie, 'screenplay');
      } catch (e) {
        console.error(e);
      } finally {
        setIsExportingPdf(false);
      }
    }, 200);
  };

  const handleGenerateScript = async () => {
    if (!selectedScene) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/movie/scene-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieTitle: movie.title,
          scene: selectedScene,
          characters: movie.characters,
        }),
      });

      const data = await response.json();
      if (data.success && data.script) {
        onUpdateSceneScript(selectedScene.sceneNumber, data.script);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadFullScript = () => {
    let fullText = `${movie.title.toUpperCase()}\n`;
    fullText += `A Horror Screenplay\n`;
    fullText += `Tagline: "${movie.tagline}"\n`;
    fullText += `Written & Architected via WHISPER Studio\n`;
    fullText += `Runtime: ${movie.runtime} | Genre: ${movie.genre}\n\n`;
    fullText += `====================================================\n\n`;
    fullText += `COLD OPEN / PROLOGUE NARRATION:\n${movie.prologueNarration}\n\n`;
    fullText += `====================================================\n\n`;

    movie.scenes?.forEach((sc) => {
      fullText += `SCENE ${sc.sceneNumber}: ${sc.slugline}\n\n`;
      if (sc.generatedScript) {
        fullText += `${sc.generatedScript}\n\n`;
      } else {
        fullText += `${sc.actionDescription}\n\n`;
        if (sc.dialogueSnippet) {
          fullText += `${sc.dialogueSnippet}\n\n`;
        }
        fullText += `[SOUND DESIGN: ${sc.soundDesignCue}]\n\n`;
      }
      fullText += `----------------------------------------------------\n\n`;
    });

    fullText += `EPILOGUE NARRATION:\n${movie.epilogueNarration}\n\n`;
    fullText += `FADE OUT.\nTHE END.`;

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${movie.title.replace(/\s+/g, '_')}_SCREENPLAY.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCurrent = () => {
    if (!selectedScene?.generatedScript) return;
    navigator.clipboard.writeText(selectedScene.generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 mb-1 block">
            Screenplay Room
          </span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100">
            Hollywood Screenwriting Format
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            Standard Courier typography, sluglines, character dialogue cues, and sound effects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 rounded transition-all shadow-[0_0_12px_rgba(220,38,38,0.3)] disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isExportingPdf ? 'Generating PDF...' : 'Download PDF Script'}</span>
          </button>

          <button
            onClick={handleDownloadFullScript}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>Export (.txt)</span>
          </button>
        </div>
      </div>

      {/* Screenplay Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Scene Selector */}
        <div className="lg:col-span-1 space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 block mb-2">
            Select Scene
          </span>
          {movie.scenes?.map((sc) => (
            <button
              key={sc.sceneNumber}
              onClick={() => setSelectedSceneNumber(sc.sceneNumber)}
              className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex items-start gap-2.5 ${
                selectedSceneNumber === sc.sceneNumber
                  ? 'bg-neutral-800/90 border-red-700/80 text-white shadow-sm'
                  : 'bg-[#0e0e14] border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              <span className="text-red-500 font-bold">
                {String(sc.sceneNumber).padStart(2, '0')}.
              </span>
              <div className="overflow-hidden">
                <span className="font-semibold block truncate text-neutral-200">
                  {sc.title}
                </span>
                <span className="text-[10px] text-neutral-500 truncate block">
                  {sc.slugline}
                </span>
                {sc.generatedScript && (
                  <span className="text-[9px] text-emerald-400 mt-1 block">● Script Ready</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Right Column: Screenplay Page View */}
        <div className="lg:col-span-3">
          {selectedScene && (
            <div className="bg-[#0a0a0d] border border-neutral-800/90 rounded-xl p-6 sm:p-10 shadow-2xl relative">
              
              {/* Scene Script Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-neutral-800">
                <div className="font-mono text-xs text-neutral-400">
                  <span className="text-red-400 font-bold mr-2">SCENE {selectedScene.sceneNumber}</span>
                  <span className="text-neutral-300 font-semibold">{selectedScene.slugline}</span>
                </div>

                <div className="flex items-center gap-2">
                  {selectedScene.generatedScript ? (
                    <>
                      <button
                        onClick={handleCopyCurrent}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 rounded transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={handleGenerateScript}
                        disabled={isGenerating}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 rounded transition-colors disabled:opacity-50"
                      >
                        {isGenerating ? <Loader2 className="w-3 h-3 animate-spin text-red-500" /> : <Wand2 className="w-3 h-3 text-red-400" />}
                        <span>Regenerate Scene</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleGenerateScript}
                      disabled={isGenerating}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                          <span>Generating Hollywood Screenplay...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3.5 h-3.5 text-red-200" />
                          <span>Generate Screenplay Scene</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Script Sheet (Classic Screenplay Formatting) */}
              <div className="bg-[#050507] border border-neutral-900 rounded-lg p-6 sm:p-12 font-courier text-xs sm:text-sm text-neutral-300 leading-relaxed shadow-inner min-h-[450px]">
                {selectedScene.generatedScript ? (
                  <pre className="whitespace-pre-wrap font-courier text-neutral-200 leading-relaxed">
                    {selectedScene.generatedScript}
                  </pre>
                ) : (
                  <div className="space-y-6">
                    <div className="font-bold uppercase tracking-wider text-neutral-100">
                      {selectedScene.slugline}
                    </div>

                    <div className="text-neutral-300 max-w-2xl leading-relaxed">
                      {selectedScene.actionDescription}
                    </div>

                    {selectedScene.dialogueSnippet && (
                      <div className="pl-6 sm:pl-16 max-w-xl text-neutral-200">
                        <pre className="whitespace-pre-wrap font-courier">
                          {selectedScene.dialogueSnippet}
                        </pre>
                      </div>
                    )}

                    <div className="text-neutral-400 text-xs uppercase tracking-wider">
                      SOUND CUE: {selectedScene.soundDesignCue}
                    </div>

                    <div className="pt-8 border-t border-neutral-900 text-center">
                      <p className="text-neutral-500 font-mono text-xs mb-4">
                        Click below to generate complete dialogue exchanges, action directions, and character beats for this scene.
                      </p>
                      <button
                        onClick={handleGenerateScript}
                        disabled={isGenerating}
                        className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 rounded transition-all"
                      >
                        Generate Full Screenplay Script
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
