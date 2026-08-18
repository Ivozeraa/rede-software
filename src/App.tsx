import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Headphones,
  Menu,
  Monitor,
  Package,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'

const solutions = [
  {
    eyebrow: 'GESTÃO EMPRESARIAL',
    title: 'SGCI',
    description: 'Uma visão completa da operação para você vender, controlar e decidir melhor.',
    features: ['Vendas e PDV', 'Estoque inteligente', 'Financeiro integrado', 'Relatórios gerenciais'],
    icon: BarChart3,
    featured: true,
  },
  {
    eyebrow: 'GESTÃO DE TRÂNSITO',
    title: 'SISTRANS',
    description: 'Tecnologia para organizar processos, informações e rotinas de trânsito.',
    features: ['Gestão de processos', 'Controle operacional', 'Informação centralizada'],
    icon: ReceiptText,
    featured: false,
  },
  {
    eyebrow: 'SEGURANÇA DIGITAL',
    title: 'Certificação Digital',
    description: 'Identidade digital com segurança para assinar, acessar e realizar operações.',
    features: ['Emissão de certificados', 'Atendimento especializado', 'Segurança jurídica'],
    icon: ShieldCheck,
    featured: false,
  },
]

const products = [
  { icon: Monitor, label: 'Computadores', detail: 'Estações completas' },
  { icon: CreditCard, label: 'PDV', detail: 'Frente de caixa' },
  { icon: Package, label: 'Periféricos', detail: 'Leitores e acessórios' },
  { icon: ReceiptText, label: 'Impressoras', detail: 'Impressão térmica' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Rede Software">
          <span className="brand-mark">R</span>
          <span>REDE<span>SOFTWARE</span></span>
        </a>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#solucoes" onClick={closeMenu}>Soluções</a>
          <a href="#produtos" onClick={closeMenu}>Produtos</a>
          <a href="#suporte" onClick={closeMenu}>Suporte</a>
          <a href="#empresa" onClick={closeMenu}>Empresa</a>
          <a className="nav-cta" href="#contato" onClick={closeMenu}>Fale conosco <ArrowRight size={16} /></a>
        </nav>

        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="hero-copy">
            <div className="pill"><Sparkles size={14} /> Tecnologia que trabalha por você</div>
            <h1>Gestão inteligente.<br /><em>Negócios mais fortes.</em></h1>
            <p>Software, equipamentos e suporte para transformar a rotina da sua empresa em resultados.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#solucoes">Conheça nossas soluções <ArrowRight size={18} /></a>
              <a className="button button-ghost" href="#contato">Falar com um especialista</a>
            </div>
            <div className="trust-line"><span className="dot" /> Tecnologia presente no dia a dia de empresas reais</div>
          </div>

          <div className="dashboard-wrap" aria-label="Prévia do painel de gestão">
            <div className="dashboard-backdrop" />
            <div className="dashboard-card">
              <div className="dashboard-top"><span className="window-dots"><i /><i /><i /></span><span>Visão geral</span><span className="live"><b /> online</span></div>
              <div className="dashboard-body">
                <div className="dashboard-title"><div><small>TERÇA, 18 AGO</small><strong>Olá, gestor.</strong></div><div className="avatar">RS</div></div>
                <div className="metric-grid">
                  <div className="metric"><span>Faturamento</span><strong>R$ 42.580</strong><small className="positive">↑ 18,4%</small></div>
                  <div className="metric"><span>Vendas hoje</span><strong>286</strong><small>+32 que ontem</small></div>
                  <div className="metric"><span>Estoque</span><strong>1.842</strong><small>itens ativos</small></div>
                </div>
                <div className="chart-card"><div className="chart-heading"><span>Vendas da semana</span><small>Últimos 7 dias</small></div><div className="chart"><i style={{ height: '35%' }} /><i style={{ height: '48%' }} /><i style={{ height: '42%' }} /><i style={{ height: '66%' }} /><i style={{ height: '58%' }} /><i style={{ height: '82%' }} /><i className="current" style={{ height: '94%' }} /></div><div className="chart-labels"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Hoje</span></div></div>
              </div>
            </div>
            <div className="floating-card floating-sales"><span className="floating-icon"><Zap size={16} /></span><div><small>Venda realizada</small><strong>+ R$ 1.280,00</strong></div></div>
            <div className="floating-card floating-stock"><span className="check-icon"><Check size={15} /></span><div><small>Estoque sincronizado</small><strong>Tudo em dia</strong></div></div>
          </div>
        </section>

        <section className="stats">
          <div><strong>+19</strong><span>anos de experiência</span></div>
          <div><strong>360°</strong><span>visão da sua operação</span></div>
          <div><strong>24/7</strong><span>dados ao seu alcance</span></div>
          <div><strong>1</strong><span>parceiro para sua tecnologia</span></div>
        </section>

        <section className="section solutions" id="solucoes">
          <div className="section-heading"><div><span className="section-kicker">SOLUÇÕES</span><h2>Tudo conectado.<br /><span>Uma gestão sem ruído.</span></h2></div><p>Ferramentas pensadas para simplificar processos, centralizar informações e dar clareza para quem precisa tomar decisões.</p></div>
          <div className="solution-grid">{solutions.map((solution) => { const Icon = solution.icon; return <article className={`solution-card ${solution.featured ? 'featured' : ''}`} key={solution.title}><div className="card-top"><span className="solution-icon"><Icon size={21} /></span><span className="arrow-circle"><ArrowRight size={17} /></span></div><span className="card-eyebrow">{solution.eyebrow}</span><h3>{solution.title}</h3><p>{solution.description}</p><ul>{solution.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul><a href="#contato">Conhecer solução <ChevronRight size={15} /></a></article> })}</div>
        </section>

        <section className="feature-section" id="empresa">
          <div className="feature-visual"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="mini-window"><div className="mini-head"><span /> SGCI • Financeiro</div><div className="mini-row"><span>Contas a receber</span><strong>R$ 18.420,00</strong></div><div className="mini-bar"><i /></div><div className="mini-row"><span>Contas a pagar</span><strong>R$ 8.690,00</strong></div><div className="mini-bar second"><i /></div></div><div className="feature-badge"><ShieldCheck size={17} /><span>Dados protegidos<br /><strong>e centralizados</strong></span></div></div>
          <div className="feature-copy"><span className="section-kicker">TECNOLOGIA COM PROPÓSITO</span><h2>Menos tempo apagando incêndios. <span>Mais tempo fazendo o negócio crescer.</span></h2><p>Uma boa tecnologia não deveria complicar sua rotina. Ela deve desaparecer no fundo e deixar o que importa em primeiro plano: seu negócio.</p><div className="feature-list"><div><b>01</b><span><strong>Controle de ponta a ponta</strong>Tenha uma visão clara de vendas, estoque e financeiro.</span></div><div><b>02</b><span><strong>Decisões baseadas em dados</strong>Transforme informações da operação em ação.</span></div><div><b>03</b><span><strong>Suporte que resolve</strong>Quando precisar, fale com gente de verdade.</span></div></div></div>
        </section>

        <section className="section products" id="produtos">
          <div className="section-heading"><div><span className="section-kicker">HARDWARE & PDV</span><h2>Do software ao <span>equipamento.</span></h2></div><p>A tecnologia certa precisa funcionar inteira. Por isso, conectamos sistemas, equipamentos e suporte em uma única experiência.</p></div>
          <div className="product-grid">{products.map(({ icon: Icon, label, detail }) => <a href="#contato" className="product-card" key={label}><span className="product-icon"><Icon size={23} /></span><span><strong>{label}</strong><small>{detail}</small></span><ArrowRight size={18} /></a>)}</div>
        </section>

        <section className="support" id="suporte"><div className="support-inner"><div className="support-icon"><Headphones size={27} /></div><div><span className="section-kicker">SUPORTE HUMANIZADO</span><h2>Você fala com pessoas.<br /><span>Não com robôs.</span></h2><p>Quando seu negócio precisa de ajuda, a resposta não pode ficar presa em um menu. Conte com uma equipe que conhece sua operação e está pronta para resolver.</p><a className="button button-light" href="#contato">Falar com nosso suporte <ArrowRight size={18} /></a></div><div className="support-orbit" /></div></section>

        <section className="contact" id="contato"><div><span className="section-kicker">VAMOS CONVERSAR</span><h2>Seu negócio merece<br /><span>uma tecnologia à altura.</span></h2></div><a className="contact-button" href="mailto:contato@redesoftware.com.br">Começar uma conversa <ArrowRight /></a></section>
      </main>

      <footer><div className="footer-main"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">R</span><span>REDE<span>SOFTWARE</span></span></a><p>Tecnologia que simplifica a gestão<br />e aproxima resultados.</p><div className="footer-links"><a href="#solucoes">Soluções</a><a href="#produtos">Produtos</a><a href="#suporte">Suporte</a><a href="#empresa">Empresa</a></div><a className="help" href="#contato"><CircleHelp size={17} /> Precisa de ajuda?</a></div><div className="footer-bottom"><span>© 2026 Rede Software. Todos os direitos reservados.</span><span>Feito para negócios que querem evoluir.</span></div></footer>
    </div>
  )
}

export default App
