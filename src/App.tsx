import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  Gauge,
  Headphones,
  Landmark,
  Menu,
  Network,
  Package,
  Play,
  ScanLine,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react'

type Media = { id: number; url: string; alt: string }

const navItems = [
  ['Início', '/'],
  ['SISTRANS', '/sistrans'],
  ['Funcionalidades', '/sistrans#funcionalidades'],
  ['Integrações', '/sistrans#integracoes'],
  ['Empresa', '/empresa'],
  ['Contato', '/contato'],
]

const officialFeatures = [
  { icon: FileCheck2, title: 'Gestão de Infrações', text: 'Cadastro de agentes, AITs, JARI, acidentes, notificações, recursos e consultas detalhadas.' },
  { icon: Smartphone, title: 'Talão Eletrônico', text: 'Preenchimento de AITs em campo, registro de imagens, impressão e sincronização automática.' },
  { icon: BarChart3, title: 'Relatórios Gerenciais', text: 'Indicadores de infrações, acidentes, arrecadações, repasses e lotes enviados.' },
  { icon: CircleDollarSign, title: 'Controle Financeiro', text: 'Arrecadações, repasses, restituições e baixas de pagamentos organizados em um só fluxo.' },
  { icon: Network, title: 'Integração DEMUTRAN ↔ DETRAN', text: 'Acompanhamento das etapas de autuação, defesa, recursos, advertências e pagamentos.' },
  { icon: ShieldCheck, title: 'Segurança e Permissões', text: 'Usuários, senhas, níveis de acesso e registro das ações realizadas no sistema.' },
  { icon: Package, title: 'SCP — Protocolo', text: 'Tramitação de ofícios e solicitações, com numeração sequencial e comprovantes com QR Code.' },
  { icon: ScanLine, title: 'SRV — Recolhimento', text: 'Controle de veículos recolhidos, proprietários, condutores, taxas e relatórios de pátio.' },
]

const productTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'infracoes', label: 'Infrações' },
  { id: 'talonario', label: 'Talão Eletrônico' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'notificacoes', label: 'Notificações' },
  { id: 'relatorios', label: 'Relatórios' },
]

const tabCopy: Record<string, { title: string; text: string }> = {
  dashboard: { title: 'Uma visão geral da operação.', text: 'Indicadores essenciais para acompanhar infrações, arrecadações e atividade recente sem perder tempo.' },
  infracoes: { title: 'Infrações organizadas por etapa.', text: 'Acompanhe AITs, notificações, defesas, recursos e consultas de veículos em um fluxo centralizado.' },
  talonario: { title: 'A rua conectada ao sistema.', text: 'O Talão Eletrônico SISTRANS trabalha online e offline e sincroniza os AITs registrados.' },
  financeiro: { title: 'Arrecadação sob controle.', text: 'Visualize arrecadações do DEMUTRAN, repasses e ações financeiras em uma camada única.' },
  notificacoes: { title: 'Mais controle sobre comunicações.', text: 'Acompanhe avisos, notificações de penalidade e os documentos necessários para cada processo.' },
  relatorios: { title: 'Dados que ajudam a decidir.', text: 'Transforme a operação em indicadores de gestão e acompanhe resultados com mais clareza.' },
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Rede Software">
      <span className={`grid size-10 place-items-center rounded-xl text-lg font-black ${light ? 'bg-white text-[#101114]' : 'bg-[#101114] text-white'}`}>R</span>
      <span className={`font-display text-[15px] font-black tracking-[-.04em] ${light ? 'text-white' : 'text-[#101114]'}`}>
        REDE
        <span className={`block text-[9px] tracking-[.28em] ${light ? 'text-white/50' : 'text-neutral-400'}`}>SOFTWARE</span>
      </span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className={`${open ? 'absolute left-4 right-4 top-[68px] flex' : 'hidden'} flex-col gap-1 rounded-2xl border border-black/5 bg-white p-3 shadow-2xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
          {navItems.map(([label, to]) => (
            <Link key={to} to={to} className="rounded-xl px-3 py-3 text-sm font-semibold text-neutral-500 transition hover:text-[#e3262e] lg:px-0 lg:py-2">
              {label}
            </Link>
          ))}
          <a href="https://wa.me/558835312259" target="_blank" rel="noreferrer" className="rounded-xl px-3 py-3 text-sm font-semibold text-neutral-500 transition hover:text-[#e3262e] lg:px-0 lg:py-2">
            Fale no WhatsApp
          </a>
          <Link to="/contato" className="flex items-center justify-center gap-2 rounded-xl bg-[#e3262e] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20">
            Solicitar demonstração <ArrowRight size={16} />
          </Link>
        </nav>
        <button className="rounded-xl p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#101114] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-400">Tecnologia, gestão e suporte para empresas e órgãos públicos que precisam operar melhor.</p>
        </div>
        <div>
          <b className="text-xs">SISTRANS</b>
          <div className="mt-4 grid gap-3 text-sm text-neutral-400">
            <a href="/sistrans#funcionalidades">Funcionalidades</a>
            <a href="/sistrans#produto">O sistema em ação</a>
            <a href="/sistrans#integracoes">Integrações</a>
          </div>
        </div>
        <div>
          <b className="text-xs">Rede Software</b>
          <div className="mt-4 grid gap-3 text-sm text-neutral-400">
            <Link to="/empresa">Empresa</Link>
            <Link to="/contato">Contato</Link>
            <a href="https://redesoftware.com.br/" target="_blank" rel="noreferrer">Site atual</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-neutral-500">© {new Date().getFullYear()} Rede Software. Todos os direitos reservados.</div>
    </footer>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return <><Header />{children}<Footer /></>
}

function OriginalMedia({ search, alt, className = '' }: { search: string; alt: string; className?: string }) {
  const [media, setMedia] = useState<Media | null>(null)

  useEffect(() => {
    let active = true
    fetch(`/api/original-media?search=${encodeURIComponent(search)}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('media')))
      .then((data) => {
        if (active && data.items?.[0]?.url) setMedia(data.items[0])
      })
      .catch(() => undefined)
    return () => { active = false }
  }, [search])

  if (!media) return null
  return <img src={media.url} alt={media.alt || alt} className={className} loading="lazy" />
}

