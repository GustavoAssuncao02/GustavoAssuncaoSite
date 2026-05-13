import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarDays,
  Car,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Laptop,
  Linkedin,
  Mail,
  MapPin,
  Monitor,
  Network,
  Phone,
  Server,
  Workflow,
} from 'lucide-react';
import { education, experiences, extras, initiatives, knowledgeGroups, profile, projects } from './resumeData.js';

const navItems = [
  { href: '#objetivo', label: 'Objetivo' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#conhecimentos', label: 'Conhecimentos' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#formacao', label: 'Formação' },
  { href: '#contato', label: 'Contato' },
];

const iconMap = {
  BarChart3,
  Code2,
  Database,
  Laptop,
  Monitor,
  Network,
  Server,
  Workflow,
};

function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('objetivo');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Header() {
  const active = useActiveSection();

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Ir para o início">
        <span>GA</span>
      </a>

      <nav className="nav-links" aria-label="Navegação principal">
        {navItems.map((item) => (
          <a
            key={item.href}
            className={active === item.href.slice(1) ? 'active' : undefined}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Bahia - Analista de TI</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>

          <div className="hero-actions">
            <a className="button primary" href="#contato">
              <Mail size={18} aria-hidden="true" />
              Entrar em contato
            </a>
            <a className="button secondary" href="/curriculo-gustavo.pdf" download>
              <Download size={18} aria-hidden="true" />
              Baixar PDF
            </a>
          </div>

          <div className="quick-contact" aria-label="Informações rápidas de contato">
            <span>
              <MapPin size={17} aria-hidden="true" />
              {profile.location}
            </span>
            <a href={profile.phoneHref}>
              <Phone size={17} aria-hidden="true" />
              {profile.phone}
            </a>
            <a href={profile.emailHref}>
              <Mail size={17} aria-hidden="true" />
              {profile.email}
            </a>
          </div>
        </div>
      </div>

      <div className="signal-strip" data-reveal>
        <div>
          <strong>Dados</strong>
          <span>Power BI, DAX, Excel e relatórios gerenciais</span>
        </div>
        <div>
          <strong>Desenvolvimento</strong>
          <span>ReactJS, NodeJS, APIs, Python e automações</span>
        </div>
        <div>
          <strong>Infraestrutura</strong>
          <span>Suporte técnico, redes, equipamentos de TI e manutenção preventiva</span>
        </div>
      </div>
    </section>
  );
}

function Objective() {
  return (
    <section className="section-band objective-band" id="objetivo">
      <div className="section-shell two-column">
        <div data-reveal>
          <p className="section-kicker">Objetivo</p>
          <h2>Perfil profissional orientado a evolução, prazos e responsabilidade.</h2>
        </div>
        <p className="objective-text" data-reveal>
          {profile.objective}
        </p>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section-band" id="experiencia">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Trajetória</p>
          <h2>Experiência profissional</h2>
        </div>

        <div className="timeline">
          {experiences.map((experience) => (
            <article className="timeline-item" key={`${experience.company}-${experience.role}`} data-reveal>
              <div className="timeline-marker" aria-hidden="true">
                <Briefcase size={18} />
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3>{experience.role}</h3>
                    <p>{experience.company}</p>
                  </div>
                  <span>
                    <CalendarDays size={16} aria-hidden="true" />
                    {experience.period}
                  </span>
                </div>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Knowledge() {
  return (
    <section className="section-band knowledge-band" id="conhecimentos">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Competências</p>
          <h2>Conhecimentos técnicos</h2>
        </div>

        <div className="knowledge-grid">
          {knowledgeGroups.map((group) => {
            const Icon = iconMap[group.icon] ?? Code2;

            return (
              <article className="knowledge-card" key={group.title} data-reveal>
                <div className="knowledge-title">
                  <span className="icon-box">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ visual, title }) {
  return (
    <div className={`project-preview ${visual}`} aria-label={`Prévia visual do projeto ${title}`}>
      <div className="preview-browser-bar">
        <span></span>
        <span></span>
        <span></span>
      </div>

      {visual === 'clima' && (
        <div className="preview-clima">
          <div className="preview-nav"></div>
          <div className="preview-hero-line large"></div>
          <div className="preview-hero-line"></div>
          <div className="preview-service-row">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {visual === 'vidracaria' && (
        <div className="preview-vidracaria">
          <div className="glass-pane tall"></div>
          <div className="glass-pane"></div>
          <div className="glass-pane short"></div>
          <div className="preview-caption"></div>
        </div>
      )}

      {visual === 'swc' && (
        <div className="preview-swc">
          <aside></aside>
          <main>
            <div className="dashboard-line"></div>
            <div className="dashboard-grid-preview">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="dashboard-table-preview"></div>
          </main>
        </div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section className="section-band projects-band" id="projetos">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Portfólio</p>
          <h2>Alguns projetos</h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const primaryHref = project.liveHref || project.repoHref;
            const primaryLabel = project.liveHref ? 'Abrir projeto' : 'Abrir repositório';
            const hasPrimaryAction = Boolean(project.liveHref);

            return (
              <article className="project-card" key={project.title} data-reveal>
                <ProjectPreview visual={project.visual} title={project.title} />

                <div className="project-content">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.highlights.map((highlight) => (
                      <span key={highlight}>{highlight}</span>
                    ))}
                  </div>

                  {hasPrimaryAction && (
                    <div className="project-actions">
                      <a href={primaryHref} target="_blank" rel="noreferrer">
                        <ExternalLink size={17} aria-hidden="true" />
                        {primaryLabel}
                      </a>
                      <a href={project.repoHref} target="_blank" rel="noreferrer">
                        <Github size={17} aria-hidden="true" />
                        GitHub
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EducationAndProjects() {
  return (
    <section className="section-band" id="formacao">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Formação</p>
          <h2>Educação, eventos e projetos</h2>
        </div>

        <div className="formation-layout">
          <div className="formation-column" data-reveal>
            <div className="column-heading">
              <GraduationCap size={22} aria-hidden="true" />
              <h3>Formação superior</h3>
            </div>
            {education.map((item) => (
              <article className="education-item" key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.institution}</span>
                <small>{item.period}</small>
              </article>
            ))}
          </div>

          <div className="formation-column" data-reveal>
            <div className="column-heading">
              <BookOpen size={22} aria-hidden="true" />
              <h3>Eventos e projetos</h3>
            </div>
            <ul className="initiative-list">
              {initiatives.map((initiative) => (
                <li key={initiative}>{initiative}</li>
              ))}
            </ul>
          </div>

          <div className="formation-column accent-column" data-reveal>
            <div className="column-heading">
              <FileText size={22} aria-hidden="true" />
              <h3>Extras</h3>
            </div>
            <div className="extra-list">
              {extras.map((extra) => (
                <div key={extra.label}>
                  {extra.label === 'CNH' ? <Car size={18} aria-hidden="true" /> : <BookOpen size={18} aria-hidden="true" />}
                  <span>{extra.label}</span>
                  <strong>{extra.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { label: 'E-mail', value: profile.email, href: profile.emailHref, icon: Mail },
    { label: 'Telefone', value: profile.phone, href: profile.phoneHref, icon: Phone },
    { label: 'GitHub', value: profile.github, href: profile.githubHref, icon: Github },
    { label: 'LinkedIn', value: profile.linkedin, href: profile.linkedinHref, icon: Linkedin },
  ];

  return (
    <section className="section-band contact-band" id="contato">
      <div className="section-shell">
        <div className="contact-heading" data-reveal>
          <p className="section-kicker">Contato</p>
          <h2>Vamos conversar sobre tecnologia, dados e automação.</h2>
        </div>

        <div className="contact-grid">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <a className="contact-card" href={item.href} key={item.label} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined} data-reveal>
                <span className="icon-box">
                  <Icon size={21} aria-hidden="true" />
                </span>
                <span>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function App() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Objective />
        <Experience />
        <Knowledge />
        <Projects />
        <EducationAndProjects />
        <Contact />
      </main>
      <footer className="footer">
        <span>© 2026 {profile.name}</span>
        <a href="#home">Voltar ao topo</a>
      </footer>
    </>
  );
}

export default App;
