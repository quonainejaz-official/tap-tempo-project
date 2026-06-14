export class AudioEngine {
  private static instance: AudioEngine
  public ctx: AudioContext | null = null
  private noiseBuffer: AudioBuffer | null = null

  private constructor() {}

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine()
    }
    return AudioEngine.instance
  }

  public init() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.createNoiseBuffer()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return
    const bufferSize = this.ctx.sampleRate * 2
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = this.noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }
  }

  public playKick(volume = 1) {
    if (!this.ctx) return
    const t = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.frequency.setValueAtTime(150, t)
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.1)

    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2)

    osc.start(t)
    osc.stop(t + 0.2)
  }

  public playClap(volume = 1) {
    if (!this.ctx || !this.noiseBuffer) return
    const t = this.ctx.currentTime

    const noiseSource = this.ctx.createBufferSource()
    noiseSource.buffer = this.noiseBuffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 1000

    const gain = this.ctx.createGain()

    noiseSource.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08)

    noiseSource.start(t)
    noiseSource.stop(t + 0.08)
  }

  public playHiHat(volume = 1) {
    if (!this.ctx || !this.noiseBuffer) return
    const t = this.ctx.currentTime

    const noiseSource = this.ctx.createBufferSource()
    noiseSource.buffer = this.noiseBuffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 8000

    const gain = this.ctx.createGain()

    noiseSource.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04)

    noiseSource.start(t)
    noiseSource.stop(t + 0.04)
  }

  public playCowbell(volume = 1) {
    if (!this.ctx) return
    const t = this.ctx.currentTime

    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const filter = this.ctx.createBiquadFilter()
    const gain = this.ctx.createGain()

    osc1.type = 'square'
    osc2.type = 'square'

    osc1.frequency.setValueAtTime(800, t)
    osc2.frequency.setValueAtTime(562, t)

    filter.type = 'bandpass'
    filter.frequency.value = 1000

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)

    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4)

    osc1.start(t)
    osc2.start(t)
    osc1.stop(t + 0.4)
    osc2.stop(t + 0.4)
  }

  public playMetronomeClick(accent = false, volume = 1) {
    if (!this.ctx) return
    const t = this.ctx.currentTime

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.frequency.setValueAtTime(accent ? 880 : 660, t)

    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05)

    osc.start(t)
    osc.stop(t + 0.05)
  }
}

export const audioEngine = AudioEngine.getInstance()
