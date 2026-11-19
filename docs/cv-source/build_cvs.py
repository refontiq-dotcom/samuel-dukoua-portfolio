from __future__ import annotations

import argparse
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


NAVY = colors.HexColor('#111827')
RED = colors.HexColor('#d92f45')
MUTED = colors.HexColor('#606875')
PALE = colors.HexColor('#f3f5f8')
LINE = colors.HexColor('#e3e6eb')

PROJECTS = [
    {
        'name': 'Transora',
        'live': 'https://transora.refontiq.com/',
        'repo': 'https://github.com/refontiq-dotcom/Transora',
        'fr': 'API SaaS de transport interurbain : réseau, réservations, places, billets QR et contrôle en lecture seule. Paiements carte et Mobile Money confirmés manuellement; aucun prestataire connecté.',
        'en': 'Intercity transport SaaS API: network, bookings, seat inventory, QR tickets and read-only validation. Card and mobile money payments are confirmed manually; no provider is connected.',
    },
    {
        'name': 'Séjoura',
        'live': 'https://sejoura.refontiq.com/',
        'repo': 'https://github.com/refontiq-dotcom/Sejoura',
        'fr': 'Gestion des établissements, chambres, réservations, équipes, ménage, comptabilité et factures. Le checkout Wave automatisé est optionnel et dépend de clés et webhooks configurés.',
        'en': 'Property, room, booking, staff, housekeeping, accounting and invoice management. Automated Wave checkout is optional and depends on configured keys and webhooks.',
    },
    {
        'name': 'Trouvetou',
        'live': 'https://trouvetou.refontiq.com/',
        'repo': 'https://github.com/refontiq-dotcom/Trouvetou',
        'fr': 'Catalogue d’hôtels, résidences, écoles, cliniques et restaurants, avec recherche et parcours de réservation hôtelière ou demande de place scolaire.',
        'en': 'Catalog for hotels, residences, schools, clinics and restaurants, with search and hotel booking or school-seat request flows.',
    },
    {
        'name': 'Schooly',
        'live': 'https://schooly.refontiq.com/',
        'repo': 'https://github.com/refontiq-dotcom/schooly',
        'fr': 'Gestion scolaire : structure, admissions, réinscriptions, places et socle financier. Les bulletins et plusieurs modules pédagogiques sont encore en développement.',
        'en': 'School management: academic structure, admissions, re-enrollment, seat tracking and a financial core. Report cards and several teaching modules remain in development.',
    },
    {
        'name': 'Refontiq Control Center',
        'live': 'https://control.refontiq.com/',
        'repo': None,
        'fr': 'Outil interne de pilotage, notamment utilisé pour valider les demandes d’abonnement de Séjoura. Le code source n’est pas public.',
        'en': 'Internal operations tool, including approval of Séjoura subscription requests. Its source code is not public.',
    },
]


def register_fonts() -> tuple[str, str]:
    font_dir = Path('C:/Windows/Fonts')
    regular = font_dir / 'arial.ttf'
    bold = font_dir / 'arialbd.ttf'
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont('PortfolioArial', str(regular)))
        pdfmetrics.registerFont(TTFont('PortfolioArialBold', str(bold)))
        return 'PortfolioArial', 'PortfolioArialBold'
    return 'Helvetica', 'Helvetica-Bold'


