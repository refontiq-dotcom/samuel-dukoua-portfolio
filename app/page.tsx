'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Code2, Layers3, Sparkles, Globe2 } from 'lucide-react';

type Lang = 'fr' | 'en';

const copy = {
  fr: {
    nav: ['Accueil', 'À propos', 'Projets', 'Compétences', 'Parcours', 'Contact'],
    eyebrow: 'DÉVELOPPEUR WEB FULL-STACK',
    headline: <>Du concept au produit :<br /><span>je développe les solutions</span><br />de demain.</>,
    intro: 'Je conçois des applications web et des plateformes numériques pensées pour résoudre des problèmes concrets.',
    cta: 'Découvrir mes projets', contact: 'Me contacter', scroll: 'Défiler pour explorer',
    available: 'Ouvert aux opportunités professionnelles et missions freelance',
    aboutTag: 'QUI SUIS-JE ?', aboutTitle: 'Construire utile. Apprendre sans cesse. Aller plus loin.',
    about: 'Je suis Dukoua Nguessan Samuel Junior, développeur Web Full-Stack autodidacte, passionné par la conception de solutions numériques. Depuis 2015, je développe mes connaissances par l’apprentissage autonome, la pratique et des formations, notamment sur OpenClassrooms. Je transforme des besoins métier en expériences numériques structurées, accessibles et évolutives.',
    focus: ['Applications web', 'Plateformes SaaS', 'Intégrations IA'],
    projectsTag: 'SÉLECTION DE PROJETS', projectsTitle: 'Des idées transformées en produits numériques.',
    projectsIntro: 'Une sélection de projets issus de mon travail de conception et de développement. Les niveaux d’avancement seront précisés pour distinguer les fonctionnalités disponibles des travaux en cours.',
    status: { active: 'Projet en développement', product: 'Produit / plateforme', explore: 'Exploration / conception' },
    stack: 'Technologies et outils', details: 'Voir le dépôt GitHub',
    skillsTag: 'SAVOIR-FAIRE', skillsTitle: 'Des compétences au service du produit.',
    skillGroups: [
      { title: 'Front-end', items: ['Angular', 'React / Next.js', 'Vue.js', 'HTML5 / CSS3', 'JavaScript / TypeScript'] },
      { title: 'Back-end', items: ['Java / Spring Boot', '.NET', 'Node.js', 'Python'] },
      { title: 'API & architecture', items: ['REST / SOAP', 'Microservices', 'Intégration de services', 'Architecture SaaS'] },
      { title: 'Bases de données', items: ['Oracle', 'PostgreSQL / Supabase', 'SQL Server', 'MongoDB'] },
      { title: 'DevOps & livraison', items: ['Git / GitHub', 'CI / CD', 'Docker', 'Kubernetes'] },
      { title: 'Sécurité applicative', items: ['JWT HS256 et validation des claims', 'Sessions révocables et rotation des refresh tokens', 'Cookies HttpOnly / SameSite / Secure', 'CSP avec Helmet', 'Prévention XSS et validation des sorties', 'Logs structurés et masquage des données sensibles'] }
    ],
    journeyTag: 'PARCOURS', journeyTitle: 'Un apprentissage construit dans la durée.',
    journeyStart: '2015 — Début de mon apprentissage du développement web', journeyDesc: 'Apprentissage autonome, pratique personnelle et formations en ligne, notamment sur OpenClassrooms.',
    education: 'Formation & niveau', educationDesc: 'BEPC obtenu · Niveau Terminale. Formations complémentaires en ligne.',
    contactTag: 'ET SI NOUS CONSTRUISIONS QUELQUE CHOSE ?', contactTitle: 'Parlons de votre prochain projet.',
    contactDesc: 'Je suis ouvert aux opportunités en entreprise, au télétravail et aux missions freelance en Côte d’Ivoire, en Afrique et à l’international.',
    email: 'M’écrire', footer: 'Conçu avec intention. Développé avec passion.', rights: 'Tous droits réservés.',
    cvDownload: 'Télécharger mon CV', cvOther: 'Version anglaise', location: 'Côte d’Ivoire · Ouvert à l’international',
    experienceTitle: 'Expériences professionnelles',
    experienceDesc: 'Opérateur de vidéosurveillance — SOLIBRA (2023–2025), PULLMAN Hôtel (2018–2020) et FILTISAC (2017–2018) · Chef d’équipe — Unilever Côte d’Ivoire (2021–2022).',
    projectNames: ['Séjoura', 'Trouvetou', 'Schooly', 'Refontiq Control Center', 'TechPilot', 'Transora'],
    projectDescriptions: [
      'Solution SaaS de gestion pour résidences meublées : organisation des établissements, chambres et réservations.',
      'Portail de découverte et de mise en relation autour de services et d’établissements. Le périmètre présenté sera limité aux fonctions vérifiées.',
      'Projet SaaS de gestion scolaire destiné aux établissements en Côte d’Ivoire et en Afrique de l’Ouest.',
      'Tableau de bord centralisé conçu pour superviser l’écosystème de produits Refontiq.',
      'Concept de plateforme métier pour les professionnels de l’électronique : diagnostic, suivi et opérations commerciales.',
      'Plateforme de gestion des opérations de transport interurbain, avec un travail concret de renforcement de la sécurité applicative.'
    ],
    transoraSecurityLabel: 'Sécurité applicative renforcée',
    transoraSecurity: ['JWT stricts : HS256, émetteur, audience et expiration', 'Sessions révocables et rotation des refresh tokens stockés sous forme de hash', 'Cookies HttpOnly, SameSite Strict et Secure en production', 'CSP avec Helmet et protections ciblées contre les injections XSS', 'Journalisation Pino avec masquage des données sensibles, tests Vitest et CI'],
    projectStatus: ['Produit en développement', 'Produit en développement', 'Produit en développement', 'Outil interne en développement', 'Conception / développement', 'Conception / développement']
  },
  en: {
    nav: ['Home', 'About', 'Projects', 'Skills', 'Journey', 'Contact'],
    eyebrow: 'FULL-STACK WEB DEVELOPER',
    headline: <>From concept to product:<br /><span>I build the solutions</span><br />of tomorrow.</>,
    intro: 'I design web applications and digital platforms built to solve real-world problems.',
    cta: 'Explore my projects', contact: 'Get in touch', scroll: 'Scroll to explore',
    available: 'Open to professional opportunities and freelance projects',
    aboutTag: 'WHO AM I?', aboutTitle: 'Build with purpose. Keep learning. Go further.',
    about: 'I am Dukoua Nguessan Samuel Junior, a self-taught Full-Stack Web Developer passionate about building digital solutions. Since 2015, I have developed my skills through independent learning, hands-on practice and online training, including OpenClassrooms. I turn business needs into structured, accessible and scalable digital experiences.',
    focus: ['Web applications', 'SaaS platforms', 'AI integrations'],
    projectsTag: 'SELECTED WORK', projectsTitle: 'Ideas turned into digital products.',
    projectsIntro: 'A selection of projects from my product design and development work. Project status will be made explicit to distinguish available features from ongoing work.',
    status: { active: 'In development', product: 'Product / platform', explore: 'Exploration / design' },
    stack: 'Technologies & tools', details: 'View GitHub repository',
    skillsTag: 'CAPABILITIES', skillsTitle: 'Skills that serve the product.',
    skillGroups: [
      { title: 'Front-end', items: ['Angular', 'React / Next.js', 'Vue.js', 'HTML5 / CSS3', 'JavaScript / TypeScript'] },
      { title: 'Back-end', items: ['Java / Spring Boot', '.NET', 'Node.js', 'Python'] },
      { title: 'APIs & architecture', items: ['REST / SOAP', 'Microservices', 'Service integration', 'SaaS architecture'] },
      { title: 'Databases', items: ['Oracle', 'PostgreSQL / Supabase', 'SQL Server', 'MongoDB'] },
      { title: 'DevOps & delivery', items: ['Git / GitHub', 'CI / CD', 'Docker', 'Kubernetes'] },
      { title: 'Application security', items: ['JWT HS256 and claims validation', 'Revocable sessions and refresh-token rotation', 'HttpOnly / SameSite / Secure cookies', 'CSP with Helmet', 'XSS prevention and output validation', 'Structured logs and sensitive-data redaction'] }
    ],
    journeyTag: 'JOURNEY', journeyTitle: 'A learning path built over time.',
    journeyStart: '2015 — Began learning web development', journeyDesc: 'Self-directed learning, hands-on practice and online training, including OpenClassrooms.',
    education: 'Education', educationDesc: 'BEPC certificate · Upper secondary level (Terminale). Additional online training.',
    contactTag: 'LET’S BUILD SOMETHING', contactTitle: 'Let’s talk about your next project.',
    contactDesc: 'Open to employment, remote work and freelance opportunities in Côte d’Ivoire, across Africa and internationally.',
    email: 'Send me an email', footer: 'Designed with intent. Built with passion.', rights: 'All rights reserved.',
    cvDownload: 'Download my resume', cvOther: 'French version', location: 'Côte d’Ivoire · Open to international opportunities',
    experienceTitle: 'Professional experience',
    experienceDesc: 'Video surveillance operator — SOLIBRA (2023–2025), PULLMAN Hotel (2018–2020) and FILTISAC (2017–2018) · Team leader — Unilever Côte d’Ivoire (2021–2022).',
    projectNames: ['Séjoura', 'Trouvetou', 'Schooly', 'Refontiq Control Center', 'TechPilot', 'Transora'],
    projectDescriptions: [
      'SaaS solution for furnished residence management, including property, room and reservation workflows.',
      'Discovery and connection platform for services and establishments. Public claims will be limited to verified functionality.',
      'School management SaaS project designed for institutions in Côte d’Ivoire and West Africa.',
      'Centralized dashboard designed to oversee the Refontiq product ecosystem.',
      'Business platform concept for electronics professionals: diagnostics, tracking and commercial operations.',
      'Intercity transport operations platform, including hands-on application security hardening.'
    ],
    transoraSecurityLabel: 'Application security hardening',
    transoraSecurity: ['Strict JWT validation: HS256, issuer, audience and expiry', 'Revocable sessions and hashed refresh-token rotation', 'HttpOnly, SameSite Strict and Secure cookies in production', 'Helmet CSP and targeted XSS-injection safeguards', 'Pino logging with sensitive-data redaction, Vitest regression tests and CI'],
    projectStatus: ['In development', 'In development', 'In development', 'Internal tool in development', 'Design / development', 'Design / development']
  }
};

