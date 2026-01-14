import confetti from 'canvas-confetti'

// Trans flag colors
const TRANS_BLUE = '#5BCEFA'
const TRANS_PINK = '#F5A9B8'
const TRANS_WHITE = '#FFFFFF'

/**
 * Trigger a confetti celebration using trans flag colors
 * Creates a high-contrast celebration moment against the minimal black/white design
 */
export const celebrate = () => {
  const duration = 2000
  const end = Date.now() + duration

  const colors = [TRANS_BLUE, TRANS_PINK, TRANS_WHITE]

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}

/**
 * Trigger confetti from a specific point (e.g., button click)
 */
export const celebrateFromPoint = (x, y) => {
  const colors = [TRANS_BLUE, TRANS_PINK, TRANS_WHITE]
  
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: colors
  })
}
