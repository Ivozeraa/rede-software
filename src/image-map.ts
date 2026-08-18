/**
 * Mapa central de imagens locais.
 *
 * Basta colocar os arquivos em `public/images/` e alterar os caminhos abaixo.
 * Não é necessário importar imagens com Vite: tudo é servido diretamente
 * pela pasta `public`.
 */

export const IMAGE_MAP = {
  logo: '/images/logo-rede.png',
  logoWhite: '/images/logo-rede-white.png',

  home: {
    hero: '/images/hero-home.jpg',
  },

  sgci: {
    hero: '/images/sgci.jpg',
    dashboard: '/images/sgci-dashboard.jpg',
  },

  sistrans: {
    hero: '/images/sistrans.jpg',
    dashboard: '/images/sistrans-dashboard.jpg',
  },

  certificacaoDigital: '/images/certificacao-digital.jpg',
  equipe: '/images/equipe.jpg',
  suporte: '/images/suporte.jpg',
  empresa: '/images/empresa.jpg',
  produtos: '/images/produtos.jpg',
  parceiros: '/images/parceiros.jpg',
} as const

export type ImageMap = typeof IMAGE_MAP