function MetricPill({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/7 bg-white px-4 py-3 shadow-[0_12px_40px_rgba(16,17,20,.06)]">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-neutral-400"><Icon size={14} className="text-[#e3262e]" />{label}</div>
      <div className="mt-1 text-sm font-black text-[#101114]">{value}</div>
    </div>
  )
}

function DashboardMockup({ activeTab }: { activeTab: string }) {
  const values = useMemo(() => {
    if (activeTab === 'financeiro') return { a: 'R$ 245.780', b: 'R$ 182.430', c: 'R$ 63.350' }
    if (activeTab === 'infracoes') return { a: '1.284', b: '932', c: '178' }
    if (activeTab === 'notificacoes') return { a: '3.842', b: '96,8%', c: '214' }
    if (activeTab === 'relatorios') return { a: '18', b: '42', c: '97,4%' }
    if (activeTab === 'talonario') return { a: '428', b: '97,9%', c: 'Online' }
    return { a: 'R$ 245.780', b: '1.284', c: '98,6%' }
  }, [activeTab])

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_35px_100px_rgba(16,17,20,.14)]">
      <div className="flex items-center gap-3 border-b border-black/5 px-5 py-3 text-[10px] text-neutral-400">
        <span className="flex gap-1.5"><i className="size-1.5 rounded-full bg-neutral-200"/><i className="size-1.5 rounded-full bg-neutral-200"/><i className="size-1.5 rounded-full bg-neutral-200"/></span>
        <span>SISTRANS · Visão geral</span>
        <span className="ml-auto flex items-center gap-1.5 text-emerald-600"><i className="size-1.5 rounded-full bg-emerald-500"/> online</span>
      </div>
      <div className="grid gap-4 p-5 lg:grid-cols-[1.2fr_.8fr] lg:p-7">
        <div>
          <div className="flex items-center justify-between"><div><span className="text-[9px] font-bold tracking-[.18em] text-neutral-400">DEMONSTRATIVO</span><h3 className="mt-1 font-display text-xl font-black">Gestão de Infrações</h3></div><span className="rounded-xl bg-red-50 px-3 py-2 text-[9px] font-bold text-[#e3262e]">SISTRANS</span></div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[['Infrações', values.a], ['Processadas', values.b], ['Indicador', values.c]].map(([label, value]) => <div key={label} className="rounded-xl border border-black/5 p-3"><span className="text-[9px] text-neutral-400">{label}</span><b className="mt-2 block font-display text-sm">{value}</b></div>)}
          </div>
          <div className="mt-3 rounded-2xl border border-black/5 p-4">
            <div className="flex items-center justify-between text-[10px] font-bold"><span>Atividade operacional</span><span className="font-normal text-neutral-400">últimos 7 dias</span></div>
            <div className="mt-6 flex h-32 items-end gap-2">{[38,52,45,64,57,79,92].map((height, index) => <span key={height + index} className={`flex-1 rounded-t-md ${index === 6 ? 'bg-[#e3262e]' : 'bg-red-100'}`} style={{ height: `${height}%` }} />)}</div>
            <div className="mt-2 flex justify-between text-[8px] text-neutral-400"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Hoje</span></div>
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-[#fafafa] p-4">
          <div className="flex items-center justify-between"><span className="text-[10px] font-bold">Processos recentes</span><Activity size={14} className="text-[#e3262e]" /></div>
          <div className="mt-4 space-y-2">{['AIT 008421 · Nova autuação', 'AIT 008398 · Recurso recebido', 'AIT 008362 · Pagamento confirmado', 'SCP 001827 · Protocolo gerado'].map((row, index) => <div key={row} className="rounded-xl border border-black/5 bg-white p-3"><div className="flex items-center justify-between"><span className="text-[9px] font-bold text-neutral-700">{row}</span><span className={`size-1.5 rounded-full ${index === 1 ? 'bg-amber-500' : 'bg-emerald-500'}`} /></div><div className="mt-1 text-[8px] text-neutral-400">Atualizado agora · SISTRANS</div></div>)}</div>
        </div>
      </div>
    </div>
  )
}

