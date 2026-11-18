'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';

type Lang = 'fr' | 'en';

const copy = {
  fr: {
    nav: ['Accueil', 'Compétences', 'À propos', 'Projets', 'Contact'],
    greeting: 'Bonjour, je suis',
    role: 'Développeur web full-stack',
    intro: 'Je conçois des applications web et des plateformes SaaS utiles, structurées et évolutives.',
    work: 'Voir mes projets',
    contact: 'Me contacter',
    download: 'Télécharger mon CV',
    languageLabel: 'Afficher la version anglaise',
    location: 'Côte d’Ivoire · Ouvert à l’international',
    portraitNote: 'Du besoin métier au produit.',
    since: 'Apprentissage de la programmation commencé en 2015',
    skillsTag: 'SAVOIR-FAIRE',
    skillsTitle: 'Les compétences au service du produit.',
    skillsIntro: 'Des compétences illustrées par les technologies et fonctions de mes projets.',
    showSkillDetails: 'Voir le d\u00e9tail',
    hideSkillDetails: 'Masquer le d\u00e9tail',
    skillProjectsLabel: 'Exemples de projets',
    skillCards: [
      { title: 'Langages & données', detail: 'TypeScript, JavaScript, SQL, PostgreSQL', more: 'TypeScript dans Transora, Séjoura et Schooly. PostgreSQL et SQL structurent les données métier de ces applications.' },
      { title: 'Front-end & UX', detail: 'React, Next.js, Tailwind CSS, Responsive design', more: 'Next.js et React dans Séjoura, Trouvetou et Schooly. Tailwind CSS est utilisé dans les interfaces de ces projets.' },
      { title: 'Back-end & API', detail: 'Node.js, Express, API REST, Supabase, Webhooks', more: 'Transora utilise une API Node.js/Express avec PostgreSQL. Séjoura et Schooly s’appuient sur Supabase; Séjoura documente des webhooks.' },
      { title: 'Sécurité & intégration continue', detail: 'Git/GitHub, GitHub Actions CI, JWT, authentification, RLS', more: 'Les dépôts contiennent des workflows GitHub Actions. Transora utilise JWT; Séjoura et Schooly documentent l’authentification et les règles RLS de Supabase.' },
      { title: 'Architecture & méthodes', detail: 'SaaS multi-tenant, flux Wave optionnel, IA assistée', more: 'Transora et Schooly documentent l’isolation multi-tenant. Séjoura propose un flux Wave optionnel. Les formations OpenClassrooms abordent les agents IA et le vibe coding.' }
    ],
    aboutTag: 'À PROPOS',
    aboutTitle: 'Un parcours construit par la pratique.',
    about: 'J’ai commencé à apprendre la programmation sur OpenClassrooms en 2015, puis réalisé mon premier projet de création de site internet en 2017. Depuis, je poursuis régulièrement des formations sur OpenClassrooms : le développement web est une passion qui me pousse à actualiser mes compétences et à rester au fait des évolutions du métier. Mon expérience en environnement opérationnel a aussi renforcé ma rigueur, mon sens des responsabilités et mon goût du travail en équipe.',
    milestones: [
      { date: '2015', label: 'Début de mon apprentissage de la programmation sur OpenClassrooms' },
      { date: '2017', label: 'Réalisation de mon premier projet de création de site internet' },
      { date: 'Aujourd’hui', label: 'Formations continues sur OpenClassrooms pour rester à jour' },
    ],
    projectsTag: 'PROJETS SÉLECTIONNÉS',
    projectsTitle: 'Des produits numériques pensés pour des usages réels.',
    projectsIntro: 'Quelques projets représentatifs de mon travail en conception et développement full-stack.',
    allProjects: 'Voir tous mes dépôts',
    projectLink: 'Visiter le site',
    sourceLink: 'Voir le code source',
    projectVisualNotes: { transora: 'Illustration', sejoura: 'Capture du tableau de bord', trouvetou: 'Logo du projet', schooly: 'Illustration', control: 'Illustration' },
    projectNames: { transora: 'Transora', sejoura: 'Séjoura', trouvetou: 'Trouvetou', schooly: 'Schooly', control: 'Refontiq Control Center' },
    projectStatus: { transora: 'En développement', sejoura: 'Plateforme SaaS', trouvetou: 'Portail de réservation', schooly: 'En développement', control: 'Console de gestion' },
    projectDescriptions: {
      transora: 'API SaaS de transport interurbain : réservations, gestion des places et billets QR. Le paiement est intégré via l’API de l’opérateur et s’active après configuration des identifiants fournis par celui-ci.',
      sejoura: 'Gestion de résidences meublées, réservations et factures; le flux de paiement Wave est optionnel selon la configuration.',
      trouvetou: 'Portail de découverte d’hôtels, d’écoles et de cliniques avec réservation en ligne.',
      schooly: 'Réservation de places scolaires et gestion d’établissements, connectée à Trouvetou.',
      control: 'Tableau de bord centralisé pour l’écosystème Refontiq.',
    },
    projectTags: {
      transora: ['Node.js', 'Express', 'PostgreSQL', 'TypeScript'],
      sejoura: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      trouvetou: ['Next.js', 'React', 'Supabase', 'Tailwind CSS'],
      schooly: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      control: ['Refontiq'],
    },
    illustrationLabel: { transora: 'RÉSERVATIONS & BILLETS', schooly: 'GESTION SCOLAIRE' },
    contactTag: 'TRAVAILLONS ENSEMBLE',
    contactTitle: 'Un projet web à construire ?',
    contactText: 'Je suis ouvert aux opportunités en entreprise et aux missions freelance, en Côte d’Ivoire et à l’international.',
    emailAction: 'Parlons de votre projet',
    footerLine: 'Conçu avec intention. Développé avec soin.',
    rights: 'Tous droits réservés.',
  },
  en: {
    nav: ['Home', 'Skills', 'About', 'Projects', 'Contact'],
    greeting: 'Hello, I’m',
    role: 'Full-stack web developer',
    intro: 'I build useful, well-structured and scalable web applications and SaaS platforms.',
    work: 'Explore my work',
    contact: 'Get in touch',
    download: 'Download my CV',
    languageLabel: 'Switch to French',
    location: 'Côte d’Ivoire · Open to international opportunities',
    portraitNote: 'From business needs to products.',
    since: 'Started learning programming in 2015',
    skillsTag: 'CORE SKILLS',
    skillsTitle: 'Skills that serve the product.',
    skillsIntro: 'Skills shown through the technologies and features in my projects.',
    showSkillDetails: 'Show details',
    hideSkillDetails: 'Hide details',
    skillProjectsLabel: 'Related projects',
    skillCards: [
      { title: 'Languages & data', detail: 'TypeScript, JavaScript, SQL, PostgreSQL', more: 'TypeScript in Transora, Séjoura and Schooly. PostgreSQL and SQL structure the business data in these applications.' },
      { title: 'Frontend & UX', detail: 'React, Next.js, Tailwind CSS, Responsive design', more: 'Next.js and React in Séjoura, Trouvetou and Schooly. Tailwind CSS is used in these project interfaces.' },
      { title: 'Backend & APIs', detail: 'Node.js, Express, REST APIs, Supabase, Webhooks', more: 'Transora uses a Node.js/Express API with PostgreSQL. Séjoura and Schooly use Supabase; Séjoura documents webhook flows.' },
      { title: 'Security & continuous integration', detail: 'Git/GitHub, GitHub Actions CI, JWT, authentication, RLS', more: 'The repositories include GitHub Actions workflows. Transora uses JWT; Séjoura and Schooly document Supabase authentication and RLS policies.' },
      { title: 'Architecture & methods', detail: 'Multi-tenant SaaS, optional Wave flow, AI-assisted development', more: 'Transora and Schooly document multi-tenant isolation. Séjoura documents an optional Wave flow. OpenClassrooms training covers AI agents and vibe coding.' }
    ],
    aboutTag: 'ABOUT ME',
    aboutTitle: 'A path built through practice.',
    about: 'I began learning programming on OpenClassrooms in 2015 and completed my first website creation project in 2017. I have continued taking courses on OpenClassrooms ever since; web development is a passion that motivates me to keep my skills current and follow changes in the field. My operations experience has also strengthened my attention to detail, sense of responsibility and teamwork.',
    milestones: [
      { date: '2015', label: 'Started learning programming on OpenClassrooms' },
      { date: '2017', label: 'Completed my first website creation project' },
      { date: 'Today', label: 'Ongoing OpenClassrooms training to keep my skills current' },
    ],
    projectsTag: 'SELECTED PROJECTS',
    projectsTitle: 'Digital products shaped around real needs.',
    projectsIntro: 'A few examples of my product design and full-stack development work.',
    allProjects: 'View all repositories',
    projectLink: 'Visit the site',
    sourceLink: 'View source code',
    projectVisualNotes: { transora: 'Illustration', sejoura: 'Dashboard screenshot', trouvetou: 'Project logo', schooly: 'Illustration', control: 'Illustration' },
    projectNames: { transora: 'Transora', sejoura: 'Séjoura', trouvetou: 'Trouvetou', schooly: 'Schooly', control: 'Refontiq Control Center' },
    projectStatus: { transora: 'In development', sejoura: 'SaaS platform', trouvetou: 'Booking portal', schooly: 'In development', control: 'Management console' },
    projectDescriptions: {
      transora: 'Intercity transport SaaS API: bookings, seat management and QR tickets. Payments use the operator’s API and can be enabled by configuring the credentials supplied by that operator.',
      sejoura: 'Furnished residence management, bookings and invoices; the Wave payment flow is optional and configuration-dependent.',
      trouvetou: 'Discovery portal for hotels, schools and clinics with online booking.',
      schooly: 'School-seat reservations and institution management, connected to Trouvetou.',
      control: 'Centralized dashboard for the Refontiq ecosystem.',
    },
    projectTags: {
      transora: ['Node.js', 'Express', 'PostgreSQL', 'TypeScript'],
      sejoura: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      trouvetou: ['Next.js', 'React', 'Supabase', 'Tailwind CSS'],
      schooly: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      control: ['Refontiq'],
    },
    illustrationLabel: { transora: 'BOOKINGS & TICKETS', schooly: 'SCHOOL MANAGEMENT' },
    contactTag: 'LET’S WORK TOGETHER',
    contactTitle: 'Have a web project in mind?',
    contactText: 'I’m open to in-house opportunities and freelance projects in Côte d’Ivoire and internationally.',
    emailAction: 'Let’s talk about your project',
    footerLine: 'Designed with intention. Built with care.',
    rights: 'All rights reserved.',
  },
} as const;

