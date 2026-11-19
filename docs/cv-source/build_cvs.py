from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
def find_font(candidates):
 for candidate in candidates:
  path=Path(candidate)
  if path.exists(): return path
 raise FileNotFoundError('Aucune police compatible trouvée. Installez Arial ou DejaVu Sans.')
FONT=find_font(['C:/Windows/Fonts/arial.ttf','/usr/share/fonts/truetype/msttcorefonts/Arial.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'])
BOLD=find_font(['C:/Windows/Fonts/arialbd.ttf','/usr/share/fonts/truetype/msttcorefonts/Arial_Bold.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'])
pdfmetrics.registerFont(TTFont('ArialUnicode',str(FONT))); pdfmetrics.registerFont(TTFont('ArialUnicode-Bold',str(BOLD)))
NAVY=colors.HexColor('#111827'); RED=colors.HexColor('#d92f45'); MUTED=colors.HexColor('#606875'); PALE=colors.HexColor('#f3f5f8'); LINE=colors.HexColor('#e3e6eb')
def build(fr):
 title='CURRICULUM VITAE' if fr else 'PROFESSIONAL RESUME'
 role='DÉVELOPPEUR WEB FULL-STACK' if fr else 'FULL-STACK WEB DEVELOPER'
 profile=('J’ai commencé à apprendre la programmation sur OpenClassrooms en 2015 et réalisé mon premier projet de site internet en 2017. Je poursuis des formations pour actualiser mes compétences. Je conçois des applications web et SaaS en portant attention à leur structure, leur usage et leur sécurité.' if fr else 'I began learning programming on OpenClassrooms in 2015 and completed my first website project in 2017. I continue taking courses to keep my skills current. I build web applications and SaaS products with a focus on structure, usability and security.')
 skills=[('LANGAGES & DONNÉES' if fr else 'LANGUAGES & DATA','TypeScript, JavaScript, SQL, PostgreSQL'),('FRONT-END & UX' if fr else 'FRONT END & UX','React, Next.js, Tailwind CSS, responsive design'),('BACK-END & API' if fr else 'BACK END & APIs','Node.js, Express, REST, Supabase, webhooks'),('SÉCURITÉ & OUTILS' if fr else 'SECURITY & TOOLS','Git, GitHub Actions CI, JWT, authentification, RLS')]
 jobs=[('2023–2025','Opérateur de vidéosurveillance | SOLIBRA | Treichville' if fr else 'Video surveillance operator | SOLIBRA | Treichville'),('2021–2022',"Chef d’équipe | Unilever Côte d’Ivoire" if fr else "Team leader | Unilever Côte d’Ivoire"),('2018–2020','Opérateur de vidéosurveillance | PULLMAN Hôtel' if fr else 'Video surveillance operator | PULLMAN Hotel'),('2017–2018','Opérateur de vidéosurveillance | FILTISAC' if fr else 'Video surveillance operator | FILTISAC')]
 courses=[('Web & données','JavaScript; HTML5/CSS3; PHP/MySQL; requêtes SQL; modélisation des bases; environnement de développement' if fr else 'JavaScript; HTML5/CSS3; PHP/MySQL; SQL queries; database modeling; development environment'),('Applications mobiles & interfaces','Android; Ionic; React Native; interfaces adaptatives' if fr else 'Android; Ionic; React Native; responsive interfaces'),('Sites web & CMS','Solutions CMS; site professionnel WordPress' if fr else 'CMS solutions; professional WordPress website'),('Systèmes, réseaux & cybersécurité','Linux; protection des données; cybersécurité; TCP/IP; veille' if fr else 'Linux; data protection; cybersecurity; TCP/IP; security monitoring'),('Data & IA','Big Data; Power BI; agents IA; vibe coding; IA générative' if fr else 'Big Data; Power BI; AI agents; vibe coding; generative AI'),('Organisation','Gestion de projet; gestion du temps' if fr else 'Project management; time management')]
 projects=[('Transora — en développement' if fr else 'Transora — in development','API SaaS de transport : réservations, places et billets QR. Paiement via l’API de l’opérateur, activé après configuration des identifiants fournis.' if fr else 'Transport SaaS API: bookings, seat inventory and QR tickets. Payments use the operator’s API and are enabled after configuring its supplied credentials.'),('Séjoura','Gestion de résidences meublées, réservations et factures; flux Wave optionnel selon la configuration.' if fr else 'Furnished residence management, bookings and invoices; optional Wave flow depending on configuration.'),('Trouvetou','Portail de découverte d’hôtels, d’écoles et de cliniques avec réservation en ligne.' if fr else 'Discovery portal for hotels, schools and clinics with online booking.'),('Schooly — en développement' if fr else 'Schooly — in development','Plateforme de gestion scolaire en cours de développement.' if fr else 'School management platform in active development.'),('Refontiq Control Center','Tableau de bord de l’écosystème Refontiq.' if fr else 'Dashboard for the Refontiq ecosystem.')]
 st=getSampleStyleSheet(); add=lambda n,**kw: st.add(ParagraphStyle(name=n,parent=st['Normal'],**kw))
 add('nameX',fontName='ArialUnicode-Bold',fontSize=19,leading=21,textColor=colors.white)
 add('roleX',fontName='ArialUnicode-Bold',fontSize=9,leading=12,textColor=colors.HexColor('#ff7887'),spaceAfter=0)
 add('contactX',fontName='ArialUnicode',fontSize=7.5,leading=10,textColor=colors.white)
 add('sectionX',fontName='ArialUnicode-Bold',fontSize=9,leading=12,textColor=NAVY,spaceBefore=4,spaceAfter=4)
 add('bodyX',fontName='ArialUnicode',fontSize=8.1,leading=10.6,textColor=NAVY,spaceAfter=3)
 add('smallX',fontName='ArialUnicode',fontSize=7.7,leading=9.8,textColor=MUTED,spaceAfter=2)
 add('labelX',fontName='ArialUnicode-Bold',fontSize=7.8,leading=9.4,textColor=NAVY,spaceAfter=1)
 add('courseX',fontName='ArialUnicode',fontSize=7.2,leading=9.2,textColor=MUTED,spaceAfter=2)
 P=lambda txt,sty='bodyX':Paragraph(txt,st[sty])
 header=Table([[[P('DUKOUA NGUESSAN<br/>SAMUEL JUNIOR','nameX'),P(role,'roleX')],P('Côte d’Ivoire  |  dukouas@gmail.com  |  +225 05 03 64 06 14<br/>github.com/refontiq-dotcom  |  linkedin.com/in/samuel-dukoua-maintenant','contactX')]],colWidths=[100*mm,84*mm])
 header.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),NAVY),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
 left=[P('COMPÉTENCES TECHNIQUES' if fr else 'TECHNICAL SKILLS','sectionX')]
 for a,b in skills:left += [P(a,'labelX'),P(b,'smallX'),Spacer(1,2)]
 left += [P('PARCOURS DE FORMATION' if fr else 'EDUCATION & TRAINING','sectionX'),P('Parcours principal · 2016–2019' if fr else 'Main program · 2016–2019','labelX'),P('Formation développeur full-stack — OpenClassrooms' if fr else 'Full-stack developer training — OpenClassrooms'),P('Développeur full-stack — OpenClassrooms (2022–2023)' if fr else 'Full-stack developer — OpenClassrooms (2022–2023)','smallX'),P('Opérateur vidéo · formation de 6 mois — SIGASÉCURITÉ' if fr else 'Video operator · 6-month training — SIGASÉCURITÉ','smallX'),P('BEPC obtenu (2008–2009)<br/>Niveau Terminale (2012–2013)' if fr else 'BEPC certificate (2008–2009)<br/>Upper secondary level (2012–2013)','smallX'),P('LANGUES' if fr else 'LANGUAGES','sectionX'),P('Français : langue maternelle<br/>Anglais : notions de base acquises à l’école' if fr else 'French: Native language<br/>English: Basic proficiency (academic foundation)','smallX'),P('ATOUTS' if fr else 'STRENGTHS','sectionX'),P('Rigueur, ponctualité, esprit d’équipe, sens des responsabilités.' if fr else 'Reliability, punctuality, teamwork and responsibility.','smallX')]
 right=[P('PROFIL' if fr else 'PROFILE','sectionX'),P(profile),P('PROJETS DE DÉVELOPPEMENT' if fr else 'DEVELOPMENT PROJECTS','sectionX')]
 for name,desc in projects:right += [P(name,'labelX'),P(desc,'smallX')]
 right += [P('EXPÉRIENCE PROFESSIONNELLE' if fr else 'PROFESSIONAL EXPERIENCE','sectionX')]
 for date,desc in jobs:right.append(P('<b>'+date+'</b> &nbsp; '+desc,'smallX'))
 right += [P('COURS COMPLÉMENTAIRES OPENCLASSROOMS' if fr else 'ADDITIONAL OPENCLASSROOMS COURSES','sectionX'),P('Cours suivis en complément et regroupés par thème.' if fr else 'Further courses grouped by topic.','courseX')]
 for name,desc in courses:right.append(P('<b>'+name+':</b> '+desc,'courseX'))
 cols=Table([[left,right]],colWidths=[61*mm,123*mm],hAlign='LEFT')
 cols.setStyle(TableStyle([('BACKGROUND',(0,0),(0,0),PALE),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(0,0),8),('RIGHTPADDING',(0,0),(0,0),8),('TOPPADDING',(0,0),(0,0),5),('BOTTOMPADDING',(0,0),(0,0),5),('LEFTPADDING',(1,0),(1,0),10),('RIGHTPADDING',(1,0),(1,0),0),('TOPPADDING',(1,0),(1,0),2),('BOTTOMPADDING',(1,0),(1,0),0),('LINEBEFORE',(1,0),(1,0),.6,LINE)]))
 name='CV-Samuel-Dukoua-FR.pdf' if fr else 'Resume-Samuel-Dukoua-EN.pdf'
 doc=SimpleDocTemplate(str(Path('public')/name),pagesize=A4,rightMargin=13*mm,leftMargin=13*mm,topMargin=10*mm,bottomMargin=10*mm,title=title+' - Dukoua Nguessan Samuel Junior',author='Dukoua Nguessan Samuel Junior')
 doc.build([P(title,'smallX'),Spacer(1,2),header,Spacer(1,6),cols])
for x in (True,False):build(x)
