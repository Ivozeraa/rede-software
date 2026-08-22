import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Site from './site'
import './scroll-reveal'
import './index.css'
import { equipeImage, suporteImage } from './local-images'

const nativeFetch = window.fetch.bind(window)
const localMedia = {
  equipe: { id: 1, url: equipeImage, alt: 'Equipe Rede Software' },
  empresa: { id: 1, url: equipeImage, alt: 'Equipe Rede Software' },
  parceiro: { id: 1, url: equipeImage, alt: 'Equipe Rede Software' },
  suporte: { id: 2, url: suporteImage, alt: 'Atendimento da Rede Software' },
}

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

  if (url.startsWith('/api/original-media')) {
    const search = new URL(url, window.location.origin).searchParams.get('search')?.trim().toLowerCase() ?? ''
    const match = Object.entries(localMedia).find(([key]) => search.includes(key))?.[1]

    return new Response(JSON.stringify({ items: match ? [match] : [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return nativeFetch(input, init)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
)