const projectItems: Array<{
  key: keyof typeof copy.fr.projectNames;
  live: string;
  repo: string | null;
  visual: 'transora' | 'sejoura' | 'trouvetou' | 'schooly' | 'control';
}> = [
  { key: 'transora', live: 'https://transora.refontiq.com/', repo: 'https://github.com/refontiq-dotcom/Transora', visual: 'transora' },
  { key: 'sejoura', live: 'https://sejoura.refontiq.com/', repo: 'https://github.com/refontiq-dotcom/Sejoura', visual: 'sejoura' },
  { key: 'trouvetou', live: 'https://trouvetou.refontiq.com/', repo: 'https://github.com/refontiq-dotcom/Trouvetou', visual: 'trouvetou' },
  { key: 'schooly', live: 'https://schooly.refontiq.com/', repo: 'https://github.com/refontiq-dotcom/schooly', visual: 'schooly' },
  { key: 'control', live: 'https://control.refontiq.com/', repo: null, visual: 'control' },
];

const skillIllustrations = ['/skills/core-stack.svg', '/skills/frontend-ux.svg', '/skills/backend-data.svg', '/skills/devops-security.svg', '/skills/methods-ai.svg'];
const skillProjectRefs = [['transora', 'sejoura', 'schooly'], ['sejoura', 'trouvetou', 'schooly'], ['transora', 'sejoura', 'schooly'], ['transora', 'sejoura', 'schooly'], ['transora', 'sejoura', 'schooly']] as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const t = copy[lang];
  const navIds = ['home', 'skills', 'about', 'projects', 'contact'];
  const cvHref = lang === 'fr' ? '/CV-Samuel-Dukoua-FR.pdf' : '/Resume-Samuel-Dukoua-EN.pdf';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Samuel, accueil">S<span>.</span></a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}>
          {t.nav.map((item, i) => (
            <a key={item} href={`#${navIds[i]}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="lang" onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} aria-label={t.languageLabel}>
            <Globe2 size={15} /> {lang.toUpperCase()}
          </button>
          <a className="header-download" href={cvHref} download>{t.download}<ArrowDown size={14} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-inner section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" />{t.greeting}</div>
            <h1><span>Dukoua<br className="mobile-name-break" /> Nguessan</span><span className="name-accent">Samuel Junior</span></h1>
            <p className="hero-role">{t.role}</p>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">{t.work}<ArrowRight size={16} /></a>
              <a className="button-secondary" href="#contact">{t.contact}<Mail size={15} /></a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/refontiq-dotcom" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
              <a href="https://www.linkedin.com/in/samuel-dukoua-maintenant" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
              <span className="social-divider" />
              <span className="hero-location">{t.location}</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Portrait professionnel de Dukoua Nguessan Samuel Junior">
            <div className="hero-shape" />
            <div className="hero-shape-shadow" />
            <Image src="/samuel-dukoua-transparent.png" unoptimized alt={lang === 'fr' ? 'Portrait de Dukoua Nguessan Samuel Junior' : 'Portrait of Dukoua Nguessan Samuel Junior'} width={400} height={515} priority className="hero-portrait" />
            <div className="portrait-note"><span>{t.portraitNote}</span><i /></div>
            <div className="portrait-caption"><strong>DUKOUA NGUESSAN SAMUEL JUNIOR</strong><small>{t.since}</small></div>
          </div>
        </div>
      </section>

      <section className="section-wrap skills-section" id="skills">
        <div className="skills-heading">
          <div className="section-kicker">{t.skillsTag}</div>
          <h2>{t.skillsTitle}</h2>
          <p>{t.skillsIntro}</p>
        </div>
        <div className="skill-cards">
          {t.skillCards.map((skill, index) => {
            const illustration = skillIllustrations[index];
            const isOpen = openSkill === index;
            return (
              <article className={isOpen ? 'skill-card skill-card-open' : 'skill-card'} key={skill.title}>
                <div className="skill-visual"><Image src={illustration} alt="" fill sizes="(max-width: 700px) 42vw, (max-width: 1080px) 29vw, 13vw" /></div>
                <h3>{skill.title}</h3>
                <p>{skill.detail}</p>
                <button type="button" className="skill-detail-toggle" aria-expanded={isOpen} aria-controls={'skill-detail-' + index} onClick={() => setOpenSkill(isOpen ? null : index)}>
                  {isOpen ? t.hideSkillDetails : t.showSkillDetails}<ChevronDown size={14} className={isOpen ? 'chevron-open' : ''} />
                </button>
                <div id={'skill-detail-' + index} className="skill-detail-panel" hidden={!isOpen}>
                  <p>{skill.more}</p>
                  <span className="skill-projects-label">{t.skillProjectsLabel}</span>
                  <div className="skill-project-links">
                    {skillProjectRefs[index].map((projectKey) => {
                      const project = projectItems.find((item) => item.key === projectKey);
                      return project?.repo ? <a href={project.repo} target="_blank" rel="noreferrer" key={projectKey}>{t.projectNames[projectKey]}</a> : null;
                    })}
                  </div>
                </div>
                <span className="skill-card-line" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="section-wrap about-grid">
          <div className="about-column">
            <div className="about-visual">
              <div className="about-blob" />
              <div className="about-photo-frame"><Image src="/full%20stack.jpeg" alt={lang === 'fr' ? 'Dukoua Nguessan Samuel Junior travaillant sur son ordinateur' : 'Dukoua Nguessan Samuel Junior working at his computer'} fill sizes="(max-width: 760px) 90vw, 45vw" className="about-photo" /></div>
              <div className="about-year"><strong>2015</strong><span>{lang === 'fr' ? 'Début de l’apprentissage sur OpenClassrooms' : 'Started learning on OpenClassrooms'}</span></div>
              <div className="about-stamp">FULL-STACK<br />DEVELOPMENT</div>
            </div>
            <div className="about-path">
              {t.milestones.map((item, index) => (
                <div className="milestone" key={item.date}>
                  <span className="milestone-dot">0{index + 1}</span>
                  <div><strong>{item.date}</strong><p>{item.label}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-copy">
            <div className="section-kicker">{t.aboutTag}</div>
            <h2>{t.aboutTitle}</h2>
            <p>{t.about}</p>
            <a className="text-link" href={cvHref} download>{t.download}<ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="section-wrap projects-section" id="projects">
        <div className="projects-heading">
          <div>
            <div className="section-kicker">{t.projectsTag}</div>
            <h2>{t.projectsTitle}</h2>
            <p>{t.projectsIntro}</p>
          </div>
          <a className="text-link all-projects" href="https://github.com/refontiq-dotcom" target="_blank" rel="noreferrer">{t.allProjects}<ArrowUpRight size={15} /></a>
        </div>

        <div className="project-grid">
          {projectItems.map((project, index) => (
            <article className={`project-card project-${project.visual}`} key={project.key}>
              <a className="project-image-link" href={project.live} target="_blank" rel="noreferrer" aria-label={`${t.projectNames[project.key]} - ${t.projectLink}`}>
                {project.visual === 'sejoura' ? (
                  <Image src="/projects/sejoura-dashboard.jpg" alt="Aperçu du tableau de bord de Séjoura" fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 44vw, 24vw" className="project-image" />
                ) : project.visual === 'trouvetou' ? (
                  <div className="project-art trouvetou-art"><span className="art-overline">TROUVETOU</span><Image src="/projects/trouvetou-logo.png" alt="" width={900} height={313} className="trouvetou-logo" /><span className="art-caption">DISCOVER · CONNECT · EXPLORE</span></div>
                ) : project.visual === 'transora' ? (
                  <div className="project-art transora-art">
                    <div className="art-window-top"><span>TRANSORA</span><i /><i /><i /></div>
                    <div className="ticket-preview"><div className="ticket-label">{t.illustrationLabel.transora}</div><div className="route-line"><span /><i /><span /></div><div className="seat-preview"><b /><b /><b /><b /><b /><b /></div><div className="ticket-footer"><span /><span /></div></div>
                    <span className="art-index">01 / TRAVEL PLATFORM</span>
                  </div>
                ) : project.visual === 'schooly' ? (
                  <Image src="/projects/schooly-dashboard.svg" alt={lang === 'fr' ? 'Illustration du tableau de bord Schooly : inscriptions, reservations et places par niveau' : 'Illustration of the Schooly dashboard: applications, reservations and seats by grade'} fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 44vw, 24vw" className="project-image" />
                ) : (
                  <div className="project-art control-art" aria-hidden="true"><div className="control-topbar"><span>REFONTIQ</span><i /><i /><i /></div><div className="control-layout"><div className="control-rail"><b /><b /><b /><b /></div><div className="control-dashboard"><span /><span /><span /><div className="control-chart"><i /><i /><i /><i /><i /><i /></div><div className="control-table"><i /><i /><i /></div></div></div></div>
                )}
                <span className="project-visual-note">{t.projectVisualNotes[project.key]}</span>
                <span className="project-image-arrow"><ArrowUpRight size={17} /></span>
              </a>
              <div className="project-info">
                <div className="project-meta"><span>{t.projectStatus[project.key]}</span><span>0{index + 1}</span></div>
                <h3>{t.projectNames[project.key]}</h3>
                <p>{t.projectDescriptions[project.key]}</p>
                <div className="project-tags">{t.projectTags[project.key].map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions"><a className="repo-link" href={project.live} target="_blank" rel="noreferrer">{t.projectLink}<ArrowUpRight size={14} /></a>{project.repo && <a className="repo-link source-link" href={project.repo} target="_blank" rel="noreferrer">{t.sourceLink}<Github size={13} /></a>}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap contact-section" id="contact">
        <div className="contact-shape contact-shape-one" />
        <div className="contact-shape contact-shape-two" />
        <div className="contact-content">
          <div className="section-kicker">{t.contactTag}</div>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>
        <a className="button-contact" href="mailto:dukouas@gmail.com">{t.emailAction}<ArrowRight size={16} /></a>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">S<span>.</span></a>
        <span>{t.footerLine}</span>
        <div className="footer-socials">
          <a href="https://github.com/refontiq-dotcom" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a href="https://www.linkedin.com/in/samuel-dukoua-maintenant" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href="mailto:dukouas@gmail.com" aria-label="E-mail"><Mail size={16} /></a>
        </div>
        <small>© {new Date().getFullYear()} Dukoua Nguessan Samuel Junior. {t.rights}</small>
      </footer>
    </main>
  );
}