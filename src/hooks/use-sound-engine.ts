import { useState, useRef, useCallback, useEffect } from "react";

type WaveType = OscillatorType;

interface ToneConfig {
  frequency: number;
  type: WaveType;
  binauralOffset?: number; // for binaural beats
  volume?: number;
}

const AMBIENT_PRESETS: Record<string, ToneConfig> = {
  // Binaural
  "theta-waves": { frequency: 200, type: "sine", binauralOffset: 6 },
  "alpha-waves": { frequency: 220, type: "sine", binauralOffset: 10 },
  "delta-waves": { frequency: 150, type: "sine", binauralOffset: 2 },
  "gamma-focus": { frequency: 300, type: "sine", binauralOffset: 40 },
  // Mantras / tones
  "om-tone": { frequency: 136.1, type: "sine", volume: 0.3 },
  "heart-chakra": { frequency: 341.3, type: "sine", volume: 0.25 },
  "crown-chakra": { frequency: 480, type: "sine", volume: 0.2 },
  // Frequencies
  "528hz": { frequency: 528, type: "sine", volume: 0.2 },
  "432hz": { frequency: 432, type: "sine", volume: 0.2 },
  "396hz": { frequency: 396, type: "sine", volume: 0.2 },
  "741hz": { frequency: 741, type: "sine", volume: 0.15 },
  // Nature-like
  "rain": { frequency: 0, type: "sine", volume: 0.3 }, // noise-based
  "ocean": { frequency: 0, type: "sine", volume: 0.3 },
  "wind": { frequency: 0, type: "sine", volume: 0.25 },
  // Grounding
  "earth-pulse": { frequency: 7.83, type: "sine", binauralOffset: 0, volume: 0.3 },
  // Default
  "default": { frequency: 256, type: "sine", volume: 0.2 },
};

function createNoiseNode(ctx: AudioContext, type: "rain" | "ocean" | "wind"): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

  for (let channel = 0; channel < 2; channel++) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < bufferSize; i++) {
      if (type === "rain") {
        data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.97 ? 0.8 : 0.15);
      } else if (type === "ocean") {
        const wave = Math.sin(i / (ctx.sampleRate * 4) * Math.PI * 2) * 0.5 + 0.5;
        data[i] = (Math.random() * 2 - 1) * 0.2 * wave;
      } else {
        data[i] = (Math.random() * 2 - 1) * 0.1;
      }
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

