import { useEffect, useState } from 'react'

type Props = {
  search: string
  alt: string
  className?: string
  fallbackClassName?: string
}

export function OriginalImage({ search, alt, className = '', fallbackClassName = '' }: Props) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/original-media?search=${encodeURIComponent(search)}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => setUrl(data.items?.[0]?.url ?? null))
      .catch(() => undefined)
    return () => controller.abort()
  }, [search])

  if (!url) return <div aria-hidden className={`bg-gradient-to-br from-red-50 via-white to-neutral-100 ${fallbackClassName || className}`} />

  return <img src={url} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
}
