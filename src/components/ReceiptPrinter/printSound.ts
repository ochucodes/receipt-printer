let ctx: AudioContext | undefined
let noise: AudioBuffer | undefined

function noiseBuffer(ctx: AudioContext) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

// Thermal-printer chatter: band-passed noise chopped by a stepping-motor rhythm, over a low motor hum.
export function playPrintSound(duration: number) {
  ctx ??= new AudioContext()
  noise ??= noiseBuffer(ctx)
  void ctx.resume()

  const t0 = ctx.currentTime
  const end = t0 + duration
  const volume = 0.25

  const out = ctx.createGain()
  out.gain.setValueAtTime(0, t0)
  out.gain.linearRampToValueAtTime(volume, t0 + 0.05)
  out.gain.setValueAtTime(volume, Math.max(t0 + 0.05, end - 0.25))
  out.gain.linearRampToValueAtTime(0, end)
  out.connect(ctx.destination)

  const chatter = ctx.createBufferSource()
  chatter.buffer = noise
  chatter.loop = true
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 3200
  band.Q.value = 0.9
  const chop = ctx.createGain()
  chop.gain.value = 0.5
  const step = ctx.createOscillator()
  step.type = 'square'
  step.frequency.value = 38
  const stepDepth = ctx.createGain()
  stepDepth.gain.value = 0.5
  step.connect(stepDepth).connect(chop.gain)
  chatter.connect(band).connect(chop).connect(out)

  const hum = ctx.createOscillator()
  hum.type = 'sawtooth'
  hum.frequency.value = 110
  const humFilter = ctx.createBiquadFilter()
  humFilter.type = 'lowpass'
  humFilter.frequency.value = 400
  const humGain = ctx.createGain()
  humGain.gain.value = 0.15
  hum.connect(humFilter).connect(humGain).connect(out)

  const sources = [chatter, step, hum]
  for (const source of sources) {
    source.start(t0)
    source.stop(end)
  }

  return () => {
    const now = ctx!.currentTime
    if (now >= end) return
    out.gain.cancelScheduledValues(now)
    out.gain.setTargetAtTime(0, now, 0.03)
    for (const source of sources) source.stop(now + 0.15)
  }
}
