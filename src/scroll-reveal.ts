const REVEAL_SELECTOR = 'main > section, main .interactive-card, main .interactive-surface'
const REVEAL_CLASS = 'scroll-reveal'
const VISIBLE_CLASS = 'is-visible'

let frame = 0
let mutationFrame = 0

function collectElements() {
  return Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
}

function prepareElements() {
  collectElements().forEach((element, index) => {
    if (!element.classList.contains(REVEAL_CLASS)) {
      element.classList.add(REVEAL_CLASS)
      element.style.setProperty('--reveal-delay', `${Math.min(index * 35, 210)}ms`)
    }
  })
}

function updateVisibility() {
  frame = 0
  const triggerLine = window.innerHeight * 0.88

  collectElements().forEach((element) => {
    if (element.classList.contains(VISIBLE_CLASS)) return

    const rect = element.getBoundingClientRect()
    if (rect.top <= triggerLine && rect.bottom >= 0) {
      element.classList.add(VISIBLE_CLASS)
    }
  })
}

function requestVisibilityUpdate() {
  if (frame) return
  frame = requestAnimationFrame(updateVisibility)
}

function refreshAfterMutation() {
  if (mutationFrame) return
  mutationFrame = requestAnimationFrame(() => {
    mutationFrame = 0
    prepareElements()
    requestVisibilityUpdate()
  })
}

function start() {
  prepareElements()
  requestVisibilityUpdate()

  window.addEventListener('scroll', requestVisibilityUpdate, { passive: true })
  window.addEventListener('resize', requestVisibilityUpdate, { passive: true })

  const observer = new MutationObserver(refreshAfterMutation)
  observer.observe(document.body, { childList: true, subtree: true })

  window.addEventListener('beforeunload', () => {
    observer.disconnect()
    window.removeEventListener('scroll', requestVisibilityUpdate)
    window.removeEventListener('resize', requestVisibilityUpdate)
  }, { once: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true })
} else {
  start()
}

export {}
