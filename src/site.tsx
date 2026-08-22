import { useEffect, useMemo, useRef, useState, type ElementType, type ReactNode } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  CircleUserRound,
  CreditCard,
  FileCheck2,
  Headphones,
  Landmark,
  Menu,
  Monitor,
  Package,
  ReceiptText,
  ScanLine,
  Settings2,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'

type Media = { id: number; url: string; alt: string }
type Feature = { icon: ElementType; title: string; text: string }
type NavItem = { label: string; to: string }

const WHATSAPP = 'https://wa.me/558835312259'

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', to: '/' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Suporte', to: '/suporte' },
  { label: 'Empresa', to: '/empresa' },
  { label: 'Parceiros', to: '/parceiros' },
]

const SOLUTION_ITEMS: NavItem[] = [
  { label: 'SGCI', to: '/sgci' },
  { label: 'SISTRANS', to: '/sistrans' },
  { label: 'Certificação Digital', to: '/certificacao-digital' },
  { label: 'Suporte Técnico', to: '/suporte' },
]

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="Rede Software — Início">
      <span className={`grid size-10 place-items-center rounded-[13px] text-lg font-black transition duration-200 group-hover:-rotate-3 ${light ? 'bg-white text-[#101114]' : 'bg-[#101114] text-white'}`}>
        R
      </span>
      <span className={`font-display text-[15px] font-black tracking-[-.05em] ${light ? 'text-white' : 'text-[#101114]'}`}>
        REDE
        <span className={`block text-[9px] tracking-[.28em] ${light ? 'text-white/50' : 'text-neutral-400'}`}>SOFTWARE</span>
      </span>
    </Link>
  )
}