export function useSoundEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ oscillators: OscillatorNode[]; gains: GainNode[]; sources: AudioBufferSourceNode[]; masterGain: GainNode | null }>({
    oscillators: [],
    gains: [],
    sources: [],
    masterGain: null,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const animFrameRef = useRef<number>(0);

  const getPreset = (trackId: string): string => {
    const id = trackId.toLowerCase();
    if (id.includes("theta") || id.includes("ocean-theta")) return "theta-waves";
    if (id.includes("alpha")) return "alpha-waves";
    if (id.includes("delta") || id.includes("sleep")) return "delta-waves";
    if (id.includes("gamma") || id.includes("focus")) return "gamma-focus";
    if (id.includes("om") || id.includes("shiva")) return "om-tone";
    if (id.includes("heart")) return "heart-chakra";
    if (id.includes("crown")) return "crown-chakra";
    if (id.includes("528")) return "528hz";
    if (id.includes("432")) return "432hz";
    if (id.includes("396")) return "396hz";
    if (id.includes("741")) return "741hz";
    if (id.includes("rain") || id.includes("forest")) return "rain";
    if (id.includes("ocean") || id.includes("wave")) return "ocean";
    if (id.includes("wind") || id.includes("breeze")) return "wind";
    if (id.includes("earth") || id.includes("schumann")) return "earth-pulse";
    if (id.includes("breath")) return "alpha-waves";
    if (id.includes("ground")) return "earth-pulse";
    return "default";
  };

  const stop = useCallback(() => {
    const nodes = nodesRef.current;
    nodes.oscillators.forEach((osc) => { try { osc.stop(); } catch {} });
    nodes.sources.forEach((src) => { try { src.stop(); } catch {} });
    nodes.gains.forEach((g) => { try { g.disconnect(); } catch {} });
    if (nodes.masterGain) { try { nodes.masterGain.disconnect(); } catch {} }
    nodesRef.current = { oscillators: [], gains: [], sources: [], masterGain: null };
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsPlaying(false);
  }, []);

  const play = useCallback((trackTitle: string) => {
    stop();

    const ctx = ctxRef.current || new AudioContext();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const presetKey = getPreset(trackTitle);
    const preset = AMBIENT_PRESETS[presetKey] || AMBIENT_PRESETS["default"];
    const masterGain = ctx.createGain();
    masterGain.gain.value = volume * (preset.volume ?? 0.25);
    masterGain.connect(ctx.destination);

    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    const sources: AudioBufferSourceNode[] = [];

    if (["rain", "ocean", "wind"].includes(presetKey)) {
      const noiseSource = createNoiseNode(ctx, presetKey as "rain" | "ocean" | "wind");
      // Add a filter for more natural sound
      const filter = ctx.createBiquadFilter();
      filter.type = presetKey === "rain" ? "highpass" : "lowpass";
      filter.frequency.value = presetKey === "rain" ? 800 : presetKey === "ocean" ? 600 : 400;
      noiseSource.connect(filter);
      filter.connect(masterGain);
      noiseSource.start();
      sources.push(noiseSource);

      // Add a subtle tone underneath
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = presetKey === "ocean" ? 55 : presetKey === "rain" ? 80 : 65;
      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.03;
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
      gains.push(oscGain);
    } else if (preset.binauralOffset && preset.binauralOffset > 0) {
      // Binaural beat: two slightly different frequencies in each ear
      const splitter = ctx.createChannelMerger(2);

      const oscL = ctx.createOscillator();
      oscL.type = preset.type;
      oscL.frequency.value = preset.frequency;
      const gainL = ctx.createGain();
      gainL.gain.value = 1;
      oscL.connect(gainL);
      gainL.connect(splitter, 0, 0);

      const oscR = ctx.createOscillator();
      oscR.type = preset.type;
      oscR.frequency.value = preset.frequency + preset.binauralOffset;
      const gainR = ctx.createGain();
      gainR.gain.value = 1;
      oscR.connect(gainR);
      gainR.connect(splitter, 0, 1);

      splitter.connect(masterGain);
      oscL.start();
      oscR.start();
      oscillators.push(oscL, oscR);
      gains.push(gainL, gainR);

      // Add a gentle pad
      const pad = ctx.createOscillator();
      pad.type = "sine";
      pad.frequency.value = preset.frequency / 2;
      const padGain = ctx.createGain();
      padGain.gain.value = 0.06;
      pad.connect(padGain);
      padGain.connect(masterGain);
      pad.start();
      oscillators.push(pad);
      gains.push(padGain);
    } else {
      // Simple tone with harmonics
      const osc1 = ctx.createOscillator();
      osc1.type = preset.type;
      osc1.frequency.value = preset.frequency;
      const g1 = ctx.createGain();
      g1.gain.value = 1;
      osc1.connect(g1);
      g1.connect(masterGain);
      osc1.start();

      // Subtle octave
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = preset.frequency * 2;
      const g2 = ctx.createGain();
      g2.gain.value = 0.08;
      osc2.connect(g2);
      g2.connect(masterGain);
      osc2.start();

      oscillators.push(osc1, osc2);
      gains.push(g1, g2);
    }

    nodesRef.current = { oscillators, gains, sources, masterGain };
    setIsPlaying(true);
  }, [volume, stop]);

  const setVolumeLevel = useCallback((v: number) => {
    setVolume(v);
    if (nodesRef.current.masterGain) {
      nodesRef.current.masterGain.gain.setTargetAtTime(v * 0.25, ctxRef.current?.currentTime || 0, 0.1);
    }
  }, []);

  const toggle = useCallback((trackTitle: string) => {
    if (isPlaying) {
      stop();
    } else {
      play(trackTitle);
    }
  }, [isPlaying, play, stop]);

  useEffect(() => {
    return () => { stop(); };
  }, [stop]);

  return { play, stop, toggle, isPlaying, volume, setVolume: setVolumeLevel };
}
