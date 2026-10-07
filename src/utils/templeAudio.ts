// Native Web Audio API Japanese Temple Soundscape Engine
// Features procedural Kyoto mountain breeze, Furin wind chimes, Bonsho bronze bell,
// singing bowls, water trickle, and Shakuhachi bamboo harmonics with persistent controls.

export type AmbientTrackId = 'wind-bells' | 'temple-bowl' | 'rain-water' | 'zen-bamboo';

export interface AmbientTrackInfo {
  id: AmbientTrackId;
  name: string;
  kanji: string;
  subtitle: string;
  icon: string;
}

export const AMBIENT_TRACKS: AmbientTrackInfo[] = [
  { id: 'wind-bells', name: 'Kyoto Mountain Breeze', kanji: '風鈴', subtitle: 'Wind Swell & Furin Chimes', icon: '🎐' },
  { id: 'temple-bowl', name: 'Bronze Bell & Singing Bowl', kanji: '大鐘', subtitle: 'Deep Bonsho Resonances', icon: '🔔' },
  { id: 'rain-water', name: 'Garden Rain & Stream', kanji: '清流', subtitle: 'Gentle Raindrops & Water Flow', icon: '💧' },
  { id: 'zen-bamboo', name: 'Zen Bamboo Meditation', kanji: '竹林', subtitle: 'Shakuhachi Flute Harmonics', icon: '🎋' },
];

export interface SoundscapeState {
  isPlaying: boolean;
  volume: number;
  loop: boolean;
  track: AmbientTrackId;
}

class TempleSoundscapeManager {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private continuousGain: GainNode | null = null;

  private currentTrack: AmbientTrackId = 'wind-bells';
  private volume: number = 0.35;
  private isLoop: boolean = true;

  private activeNodes: { stop: () => void; disconnect: () => void }[] = [];
  private periodicTimer: number | null = null;
  private listeners: Set<(state: SoundscapeState) => void> = new Set();

  public subscribe(listener: (state: SoundscapeState) => void) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public getState(): SoundscapeState {
    return {
      isPlaying: this.isRunning,
      volume: this.volume,
      loop: this.isLoop,
      track: this.currentTrack,
    };
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getLoop(): boolean {
    return this.isLoop;
  }

  public getTrack(): AmbientTrackId {
    return this.currentTrack;
  }

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
    this.notify();
  }

  public setLoop(loop: boolean) {
    this.isLoop = loop;
    if (!this.isLoop && this.periodicTimer) {
      clearTimeout(this.periodicTimer);
      this.periodicTimer = null;
    } else if (this.isLoop && this.isRunning && !this.periodicTimer) {
      this.scheduleNextPeriodicEvent();
    }
    this.notify();
  }

  public async setTrack(track: AmbientTrackId) {
    if (this.currentTrack === track && this.isRunning) return;
    this.currentTrack = track;
    if (this.isRunning) {
      this.teardownAudioLayers();
      this.setupTrackLayers();
    }
    this.notify();
  }