function isRouteActive(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

function Header() {
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const location = useLocation()
  const solutionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOpen(false)
    setSolutionsOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (solutionRef.current && !solutionRef.current.contains(event.target as Node)) setSolutionsOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSolutionsOpen(false)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-5 lg:px-8">
        <Logo />
        <nav aria-label="Navegação principal" className={`${open ? 'absolute left-4 right-4 top-[70px] flex' : 'hidden'} flex-col gap-1 rounded-3xl border border-black/6 bg-white/95 p-3 shadow-[0_25px_70px_rgba(16,17,20,.12)] lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          {NAV_ITEMS.slice(0, 1).map((item) => <Link key={item.to} to={item.to} aria-current={isRouteActive(location.pathname, item.to) ? 'page' : undefined} className="nav-link rounded-xl px-3 py-3 text-sm font-semibold text-neutral-600 hover:text-[#e3262e] lg:px-3 lg:py-2">{item.label}</Link>)}
          <div ref={solutionRef} className="relative">
            <button type="button" aria-expanded={solutionsOpen} aria-haspopup="menu" onClick={() => setSolutionsOpen((value) => !value)} className={`nav-link flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-semibold hover:text-[#e3262e] lg:w-auto lg:px-3 lg:py-2 ${location.pathname.startsWith('/sgci') || location.pathname.startsWith('/sistrans') || location.pathname.startsWith('/certificacao-digital') ? 'text-[#e3262e]' : 'text-neutral-600'}`}>
              Soluções <ChevronDown size={15} className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {solutionsOpen && <div role="menu" className="mt-1 grid gap-1 rounded-2xl border border-black/6 bg-white p-2 shadow-[0_25px_70px_rgba(16,17,20,.14)] lg:absolute lg:left-0 lg:top-12 lg:w-[360px]">
              <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-neutral-400">Soluções</div>
              {SOLUTION_ITEMS.map((item, index) => <Link key={item.to} role="menuitem" to={item.to} className="group rounded-xl p-3 transition hover:bg-red-50"><div className="flex items-center justify-between gap-4"><b className="text-sm">{item.label}</b><ArrowRight size={15} className="text-red-500 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" /></div><span className="mt-1 block text-sm leading-6 text-neutral-500">{index === 0 && 'Gestão comercial, PDV, estoque e financeiro.'}{index === 1 && 'Infrações, Talão Eletrônico e trânsito.'}{index === 2 && 'Assinatura e identidade digital com validade jurídica.'}{index === 3 && 'Instalação, treinamento, manutenção e atendimento.'}</span></Link>)}
            </div>}
          </div>
          {NAV_ITEMS.slice(1).map((item) => <Link key={item.to} to={item.to} aria-current={isRouteActive(location.pathname, item.to) ? 'page' : undefined} className="nav-link rounded-xl px-3 py-3 text-sm font-semibold text-neutral-600 hover:text-[#e3262e] lg:px-3 lg:py-2">{item.label}</Link>)}
          <Link to="/contato" className="brand-cta mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#e3262e] px-5 py-3 text-sm font-bold text-white lg:ml-2 lg:mt-0">Fale conosco <ArrowRight size={16} /></Link>
        </nav>
        <button type="button" className="grid size-11 place-items-center rounded-xl border border-black/7 bg-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  )
}

function Footer() {
  return <footer className="bg-[#101114] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-5 lg:px-8"><div className="lg:col-span-2"><Logo light /><p className="mt-6 max-w-md text-base leading-7 text-neutral-400">Tecnologia, gestão e suporte para empresas e órgãos públicos que precisam operar com mais eficiência, segurança e controle.</p><a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-base font-bold text-red-300 hover:text-white">Falar no WhatsApp <ArrowRight size={17} /></a></div><FooterColumn title="Soluções" links={[['SGCI', '/sgci'], ['SISTRANS', '/sistrans'], ['Certificação Digital', '/certificacao-digital'], ['Produtos', '/produtos']]} /><FooterColumn title="Empresa" links={[['Sobre a Rede', '/empresa'], ['Parceiros', '/parceiros'], ['Suporte', '/suporte'], ['Contato', '/contato']]} /><div><b className="text-xs uppercase tracking-[.16em] text-white/90">Canais</b><div className="mt-5 grid gap-3 text-base text-neutral-400"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a><a href="mailto:suporte@redesoftware.com.br" className="hover:text-white">E-mail</a><Link to="/contato" className="hover:text-white">Central de contato</Link></div></div></div><div className="border-t border-white/10 px-5 py-5 text-center text-sm text-neutral-500">© {new Date().getFullYear()} Rede Software. Todos os direitos reservados.</div></footer>
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return <div><b className="text-xs uppercase tracking-[.16em] text-white/90">{title}</b><div className="mt-5 grid gap-3 text-base text-neutral-400">{links.map(([label, to]) => <Link key={to} to={to} className="hover:text-white">{label}</Link>)}</div></div>
}

function OriginalMedia({ search, alt, className = '', fallback }: { search: string; alt: string; className?: string; fallback?: ReactNode }) {
  const [media, setMedia] = useState<Media | null>(null)
  useEffect(() => {
    let active = true
    fetch(`/api/original-media?search=${encodeURIComponent(search)}`).then((response) => response.ok ? response.json() : Promise.reject(new Error('media'))).then((data) => { if (active && data.items?.[0]?.url) setMedia(data.items[0]) }).catch(() => undefined)
    return () => { active = false }
  }, [search])
  if (!media) return <>{fallback ?? null}</>
  return <img src={media.url} alt={media.alt || alt} className={className} loading="lazy" />
}

function PageHero({ eyebrow, title, text, imageSearch, children }: { eyebrow: string; title: ReactNode; text: string; imageSearch?: string; children?: ReactNode }) {
  return <section className="relative overflow-hidden border-b border-black/5 bg-[linear-gradient(180deg,#fff,#fafafa)]"><div className="absolute -right-40 -top-32 size-[560px] rounded-full bg-red-100/70 blur-3xl" /><div className="absolute left-[-10%] top-48 size-[300px] rounded-full bg-red-50 blur-3xl" /><div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8 lg:py-28"><div><span className="text-xs font-black uppercase tracking-[.22em] text-[#e3262e]">{eyebrow}</span><h1 className="mt-5 max-w-3xl font-display text-5xl font-black leading-[.98] tracking-[-.06em] sm:text-6xl lg:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-500 sm:text-xl">{text}</p>{children}</div>{imageSearch ? <div className="relative"><div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(227,38,46,.14),rgba(227,38,46,0)_68%)] blur-2xl" /><div className="relative rounded-[32px] border border-black/8 bg-white p-3 shadow-[0_35px_100px_rgba(16,17,20,.12)]"><OriginalMedia search={imageSearch} alt={`${eyebrow} Rede Software`} className="max-h-[500px] w-full rounded-[24px] bg-neutral-100 object-cover" fallback={<FallbackVisual label={eyebrow} />} /></div></div> : null}</div></section>
}

function FallbackVisual({ label, dark = false }: { label: string; dark?: boolean }) {
  return <div className={`grid min-h-[360px] place-items-center rounded-[24px] p-8 text-center ${dark ? 'bg-white/5 text-white' : 'bg-[#101114] text-white'}`}><div><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-white/10 text-red-300"><Monitor size={28} /></span><p className="mt-5 font-display text-2xl font-black">{label}</p><p className="mt-2 max-w-md text-sm leading-6 text-white/55">Apresentação visual preparada para receber mídia original do acervo da Rede Software.</p></div></div>
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.2em] text-[#e3262e]">{eyebrow}</span><h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl">{title}</h2>{text ? <p className="mt-5 text-lg leading-8 text-neutral-500">{text}</p> : null}</div>
}

function InfoCard({ icon: Icon, title, text, dark = false }: Feature & { dark?: boolean }) {
  return <article className={`interactive-surface rounded-[28px] border p-7 ${dark ? 'border-white/10 bg-white/5 text-white' : 'border-black/7 bg-white'}`}><span className={`grid size-12 place-items-center rounded-2xl ${dark ? 'bg-white/10 text-red-300' : 'bg-red-50 text-[#e3262e]'}`}><Icon size={22} /></span><h3 className="mt-8 font-display text-2xl font-black tracking-tight">{title}</h3><p className={`mt-3 text-base leading-7 ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>{text}</p></article>
}

function PillButton({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return secondary ? <Link to={to} className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-4 text-base font-bold text-[#101114] transition hover:border-black/15 hover:bg-neutral-50">{children}</Link> : <Link to={to} className="brand-cta inline-flex items-center gap-2 rounded-xl bg-[#e3262e] px-5 py-4 text-base font-bold text-white">{children}</Link>
}

function HomePage() {
  const cards = [{ title: 'SGCI', eyebrow: 'GESTÃO COMERCIAL', text: 'Vendas, estoque, financeiro, fiscal e operação em um único ecossistema.', to: '/sgci', icon: BarChart3 }, { title: 'SISTRANS', eyebrow: 'GESTÃO DE TRÂNSITO', text: 'Infrações, Talão Eletrônico, processos, arrecadação e informações para a gestão pública.', to: '/sistrans', icon: Landmark }, { title: 'Certificação Digital', eyebrow: 'SEGURANÇA DIGITAL', text: 'Certificados para assinar documentos e realizar transações eletrônicas com validade jurídica.', to: '/certificacao-digital', icon: ShieldCheck }]
  return <main>
    <section className="hero-grid relative overflow-hidden"><div className="absolute -right-36 top-0 size-[620px] rounded-full bg-red-100/65 blur-3xl" /><div className="absolute left-[-18%] top-40 size-[360px] rounded-full bg-red-50 blur-3xl" /><div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-24"><div><span className="inline-flex rounded-full border border-red-100 bg-white px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-[#e3262e]">Tecnologia que move negócios</span><h1 className="mt-7 max-w-4xl font-display text-[clamp(3.4rem,6vw,6.6rem)] font-black leading-[.9] tracking-[-.075em]">Simplificando a <span className="text-[#e3262e]">gestão.</span><br />Conectando resultados.</h1><p className="mt-7 max-w-2xl text-xl leading-8 text-neutral-500">Desenvolvemos soluções inteligentes para empresas e órgãos públicos trabalharem com mais eficiência, segurança e controle.</p><div className="mt-9 flex flex-wrap gap-3"><PillButton to="/solucoes">Conheça nossas soluções <ArrowRight size={18} /></PillButton><PillButton to="/contato" secondary>Fale com um especialista</PillButton></div></div><div className="relative"><div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(227,38,46,.15),rgba(227,38,46,0)_65%)] blur-2xl" /><div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-white p-4 shadow-[0_45px_120px_rgba(16,17,20,.14)]"><OriginalMedia search="SGCI" alt="SGCI Rede Software" className="aspect-[16/10] w-full rounded-2xl object-cover" fallback={<DashboardHeroVisual />} /></div><div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-xl sm:block"><span className="text-xs font-black">Suporte humanizado</span><span className="mt-1 block text-sm text-neutral-500">Pessoas reais quando você precisa.</span></div></div></div></section>
    <section className="relative z-10 -mt-5 px-5"><div className="mx-auto grid max-w-5xl gap-2 rounded-[26px] border border-black/6 bg-white p-3 shadow-[0_24px_70px_rgba(16,17,20,.08)] sm:grid-cols-2 lg:grid-cols-4">{[[Users, 'Clientes atendidos', 'Relacionamento próximo e experiência acumulada.'], [Zap, 'Soluções tecnológicas', 'Software, serviços e equipamentos conectados.'], [Headphones, 'Suporte especializado', 'Atendimento próximo e orientado por contexto.'], [ShieldCheck, 'Operação segura', 'Tecnologia pensada para o dia a dia.']].map(([Icon, title, text]) => <div key={title as string} className="rounded-2xl p-4"><Icon className="text-[#e3262e]" size={21} /><b className="mt-3 block text-base">{title as string}</b><span className="mt-1 block text-sm leading-6 text-neutral-500">{text as string}</span></div>)}</div></section>
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="SOLUÇÕES" title="Uma solução para cada desafio." text="Tecnologia para fazer tudo funcionar melhor, sem separar software, serviço e suporte em experiências desconectadas." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{cards.map(({ title, eyebrow, text, to, icon: Icon }) => <Link to={to} key={title} className="interactive-card group rounded-[32px] border border-black/7 bg-white p-7"><div className="flex items-center justify-between"><span className="text-xs font-black tracking-[.16em] text-[#e3262e]">{eyebrow}</span><span className="grid size-11 place-items-center rounded-xl bg-red-50 text-[#e3262e]"><Icon size={21} /></span></div><div className="mt-7 overflow-hidden rounded-2xl bg-neutral-100"><OriginalMedia search={title} alt={title} className="aspect-[16/10] w-full object-cover" fallback={<FallbackVisual label={title} />} /></div><h3 className="mt-7 font-display text-3xl font-black">{title}</h3><p className="mt-3 text-lg leading-8 text-neutral-500">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-base font-black text-[#e3262e]">Conhecer solução <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span></Link>)}</div></section>
    <section className="bg-[#101114] text-white"><div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 lg:grid-cols-2 lg:px-8"><div><span className="text-xs font-black uppercase tracking-[.2em] text-red-300">TECNOLOGIA PARA QUEM FAZ ACONTECER</span><h2 className="mt-5 font-display text-5xl font-black tracking-[-.05em]">Sistemas robustos.<br /><span className="text-red-300">Experiências simples.</span></h2><p className="mt-6 max-w-xl text-lg leading-8 text-neutral-400">Criamos tecnologia para tornar processos complexos mais fáceis de controlar, com produtos que combinam profundidade operacional e uso intuitivo.</p></div><div className="grid gap-4 sm:grid-cols-2"><InfoCard icon={Settings2} title="Gestão" text="Centralize informações e processos em fluxos mais claros e organizados." dark /><InfoCard icon={Zap} title="Eficiência" text="Automatize tarefas, reduza retrabalho e dê mais agilidade à operação." dark /><InfoCard icon={ShieldCheck} title="Segurança" text="Proteja informações importantes com acesso controlado e rotinas confiáveis." dark /><InfoCard icon={Headphones} title="Suporte" text="Conte com pessoas preparadas para implantar, treinar e resolver." dark /></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><div className="grid items-center gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="EM AÇÃO" title="Software que você entende antes mesmo de usar." text="Veja como os produtos da Rede Software organizam informação, operação e decisão em experiências digitais claras." /><div className="mt-8 grid gap-3"><Link to="/sgci" className="flex items-center justify-between rounded-2xl border border-black/7 p-5 transition hover:border-red-100 hover:bg-red-50"><div><b className="text-base">SGCI</b><p className="mt-1 text-base text-neutral-500">Dashboard, vendas, estoque, financeiro e PDV.</p></div><ChevronRight className="text-[#e3262e]" /></Link><Link to="/sistrans" className="flex items-center justify-between rounded-2xl border border-black/7 p-5 transition hover:border-red-100 hover:bg-red-50"><div><b className="text-base">SISTRANS</b><p className="mt-1 text-base text-neutral-500">Infrações, Talão Eletrônico, financeiro e relatórios.</p></div><ChevronRight className="text-[#e3262e]" /></Link></div></div><div className="rounded-[34px] border border-black/8 bg-[#fafafa] p-4 shadow-sm"><OriginalMedia search="sistema" alt="Sistemas Rede Software" className="aspect-[16/11] w-full rounded-3xl object-cover" fallback={<FallbackVisual label="Produtos Rede Software" />} /></div></div></section>
    <section className="bg-red-50"><div className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="PRODUTOS" title="Tecnologia completa para o seu negócio." text="Além dos sistemas, a Rede Software oferece equipamentos e soluções para manter sua operação funcionando." /><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Computadores', 'Impressoras térmicas', 'Leitores de código', 'Módulos fiscais'].map((item) => <Link to="/produtos" key={item} className="interactive-card rounded-3xl border border-red-100 bg-white p-6"><span className="grid size-11 place-items-center rounded-xl bg-red-50 text-[#e3262e]"><Package size={20} /></span><b className="mt-7 block text-lg">{item}</b><p className="mt-2 text-base leading-7 text-neutral-500">Equipamentos selecionados para apoiar a rotina do seu negócio.</p></Link>)}</div><Link to="/produtos" className="mt-8 inline-flex items-center gap-2 text-base font-black text-[#e3262e]">Ver catálogo completo <ArrowRight size={17} /></Link></div></section>
    <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><OriginalMedia search="equipe" alt="Equipe Rede Software" className="aspect-[4/3] w-full rounded-[32px] object-cover" fallback={<FallbackVisual label="Equipe Rede Software" />} /><div><SectionHeading eyebrow="SUPORTE HUMANIZADO" title="Tecnologia é importante. Ter alguém para ajudar também." text="Quando você precisa de ajuda, fala com pessoas preparadas para entender e resolver. A Rede Software destaca o atendimento humano como parte da experiência do produto." /><div className="mt-8 grid gap-3"><div className="flex gap-3 rounded-2xl border border-black/7 p-4"><Headphones className="mt-1 text-[#e3262e]" size={20} /><div><b className="text-base">Atendimento próximo</b><p className="mt-1 text-base leading-7 text-neutral-500">Suporte para orientar o uso, implantação e resolução de problemas.</p></div></div><div className="flex gap-3 rounded-2xl border border-black/7 p-4"><Check className="mt-1 text-[#e3262e]" size={20} /><div><b className="text-base">Treinamento e orientação</b><p className="mt-1 text-base leading-7 text-neutral-500">Ajuda para que a equipe aproveite melhor os recursos disponíveis.</p></div></div></div><PillButton to="/suporte">Conhecer o suporte <ArrowRight size={17} /></PillButton></div></div></section>
    <section className="px-5 pb-24"><div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[linear-gradient(120deg,#ad1720,#e3262e_55%,#ff5a60)] px-7 py-16 text-white shadow-[0_35px_100px_rgba(227,38,46,.2)] sm:px-12"><span className="text-xs font-black uppercase tracking-[.2em] text-white/70">FALE COM A REDE SOFTWARE</span><h2 className="mt-5 max-w-3xl font-display text-4xl font-black tracking-[-.05em] sm:text-5xl">Vamos encontrar a tecnologia certa para o seu negócio.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">Converse com nossa equipe e descubra qual solução faz mais sentido para sua operação.</p><PillButton to="/contato">Falar com um especialista <ArrowRight size={17} /></PillButton></div></section>
  </main>
}

function DashboardHeroVisual() {
  const data = [['Vendas', 'R$ 42.580'], ['Estoque', '1.842'], ['Financeiro', 'R$ 18.430']]
  return <div className="aspect-[16/10] rounded-2xl bg-[#101114] p-7 text-white"><div className="flex items-center justify-between text-sm text-neutral-400"><span>Rede Software · Plataforma</span><span className="text-red-300">online</span></div><div className="mt-10 grid grid-cols-3 gap-3">{data.map(([a, b]) => <div key={a} className="rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs text-neutral-400">{a}</span><b className="mt-2 block font-display text-lg">{b}</b></div>)}</div><div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5"><div className="h-32 rounded-xl bg-[linear-gradient(135deg,rgba(227,38,46,.35),rgba(227,38,46,.05))]" /></div></div>
}

function SolutionsPage() {
  const items = [['SGCI', 'Gestão Empresarial', 'Integra operações de retaguarda e frente de caixa, com estoque, financeiro, fiscal, produtos e relatórios.', '/sgci', BarChart3], ['SISTRANS', 'Gestão Pública', 'Centraliza infrações, processos, Talão Eletrônico, arrecadação, relatórios e integrações de trânsito.', '/sistrans', Landmark], ['Certificação Digital', 'Segurança Digital', 'Permite assinar documentos e realizar transações eletrônicas com validade jurídica e proteção.', '/certificacao-digital', ShieldCheck]] as const
  return <><PageHero eyebrow="SOLUÇÕES" title={<>Soluções que acompanham o seu <span className="text-[#e3262e]">crescimento.</span></>} text="Um ecossistema de tecnologia para diferentes desafios de gestão, operação, segurança digital e atendimento." /><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><div className="grid gap-5 lg:grid-cols-3">{items.map(([name, category, text, to, Icon]) => <Link to={to} key={name} className="interactive-card rounded-[32px] border border-black/7 p-7"><span className="text-xs font-black uppercase tracking-[.16em] text-[#e3262e]">{category}</span><span className="mt-7 grid size-14 place-items-center rounded-2xl bg-red-50 text-[#e3262e]"><Icon size={25} /></span><h2 className="mt-8 font-display text-3xl font-black">{name}</h2><p className="mt-4 text-lg leading-8 text-neutral-500">{text}</p><span className="mt-7 inline-flex items-center gap-2 text-base font-black text-[#e3262e]">Conhecer <ArrowRight size={17} /></span></Link>)}</div></section></>
}

function ProductLanding({ kind }: { kind: 'sgci' | 'sistrans' }) {
  const sgci = kind === 'sgci'
  const featureData: Feature[] = sgci ? [{ icon: BarChart3, title: 'Retaguarda', text: 'Controle de estoque, financeiro, NF-e, SPED Fiscal, relatórios detalhados e informações centralizadas.' }, { icon: ShoppingCart, title: 'Frente de Caixa', text: 'PDV integrado ao servidor, com suporte a operações fiscais e acompanhamento de estoque e contas a receber.' }, { icon: CreditCard, title: 'Financeiro', text: 'Ajuste de preços, margens, descontos, multas, juros, parcelas e movimentações financeiras em um fluxo único.' }, { icon: Package, title: 'Produtos e Estoque', text: 'Cadastro, composições, inventários, movimentações e relatórios para acompanhar produtos e serviços.' }, { icon: ReceiptText, title: 'Relatórios', text: 'SPED, Sintegra, entradas, saídas, fluxo de caixa, comissões, contas a pagar e receber e indicadores gerenciais.' }, { icon: ShieldCheck, title: 'Segurança', text: 'Armazenamento em ambiente seguro e acesso online para reduzir riscos de perda de dados e melhorar acessibilidade.' }] : [{ icon: FileCheck2, title: 'Gestão de Infrações', text: 'Acompanhe AITs, agentes, notificações, recursos, JARI e consultas detalhadas em um fluxo centralizado.' }, { icon: Smartphone, title: 'Talão Eletrônico', text: 'Registre AITs em campo, inclusive em operação offline, com sincronização e recursos móveis.' }, { icon: CircleDollarSign, title: 'Controle Financeiro', text: 'Organize arrecadações, repasses, restituições e baixas de pagamentos.' }, { icon: BarChart3, title: 'Relatórios Gerenciais', text: 'Transforme os dados da operação em indicadores para acompanhamento e decisão.' }, { icon: Landmark, title: 'Integrações', text: 'Conecte DEMUTRAN e DETRAN e acompanhe as etapas do processo de autuação e pagamento.' }, { icon: ShieldCheck, title: 'Segurança e Permissões', text: 'Controle usuários, senhas, níveis de acesso e registros de operação.' }]
  return <><PageHero eyebrow={sgci ? 'SGCI · GESTÃO COMERCIAL' : 'SISTRANS · GESTÃO DE TRÂNSITO'} title={sgci ? <>Controle seu negócio. <span className="text-[#e3262e]">Simplifique sua gestão.</span></> : <>Gestão inteligente de <span className="text-[#e3262e]">infrações de trânsito.</span></>} text={sgci ? 'O SGCI simplifica a gestão empresarial integrando e automatizando processos para maior eficiência e controle.' : 'O SISTRANS gerencia infrações de trânsito e integra o DEMUTRAN com o DETRAN, apoiando autuação, processos e controle financeiro.'} imageSearch={sgci ? 'SGCI' : 'SISTRANS'}><div className="mt-8 flex flex-wrap gap-3"><PillButton to="/contato">Solicitar demonstração <ArrowRight size={17} /></PillButton><a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-4 text-base font-bold">Falar no WhatsApp</a></div></PageHero><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="POR QUE USAR" title={sgci ? 'Uma gestão completa, do caixa ao relatório.' : 'Uma operação pública mais organizada, do registro ao resultado.'} text={sgci ? 'As áreas descritas pela Rede Software mostram um sistema integrado entre retaguarda e frente de caixa, pensado para acompanhar o dia a dia do negócio.' : 'O SISTRANS concentra os fluxos essenciais da gestão de infrações em uma experiência digital, incluindo Talão Eletrônico, processos, relatórios e integração entre órgãos.'} /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{featureData.map((feature) => <InfoCard key={feature.title} {...feature} />)}</div></section><section className="bg-[#101114] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 lg:grid-cols-2 lg:px-8"><div><span className="text-xs font-black uppercase tracking-[.2em] text-red-300">EXPERIÊNCIA DE PRODUTO</span><h2 className="mt-5 font-display text-4xl font-black tracking-[-.05em] sm:text-5xl">Produto no centro. Informação em primeiro plano.</h2><p className="mt-6 text-lg leading-8 text-neutral-400">Apresentamos as funcionalidades em telas e fluxos que ajudam o visitante a entender o que a solução entrega antes mesmo de conversar com a equipe comercial.</p></div><div className="rounded-[30px] border border-white/10 bg-white/5 p-4"><OriginalMedia search={sgci ? 'sistema' : 'sistrans'} alt={sgci ? 'SGCI em ação' : 'SISTRANS em ação'} className="aspect-[16/10] w-full rounded-2xl object-cover" fallback={<FallbackVisual label={sgci ? 'SGCI em ação' : 'SISTRANS em ação'} dark />} /></div></div></section><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="PRÓXIMO PASSO" title={sgci ? 'Conheça o SGCI no seu contexto.' : 'Veja como o SISTRANS pode apoiar sua gestão.'} text="Converse com a equipe da Rede Software para entender implantação, treinamento, recursos e adequação à realidade da sua operação." /><PillButton to="/contato">Falar com especialista <ArrowRight size={17} /></PillButton></section></>
}

function CertificationPage() {
  const faqs = ['Qual a diferença entre A1 e A3?', 'Qual certificado faz mais sentido para minha operação?', 'Como funciona a renovação?', 'A Rede Software oferece orientação durante a contratação?']
  return <><PageHero eyebrow="CERTIFICAÇÃO DIGITAL" title={<>Segurança digital para <span className="text-[#e3262e]">assinar, acessar e crescer.</span></>} text="Com um Certificado Digital, você assina documentos e realiza transações eletrônicas com validade jurídica e proteção." imageSearch="certificacao"><div className="mt-8"><PillButton to="/contato">Solicitar certificado <ArrowRight size={17} /></PillButton></div></PageHero><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="OPÇÕES" title="Certificados para diferentes necessidades." text="A certificação digital é apresentada como uma camada de segurança e confiabilidade para operações eletrônicas." /><div className="mt-12 grid gap-5 md:grid-cols-2"><InfoCard icon={ShieldCheck} title="A1" text="Certificado digital com uso orientado por arquivo e adequado a diferentes rotinas digitais e integrações." /><InfoCard icon={BadgeCheck} title="A3" text="Certificado disponibilizado em mídia apropriada para uso com autenticação e assinatura digital." /></div></section><section className="bg-red-50"><div className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="PERGUNTAS FREQUENTES" title="Antes de contratar, entenda o essencial." /><div className="mt-10 grid gap-3">{faqs.map((faq) => <div key={faq} className="rounded-2xl border border-red-100 bg-white p-5"><div className="flex items-center justify-between gap-5"><span className="text-lg font-bold">{faq}</span><CircleHelp className="shrink-0 text-[#e3262e]" size={20} /></div><p className="mt-3 text-base leading-7 text-neutral-500">Nossa equipe comercial pode orientar a escolha, explicar os requisitos e conduzir o processo de contratação ou renovação.</p></div>)}</div></div></section></>
}

function ProductsPage() {
  const products = ['Computadores', 'Monitores', 'Impressoras térmicas', 'Leitores de código de barras', 'Módulos fiscais', 'SSDs', 'Teclados e mouses', 'Periféricos']
  return <><PageHero eyebrow="PRODUTOS" title={<>Tecnologia completa para <span className="text-[#e3262e]">manter sua operação funcionando.</span></>} text="A Rede Software também oferece equipamentos e soluções para empresas e varejo, complementando o ecossistema de software com estrutura física." imageSearch="produto" /><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><SectionHeading eyebrow="CATÁLOGO" title="Uma vitrine tecnológica, não uma lista de peças." text="Escolha a categoria que faz sentido para a sua operação e fale com a equipe para verificar disponibilidade e especificações." /><PillButton to="/contato">Consultar produto <ArrowRight size={17} /></PillButton></div><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <article key={product} className="interactive-card rounded-3xl border border-black/7 bg-white p-5"><div className="overflow-hidden rounded-2xl bg-neutral-100"><OriginalMedia search={product} alt={product} className="aspect-[4/3] w-full object-cover" fallback={<div className="grid aspect-[4/3] place-items-center bg-[#fafafa]"><Package className="text-[#e3262e]" size={34} /></div>} /></div><h3 className="mt-5 text-xl font-black">{product}</h3><p className="mt-2 text-base leading-7 text-neutral-500">Equipamento para compor uma operação mais confiável e integrada.</p><Link to="/contato" className="mt-5 inline-flex items-center gap-2 text-base font-black text-[#e3262e]">Consultar <ArrowRight size={16} /></Link></article>)}</div></section></>
}

function SupportPage() {
  return <><PageHero eyebrow="SUPORTE HUMANIZADO" title={<>Tecnologia é importante. <span className="text-[#e3262e]">Ter alguém para ajudar também.</span></>} text="Quando você precisa de ajuda, fala com pessoas preparadas para entender e resolver. O suporte humanizado é um dos destaques institucionais da Rede Software." imageSearch="suporte"><div className="mt-8 flex flex-wrap gap-3"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="brand-cta inline-flex items-center gap-2 rounded-xl bg-[#e3262e] px-5 py-4 text-base font-bold text-white">Falar com suporte <ArrowRight size={17} /></a><PillButton to="/contato" secondary>Outras formas de contato</PillButton></div></PageHero><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="COMO AJUDAMOS" title="Atendimento que acompanha o uso da tecnologia." text="O suporte pode envolver orientação, treinamento, instalação, configuração e resolução de problemas ao longo da jornada." /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"><InfoCard icon={Headphones} title="Atendimento" text="Um canal para entender a necessidade e orientar a resolução com clareza." /><InfoCard icon={Settings2} title="Instalação e configuração" text="Apoio para colocar equipamentos e sistemas em funcionamento de forma organizada." /><InfoCard icon={Users} title="Treinamento" text="Orientação para que sua equipe utilize melhor os recursos disponíveis." /></div></section><section className="bg-[#101114] text-white"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><span className="text-xs font-black uppercase tracking-[.2em] text-red-300">HORÁRIOS E CANAIS</span><h2 className="mt-5 font-display text-4xl font-black tracking-tight">Fale com a Rede Software.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-400">O site institucional informa atendimento por e-mail em suporte@redesoftware.com.br e também por WhatsApp. O horário publicado é das 07:30 às 18:00 de segunda a quinta, até 17:00 na sexta e das 08:00 às 12:00 aos sábados.</p><div className="mt-8 flex flex-wrap gap-3"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-4 text-base font-black text-[#101114]">Abrir WhatsApp <ArrowRight size={17} /></a><a href="mailto:suporte@redesoftware.com.br" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-4 text-base font-bold text-white">Enviar e-mail <ArrowRight size={17} /></a></div></div></section></>
}

function CompanyPage() {
  return <><PageHero eyebrow="QUEM SOMOS" title={<>Pessoas por trás da <span className="text-[#e3262e]">tecnologia.</span></>} text="A Rede Software reúne desenvolvimento, análise, suporte, comercial e operações para criar, implantar e sustentar suas soluções." imageSearch="equipe"><div className="mt-8"><PillButton to="/contato">Conhecer a Rede Software <ArrowRight size={17} /></PillButton></div></PageHero><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionHeading eyebrow="ESTRUTURA" title="Uma equipe organizada em torno do cliente." text="A operação combina relacionamento, tecnologia e atendimento em uma estrutura voltada ao uso real dos produtos." /><div className="mt-12 grid gap-4 md:grid-cols-3"><InfoCard icon={Users} title="Comercial, Financeiro e Marketing" text="Relacionamento, atendimento comercial e apoio às rotinas administrativas que sustentam a operação." /><InfoCard icon={Headphones} title="Suporte" text="Atendimento técnico e acompanhamento das necessidades dos clientes após a contratação." /><InfoCard icon={Monitor} title="Análise e Desenvolvimento" text="Criação, evolução e manutenção das soluções tecnológicas que formam o portfólio da empresa." /></div></section><section className="bg-red-50"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 lg:grid-cols-2 lg:px-8"><div><span className="text-xs font-black uppercase tracking-[.2em] text-[#e3262e]">NOSSA PROPOSTA</span><h2 className="mt-5 font-display text-4xl font-black tracking-tight">Tecnologia que funciona no mundo real.</h2></div><div className="text-lg leading-8 text-neutral-600"><p>A experiência institucional da Rede Software destaca simplicidade de uso, atualização constante, segurança, eficiência operacional e suporte humanizado.</p><Link to="/solucoes" className="mt-7 inline-flex items-center gap-2 font-black text-[#e3262e]">Ver soluções <ArrowRight size={17} /></Link></div></div></section></>
}

function PartnersPage() {
  return <><PageHero eyebrow="PARCEIROS E REVENDEDORES" title={<>Cresça junto com a <span className="text-[#e3262e]">Rede Software.</span></>} text="Uma página dedicada para apresentar o caminho de empresas e profissionais que desejam ampliar oportunidades em tecnologia." imageSearch="parceiro"><div className="mt-8"><PillButton to="/contato">Quero ser parceiro <ArrowRight size={17} /></PillButton></div></PageHero><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><div className="grid gap-5 lg:grid-cols-2"><InfoCard icon={Building2} title="Quero ser parceiro" text="Para empresas e profissionais que querem oferecer soluções de tecnologia a novos clientes e ampliar sua atuação comercial." /><InfoCard icon={CircleUserRound} title="Já sou parceiro" text="Um caminho dedicado para acessar informações, suporte e contato com a equipe responsável pelo relacionamento com revendas." /></div><div className="mt-12 rounded-[32px] bg-[#101114] p-8 text-white md:p-12"><span className="text-xs font-black uppercase tracking-[.2em] text-red-300">ECOSSISTEMA</span><h2 className="mt-4 max-w-2xl font-display text-4xl font-black tracking-tight">Uma rede conectada por soluções.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">A página de parceiros está preparada para receber regras, benefícios, onboarding e área autenticada conforme a estratégia comercial da Rede Software.</p><PillButton to="/contato">Falar com comercial <ArrowRight size={17} /></PillButton></div></section></>
}

function ContactPage() {
  const channels = [{ icon: Headphones, title: 'Suporte', text: 'Para clientes que precisam de orientação, atendimento e resolução de problemas.' }, { icon: Zap, title: 'Comercial', text: 'Para conhecer soluções, solicitar demonstração e avaliar o que faz sentido para sua operação.' }, { icon: Package, title: 'Produtos', text: 'Para consultar equipamentos, disponibilidade e soluções para varejo.' }]
  return <><PageHero eyebrow="CONTATO" title={<>Vamos conversar sobre a <span className="text-[#e3262e]">tecnologia certa.</span></>} text="Fale com a Rede Software para solicitar demonstração, orçamento, suporte ou informações sobre produtos e serviços." /><section className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><div className="grid gap-4 md:grid-cols-3">{channels.map((channel) => <InfoCard key={channel.title} {...channel} />)}</div><div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><div className="rounded-[32px] border border-black/7 bg-white p-8"><span className="text-xs font-black uppercase tracking-[.18em] text-[#e3262e]">FALE COM A GENTE</span><h2 className="mt-4 font-display text-3xl font-black">Atendimento pelo canal que funciona melhor para você.</h2><p className="mt-4 text-lg leading-8 text-neutral-500">Use o WhatsApp ou e-mail para iniciar uma conversa direta com a equipe.</p><div className="mt-7 flex flex-wrap gap-3"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="brand-cta inline-flex items-center gap-2 rounded-xl bg-[#e3262e] px-5 py-4 text-base font-bold text-white">Abrir WhatsApp <ArrowRight size={17} /></a><a href="mailto:suporte@redesoftware.com.br" className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-4 text-base font-bold">Enviar e-mail <ArrowRight size={17} /></a></div></div><div className="rounded-[32px] bg-[#fafafa] p-8"><span className="text-xs font-black uppercase tracking-[.18em] text-[#e3262e]">HORÁRIO PUBLICADO</span><p className="mt-4 text-lg leading-8 text-neutral-600">Segunda a quinta: 07:30–18:00<br />Sexta: até 17:00<br />Sábado: 08:00–12:00</p><p className="mt-6 text-base leading-7 text-neutral-500">Esses horários são os publicados atualmente no site institucional e podem ser atualizados pela empresa.</p></div></div></section></>
}

function Site() {
  const location = useLocation()
  const pageTitle = useMemo(() => {
    const titles: Record<string, string> = { '/': 'Rede Software', '/solucoes': 'Soluções | Rede Software', '/sgci': 'SGCI | Rede Software', '/sistrans': 'SISTRANS | Rede Software', '/certificacao-digital': 'Certificação Digital | Rede Software', '/produtos': 'Produtos | Rede Software', '/suporte': 'Suporte | Rede Software', '/empresa': 'Empresa | Rede Software', '/parceiros': 'Parceiros | Rede Software', '/contato': 'Contato | Rede Software' }
    return titles[location.pathname] ?? 'Rede Software'
  }, [location.pathname])

  useEffect(() => {
    document.title = pageTitle
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pageTitle])

  return <><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/solucoes" element={<SolutionsPage />} /><Route path="/sgci" element={<ProductLanding kind="sgci" />} /><Route path="/sistrans" element={<ProductLanding kind="sistrans" />} /><Route path="/certificacao-digital" element={<CertificationPage />} /><Route path="/produtos" element={<ProductsPage />} /><Route path="/suporte" element={<SupportPage />} /><Route path="/empresa" element={<CompanyPage />} /><Route path="/parceiros" element={<PartnersPage />} /><Route path="/contato" element={<ContactPage />} /></Routes><Footer /></>
}

export default function AppSite() {
  return <BrowserRouter><Site /></BrowserRouter>
}
