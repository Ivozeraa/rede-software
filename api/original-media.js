const LOCAL_IMAGES = {
  sgci: '/images/sgci.jpg',
  sistrans: '/images/sistrans.jpg',
  'certificação digital': '/images/certificacao-digital.jpg',
  certificacao: '/images/certificacao-digital.jpg',
  equipe: '/images/equipe.jpg',
  suporte: '/images/suporte.jpg',
  empresa: '/images/empresa.jpg',
  produto: '/images/produtos.jpg',
  produtos: '/images/produtos.jpg',
  parceiro: '/images/parceiros.jpg',
  parceiros: '/images/parceiros.jpg',
  sistema: '/images/sgci-dashboard.jpg',
}

const LOCAL_ALT = {
  sgci: 'SGCI - Rede Software',
  sistrans: 'SISTRANS - Rede Software',
  'certificação digital': 'Certificação Digital - Rede Software',
  certificacao: 'Certificação Digital - Rede Software',
  equipe: 'Equipe Rede Software',
  suporte: 'Suporte Rede Software',
  empresa: 'Rede Software',
  produto: 'Produtos Rede Software',
  produtos: 'Produtos Rede Software',
  parceiro: 'Parceiros Rede Software',
  parceiros: 'Parceiros Rede Software',
  sistema: 'Sistema Rede Software',
}

export default async function handler(req, res) {
  const search = typeof req.query?.search === 'string' ? req.query.search.trim().toLowerCase() : ''
  const localKey = Object.keys(LOCAL_IMAGES).find((key) => search.includes(key))

  // Prioridade: imagens locais cadastradas no projeto.
  if (localKey) {
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    return res.status(200).json({
      items: [{
        id: `local-${localKey}`,
        title: localKey,
        alt: LOCAL_ALT[localKey] || 'Imagem Rede Software',
        url: LOCAL_IMAGES[localKey],
      }],
    })
  }

  // Fallback para o acervo original, útil enquanto novos mapeamentos locais são adicionados.
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
