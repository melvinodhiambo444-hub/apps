import React from 'react';
import { Film, UserCheck, Clapperboard, Sparkles, ArrowRight, Play } from 'lucide-react';

interface HeroSectionProps {
  onOpenCreator: () => void;
  onExploreSample: (sampleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCreator, onExploreSample }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Cinematic Hero Background with Ambient Scrim */}
      <div className="relative min-h-[620px] md:min-h-[720px] flex items-center justify-center border-b border-neutral-800/60 overflow-hidden">
        {/* Background Image Asset with Zero Broken Image safety */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/whisper_hero_cinematic_1791367488022.jpg"
            alt="Atmospheric dark cinematic horror street scene with crimson fog"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45 scale-105 transform animate-pulse duration-10000"
          />
          {/* Deep dark gradient scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/75 to-[#08080a]/90"></div>
          <div className="absolute inset-0 vignette-overlay opacity-90 pointer-events-none"></div>
          <div className="absolute inset-0 subtle-film-grain opacity-40 pointer-events-none"></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          
          {/* Studio Sub-label */}
          <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.3em] font-mono text-red-500/90 bg-red-950/30 px-3 py-1 rounded border border-red-900/40">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>AI Horror Movie Creation Studio</span>
          </div>

          {/* Large Title */}
          <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-black tracking-[0.2em] text-neutral-100 uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] mb-4">
            WHISPER
          </h1>

          {/* Tagline */}
          <p className="font-cinzel text-xl sm:text-2xl md:text-3xl text-neutral-300 tracking-[0.12em] font-medium max-w-3xl mb-10 drop-shadow">
            &ldquo;Create the horror. Control the silence.&rdquo;
          </p>

          {/* Large Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
            <button
              onClick={onOpenCreator}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-white bg-red-700 hover:bg-red-600 active:scale-[0.98] rounded transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] glow-red"
            >
              <span>CREATE A MOVIE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onExploreSample('sample_decibel_protocol')}
              className="inline-flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 rounded transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>Preview Sample Dossier</span>
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-neutral-400 text-sm sm:text-base font-normal tracking-wide max-w-xl">
            Turn an idea into a horror movie.
          </p>

          {/* Audio / Silence Philosophy quote */}
          <div className="mt-12 pt-8 border-t border-neutral-800/40 text-xs text-neutral-500 max-w-lg font-mono">
            <span>&ldquo;In true horror, sound is a resource. Silence is survival.&rdquo;</span>
          </div>

        </div>
      </div>

      {/* Feature Cards Section */}
      <section id="story-features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 mb-2 block">
            Production Architecture
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
            From Raw Fear to Structured Cinema
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-2xl mx-auto">
            WHISPER dissects horror into precise production pillars: narrative mythos, psychological anatomy, and frame-by-frame suspense.
          </p>
        </div>

        {/* Three Feature Cards with High-Fidelity Assets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: STORY */}
          <div className="group relative bg-[#0e0e13] border border-neutral-800/90 hover:border-red-900/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
              <img
                src="/src/assets/images/feature_story_horror_1791367507253.jpg"
                alt="Ancient weathered horror screenplay manuscript with red annotations"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 px-2.5 py-1 rounded text-xs font-mono tracking-wider text-neutral-300 flex items-center gap-1.5">
                <span>🎬</span>
                <span>01. NARRATIVE</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-neutral-100 tracking-wider mb-2 flex items-center gap-2">
                  <span>STORY</span>
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  Generate a complete horror story. Build three acts of escalating terror, plot twists, dread pacing, and immutable curse or creature laws.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-500 font-mono flex items-center justify-between">
                <span>Logline · Synopsis · 3-Act Beats</span>
                <span className="text-red-500">Hollywood Tier</span>
              </div>
            </div>
          </div>

          {/* Card 2: CHARACTERS */}
          <div className="group relative bg-[#0e0e13] border border-neutral-800/90 hover:border-red-900/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
              <img
                src="/src/assets/images/feature_characters_horror_1791367520774.jpg"
                alt="Terrified haunted protagonist illuminated by subtle red emergency flare"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 px-2.5 py-1 rounded text-xs font-mono tracking-wider text-neutral-300 flex items-center gap-1.5">
                <span>👤</span>
                <span>02. PSYCHOLOGY</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-neutral-100 tracking-wider mb-2 flex items-center gap-2">
                  <span>CHARACTERS</span>
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  Create detailed characters and relationships. Map deep backstories, fatal flaws, interpersonal friction, and calculated survival odds.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-500 font-mono flex items-center justify-between">
                <span>Archetypes · Fatal Flaws · Odds</span>
                <span className="text-red-500">Deep Lore</span>
              </div>
            </div>
          </div>

          {/* Card 3: SCENES */}
          <div className="group relative bg-[#0e0e13] border border-neutral-800/90 hover:border-red-900/60 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(185,28,28,0.15)] flex flex-col">
            <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
              <img
                src="/src/assets/images/feature_scenes_horror_1791367536299.jpg"
                alt="Subterranean horror scene breakdown corridor with flickering exit light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e13] via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 px-2.5 py-1 rounded text-xs font-mono tracking-wider text-neutral-300 flex items-center gap-1.5">
                <span>🎞️</span>
                <span>03. CINEMATOGRAPHY</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-neutral-100 tracking-wider mb-2 flex items-center gap-2">
                  <span>SCENES</span>
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  Break the movie into cinematic scenes and visual prompts. Direct audio & silence cues, camera movement, tension levels, and ready-to-use concept prompts.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-800/80 text-xs text-neutral-500 font-mono flex items-center justify-between">
                <span>Sluglines · Sound Cues · Prompts</span>
                <span className="text-red-500">Storyboard Ready</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