def build(fr: bool, output_dir: Path, regular_font: str, bold_font: str) -> Path:
    title = 'CURRICULUM VITAE' if fr else 'PROFESSIONAL RESUME'
    role = 'FULL-STACK DEVELOPER · SAAS BUILDER · PRODUCT ENGINEER'
    profile = (
        'Fondateur de REFONTIQ, je conçois et développe des produits numériques à partir de besoins métier : '
        'analyse, architecture, interfaces, API, intégrations et maintenance. Mon apprentissage a commencé '
        'sur OpenClassrooms en 2015; j’ai réalisé mon premier site en 2017.'
        if fr else
        'As founder of REFONTIQ, I design and build digital products around business needs: discovery, '
        'architecture, interfaces, APIs, integrations and maintenance. I began learning on OpenClassrooms '
        'in 2015 and built my first website in 2017.'
    )

    skills = [
        ('LANGAGES & DONNÉES' if fr else 'LANGUAGES & DATA', 'TypeScript, JavaScript, SQL, PostgreSQL'),
        ('DÉVELOPPEMENT FRONTEND' if fr else 'FRONTEND DEVELOPMENT', 'React, Next.js, Tailwind CSS, responsive design'),
        ('BACKEND & API' if fr else 'BACKEND & APIs', 'Node.js, Express, REST, Supabase, webhooks'),
        ('BASES DE DONNÉES & SÉCURITÉ' if fr else 'DATABASE & SECURITY', 'PostgreSQL, Supabase, JWT, authentification, RLS' if fr else 'PostgreSQL, Supabase, JWT, authentication, RLS'),
        ('ARCHITECTURE SAAS & PRODUIT' if fr else 'SAAS ARCHITECTURE & PRODUCT', 'Multi-tenant, règles métier, conception produit' if fr else 'Multi-tenancy, business rules, product design'),
        ('OUTILS & WORKFLOWS IA' if fr else 'TOOLS & AI-ASSISTED WORKFLOWS', 'Git, GitHub Actions, assistance IA vérifiée' if fr else 'Git, GitHub Actions, reviewed AI assistance'),
    ]

    jobs = [
        ('2023–2025', 'Opérateur de vidéosurveillance | SOLIBRA | Treichville' if fr else 'Video surveillance operator | SOLIBRA | Treichville'),
        ('2021–2022', 'Chef d’équipe | Unilever Côte d’Ivoire' if fr else 'Team leader | Unilever Côte d’Ivoire'),
        ('2018–2020', 'Opérateur de vidéosurveillance | PULLMAN Hôtel' if fr else 'Video surveillance operator | PULLMAN Hotel'),
        ('2017–2018', 'Opérateur de vidéosurveillance | FILTISAC' if fr else 'Video surveillance operator | FILTISAC'),
    ]

    courses = [
        ('Web & données' if fr else 'Web & data', 'JavaScript; HTML5/CSS3; PHP/MySQL; requêtes SQL; modélisation des bases; environnement de développement' if fr else 'JavaScript; HTML5/CSS3; PHP/MySQL; SQL queries; database modeling; development environment'),
        ('Applications mobiles & interfaces' if fr else 'Mobile apps & interfaces', 'Android; Ionic; React Native; interfaces adaptatives' if fr else 'Android; Ionic; React Native; responsive interfaces'),
        ('Sites web & CMS' if fr else 'Websites & CMS', 'Solutions CMS; site professionnel WordPress' if fr else 'CMS solutions; professional WordPress website'),
        ('Systèmes, réseaux & cybersécurité' if fr else 'Systems, networks & cybersecurity', 'Linux; protection des données; cybersécurité; TCP/IP; veille' if fr else 'Linux; data protection; cybersecurity; TCP/IP; security monitoring'),
        ('Data & IA' if fr else 'Data & AI', 'Big Data; Power BI; agents IA; vibe coding; IA générative' if fr else 'Big Data; Power BI; AI agents; vibe coding; generative AI'),
        ('Organisation' if fr else 'Organization', 'Gestion de projet; gestion du temps' if fr else 'Project management; time management'),
    ]

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='cvName', fontName=bold_font, fontSize=19, leading=21, textColor=colors.white))
    styles.add(ParagraphStyle(name='cvRole', fontName=bold_font, fontSize=8.5, leading=11, textColor=colors.HexColor('#ff7887')))
    styles.add(ParagraphStyle(name='cvContact', fontName=regular_font, fontSize=7.1, leading=9.5, textColor=colors.white))
    styles.add(ParagraphStyle(name='cvTitle', fontName=bold_font, fontSize=9, leading=12, textColor=NAVY, spaceBefore=5, spaceAfter=4))
    styles.add(ParagraphStyle(name='cvBody', fontName=regular_font, fontSize=8.2, leading=11, textColor=NAVY, spaceAfter=3))
    styles.add(ParagraphStyle(name='cvSmall', fontName=regular_font, fontSize=7.55, leading=9.6, textColor=MUTED, spaceAfter=2))
    styles.add(ParagraphStyle(name='cvLabel', fontName=bold_font, fontSize=7.65, leading=9.2, textColor=NAVY, spaceAfter=1))
    styles.add(ParagraphStyle(name='cvCourse', fontName=regular_font, fontSize=7.15, leading=9.1, textColor=MUTED, spaceAfter=2))

    def paragraph(text: str, style: str = 'cvBody') -> Paragraph:
        return Paragraph(escape(text), styles[style])

    def paragraph_markup(markup: str, style: str = 'cvBody') -> Paragraph:
        return Paragraph(markup, styles[style])

    def linked(text: str, url: str) -> str:
        return f'<link href="{escape(url, quote=True)}" color="#ffffff">{escape(text)}</link>'

    contacts = '<br/>'.join([
        f"Côte d’Ivoire  |  {linked('dukouas@gmail.com', 'mailto:dukouas@gmail.com')}  |  +225 05 03 64 06 14",
        f"{linked('portfolio.refontiq.com', 'https://portfolio.refontiq.com')}  |  {linked('github.com/refontiq-dotcom', 'https://github.com/refontiq-dotcom')}",
        linked('linkedin.com/in/samuel-dukoua-maintenant', 'https://www.linkedin.com/in/samuel-dukoua-maintenant'),
    ])
    name_block = Table(
        [[paragraph_markup('DUKOUA NGUESSAN<br/>SAMUEL JUNIOR', 'cvName')],
         [paragraph(role, 'cvRole')]],
        colWidths=[98 * mm],
    )
    name_block.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    header = Table(
        [[name_block, Paragraph(contacts, styles['cvContact'])]],
        colWidths=[98 * mm, 86 * mm],
    )
    header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), NAVY),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))

    left = [paragraph('COMPÉTENCES TECHNIQUES' if fr else 'TECHNICAL SKILLS', 'cvTitle')]
    for heading, content in skills:
        left.extend([paragraph(heading, 'cvLabel'), paragraph(content, 'cvSmall'), Spacer(1, 1.5)])

    left.extend([
        paragraph('PARCOURS DE FORMATION' if fr else 'EDUCATION & TRAINING', 'cvTitle'),
        paragraph('Parcours principal · 2016–2019' if fr else 'Main program · 2016–2019', 'cvLabel'),
        paragraph('Formation développeur full-stack — OpenClassrooms' if fr else 'Full-stack developer training — OpenClassrooms'),
        paragraph('Développeur full-stack — OpenClassrooms (2022–2023)' if fr else 'Full-stack developer — OpenClassrooms (2022–2023)', 'cvSmall'),
        paragraph('Opérateur vidéo · formation de 6 mois — SIGASÉCURITÉ' if fr else 'Video operator · 6-month training — SIGASÉCURITÉ', 'cvSmall'),
        paragraph_markup('BEPC obtenu (2008–2009)<br/>Niveau Terminale (2012–2013)' if fr else 'BEPC certificate (2008–2009)<br/>Upper secondary level (2012–2013)', 'cvSmall'),
        paragraph('LANGUES' if fr else 'LANGUAGES', 'cvTitle'),
        paragraph_markup('Français : parlé, lu et écrit<br/>Anglais : niveau académique' if fr else 'French: spoken, read and written<br/>English: academic level', 'cvSmall'),
        paragraph('ATOUTS' if fr else 'STRENGTHS', 'cvTitle'),
        paragraph('Rigueur opérationnelle, apprentissage continu, esprit d’équipe, sens des responsabilités.' if fr else 'Reliability, continuous learning, teamwork and responsibility.', 'cvSmall'),
    ])

    right = [paragraph('PROFIL' if fr else 'PROFILE', 'cvTitle'), paragraph(profile)]
    right.extend([
        paragraph('ACTIVITÉ ENTREPRENEURIALE' if fr else 'ENTREPRENEURIAL WORK', 'cvTitle'),
        paragraph('Fondateur · REFONTIQ · activité en cours' if fr else 'Founder · REFONTIQ · ongoing', 'cvLabel'),
        paragraph('Analyse des besoins, conception produit, architecture, développement Full Stack, intégrations, tests et maintenance.' if fr else 'Requirements analysis, product design, architecture, full-stack development, integrations, testing and maintenance.', 'cvSmall'),
        paragraph('PROJETS DE DÉVELOPPEMENT' if fr else 'DEVELOPMENT PROJECTS', 'cvTitle'),
    ])
    for project in PROJECTS:
        name_link = f'<link href="{escape(project["live"], quote=True)}" color="#d92f45">{escape(project["name"])}</link>'
        if project['repo']:
            name_link += f' &nbsp; <link href="{escape(project["repo"], quote=True)}" color="#606875">GitHub</link>'
        right.extend([Paragraph(name_link, styles['cvLabel']), paragraph(project['fr' if fr else 'en'], 'cvSmall')])

    right.append(paragraph('EXPÉRIENCE PROFESSIONNELLE' if fr else 'PROFESSIONAL EXPERIENCE', 'cvTitle'))
    for date, description in jobs:
        right.append(Paragraph(f'<b>{escape(date)}</b> &nbsp; {escape(description)}', styles['cvSmall']))

    right.extend([
        paragraph('COURS COMPLÉMENTAIRES OPENCLASSROOMS' if fr else 'ADDITIONAL OPENCLASSROOMS COURSES', 'cvTitle'),
        paragraph('Cours suivis en complément et regroupés par thème.' if fr else 'Further courses grouped by topic.', 'cvCourse'),
    ])
    for heading, description in courses:
        right.append(Paragraph(f'<b>{escape(heading)}:</b> {escape(description)}', styles['cvCourse']))

    columns = Table([[left, right]], colWidths=[65 * mm, 119 * mm], hAlign='LEFT')
    columns.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), PALE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (0, 0), 8),
        ('RIGHTPADDING', (0, 0), (0, 0), 8),
        ('TOPPADDING', (0, 0), (0, 0), 5),
        ('BOTTOMPADDING', (0, 0), (0, 0), 5),
        ('LEFTPADDING', (1, 0), (1, 0), 10),
        ('RIGHTPADDING', (1, 0), (1, 0), 0),
        ('TOPPADDING', (1, 0), (1, 0), 2),
        ('BOTTOMPADDING', (1, 0), (1, 0), 0),
        ('LINEBEFORE', (1, 0), (1, 0), 0.6, LINE),
    ]))

    output_dir.mkdir(parents=True, exist_ok=True)
    filename = 'CV-Samuel-Dukoua-FR.pdf' if fr else 'Resume-Samuel-Dukoua-EN.pdf'
    target = output_dir / filename
    document = SimpleDocTemplate(
        str(target),
        pagesize=A4,
        rightMargin=13 * mm,
        leftMargin=13 * mm,
        topMargin=10 * mm,
        bottomMargin=10 * mm,
        title=f'{title} - Dukoua Nguessan Samuel Junior',
        author='Dukoua Nguessan Samuel Junior',
        subject=role,
    )
    document.build([
        paragraph(title, 'cvSmall'),
        Spacer(1, 2),
        header,
        Spacer(1, 6),
        columns,
    ])
    return target


def main() -> None:
    parser = argparse.ArgumentParser(description='Build French and English portfolio CV PDFs.')
    parser.add_argument('--output-dir', type=Path, default=Path('public'))
    args = parser.parse_args()
    fonts = register_fonts()
    for language in (True, False):
        print(build(language, args.output_dir, *fonts))


if __name__ == '__main__':
    main()
