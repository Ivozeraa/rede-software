const REVEAL_SELECTOR = 'main > section, main .interactive-card, main .interactive-surface'
const REVEAL_CLASS = 'scroll-reveal'
const VISIBLE_CLASS = 'is-visible'

function revealElement(element: Element, index: number) {
  if (!(element instanceof HTMLElement)) return
  if (element.classList.contains(REVEAL_CLASS)) return
  element.classList.add(REVEAL_CLASS)
  element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 240)}ms`)
}

function observeRevealElements() {
  const elements = Array.from(document.querySelectorAll(REVEAL_SELECTOR))
  elements.forEach((element, index) => revealElement(element, index))

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add(VISIBLE_CLASS)
      observer.unobserve(entry.target)
    })
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px',
  })

  document.querySelectorAll(`.${REVEAL_CLASS}:not(.${VISIBLE_CLASS})`).forEach((element) => revealObserver.observe(element))
  return () => revealObserver.disconnect()
}

let cleanup: (() => void) | undefined
let frame = 0

function refresh() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    cleanup?.()
    cleanup = observeRevealElements()
  })
}

const mutationObserver = new MutationObserver(refresh)

function start() {
  refresh()
  mutationObserver.observe(document.body, { childList: true, subtree: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true })
} else {
  start()
}

export {}
