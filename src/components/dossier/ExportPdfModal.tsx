import React, { useState } from 'react';
import { Movie } from '../../types/movie';
import { generateMoviePdf, ExportPdfMode } from '../../utils/pdfExport';
import { X, FileText, Download, Check, Sparkles, BookOpen, Clapperboard, ShieldCheck } from 'lucide-react';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  isOpen,
  onClose,
  movie,
}) => {
  const [selectedMode, setSelectedMode] = useState<ExportPdfMode>('full');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      try {
        generateMoviePdf(movie, selectedMode);
        setDownloadSuccess(true);
        setTimeout(() => {
          setIsExporting(false);
          // auto close after brief confirmation
          setTimeout(() => {
            onClose();
            setDownloadSuccess(false);
          }, 1200);
        }, 500);
      } catch (err) {
        console.error('PDF export error:', err);
        setIsExporting(false);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0c0c11] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden my-8">
        
        <div className="h-1 bg-gradient-to-r from-neutral-900 via-red-600 to-neutral-900"></div>

        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-800/80 flex items-center justify-between bg-[#0e0e14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-950/60 border border-red-900/50 flex items-center justify-center text-red-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-500 block">
                Offline Document Archive
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-100">
                EXPORT PDF SCRIPT & DOSSIER
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 rounded transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-7 space-y-6">
          
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-3">
              Select PDF Document Format:
            </span>

            <div className="space-y-3">
              
              {/* Option 1: Full Dossier & Screenplay */}
              <button
                type="button"
                onClick={() => setSelectedMode('full')}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3.5 ${
                  selectedMode === 'full'
                    ? 'bg-red-950/20 border-red-700/80 shadow-[0_0_15px_rgba(220,38,38,0.15)]'
                    : 'bg-[#121218] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                }`}
              >
                <BookOpen className={`w-5 h-5 mt-0.5 shrink-0 ${selectedMode === 'full' ? 'text-red-500' : 'text-neutral-500'}`} />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-sm font-bold text-neutral-100 block mb-0.5">
                      Full Master Dossier & Screenplay (Recommended)
                    </span>
                    <span className="text-[10px] font-mono text-red-400 uppercase">Complete Package</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Includes Hollywood Title Page, Story Synopsis, The Immutable Laws of Horror, Main Threat Dossier, Character Ensemble with fatal flaws, 3-Act Beats, and Full Screenplay with sluglines and dialogue.
                  </p>
                </div>
              </button>

              {/* Option 2: Screenplay Script Only */}
              <button
                type="button"
                onClick={() => setSelectedMode('screenplay')}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3.5 ${
                  selectedMode === 'screenplay'
                    ? 'bg-red-950/20 border-red-700/80 shadow-[0_0_15px_rgba(220,38,38,0.15)]'
                    : 'bg-[#121218] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                }`}
              >
                <Clapperboard className={`w-5 h-5 mt-0.5 shrink-0 ${selectedMode === 'screenplay' ? 'text-red-500' : 'text-neutral-500'}`} />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-sm font-bold text-neutral-100 block mb-0.5">
                      Hollywood Screenplay Script Only
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Screenplay Focus</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Clean 8.5x11 production script formatted in standard Courier font, sluglines, sound design cues, character dialogue, and prologue/epilogue voiceover monologues.
                  </p>
                </div>
              </button>

              {/* Option 3: Executive Pitch Dossier Only */}
              <button
                type="button"
                onClick={() => setSelectedMode('dossier')}
                className={`w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3.5 ${
                  selectedMode === 'dossier'
                    ? 'bg-red-950/20 border-red-700/80 shadow-[0_0_15px_rgba(220,38,38,0.15)]'
                    : 'bg-[#121218] border-neutral-800 hover:border-neutral-700 text-neutral-300'
                }`}
              >
                <ShieldCheck className={`w-5 h-5 mt-0.5 shrink-0 ${selectedMode === 'dossier' ? 'text-red-500' : 'text-neutral-500'}`} />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-sm font-bold text-neutral-100 block mb-0.5">
                      Executive Pitch Dossier Only
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Pitch & Lore</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Logline, full narrative synopsis, threat anatomy, rules of horror, character survival odds, and 3-act escalation breakdown for studio pitching.
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* Offline Storage Notice */}
          <div className="bg-[#0b0b0f] border border-neutral-800/80 rounded-lg p-3.5 text-xs text-neutral-400 flex items-start gap-2.5">
            <span className="text-red-500 font-bold shrink-0">ℹ</span>
            <span className="leading-relaxed">
              Your PDF will download directly into your browser as a standalone offline file. You can read, print, or share your horror screenplay without an internet connection.
            </span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-[#0a0a0e] border-t border-neutral-800/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-700 hover:bg-red-600 active:scale-[0.98] rounded transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] disabled:opacity-50"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>PDF Downloaded!</span>
              </>
            ) : isExporting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Generating PDF Script...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF Script</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