function SistransHero() {
  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-[linear-gradient(180deg,#fff_0%,#fafafa_100%)]">
      <div className="absolute -right-40 top-0 size-[640px] rounded-full bg-red-100/70 blur-3xl" />
      <div className="absolute left-[-18%] top-32 size-[360px] rounded-full bg-red-50/70 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#e3262e] shadow-sm"><span className="size-1.5 rounded-full bg-[#e3262e]" /> SISTRANS</span>
          <h1 className="mt-7 max-w-2xl font-display text-[clamp(3.2rem,6vw,6.2rem)] font-black leading-[.93] tracking-[-.075em]">O sistema completo para a <span className="text-[#e3262e]">gestão inteligente</span> de infrações de trânsito.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-500">Uma plataforma para modernizar processos, integrar informações e tornar a gestão de trânsito mais eficiente.</p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {[
              ['Integração DEMUTRAN ↔ DETRAN', Network],
              ['Talão Eletrônico', Smartphone],
              ['Controle financeiro', CircleDollarSign],
              ['Notificações e recursos', Bell],
              ['Relatórios gerenciais', BarChart3],
            ].map(([label, Icon]) => <div key={label as string} className="flex items-center gap-2 text-xs font-semibold text-neutral-600"><Check size={15} className="text-[#e3262e]" />{label as string}</div>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contato" className="flex items-center gap-3 rounded-xl bg-[#e3262e] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-[#cf1f27]">Solicitar demonstração <ArrowRight size={17} /></Link>
            <a href="#produto" className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-4 text-sm font-bold text-neutral-700 transition hover:border-red-200 hover:text-[#e3262e]"><Play size={15} fill="currentColor" /> Conheça o sistema</a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[720px]">
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(227,38,46,.18),rgba(227,38,46,0)_67%)] blur-2xl" />
          <div className="relative rounded-[32px] border border-black/10 bg-white p-3 shadow-[0_45px_120px_rgba(16,17,20,.16)]">
            <DashboardMockup activeTab="dashboard" />
            <div className="absolute -right-4 top-10 hidden w-44 sm:block"><MetricPill icon={CircleDollarSign} label="Arrecadação" value="R$ 245.780" /></div>
            <div className="absolute -left-7 bottom-12 hidden w-40 sm:block"><MetricPill icon={Check} label="Talão eletrônico" value="Conectado" /></div>
            <div className="absolute -right-3 -bottom-5 hidden w-36 sm:block"><MetricPill icon={Gauge} label="Disponibilidade" value="Operação ativa" /></div>
          </div>
          <div className="mt-4 flex justify-end"><OriginalMedia search="sistrans" alt="Material original do SISTRANS" className="h-20 w-32 rounded-xl border border-black/5 object-cover opacity-80 shadow-sm" /></div>
        </div>
      </div>
    </section>
  )
}

function Credibility() {
  const metrics = [
    [Network, 'Integração', 'DEMUTRAN ↔ DETRAN'],
    [Smartphone, 'Talão eletrônico', 'Online + offline'],
    [Package, 'Módulos adicionais', 'SCP + SRV'],
    [ShieldCheck, 'Homologação', 'SENATRAN 2026–2030'],
  ] as const
  return <section className="relative z-10 -mt-8 px-5"><div className="mx-auto grid max-w-5xl gap-3 rounded-[26px] border border-black/6 bg-white p-3 shadow-[0_24px_70px_rgba(16,17,20,.08)] sm:grid-cols-2 lg:grid-cols-4">{metrics.map(([Icon, label, value]) => <div key={label} className="rounded-2xl px-4 py-4"><Icon size={18} className="text-[#e3262e]"/><div className="mt-3 text-[9px] font-black uppercase tracking-[.14em] text-neutral-400">{label}</div><div className="mt-1 text-sm font-black text-[#101114]">{value}</div></div>)}</div></section>
}

function Features() {
  return <section id="funcionalidades" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="max-w-2xl"><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">FUNCIONALIDADES</span><h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl">Tudo o que sua gestão precisa em um só lugar.</h2><p className="mt-5 text-sm leading-7 text-neutral-500">Módulos completos e integrados para uma gestão de trânsito mais eficiente, segura e inteligente.</p></div><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{officialFeatures.map(({ icon: Icon, title, text }) => <article key={title} className="group rounded-3xl border border-black/7 bg-white p-6 transition hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_24px_60px_rgba(16,17,20,.08)]"><span className="grid size-12 place-items-center rounded-2xl bg-red-50 text-[#e3262e]"><Icon size={21} /></span><h3 className="mt-9 font-display text-lg font-black tracking-tight">{title}</h3><p className="mt-3 text-xs leading-6 text-neutral-500">{text}</p><a href="#produto" className="mt-6 inline-flex items-center gap-1 text-[10px] font-black text-[#e3262e]">Saiba mais <ChevronRight size={14} /></a></article>)}</div><div className="mt-10 text-center"><a href="#produto" className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-5 py-4 text-xs font-black text-neutral-800 hover:border-red-200 hover:text-[#e3262e]">Conheça todas as funcionalidades <ArrowRight size={15} /></a></div></section>
}

function ProductShowcase() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const copy = tabCopy[activeTab]
  return <section id="produto" className="border-y border-black/5 bg-[#fafafa]"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">O SISTEMA EM AÇÃO</span><h2 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-[-.05em] sm:text-5xl">Veja o SISTRANS funcionando na prática.</h2></div><p className="max-w-md text-sm leading-7 text-neutral-500">Uma apresentação visual do produto com as principais áreas da operação.</p></div><div className="mt-10 overflow-x-auto pb-1"><div className="inline-flex min-w-full rounded-2xl border border-black/6 bg-white p-2 shadow-sm">{productTabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap rounded-xl px-4 py-3 text-[10px] font-black transition ${activeTab === tab.id ? 'bg-[#101114] text-white' : 'text-neutral-500 hover:text-[#e3262e]'}`}>{tab.label}</button>)}</div></div><div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.3fr_.7fr]"><DashboardMockup activeTab={activeTab} /><aside className="rounded-[28px] border border-black/7 bg-white p-7 shadow-sm"><span className="grid size-12 place-items-center rounded-2xl bg-red-50 text-[#e3262e]"><Activity size={21} /></span><h3 className="mt-7 font-display text-2xl font-black tracking-tight">{copy.title}</h3><p className="mt-3 text-sm leading-7 text-neutral-500">{copy.text}</p><ul className="mt-6 space-y-3">{['Interface centralizada', 'Dados organizados', 'Fluxos integrados'].map((item) => <li key={item} className="flex items-center gap-2 text-xs font-semibold text-neutral-600"><Check size={14} className="text-[#e3262e]" />{item}</li>)}</ul></aside></div></div></section>
}

function Benefits() {
  return <section className="bg-[linear-gradient(135deg,#fff_15%,#fff5f5_70%,#ffe7e7_100%)]"><div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32"><div><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">BENEFÍCIOS</span><h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-.05em] sm:text-5xl">Mais eficiência. Menos burocracia.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">O SISTRANS centraliza a gestão de trânsito e organiza processos em uma plataforma criada para apoiar o dia a dia do DEMUTRAN.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{['Redução de custos operacionais', 'Mais agilidade e produtividade', 'Transparência e conformidade', 'Informações centralizadas', 'Integrações mais seguras', 'Atualizações constantes'].map((item) => <div key={item} className="flex items-center gap-2 rounded-2xl border border-black/6 bg-white/70 px-4 py-3 text-xs font-bold text-neutral-700"><Check size={15} className="text-[#e3262e]" />{item}</div>)}</div></div><div className="relative"><div className="absolute -inset-8 rounded-full bg-red-100/70 blur-3xl"/><div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#101114] p-5 shadow-[0_35px_90px_rgba(16,17,20,.15)]"><DashboardMockup activeTab="financeiro" /></div></div></div></section>
}

function Flow() {
  const steps = [
    ['1', 'Agente', 'Registro da infração em campo pelo Talão Eletrônico.'],
    ['2', 'AIT', 'Informações enviadas e registradas no sistema.'],
    ['3', 'Processamento', 'Dados organizados para os processos necessários.'],
    ['4', 'Notificação', 'Geração e acompanhamento das notificações.'],
    ['5', 'Pagamento', 'Controle financeiro e integração dos pagamentos.'],
    ['6', 'Relatórios', 'Informações estratégicas em dashboards.'],
  ]
  return <section className="overflow-hidden bg-[#101114] text-white"><div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="max-w-3xl"><span className="text-[10px] font-black uppercase tracking-[.24em] text-red-400">COMO FUNCIONA</span><h2 className="mt-4 font-display text-4xl font-black tracking-[-.05em] sm:text-5xl">Fluxo simplificado. Gestão completa.</h2><p className="mt-5 text-sm leading-7 text-neutral-400">Do registro da infração ao acompanhamento dos resultados, tudo conectado em um único sistema.</p></div><div className="relative mt-14"><div className="absolute left-[7%] right-[7%] top-7 hidden h-px bg-gradient-to-r from-red-900 via-red-500 to-red-900 lg:block"/><div className="grid gap-10 lg:grid-cols-6">{steps.map(([number, title, text]) => <div key={number} className="relative text-center lg:text-left"><span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border border-red-500/40 bg-[#101114] font-display text-lg font-black text-red-300 lg:mx-0">{number}</span><h3 className="mt-5 font-display text-sm font-black">{title}</h3><p className="mt-2 text-xs leading-6 text-neutral-500">{text}</p></div>)}</div></div></div></section>
}

function Integrations() {
  const nodes = [
    ['DETRAN', 'Integração com processos de autuação e pagamentos'],
    ['Talão Eletrônico', 'Registro em campo, online e offline'],
    ['Financeiro', 'Arrecadações, repasses e baixas'],
    ['SCP', 'Protocolo e tramitação de solicitações'],
    ['SRV', 'Recolhimento de veículos e pátio'],
    ['DEMUTRAN', 'Operação centralizada da gestão municipal'],
  ]
  return <section id="integracoes" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="text-center"><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">INTEGRAÇÕES</span><h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black tracking-[-.05em] sm:text-5xl">Integrado ao ecossistema da sua gestão.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-neutral-500">Uma arquitetura pensada para manter as informações conectadas ao longo da operação.</p></div><div className="relative mx-auto mt-14 max-w-4xl rounded-[36px] border border-black/7 bg-[#fafafa] p-6 sm:p-10"><div className="absolute left-1/2 top-1/2 hidden size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-100 bg-red-50/50 md:block"/><div className="absolute left-1/2 top-1/2 hidden size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-200 bg-white shadow-xl md:block"/><div className="relative z-10 mx-auto grid size-24 place-items-center rounded-3xl bg-[#101114] font-display text-sm font-black text-white shadow-2xl">SISTRANS</div><div className="relative z-10 mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{nodes.map(([title, text]) => <div key={title} className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm"><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-red-50 text-[#e3262e]"><Network size={14}/></span><b className="text-xs">{title}</b></div><p className="mt-3 text-[10px] leading-5 text-neutral-500">{text}</p></div>)}</div></div></section>
}

function Trust() {
  return <section className="border-y border-black/5 bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">CREDIBILIDADE</span><h2 className="mt-4 font-display text-3xl font-black tracking-tight">Tecnologia consolidada para a operação pública.</h2></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-black/7 bg-[#fafafa] p-6"><Landmark className="text-[#e3262e]"/><h3 className="mt-6 font-display text-xl font-black">Homologação atual</h3><p className="mt-2 text-sm leading-6 text-neutral-500">A SENATRAN lista o Talão Eletrônico Sistrans entre os serviços homologados para fornecimento.</p></div><div className="rounded-3xl border border-black/7 bg-[#fafafa] p-6"><ShieldCheck className="text-[#e3262e]"/><h3 className="mt-6 font-display text-xl font-black">Operação protegida</h3><p className="mt-2 text-sm leading-6 text-neutral-500">Usuários, permissões, registros de acesso e armazenamento externo apoiam a integridade dos dados.</p></div></div></div></section>
}

function Testimonials() {
  const quotes = [
    ['“Uma equipe de pessoas altamente competentes, que na hora que precisa, rapidamente solucionam o problema. Eu indico!”', 'Valdeir Inácio', 'Cliente Rede Software'],
    ['“O sistema é muito intuitivo e eficiente. Os membros da equipe são muito competentes.”', 'Ana Paula', 'Cliente Rede Software'],
    ['“Muito fácil de mexer, e quando há uma dúvida, rapidamente o suporte nos atende e resolve.”', 'Cliente Rede Software', 'Depoimento publicado no site'],
  ]
  return <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="max-w-2xl"><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">DEPOIMENTOS</span><h2 className="mt-4 font-display text-4xl font-black tracking-[-.05em] sm:text-5xl">Quem utiliza, aprova.</h2><p className="mt-5 text-sm leading-7 text-neutral-500">Comentários publicados pela própria Rede Software em seu site institucional.</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{quotes.map(([quote, name, role]) => <article key={name} className="rounded-3xl border border-black/7 bg-white p-7 shadow-sm"><span className="text-4xl font-black text-red-100">“</span><p className="mt-3 text-sm leading-7 text-neutral-600">{quote}</p><div className="mt-8 border-t border-black/5 pt-5"><b className="text-xs">{name}</b><span className="mt-1 block text-[10px] text-neutral-400">{role}</span></div></article>)}</div></section>
}

function FinalCta() {
  return <section className="px-5 pb-20 lg:pb-28"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[linear-gradient(120deg,#ad1720,#e3262e_55%,#ff5a60)] px-7 py-14 text-white shadow-[0_35px_100px_rgba(227,38,46,.22)] sm:px-12 sm:py-16"><div className="absolute -right-20 -top-24 size-72 rounded-full border border-white/10"/><div className="absolute -right-8 -top-10 size-52 rounded-full border border-white/10"/><div className="relative max-w-3xl"><span className="text-[10px] font-black uppercase tracking-[.24em] text-white/70">DEMONSTRAÇÃO</span><h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-.04em] sm:text-5xl">Sua gestão de trânsito merece uma plataforma à altura.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">Solicite uma demonstração e descubra como o SISTRANS pode transformar a gestão de trânsito do seu município.</p><Link to="/contato" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-4 text-sm font-black text-[#ad1720] shadow-lg">Solicitar demonstração <ArrowRight size={16}/></Link></div></div></section>
}

function SistransPage() {
  return <>
    <SistransHero />
    <Credibility />
    <Features />
    <ProductShowcase />
    <Benefits />
    <Flow />
    <Integrations />
    <Trust />
    <Testimonials />
    <FinalCta />
  </>
}

function Home() {
  return <main>
    <section className="relative overflow-hidden border-b border-black/5 bg-white"><div className="absolute -right-48 top-0 size-[620px] rounded-full bg-red-100/70 blur-3xl"/><div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8"><div><span className="inline-flex rounded-full border border-red-100 bg-red-50 px-3 py-2 text-[10px] font-black uppercase tracking-[.16em] text-[#e3262e]">Rede Software</span><h1 className="mt-7 font-display text-[clamp(3.2rem,6vw,6.3rem)] font-black leading-[.92] tracking-[-.07em]">Tecnologia para <span className="text-[#e3262e]">gestão real.</span></h1><p className="mt-7 max-w-xl text-lg leading-8 text-neutral-500">Soluções para gestão empresarial, trânsito, certificação digital, equipamentos e suporte humanizado.</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/sistrans" className="flex items-center gap-2 rounded-xl bg-[#e3262e] px-5 py-4 text-sm font-bold text-white">Conhecer o SISTRANS <ArrowRight size={17}/></Link><Link to="/contato" className="rounded-xl border border-black/10 px-5 py-4 text-sm font-bold">Falar com a equipe</Link></div></div><div className="relative"><DashboardMockup activeTab="dashboard"/><div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-black/6 bg-white p-4 shadow-xl sm:block"><span className="block text-[9px] font-black uppercase tracking-[.14em] text-neutral-400">SISTRANS</span><b className="mt-1 block text-sm">Gestão de infrações</b></div></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="grid gap-5 lg:grid-cols-3"><Link to="/sistrans" className="rounded-3xl border border-black/7 p-7 transition hover:-translate-y-1 hover:shadow-xl"><FileCheck2 className="text-[#e3262e]"/><h2 className="mt-8 font-display text-2xl font-black">SISTRANS</h2><p className="mt-2 text-sm leading-6 text-neutral-500">Gerenciador de infrações de trânsito para DEMUTRAN.</p></Link><div className="rounded-3xl border border-black/7 p-7"><BarChart3 className="text-[#e3262e]"/><h2 className="mt-8 font-display text-2xl font-black">SGCI</h2><p className="mt-2 text-sm leading-6 text-neutral-500">Gestão comercial para empresas de diversos segmentos.</p></div><div className="rounded-3xl border border-black/7 p-7"><ShieldCheck className="text-[#e3262e]"/><h2 className="mt-8 font-display text-2xl font-black">Certificação Digital</h2><p className="mt-2 text-sm leading-6 text-neutral-500">Segurança e praticidade para operações digitais.</p></div></div></section>
  </main>
}

function Generic({ title, text }: { title: string; text: string }) {
  return <section className="mx-auto max-w-5xl px-5 py-24 lg:px-8 lg:py-32"><span className="text-[10px] font-black uppercase tracking-[.24em] text-[#e3262e]">REDE SOFTWARE</span><h1 className="mt-4 font-display text-5xl font-black tracking-[-.06em]">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-500">{text}</p><div className="mt-10 rounded-[32px] bg-[#101114] p-8 text-white"><h2 className="font-display text-2xl font-black">Vamos conversar?</h2><p className="mt-2 text-sm leading-6 text-neutral-400">Entre em contato com a Rede Software para conhecer as soluções e serviços.</p><Link to="/contato" className="mt-6 inline-flex rounded-xl bg-[#e3262e] px-5 py-4 text-sm font-bold">Falar com a equipe <ArrowRight size={16} className="ml-2" /></Link></div></section>
}

function App() {
  return <BrowserRouter><Layout><Routes><Route path="/" element={<Home />} /><Route path="/sistrans" element={<SistransPage />} /><Route path="/solucoes" element={<Generic title="Soluções" text="Conheça o ecossistema de soluções da Rede Software para gestão, trânsito e operações digitais." />} /><Route path="/produtos" element={<Generic title="Produtos" text="Equipamentos e acessórios para apoiar a operação do seu negócio." />} /><Route path="/servicos" element={<Generic title="Serviços" text="Instalação, configuração, treinamento, certificação e suporte técnico especializado." />} /><Route path="/empresa" element={<Generic title="Empresa" text="Uma equipe dedicada a desenvolver, implantar e sustentar soluções de tecnologia." />} /><Route path="/suporte" element={<Generic title="Suporte" text="Atendimento técnico, manutenção, instalação e orientação para os clientes da Rede Software." />} /><Route path="/contato" element={<Generic title="Contato" text="Fale com a Rede Software e solicite uma demonstração, orçamento ou atendimento." />} /></Routes></Layout></BrowserRouter>
}

export default App
