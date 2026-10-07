import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Activity } from 'lucide-react';

export const AudioAtmosphere: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      stopAtmosphere();
    } else {
      startAtmosphere();
    }
  };

  const startAtmosphere = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      // Smooth fade in
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low sub-bass drone (48Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(48, ctx.currentTime);

      // Low eerie harmonic (51.5Hz - binaural beat beatings)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(51.5, ctx.currentTime);

      // Filter for dark cinematic warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      oscRef.current = osc1;
      osc2Ref.current = osc2;
      setIsPlaying(true);
    } catch (err) {
      console.warn('AudioContext autoplay policy or error:', err);
    }
  };

  const stopAtmosphere = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          oscRef.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
        } catch (_) {}
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1300);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Silence the horror drone' : 'Immerse in atmospheric horror sub-drone'}
      aria-label={isPlaying ? 'Silence drone' : 'Play atmospheric drone'}
      className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs tracking-wide transition-all ${
        isPlaying
          ? 'bg-red-950/40 border-red-700/60 text-red-300 shadow-[0_0_12px_rgba(220,38,38,0.25)]'
          : 'bg-[#121217] border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
      }`}
    >
      {isPlaying ? (
        <>
          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-red-400">Drone Active</span>
          <Volume2 className="w-3.5 h-3.5 text-red-400" />
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
          <span className="font-mono text-[11px] uppercase tracking-wider">Silence</span>
        </>
      )}
    </button>
  );
};
