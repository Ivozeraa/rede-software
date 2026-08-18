export default async function handler(req, res) {
  const search = typeof req.query?.search === 'string' ? req.query.search : ''
  const params = new URLSearchParams({ per_page: '20', media_type: 'image' })
  if (search) params.set('search', search)

  try {
    const response = await fetch(`https://redesoftware.com.br/wp-json/wp/v2/media?${params}`)
    if (!response.ok) return res.status(response.status).json({ items: [] })
    const media = await response.json()
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({
      items: media.map((item) => ({
        id: item.id,
        title: item.title?.rendered || '',
        alt: item.alt_text || '',
        url: item.source_url,
      })),
    })
  } catch {
    return res.status(502).json({ items: [] })
  }
}
