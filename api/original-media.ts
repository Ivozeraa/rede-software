import type { VercelRequest, VercelResponse } from '@vercel/node'

const WP_API = 'https://redesoftware.com.br/wp-json/wp/v2/media'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''

  if (!search) {
    return res.status(400).json({ error: 'Informe o termo de busca.' })
  }

  try {
    const url = new URL(WP_API)
    url.searchParams.set('search', search)
    url.searchParams.set('per_page', '12')
    url.searchParams.set('_fields', 'id,slug,source_url,alt_text,media_details')

    const response = await fetch(url)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Não foi possível consultar as mídias da Rede Software.' })
    }

    const media = await response.json()
    const items = Array.isArray(media)
      ? media.map((item) => ({
          id: item.id,
          slug: item.slug,
          alt: item.alt_text || 'Imagem da Rede Software',
          url:
            item.media_details?.sizes?.large?.source_url ||
            item.media_details?.sizes?.medium_large?.source_url ||
            item.source_url,
        }))
      : []

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800')
    return res.status(200).json({ items })
  } catch {
    return res.status(500).json({ error: 'Falha ao consultar o acervo de imagens.' })
  }
}
