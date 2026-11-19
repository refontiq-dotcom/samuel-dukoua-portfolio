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
    skipLink: 'Aller au contenu principal',
    nav: ['Accueil', 'Compétences', 'Parcours', 'Projets', 'Contact'],
    greeting: 'Bonjour, je suis',
    role: 'Développeur Full Stack',
    specialty: 'SaaS Builder · Product Engineer',
    intro: 'Fondateur de REFONTIQ, je transforme des besoins métier en produits numériques : cadrage, architecture, interfaces, API et intégrations. Basé en Côte d’Ivoire, ouvert aux opportunités internationales.',
    work: 'Voir mes projets',
    contact: 'Me contacter',
    download: 'Télécharger mon CV',
    languageLabel: 'Afficher la version anglaise',
    location: 'Fondateur de REFONTIQ · Côte d’Ivoire · Opportunités internationales',
    portraitNote: 'Du besoin métier au produit.',
    since: 'Apprentissage de la programmation commencé en 2015',
    skillsTag: 'SAVOIR-FAIRE',
    skillsTitle: 'Les compétences au service du produit.',
    skillsIntro: 'Des compétences illustrées par les technologies et fonctions de mes projets.',
    showSkillDetails: 'Voir le d\u00e9tail',
    hideSkillDetails: 'Masquer le d\u00e9tail',
    skillProjectsLabel: 'Exemples de projets',
    skillCards: [
      { title: 'Langages & données', detail: 'TypeScript, JavaScript, SQL, PostgreSQL', more: 'TypeScript dans Transora, Séjoura et Schooly. SQL et PostgreSQL structurent les données métier de Transora.' },
      { title: 'Développement frontend', detail: 'React, Next.js, Tailwind CSS, interfaces adaptatives', more: 'Interfaces Next.js et React dans Séjoura, Trouvetou et Schooly, avec Tailwind CSS.' },
      { title: 'Backend & API', detail: 'Node.js, Express, API REST, Supabase, webhooks', more: 'API Node.js/Express et PostgreSQL dans Transora. Séjoura et Schooly utilisent Supabase; Séjoura documente des webhooks Wave.' },
      { title: 'Bases de données & sécurité', detail: 'PostgreSQL, Supabase, JWT, authentification, RLS', more: 'JWT dans Transora; politiques RLS et authentification Supabase dans Séjoura et Schooly. Les dépôts incluent des contrôles CI.' },
      { title: 'Architecture SaaS & produit', detail: 'Multi-tenant, conception métier, cycle produit', more: 'Transora et Schooly documentent l’isolation multi-tenant. Les projets couvrent le cadrage produit, les règles métier et leur implémentation.' },
      { title: 'Outils & workflows assistés par IA', detail: 'Git, GitHub Actions CI, outils d’assistance IA', more: 'Le workflow GitHub Actions de ce portfolio vérifie le lint, TypeScript et le build. Les formations OpenClassrooms abordent les agents IA et le vibe coding; l’IA assiste certaines étapes sans remplacer la vérification.' }
    ],
    aboutTag: 'À PROPOS',
    aboutTitle: 'Un parcours construit par la pratique.',
    about: 'J’ai commencé à apprendre la programmation sur OpenClassrooms en 2015 et réalisé mon premier site en 2017. Les formations continues et mon expérience en environnement opérationnel ont nourri mon évolution vers le développement Full Stack et la conception de produits numériques. Avec REFONTIQ, je travaille de l’analyse des besoins à l’architecture, au développement et à la maintenance.',
    experienceTag: 'EXPÉRIENCE & ENTREPRENEURIAT',
    experienceTitle: 'Construire des produits et travailler au plus près des opérations.',
    experienceIntro: 'Mon activité de fondateur est distincte de mes emplois salariés; les deux nourrissent mon approche du produit et du travail en équipe.',
    founderRole: 'Fondateur · REFONTIQ',
    founderPeriod: 'Activité en cours',
    founderDescription: 'Analyse des besoins, conception produit, architecture logicielle, développement Full Stack, intégrations, tests et maintenance des solutions de l’écosystème.',
    employmentTitle: 'Expérience opérationnelle',
    employment: [
      { dates: '2023–2025', role: 'Opérateur de vidéosurveillance', company: 'SOLIBRA · Treichville' },
      { dates: '2021–2022', role: 'Chef d’équipe', company: 'Unilever Côte d’Ivoire' },
      { dates: '2018–2020', role: 'Opérateur de vidéosurveillance', company: 'PULLMAN Hôtel' },
      { dates: '2017–2018', role: 'Opérateur de vidéosurveillance', company: 'FILTISAC' },
    ],
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
    audienceLabel: 'Pour qui',
    featuresLabel: 'Fonctionnalités vérifiées',
    contributionLabel: 'Ma contribution',
    projectVisualNotes: { transora: 'Illustration', sejoura: 'Capture du tableau de bord', trouvetou: 'Logo du projet', schooly: 'Illustration', control: 'Illustration' },
    projectNames: { transora: 'Transora', sejoura: 'Séjoura', trouvetou: 'Trouvetou', schooly: 'Schooly', control: 'Refontiq Control Center' },
    projectStatus: { transora: 'En développement', sejoura: 'Plateforme SaaS', trouvetou: 'Catalogue & réservations', schooly: 'Noyau en service · évolution en cours', control: 'Outil interne' },
    projectAudiences: {
      transora: 'Entreprises de transport interurbain et gares',
      sejoura: 'Hôtels et gestionnaires de résidences meublées',
      trouvetou: 'Voyageurs, familles et personnes recherchant un établissement',
      schooly: 'Directions, secrétariats et équipes des établissements scolaires',
      control: 'Équipe opérationnelle de l’écosystème REFONTIQ',
    },
    projectDescriptions: {
      transora: 'Plateforme SaaS qui centralise les opérations de transport interurbain dans une API multi-tenant.',
      sejoura: 'Outil de gestion des séjours, des équipes et du suivi financier pour les établissements d’hébergement.',
      trouvetou: 'Catalogue multi-catégories pour découvrir des hôtels, résidences, écoles, cliniques et restaurants.',
      schooly: 'Solution de digitalisation de la gestion scolaire; le noyau administratif documenté en service évolue encore.',
      control: 'Outil interne de pilotage REFONTIQ, notamment utilisé pour valider des demandes d’abonnement de Séjoura.',
    },
    projectFeatures: {
      transora: 'Réseau de villes, gares et lignes · réservations et places · billets QR et contrôle en lecture seule. Paiements carte et Mobile Money confirmés manuellement; aucun prestataire n’est connecté.',
      sejoura: 'Établissements et chambres · réservations et prolongations · personnel et ménage · comptabilité et factures. Le paiement Wave automatisé est optionnel et dépend de la configuration des clés et webhooks.',
      trouvetou: 'Annonces reliées à Supabase · recherche par catégorie et proximité · réservation hôtelière et demande de place scolaire depuis l’interface.',
      schooly: 'Structure scolaire · admissions et réinscriptions · suivi des places · socle financier. Les bulletins et plusieurs modules pédagogiques restent en développement; l’accès parent évolue encore.',
      control: 'Validation des demandes d’abonnement Séjoura transférée depuis la console locale; le dépôt et les autres modules ne sont pas publics.',
    },
    projectContributions: {
      transora: 'Conception produit, modèle métier multi-tenant et développement Full Stack de l’API et des parcours opérationnels.',
      sejoura: 'Conception des modules métier et développement des interfaces, traitements applicatifs et intégrations.',
      trouvetou: 'Conception du parcours de découverte et développement du catalogue connecté aux données Supabase.',
      schooly: 'Conception de la solution et développement des fondations de gestion scolaire dans un monorepo multi-applications.',
      control: 'Conception et développement de l’outil de pilotage au sein de l’écosystème REFONTIQ.',
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
    skipLink: 'Skip to main content',
    nav: ['Home', 'Skills', 'Experience', 'Projects', 'Contact'],
    greeting: 'Hello, I’m',
    role: 'Full-Stack Developer',
    specialty: 'SaaS Builder · Product Engineer',
    intro: 'As founder of REFONTIQ, I turn business needs into digital products, from discovery and architecture to interfaces, APIs and integrations. Based in Côte d’Ivoire and open to international opportunities.',
    work: 'Explore my work',
    contact: 'Get in touch',
    download: 'Download my CV',
    languageLabel: 'Switch to French',
    location: 'REFONTIQ Founder · Côte d’Ivoire · Open to international roles',
    portraitNote: 'From business needs to products.',
    since: 'Started learning programming in 2015',
    skillsTag: 'CORE SKILLS',
    skillsTitle: 'Skills that serve the product.',
    skillsIntro: 'Skills shown through the technologies and features in my projects.',
    showSkillDetails: 'Show details',
    hideSkillDetails: 'Hide details',
    skillProjectsLabel: 'Related projects',
    skillCards: [
      { title: 'Programming Languages & Data', detail: 'TypeScript, JavaScript, SQL, PostgreSQL', more: 'TypeScript in Transora, Séjoura and Schooly. SQL and PostgreSQL structure Transora business data.' },
      { title: 'Frontend Development', detail: 'React, Next.js, Tailwind CSS, responsive interfaces', more: 'Next.js and React interfaces in Séjoura, Trouvetou and Schooly, styled with Tailwind CSS.' },
      { title: 'Backend Development & APIs', detail: 'Node.js, Express, REST APIs, Supabase, webhooks', more: 'Node.js/Express API and PostgreSQL in Transora. Séjoura and Schooly use Supabase; Séjoura documents Wave webhooks.' },
      { title: 'Database & Security', detail: 'PostgreSQL, Supabase, JWT, authentication, RLS', more: 'JWT in Transora; Supabase authentication and RLS policies in Séjoura and Schooly. The repositories include CI checks.' },
      { title: 'SaaS Architecture & Product Development', detail: 'Multi-tenancy, business workflows, product lifecycle', more: 'Transora and Schooly document tenant isolation. Projects cover product discovery, business rules and their implementation.' },
      { title: 'Development Tools & AI-Assisted Workflows', detail: 'Git, GitHub Actions CI, AI-assisted tools', more: 'This portfolio’s GitHub Actions workflow checks lint, TypeScript and the build. OpenClassrooms training covers AI agents and vibe coding; AI supports selected steps while I remain responsible for reviewing the work.' }
    ],
    aboutTag: 'ABOUT ME',
    aboutTitle: 'A path built through practice.',
    about: 'I started learning programming on OpenClassrooms in 2015 and built my first website in 2017. Ongoing training and hands-on operations work have shaped my move into full-stack development and digital product design. Through REFONTIQ, I work across requirements, software architecture, development and maintenance.',
    experienceTag: 'EXPERIENCE & ENTREPRENEURSHIP',
    experienceTitle: 'Building products with an operational perspective.',
    experienceIntro: 'My founder work is separate from my employee roles; both inform how I approach products and teamwork.',
    founderRole: 'Founder · REFONTIQ',
    founderPeriod: 'Ongoing',
    founderDescription: 'Requirements analysis, product design, software architecture, full-stack development, integrations, testing and maintenance across the ecosystem.',
    employmentTitle: 'Operations experience',
    employment: [
      { dates: '2023–2025', role: 'Video Surveillance Operator', company: 'SOLIBRA · Treichville' },
      { dates: '2021–2022', role: 'Team Leader', company: 'Unilever Côte d’Ivoire' },
      { dates: '2018–2020', role: 'Video Surveillance Operator', company: 'PULLMAN Hotel' },
      { dates: '2017–2018', role: 'Video Surveillance Operator', company: 'FILTISAC' },
    ],
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
    audienceLabel: 'For',
    featuresLabel: 'Verified capabilities',
    contributionLabel: 'My contribution',
    projectVisualNotes: { transora: 'Illustration', sejoura: 'Dashboard screenshot', trouvetou: 'Project logo', schooly: 'Illustration', control: 'Illustration' },
    projectNames: { transora: 'Transora', sejoura: 'Séjoura', trouvetou: 'Trouvetou', schooly: 'Schooly', control: 'Refontiq Control Center' },
    projectStatus: { transora: 'In development', sejoura: 'SaaS platform', trouvetou: 'Catalog & bookings', schooly: 'Core in service · evolving', control: 'Internal tool' },
    projectAudiences: {
      transora: 'Intercity transport companies and bus stations',
      sejoura: 'Hotels and furnished residence operators',
      trouvetou: 'Travelers, families and people looking for local services',
      schooly: 'School leadership, administrative teams and staff',
      control: 'REFONTIQ ecosystem operations team',
    },
    projectDescriptions: {
      transora: 'A multi-tenant SaaS platform that centralizes intercity transport operations through an API.',
      sejoura: 'A management product for stays, staff and financial operations at accommodation businesses.',
      trouvetou: 'A multi-category catalog for discovering hotels, residences, schools, clinics and restaurants.',
      schooly: 'A school management product whose documented core is in service and continues to evolve.',
      control: 'An internal REFONTIQ operations tool, including approval of Séjoura subscription requests.',
    },
    projectFeatures: {
      transora: 'Cities, stations and route network · bookings and seat inventory · QR tickets with read-only validation. Card and mobile money payments are confirmed manually; no provider is connected.',
      sejoura: 'Properties and rooms · bookings and stay extensions · staff and housekeeping · accounting and invoices. Automated Wave checkout is optional and requires configured keys and webhooks.',
      trouvetou: 'Supabase-backed listings · category and nearby search · hotel booking and school-seat request flows in the interface.',
      schooly: 'School structure · admissions and re-enrollment · seat tracking · financial core. Report cards and several teaching modules remain in development; parent access is still evolving.',
      control: 'Subscription request approval moved out of Séjoura’s local console; the repository and other modules are not public.',
    },
    projectContributions: {
      transora: 'Product design, multi-tenant business model and full-stack development of the API and operational flows.',
      sejoura: 'Business module design and development of interfaces, application logic and integrations.',
      trouvetou: 'Discovery journey design and development of the catalog connected to Supabase data.',
      schooly: 'Product design and development of the school management foundations in a multi-application monorepo.',
      control: 'Product design and development of an operations tool within the REFONTIQ ecosystem.',
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

const skillIllustrations = ['/skills/core-stack.svg', '/skills/frontend-ux.svg', '/skills/backend-data.svg', '/skills/devops-security.svg', '/skills/methods-ai.svg', '/skills/devops-security.svg'];
const skillProjectRefs = [
  ['transora', 'sejoura', 'schooly'],
  ['sejoura', 'trouvetou', 'schooly'],
  ['transora', 'sejoura', 'schooly'],
  ['transora', 'sejoura', 'schooly'],
  ['transora', 'schooly'],
  [],
] as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSkill, setOpenSkill] = useState<number | null>(null);
  const t = copy[lang];
  const navIds = ['home', 'skills', 'experience', 'projects', 'contact'];
  const cvHref = lang === 'fr' ? '/CV-Samuel-Dukoua-FR.pdf' : '/Resume-Samuel-Dukoua-EN.pdf';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skipLink}</a>
      <header className="topbar">
        <a className="brand" href="#home" aria-label={lang === 'fr' ? 'Samuel, accueil' : 'Samuel, home'}>S<span>.</span></a>
        <nav id="primary-navigation" className={menuOpen ? 'nav nav-open' : 'nav'} aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'}>
          {t.nav.map((item, i) => (
            <a key={item} href={`#${navIds[i]}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="lang" onClick={() => setLang((current) => current === 'fr' ? 'en' : 'fr')} aria-label={t.languageLabel}>
            <Globe2 size={15} /> {lang.toUpperCase()}
          </button>
          <a className="header-download" href={cvHref} download>{t.download}<ArrowDown size={14} /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={lang === 'fr' ? (menuOpen ? 'Fermer le menu' : 'Ouvrir le menu') : (menuOpen ? 'Close menu' : 'Open menu')} aria-controls="primary-navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="main-content">
      <section className="hero" id="home">
        <div className="hero-inner section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" />{t.greeting}</div>
            <h1><span>Dukoua<br className="mobile-name-break" /> Nguessan</span><span className="name-accent">Samuel Junior</span></h1>
            <p className="hero-role">{t.role}</p>
            <p className="hero-specialty">{t.specialty}</p>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <a className="button-primary" href="#projects">{t.work}<ArrowRight size={16} /></a>
              <a className="button-secondary" href="#contact">{t.contact}<Mail size={15} /></a>
              <a className="button-secondary hero-download" href={cvHref} download>{t.download}<ArrowDown size={15} /></a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/refontiq-dotcom" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
              <a href="https://www.linkedin.com/in/samuel-dukoua-maintenant" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
              <span className="social-divider" />
              <span className="hero-location">{t.location}</span>
            </div>
          </div>

          <div className="hero-visual">
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
                  {skillProjectRefs[index].length > 0 && (
                    <>
                      <span className="skill-projects-label">{t.skillProjectsLabel}</span>
                      <div className="skill-project-links">
                        {skillProjectRefs[index].map((projectKey) => {
                          const project = projectItems.find((item) => item.key === projectKey);
                          return project?.repo ? <a href={project.repo} target="_blank" rel="noopener noreferrer" key={projectKey}>{t.projectNames[projectKey]}</a> : null;
                        })}
                      </div>
                    </>
                  )}
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

      <section className="experience-section" id="experience">
        <div className="section-wrap">
          <div className="experience-heading">
            <div className="section-kicker">{t.experienceTag}</div>
            <h2>{t.experienceTitle}</h2>
            <p>{t.experienceIntro}</p>
          </div>
          <article className="founder-card">
            <div className="founder-card-top"><span>{t.founderRole}</span><span>{t.founderPeriod}</span></div>
            <p>{t.founderDescription}</p>
          </article>
          <div className="employment-block">
            <h3>{t.employmentTitle}</h3>
            <div className="employment-grid">
              {t.employment.map((item) => (
                <article className="employment-item" key={`${item.dates}-${item.company}`}>
                  <strong>{item.dates}</strong>
                  <span>{item.role}</span>
                  <small>{item.company}</small>
                </article>
              ))}
            </div>
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
              <a className="project-image-link" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${t.projectNames[project.key]} — ${t.projectLink}`}>
                {project.visual === 'sejoura' ? (
                  <Image src="/projects/sejoura-dashboard.jpg" alt={lang === 'fr' ? 'Capture du tableau de bord de Séjoura' : 'Screenshot of the Séjoura dashboard'} fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 44vw, 24vw" className="project-image" />
                ) : project.visual === 'trouvetou' ? (
                  <div className="project-art trouvetou-art"><span className="art-overline">TROUVETOU</span><Image src="/projects/trouvetou-logo.png" alt="" width={900} height={313} className="trouvetou-logo" /><span className="art-caption">DISCOVER · CONNECT · EXPLORE</span></div>
                ) : project.visual === 'transora' ? (
                  <div className="project-art transora-art">
                    <div className="art-window-top"><span>TRANSORA</span><i /><i /><i /></div>
                    <div className="ticket-preview"><div className="ticket-label">{t.illustrationLabel.transora}</div><div className="route-line"><span /><i /><span /></div><div className="seat-preview"><b /><b /><b /><b /><b /><b /></div><div className="ticket-footer"><span /><span /></div></div>
                    <span className="art-index">01 / TRAVEL PLATFORM</span>
                  </div>
                ) : project.visual === 'schooly' ? (
                  <Image src="/projects/schooly-dashboard.svg" alt={lang === 'fr' ? 'Illustration du tableau de bord Schooly : admissions, demandes et places par niveau' : 'Illustration of the Schooly dashboard: admissions, requests and seats by grade'} fill sizes="(max-width: 700px) 90vw, (max-width: 1050px) 44vw, 24vw" className="project-image" />
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
                <div className="project-proof">
                  <div><span>{t.audienceLabel}</span><p>{t.projectAudiences[project.key]}</p></div>
                  <div><span>{t.featuresLabel}</span><p>{t.projectFeatures[project.key]}</p></div>
                  <div><span>{t.contributionLabel}</span><p>{t.projectContributions[project.key]}</p></div>
                </div>
                <div className="project-tags">{t.projectTags[project.key].map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-actions"><a className="repo-link" href={project.live} target="_blank" rel="noopener noreferrer">{t.projectLink}<ArrowUpRight size={14} /></a>{project.repo && <a className="repo-link source-link" href={project.repo} target="_blank" rel="noopener noreferrer">{t.sourceLink}<Github size={13} /></a>}</div>
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
      </main>

      <footer className="footer">
        <a className="brand" href="#home" aria-label={lang === 'fr' ? 'Retour à l’accueil' : 'Back to home'}>S<span>.</span></a>
        <span>{t.footerLine}</span>
        <div className="footer-socials">
          <a href="https://github.com/refontiq-dotcom" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={16} /></a>
          <a href="https://www.linkedin.com/in/samuel-dukoua-maintenant" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={16} /></a>
          <a href="mailto:dukouas@gmail.com" aria-label="E-mail"><Mail size={16} /></a>
        </div>
        <small>© {new Date().getFullYear()} Dukoua Nguessan Samuel Junior. {t.rights}</small>
      </footer>
    </>
  );
}
