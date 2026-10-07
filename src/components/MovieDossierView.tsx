import React, { useState } from 'react';
import { Movie } from '../types/movie';
import { OverviewTab } from './dossier/OverviewTab';
import { CharactersTab } from './dossier/CharactersTab';
import { StoryActsTab } from './dossier/StoryActsTab';
import { ScenesTab } from './dossier/ScenesTab';
import { ScreenplayTab } from './dossier/ScreenplayTab';
import { AudioNarrationTab } from './dossier/AudioNarrationTab';
import { RefineModal } from './dossier/RefineModal';
import { ExportPdfModal } from './dossier/ExportPdfModal';
import {
  ArrowLeft,
  Wand2,
  Download,
  Printer,
  Copy,
  Clock,
  MapPin,
  Sparkles,
  Layers,
  Users,
  Film,
  FileText,
  Volume2,
} from 'lucide-react';

interface MovieDossierViewProps {
  movie: Movie;
  onBack: () => void;
  onUpdateMovie: (updated: Movie) => void;
  onDuplicateMovie: (movie: Movie) => void;
}

type DossierTab = 'overview' | 'characters' | 'acts' | 'scenes' | 'screenplay' | 'audio';

export const MovieDossierView: React.FC<MovieDossierViewProps> = ({
  movie,
  onBack,
  onUpdateMovie,
  onDuplicateMovie,
}) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('overview');
  const [isRefineModalOpen, setIsRefineModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [targetScriptScene, setTargetScriptScene] = useState<number | undefined>(undefined);

  const handleUpdateSceneScript = (sceneNumber: number, script: string) => {
    const updatedScenes = movie.scenes.map((sc) =>
      sc.sceneNumber === sceneNumber ? { ...sc, generatedScript: script } : sc
    );
    onUpdateMovie({
      ...movie,
      scenes: updatedScenes,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleOpenScreenplayView = (sceneNumber?: number) => {
    setTargetScriptScene(sceneNumber);
    setActiveTab('screenplay');
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(movie, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${movie.title.replace(/\s+/g, '_')}_WHISPER_DOSSIER.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-200">
      
      {/* Top Banner & Breadcrumb Bar */}
      <div className="border-b border-neutral-800/80 bg-[#0c0c11]/90 backdrop-blur sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-red-500" />
            <span>Return to Studio Vault</span>
          </button>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.35)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export PDF Script</span>
            </button>

            <button
              onClick={() => setIsRefineModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition-all"
            >
              <Wand2 className="w-3.5 h-3.5 text-red-400" />
              <span>Refine with AI</span>
            </button>

            <button
              onClick={handleExportJSON}
              title="Download Full Project JSON"
              className="p-1.5 bg-[#121218] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              title="Print / Save as PDF"
              className="p-1.5 bg-[#121218] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDuplicateMovie(movie)}
              title="Duplicate This Movie"
              className="p-1.5 bg-[#121218] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 rounded transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Movie Dossier Header */}
      <div className="relative border-b border-neutral-800/80 bg-gradient-to-b from-[#0e0e16] to-[#08080a] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Metadata chips unboxed zero-pill text */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
            <span className="text-red-500 font-semibold uppercase tracking-wider">{movie.genre}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Tone: {movie.tone}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-neutral-500" />
              <span>{movie.runtime}</span>
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-neutral-500" />
              <span>{movie.location}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider text-neutral-100 uppercase mb-3 drop-shadow">
            {movie.title}
          </h1>

          {/* Tagline */}
          <p className="font-cinzel text-lg sm:text-xl text-red-500/90 italic tracking-wide max-w-3xl">
            &ldquo;{movie.tagline}&rdquo;
          </p>

        </div>
      </div>

      {/* Dossier Tabs Navigation */}
      <div className="border-b border-neutral-800/80 bg-[#0a0a0e] sticky top-[113px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-red-950/40 text-red-400 border border-red-800/70 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Overview & Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('characters')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                activeTab === 'characters'
                  ? 'bg-red-950/40 text-red-400 border border-red-800/70 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Characters ({movie.characters?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('acts')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                activeTab === 'acts'
                  ? 'bg-red-950/40 text-red-400 border border-red-800/70 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3-Act Structure</span>
            </button>

            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                activeTab === 'scenes'
                  ? 'bg-red-950/40 text-red-400 border border-red-800/70 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Scenes & Prompts ({movie.scenes?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('screenplay')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                activeTab === 'screenplay'
                  ? 'bg-red-950/40 text-red-400 border border-red-800/70 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Screenplay Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded transition-all whitespace-nowrap ${
                activeTab === 'audio'
                  ? 'bg-red-950/40 text-red-400 border border-red-800/70 shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Narration & Sound</span>
            </button>

          </nav>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'overview' && <OverviewTab movie={movie} />}
        {activeTab === 'characters' && <CharactersTab movie={movie} />}
        {activeTab === 'acts' && <StoryActsTab movie={movie} />}
        {activeTab === 'scenes' && (
          <ScenesTab
            movie={movie}
            onUpdateSceneScript={handleUpdateSceneScript}
            onOpenScreenplayView={handleOpenScreenplayView}
          />
        )}
        {activeTab === 'screenplay' && (
          <ScreenplayTab
            movie={movie}
            onUpdateSceneScript={handleUpdateSceneScript}
            initialSceneNumber={targetScriptScene}
          />
        )}
        {activeTab === 'audio' && <AudioNarrationTab movie={movie} />}
      </main>

      {/* AI Refinement Modal */}
      <RefineModal
        isOpen={isRefineModalOpen}
        onClose={() => setIsRefineModalOpen(false)}
        movie={movie}
        onMovieRefined={onUpdateMovie}
      />

      {/* Export PDF Modal */}
      <ExportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        movie={movie}
      />

    </div>
  );
};
