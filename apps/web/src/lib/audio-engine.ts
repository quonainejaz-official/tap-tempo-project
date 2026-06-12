class AudioEngine {
  private ctx: AudioContext | null = null
  private noiseBuffer: AudioBuffer | null = null

  init() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.generateNoiseBuffer()
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume()
    }
    return this.ctx.currentTime
  }

  private generateNoiseBuffer() {
    if (!this.ctx) return
    const bufferSize = this.ctx.sampleRate * 0.1
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    this.noiseBuffer = buffer
  }

  playKick(volume = 0.5) {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(150, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start()
    osc.stop(this.ctx.currentTime + 0.15)
  }

  playClap(volume = 0.5) {
    if (!this.ctx || !this.noiseBuffer) return
    const source = this.ctx.createBufferSource()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()
    source.buffer = this.noiseBuffer
    filter.type = "bandpass"
    filter.frequency.value = 2000
    filter.Q.value = 0.5
    gain.gain.setValueAtTime(volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)
    source.start()
  }

  playHiHat(volume = 0.5) {
    if (!this.ctx || !this.noiseBuffer) return
    const source = this.ctx.createBufferSource()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()
    source.buffer = this.noiseBuffer
    filter.type = "highpass"
    filter.frequency.value = 7000
    gain.gain.setValueAtTime(volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)
    source.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)
    source.start()
  }

  playCowbell(volume = 0.5) {
    if (!this.ctx) return
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()
    osc1.type = "square"
    osc1.frequency.value = 800
    osc2.type = "square"
    osc2.frequency.value = 1200
    filter.type = "bandpass"
    filter.frequency.value = 3000
    filter.Q.value = 1
    gain.gain.setValueAtTime(volume * 0.3, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08)
    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(this.ctx.destination)
    osc1.start()
    osc2.start()
    osc1.stop(this.ctx.currentTime + 0.08)
    osc2.stop(this.ctx.currentTime + 0.08)
  }

  playMetronomeClick(accent: boolean, volume = 0.5) {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = "sine"
    osc.frequency.value = accent ? 880 : 660
    gain.gain.setValueAtTime(volume, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.start()
    osc.stop(this.ctx.currentTime + 0.05)
  }
}

export const audioEngine = new AudioEngine()
export type { AudioEngine }