const projects = [
  { key: 'sejoura', repo: 'https://github.com/refontiq-dotcom/Sejoura', tags: ['Next.js', 'React', 'TypeScript', 'Supabase'] },
  { key: 'trouvetou', repo: 'https://github.com/refontiq-dotcom/Trouvetou', tags: ['Next.js', 'React', 'Supabase', 'Photo Sphere'] },
  { key: 'schooly', repo: 'https://github.com/refontiq-dotcom/schooly', tags: ['Next.js', 'TypeScript', 'Supabase', 'Monorepo'] },
  { key: 'control', repo: 'https://github.com/refontiq-dotcom/refontiq-control-center', tags: ['Next.js', 'React', 'Supabase', 'TypeScript'] },
  { key: 'techpilot', repo: 'https://github.com/refontiq-dotcom/TechPilot', tags: ['Product design', 'Business workflows'] },
  { key: 'transora', repo: 'https://github.com/refontiq-dotcom/Transora', tags: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'JWT', 'Helmet', 'Pino', 'Vitest'] }
];

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const navIds = ['home', 'about', 'projects', 'skills', 'journey', 'contact'];
  const projectList = useMemo(() => projects.map((p, i) => ({ ...p, name: t.projectNames[i], description: t.projectDescriptions[i], status: t.projectStatus[i] })), [t]);
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Samuel — Home">S<span>.</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {t.nav.map((item, i) => <a key={item} href={`#${navIds[i]}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="top-actions">
          <button className="lang" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} aria-label="Switch language"><Globe2 size={15} /> {lang.toUpperCase()}</button>
          <a className="nav-contact" href="#contact">{t.contact} <ArrowUpRight size={15}/></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"/> {t.eyebrow}</div>
          <h1>{t.headline}</h1>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects">{t.cta} <ArrowUpRight size={17}/></a>
            <a className="button-quiet" href="#contact">{t.contact}</a>
            <div className="cv-actions">
              <a className="cv-link" href={lang === 'fr' ? '/CV-Samuel-Dukoua-FR.pdf' : '/Resume-Samuel-Dukoua-EN.pdf'} download>{t.cvDownload} <ArrowDown size={14}/></a>
              <a className="cv-other" href={lang === 'fr' ? '/Resume-Samuel-Dukoua-EN.pdf' : '/CV-Samuel-Dukoua-FR.pdf'} download>{t.cvOther}</a>
            </div>
          </div>
          <div className="availability"><span/> {t.available}</div>
        </div>
        <div className="hero-art hero-portrait-art" aria-label="Portrait professionnel de Dukoua Nguessan Samuel Junior">
          <div className="portrait-halo portrait-halo-one"/>
          <div className="portrait-halo portrait-halo-two"/>
          <div className="portrait-backplate">
            <Image src="/samuel-dukoua.jpg" alt="Portrait de Dukoua Nguessan Samuel Junior" width={420} height={560} priority className="portrait-image"/>
          </div>
          <div className="tech-orbit orbit-ring-a" aria-hidden="true" />
          <div className="tech-orbit orbit-ring-b" aria-hidden="true" />
          <div className="tech-orbit orbit-ring-c" aria-hidden="true" />
          <div className="tech-float tech-html"><b>5</b><span>HTML</span></div>
          <div className="tech-float tech-css"><b>✳</b><span>CSS</span></div>
          <div className="tech-float tech-js"><b>JS</b><span>JavaScript</span></div>
          <div className="tech-float tech-ts"><b>TS</b><span>TypeScript</span></div>
          <div className="tech-float tech-react"><b>◉</b><span>React</span></div>
          <div className="tech-float tech-next"><b>N</b><span>Next.js</span></div>
          <div className="tech-float tech-node"><b>⬡</b><span>Node.js</span></div>
          <div className="tech-float tech-db"><b>▤</b><span>PostgreSQL</span></div>
          <div className="tech-float tech-supa"><b>◈</b><span>Supabase</span></div>
          <div className="tech-float tech-git"><b>⌘</b><span>Git</span></div>
          <div className="portrait-caption"><span>DUKOUA NGUESSAN SAMUEL JUNIOR</span><small>FULL-STACK WEB DEVELOPER · SINCE 2015</small></div>
        </div>
        <a className="scroll-hint" href="#about"><ArrowDown size={14}/> {t.scroll}</a>
        <div className="hero-index">01 / 06</div>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="section-kicker">{t.aboutTag}</div>
        <div className="about-grid">
          <h2>{t.aboutTitle}</h2>
          <div><p className="body-copy">{t.about}</p><div className="focus-list">{t.focus.map((f,i)=><span key={f}><i>0{i+1}</i>{f}</span>)}</div></div>
        </div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <div className="section-kicker">{t.projectsTag}</div>
        <div className="section-heading"><h2>{t.projectsTitle}</h2><p>{t.projectsIntro}</p></div>
        <div className="project-grid">
          {projectList.map((p,i)=><article className={`project-card project-${i+1}`} key={p.key}>
            <div className="project-visual">
              <div className="visual-top"><span>PROJECT / 0{i+1}</span><span className="visual-dot"/></div>
              <div className="visual-symbol">{i===0?<Layers3/>:i===1?<Globe2/>:i===2?<Code2/>:i===3?<Sparkles/>:<Code2/>}</div>
              <div className="visual-lines"><i/><i/><i/></div>
              <span className="visual-name">{p.name}</span>
            </div>
            <div className="project-info">
              <div className="project-meta"><span>{p.status}</span><span>0{i+1}</span></div>
              <h3>{p.name}</h3><p>{p.description}</p>
              {p.key === 'transora' && <div className="project-security"><strong>{t.transoraSecurityLabel}</strong><ul>{t.transoraSecurity.map((item) => <li key={item}>{item}</li>)}</ul></div>}
              <div className="tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
              <a className="repo-link" href={p.repo} target="_blank" rel="noreferrer">{t.details} <ArrowUpRight size={15}/></a>
            </div>
          </article>)}
        </div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <div className="section-kicker">{t.skillsTag}</div><h2>{t.skillsTitle}</h2>
        <div className="skills-grid">{t.skillGroups.map((g,i)=><article className="skill-card" key={g.title}><div className="skill-num">0{i+1}</div><h3>{g.title}</h3><ul>{g.items.map(x=><li key={x}>{x}</li>)}</ul></article>)}</div>
      </section>

      <section className="section-wrap journey-section" id="journey">
        <div className="section-kicker">{t.journeyTag}</div><h2>{t.journeyTitle}</h2>
        <div className="timeline">
          <div className="timeline-item"><span className="timeline-dot"/><div><div className="timeline-date">2015 — PRESENT</div><h3>{t.journeyStart}</h3><p>{t.journeyDesc}</p></div></div>
          <div className="timeline-item"><span className="timeline-dot"/><div><div className="timeline-date">2017 — 2025</div><h3>{t.experienceTitle}</h3><p>{t.experienceDesc}</p></div></div>
          <div className="timeline-item"><span className="timeline-dot"/><div><div className="timeline-date">EDUCATION</div><h3>{t.education}</h3><p>{t.educationDesc}</p></div></div>
        </div>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <div className="section-kicker">{t.contactTag}</div><h2>{t.contactTitle}</h2><p>{t.contactDesc}</p>
        <a className="contact-email" href="mailto:dukouas@gmail.com">dukouas@gmail.com <ArrowUpRight size={22}/></a>
        <div className="socials">
          <a href="https://github.com/refontiq-dotcom" target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a>
          <a href="https://www.linkedin.com/in/samuel-dukoua-maintenant" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a>
          <a href="https://wa.me/2250503640614" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a>
        </div>
        <div className="location">{t.location}</div>
      </section>

      <footer className="footer"><a className="brand" href="#home">S<span>.</span></a><span>{t.footer}</span><span>© {new Date().getFullYear()} Dukoua Nguessan Samuel Junior. {t.rights}</span></footer>
    </main>
  );
}
