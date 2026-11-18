import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Coffee,
  Heart,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  categories,
  filterProducts,
  socialLinks,
  validateContact,
  type Category,
} from "@/lib/cafe-data";
import hero from "@/assets/cafe-central-hero.jpg";
import interior from "@/assets/cafe-central-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Café Central — Seu momento especial começa aqui" },
      {
        name: "description",
        content:
          "Conheça o Café Central: cafés artesanais, doces e salgados preparados com carinho em um ambiente acolhedor. Explore nosso cardápio.",
      },
      { property: "og:title", content: "Café Central — Seu momento especial começa aqui" },
      {
        property: "og:description",
        content:
          "Cafés artesanais, sabores feitos com carinho e um cantinho para desacelerar. Conheça o Café Central.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navigation = [
  { id: "inicio", label: "Início" },
  { id: "cardapio", label: "Cardápio" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
];
const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function SocialLinks() {
  return (
    <div className="social-links">
      <a
        className="social-link"
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram (link provisório)"
      >
        <Instagram size={17} />
        Instagram
      </a>
      <a
        className="social-link"
        href={socialLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir o bot oficial do Café Central no Telegram"
      >
        <Send size={16} />
        Telegram
      </a>
    </div>
  );
}

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [category, setCategory] = useState<Category>("Todos");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    for (const item of navigation) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    if (!validateContact(values)) {
      setFormError(
        "Confira seus dados: nome com pelo menos 2 letras, e-mail válido, telefone com DDD e mensagem com pelo menos 5 caracteres.",
      );
      return;
    }
    setFormError("");
    setSubmitted(true);
  }

  return (
    <>
      <header className="site-header">
        <div className="site-container header-inner">
          <a href="#inicio" className="brand" aria-label="Café Central — início">
            Café <em>Central</em>
            <span className="text-primary">.</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button variant="cafe" asChild className="header-cta h-10 px-5 text-xs">
            <a href="#contato">
              <Coffee />
              Venha nos visitar
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação móvel">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="inicio" className="hero">
          <img
            src={hero}
            className="hero-photo"
            alt="Cappuccino com arte no leite e croissant em uma mesa acolhedora de cafeteria"
            width={1920}
            height={1024}
            fetchPriority="high"
          />
          <div className="site-container hero-content">
            <div className="eyebrow">
              <span className="h-px w-7 bg-hero-foreground/60" /> CAFÉ, AFETO E BOAS HISTÓRIAS
            </div>
            <h1>
              Seu momento especial
              <br className="hidden md:block" /> começa com um
              <br className="hidden md:block" /> <em>bom café.</em>
            </h1>
            <p className="hero-copy">
              Uma pausa no dia. Um aroma que abraça.
              <br />
              Venha descobrir os pequenos prazeres
              <br className="hidden md:block" /> que fazem a vida mais gostosa.
            </p>
            <Button variant="cafe" size="lg" className="h-12 px-6 text-xs" asChild>
              <a href="#cardapio">
                Conheça nosso cardápio <ArrowRight />
              </a>
            </Button>
            <div className="hero-note">
              <Coffee size={15} />
              Feito com cuidado. Servido com carinho.
            </div>
          </div>
          <a href="#apresentacao" className="hero-bottom">
            SINTA-SE EM CASA <ArrowDown size={17} />
          </a>
        </section>

        <section id="apresentacao" className="intro">
          <div className="site-container">
            <p className="section-kicker">BEM-VINDO AO CAFÉ CENTRAL</p>
            <h2 className="section-title">Mais que café. Um lugar para ficar.</h2>
            <p className="section-copy">
              Acreditamos que as melhores coisas da vida merecem uma pausa. Por aqui, cada grão é
              escolhido com cuidado, cada receita tem um toque de afeto e cada visita é um encontro
              especial.
            </p>
            <div className="values">
              <span className="value">
                <Coffee size={19} />
                Café de qualidade
              </span>
              <span className="value">
                <Heart size={19} />
                Preparo com carinho
              </span>
              <span className="value">
                <Leaf size={19} />
                Ambiente acolhedor
              </span>
            </div>
          </div>
        </section>

        <section id="cardapio" className="menu-section">
          <div className="site-container">
            <div className="section-heading">
              <p className="section-kicker">SABORES QUE ABRAÇAM</p>
              <h2 className="section-title">Nosso cardápio</h2>
              <p className="section-copy">
                Do primeiro gole ao último pedaço, feito para você aproveitar.
              </p>
            </div>
            <div className="filters" role="group" aria-label="Filtrar cardápio por categoria">
              {categories.map((item) => (
                <Button
                  key={item}
                  variant={category === item ? "filterActive" : "filter"}
                  className="h-9 px-4 text-xs"
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            <div className="product-grid" aria-live="polite">
              {filterProducts(category).map((product) => (
                <article key={product.name} className="product-card">
                  <div className="product-image-wrap">
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={700}
                      height={525}
                    />
                  </div>
                  <div className="product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span className="price">{currency.format(product.price)}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="about-section">
          <div className="site-container about-inner">
            <img
              className="about-photo"
              src={interior}
              alt="Interior artesanal do Café Central com mesas de madeira, plantas e luz natural"
              loading="lazy"
              width={1200}
              height={1024}
            />
            <div className="about-copy">
              <p className="section-kicker">NOSSA HISTÓRIA</p>
              <h2 className="section-title">
                Um sonho, uma xícara
                <br />e muitas boas histórias.
              </h2>
              <p className="section-copy">
                O Café Central nasceu de um desejo simples: criar um cantinho onde o tempo passa
                mais devagar e as pessoas se sentem em casa.
              </p>
              <p className="section-copy">
                Tudo começou com as receitas da família, o cheiro de café passado e a vontade de
                compartilhar. Levamos essa tradição para cada detalhe, dos grãos selecionados aos
                bolos que saem do forno.
              </p>
              <p className="section-copy">
                Hoje, seguimos com o mesmo propósito: servir coisas boas, acolher de verdade e
                transformar uma pausa em um momento especial.
              </p>
              <div className="signature">Com carinho, Café Central.</div>
            </div>
          </div>
        </section>

        <section id="contato" className="contact-section">
          <div className="site-container contact-inner">
            <div>
              <p className="section-kicker">VAMOS CONVERSAR?</p>
              <h2 className="section-title">
                A gente adora
                <br />
                uma boa conversa.
              </h2>
              <p className="section-copy contact-description">
                Tem uma dúvida, uma sugestão ou só quer dizer um oi? Deixe sua mensagem. Será um
                prazer ouvir você.
              </p>
              <div className="contact-facts">
                <div className="contact-fact">
                  <MapPin size={20} />
                  <div>
                    <strong>Seu novo cantinho favorito</strong>
                    <span>Vila das Flores · Bairro Jardim Aurora</span>
                  </div>
                </div>
                <div className="contact-fact">
                  <Clock3 size={20} />
                  <div>
                    <strong>Aberto todos os dias</strong>
                    <span>Sempre há tempo para um bom café.</span>
                  </div>
                </div>
              </div>
              <SocialLinks />
            </div>
            {submitted ? (
              <div className="success-state" role="status">
                <CheckCircle2 size={38} />
                <h3>Mensagem enviada com sucesso!</h3>
                <p>
                  Este envio foi uma simulação: sua mensagem não foi transmitida. Que tal continuar
                  a conversa pelo Telegram?
                </p>
                <Button variant="cafe" asChild size="lg">
                  <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                    <Send />
                    Continuar pelo Telegram
                  </a>
                </Button>
                <div className="mt-4">
                  <Button variant="link" onClick={() => setSubmitted(false)}>
                    Enviar outra mensagem
                  </Button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submitContact}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Nome</label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Como podemos chamar você?"
                      autoComplete="name"
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">E-mail</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="voce@exemplo.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="contact-phone">Telefone / WhatsApp</label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    autoComplete="tel"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Mensagem</label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Conte para a gente..."
                    required
                    minLength={5}
                  />
                </div>
                {formError && (
                  <p className="text-sm text-destructive" role="alert">
                    {formError}
                  </p>
                )}
                <div>
                  <Button variant="cafe" className="h-11 px-6 text-xs" type="submit">
                    Enviar mensagem <ArrowRight />
                  </Button>
                </div>
                <p className="form-note">
                  Seus dados ficam apenas nesta página. Envio demonstrativo.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="site-container footer-inner">
          <a href="#inicio" className="brand">
            Café <em>Central</em>.
          </a>
          <small>© {new Date().getFullYear()} Café Central. Todos os direitos reservados.</small>
          <SocialLinks />
        </div>
      </footer>

      <Button variant="chat" className="chat-launcher h-14 w-14 [&_svg]:size-6" asChild>
        <a
          href={socialLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir atendimento no Telegram"
        >
          <MessageCircle />
        </a>
      </Button>
    </>
  );
}