  public async start(): Promise<boolean> {
    try {
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      if (this.isRunning) return true;

      // Master Gain
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, ctx.currentTime + 1.2);
      this.masterGain.connect(ctx.destination);

      this.setupTrackLayers();
      this.isRunning = true;
      this.notify();
      return true;
    } catch (e) {
      console.warn("AudioContext awaiting user interaction", e);
      return false;
    }
  }

  private setupTrackLayers() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;

    this.continuousGain = ctx.createGain();
    this.continuousGain.gain.setValueAtTime(1, ctx.currentTime);
    this.continuousGain.connect(this.masterGain);

    if (this.currentTrack === 'wind-bells') {
      this.startWindLayer();
    } else if (this.currentTrack === 'temple-bowl') {
      this.startBowlDroneLayer();
    } else if (this.currentTrack === 'rain-water') {
      this.startWaterStreamLayer();
    } else if (this.currentTrack === 'zen-bamboo') {
      this.startBambooMeditationLayer();
    }

    if (this.isLoop) {
      this.scheduleNextPeriodicEvent();
    }
  }

  // 1. Mountain Wind Layer
  private startWindLayer() {
    if (!this.ctx || !this.continuousGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555;
      b1 = 0.99332 * b1 + white * 0.075;
      b2 = 0.96900 * b2 + white * 0.153;
      data[i] = (b0 + b1 + b2 + white * 0.09) * 0.14;
    }

    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(320, ctx.currentTime);
    windFilter.Q.setValueAtTime(2.2, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(170, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    windSource.connect(windFilter);
    windFilter.connect(this.continuousGain);
    windSource.start();

    this.activeNodes.push(windSource, lfo);
  }

  // 2. Singing Bowl Warm Drone Layer
  private startBowlDroneLayer() {
    if (!this.ctx || !this.continuousGain) return;
    const ctx = this.ctx;

    // Resonant fundamental 108 Hz (Sacred Buddhist 108 frequency)
    const freqs = [108, 216, 324, 432];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.03 / (idx + 1), ctx.currentTime);
      lfo.connect(lfoGain.gain);

      gain.gain.setValueAtTime((0.18 / (idx + 1)), ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.continuousGain!);

      osc.start();
      lfo.start();
      this.activeNodes.push(osc, lfo);
    });
  }

  // 3. Gentle Water Stream / Garden Rain Layer
  private startWaterStreamLayer() {
    if (!this.ctx || !this.continuousGain) return;
    const ctx = this.ctx;

    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.2;
    }

    const waterSource = ctx.createBufferSource();
    waterSource.buffer = noiseBuffer;
    waterSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.24, ctx.currentTime);

    waterSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.continuousGain);

    waterSource.start();
    this.activeNodes.push(waterSource);
  }

  // 4. Shakuhachi Bamboo Meditation Harmonics Layer
  private startBambooMeditationLayer() {
    if (!this.ctx || !this.continuousGain) return;
    const ctx = this.ctx;

    // Pentatonic bamboo flute harmonic tones (D4, A4)
    const tones = [293.66, 440.0];
    tones.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const vibrato = ctx.createOscillator();
      vibrato.frequency.setValueAtTime(4.5, ctx.currentTime);
      const vibGain = ctx.createGain();
      vibGain.gain.setValueAtTime(1.8, ctx.currentTime);
      vibrato.connect(vibGain);
      vibGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.continuousGain!);

      osc.start();
      vibrato.start();
      this.activeNodes.push(osc, vibrato);
    });
  }

  private scheduleNextPeriodicEvent() {
    if (!this.isRunning || !this.isLoop) return;

    // Delay between 3.5s and 7s
    const delay = 3500 + Math.random() * 4500;
    this.periodicTimer = window.setTimeout(() => {
      if (this.isRunning && this.isLoop) {
        this.triggerCurrentTrackAccent();
        this.scheduleNextPeriodicEvent();
      }
    }, delay);
  }

  public triggerCurrentTrackAccent() {
    if (this.currentTrack === 'wind-bells') {
      this.playTempleChime();
    } else if (this.currentTrack === 'temple-bowl') {
      this.playDeepBronzeBell();
    } else if (this.currentTrack === 'rain-water') {
      this.playWaterDropSparks();
    } else if (this.currentTrack === 'zen-bamboo') {
      this.playFluteOrnament();
    }
  }

  // Furin Bell Tone
  public playTempleChime() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const notes = [587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.756, now);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.linearRampToValueAtTime(0.07, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc1.connect(gain1);
    osc2.connect(gain2);

    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime((Math.random() * 1.4) - 0.7, now);
      gain1.connect(panner);
      gain2.connect(panner);
      panner.connect(this.masterGain);
    } else {
      gain1.connect(this.masterGain);
      gain2.connect(this.masterGain);
    }

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 4.2);
    osc2.stop(now + 2.5);
  }

  // Deep Bonsho Bronze Bell (Kyoto Temple Bell Strike)
  public playDeepBronzeBell() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const bellFreq = 108.0; // Fundamental
    const harmonics = [1, 1.414, 2.0, 2.76, 3.48];

    harmonics.forEach((h, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(bellFreq * h, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25 / (i + 1), now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (6.0 - i * 0.8));

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 6.2);
    });
  }

  // Water Droplets Accent
  public playWaterDropSparks() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startFreq = 1200 + Math.random() * 800;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.8, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Bamboo Flute Melodic Ornament
  public playFluteOrnament() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const pentatonic = [587.33, 659.25, 783.99, 880.0];
    const targetFreq = pentatonic[Math.floor(Math.random() * pentatonic.length)];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    osc.frequency.setValueAtTime(targetFreq * 0.95, now);
    osc.frequency.linearRampToValueAtTime(targetFreq, now + 0.15);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 2.0);
  }

  private teardownAudioLayers() {
    this.activeNodes.forEach((node) => {
      try {
        node.stop();
        node.disconnect();
      } catch {}
    });
    this.activeNodes = [];

    if (this.periodicTimer) {
      clearTimeout(this.periodicTimer);
      this.periodicTimer = null;
    }

    if (this.continuousGain) {
      try {
        this.continuousGain.disconnect();
        this.continuousGain = null;
      } catch {}
    }
  }

  public stop() {
    if (!this.isRunning) return;

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

      setTimeout(() => {
        this.teardownAudioLayers();
        if (this.masterGain) {
          try {
            this.masterGain.disconnect();
            this.masterGain = null;
          } catch {}
        }
      }, 900);
    } else {
      this.teardownAudioLayers();
    }

    this.isRunning = false;
    this.notify();
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const templeAudio = new TempleSoundscapeManager();
