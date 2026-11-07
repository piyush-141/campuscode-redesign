import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { entranceMotion } from './lib/motion.js';
import BackgroundCubesGridDemo from './components/background-cubes-grid-demo.tsx';
import { MagneticButton } from './components/ui/magnetic-button.tsx';
import AuthPage from './components/AuthPage.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import ExplorePage from './components/ExplorePage.jsx';
import { featuredEvents } from './data/featuredEvents.js';
import { Compass, UsersRound, PanelsTopLeft, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import coordinationWorkflow from './assets/coordination-gap-workflow.png';
import ideaCheckCrop from './assets/ai-tools/ideacheck.png';
import hackMateCrop from './assets/ai-tools/hackmate.png';
import ruleBotCrop from './assets/ai-tools/rulebot.png';
import roundsCrop from './assets/ai-tools/round-analysers.png';
import studentPanelCrop from './assets/ai-tools/student-panel.png';
import campuscodeLogoMark from './assets/campuscode-logo-mark.png';
import overviewScreen from '../final-ui/overview.png';
import ideaCheckScreen from '../final-ui/idea-check.png';
import exploreScreen from '../final-ui/explore.png';
import eventInfoScreen from '../final-ui/event-info.png';
import digitalIdScreen from '../final-ui/digitalid.png';
import discoverFeatureArt from './assets/feature-art/discover.png';
import teammateFeatureArt from './assets/feature-art/teammates.png';
import submitFeatureArt from './assets/feature-art/submit.png';
import organiseFeatureArt from './assets/feature-art/organise.png';
import certificateFeatureArt from './assets/feature-art/certificate.png';

function ScreenshotSlot({ title, className = '', src }) {
  return (
    <div className={`screenshot-slot ${className}`} role="group" aria-label={`${title} product preview`}>
      <img src={src} alt={title} loading="lazy" />
    </div>
  );
}

function SiteHeader({ menuOpen, setMenuOpen }) { return (<header className={'site-header'} id={'top'}> <a className={'brand'} href={'#top'} aria-label={'CAMPUSCODE home'}> <img className={'brand-mark'} src={campuscodeLogoMark} alt="" aria-hidden="true" /> <span className={'brand-wordmark'}>CAMPUSCODE</span> </a> <button type={'button'} className={`menu-toggle${menuOpen ? ' is-open' : ''}`} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls={'primary-nav'} onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span></button> <nav className={`nav-links${menuOpen ? ' nav-open' : ''}`} id={'primary-nav'} aria-label={'Primary navigation'}> <a href={'#platform'}>Platform</a> <a href={'#features'}>Features</a> <a href={'#toolkit'}>AI toolkit</a> <a href={'#featured-events'}>Featured events</a> <a href={'#faq'}>FAQ</a> </nav> <div className={'nav-actions'}> <a className={'nav-login'} href={'/login'}>Login</a> <MagneticButton><a className={'button button-dark button-small'} href={'/signup'}>Sign up <span aria-hidden={'true'}>↗</span></a></MagneticButton> </div> </header>); }

function Hero() { return <BackgroundCubesGridDemo />; }

function AudienceSection() { return <section className={'journeys-section section-wrap'} aria-labelledby={'audience-title'}>
  <div className={'section-heading centered compact-heading reveal'}><p className={'eyebrow'}>ONE PLATFORM, TWO JOURNEYS</p><h2 id={'audience-title'}>Built for the people<br />behind every hackathon.</h2><p>One clear path for participants. One connected workspace for organisers.</p></div>
  <div className={'journey-grid'}>
    <article className={'journey-card reveal'} id={'students'}>
      <div className={'journey-card-top'}><span className={'audience-index'}>01 / PARTICIPANTS</span><span className={'journey-symbol journey-symbol-purple'}><Compass size={18} /></span></div>
      <h3>Find your next opportunity to build.</h3>
      <p>Discover events, get your team together, and keep your work moving.</p>
      <ul><li>Explore hackathons and register</li><li>Find teammates with HackMate</li><li>Submit work and follow round progress</li><li>See results, certificates and your QR Digital ID</li></ul>
      <a className={'text-link'} href={'#featured-events'}>Explore featured events <b>↗</b></a>
    </article>
    <article className={'journey-card reveal reveal-delay-1'} id={'organisers'}>
      <div className={'journey-card-top'}><span className={'audience-index'}>02 / ORGANISERS</span><span className={'journey-symbol journey-symbol-dark'}><PanelsTopLeft size={17} /></span></div>
      <h3>Run each event with the details in hand.</h3>
      <p>Set up the event, keep the rounds on track, and close the loop.</p>
      <ul><li>Create and publish a hackathon</li><li>Manage registrations and approvals</li><li>Coordinate rounds and project submissions</li><li>Support review with R1/R2/R3 tools; manage results and certificates</li></ul>
      <a className={'text-link'} href={'#final-cta'}>Run a hackathon <b>↗</b></a>
    </article>
  </div>
</section>; }

const featureItems = [
  { visual: 'discover', title: 'Discover opportunities', detail: 'Hackathon discovery, registration and round tracking.', href: '#students', label: 'FOR STUDENTS' },
  { visual: 'team', title: 'Find your people', detail: 'HackMate, teammate discovery and team formation.', href: '#students', label: 'BUILD TOGETHER' },
  { visual: 'build', title: 'Build. Submit. Get evaluated.', detail: 'Project submissions, IdeaCheck and AI-assisted R1/R2/R3 evaluation.', href: '#toolkit', label: 'IDEA TO REVIEW' },
  { visual: 'organise', title: 'Run hackathons, seamlessly', detail: 'Event creation, registrations, round management and results.', href: '#organisers', label: 'FOR ORGANISERS' },
];

function FeatureArt({ kind }) {
  const artByKind = { discover: discoverFeatureArt, team: teammateFeatureArt, build: submitFeatureArt, organise: organiseFeatureArt };
  return <div className={`feature-art feature-art-${kind}`} aria-hidden="true"><img src={artByKind[kind]} alt="" loading="lazy" /></div>;
}

function FeaturesSection() {
  return <section className={'features-section section-wrap'} id={'features'} aria-labelledby={'features-heading'}>
    <div className={'section-heading centered compact-heading reveal'}>
      <p className={'eyebrow'}>THE CAMPUSCODE PLATFORM</p>
      <h2 id={'features-heading'}>Everything it takes to build,<br />compete and ship.</h2>
      <p>From finding your next hackathon to evaluating the final submission, every step has a place on CampusCode.</p>
    </div>
    <div className={'features-grid'}>
      {featureItems.map(({ visual, title, detail, href, label }, index) => <article className={`feature-card reveal${index % 2 ? ' reveal-delay-1' : ''}`} key={title}>
        <FeatureArt kind={visual} />
        <span className={'feature-label'}>{label}</span>
        <h3>{title}</h3>
        <p>{detail}</p>
        <a href={href} aria-label={`Explore ${title}`}>Explore <ArrowUpRight size={14} aria-hidden="true" /></a>
      </article>)}
    </div>
    <aside className={'recognition-strip reveal'}>
      <div className={'recognition-copy'}><span className={'feature-label'}>AFTER THE FINAL ROUND</span><h3>Your work deserves recognition.</h3><p>Get verifiable certificates and a QR-enabled Digital ID to showcase your achievements.</p></div>
      <img className={'recognition-art'} src={certificateFeatureArt} alt="Illustration of a CampusCode achievement certificate with a lime verification ribbon." loading="lazy" />
    </aside>
  </section>;
}

function PlatformSection() { return (<section className={'problem-section section-wrap'} id={'platform'}> <div className={'problem-copy reveal'}><p className={'eyebrow'}><span className={'eyebrow-index'}>01</span> THE COORDINATION GAP</p><h2>Hackathons are about building. Coordination shouldn’t get in the way.</h2><p>Event organisers juggle registrations, rounds, submissions and updates. CampusCode connects those stages so organisers and participants can keep their attention on the work.</p><a className={'text-link'} href={'#featured-events'}>Explore featured events <b>↗</b></a></div> <div className={'problem-visual problem-illustration reveal reveal-late'}><img src={coordinationWorkflow} alt="Illustration showing scattered registration, chat, participant, round and project tools connected into one hackathon workflow." loading="lazy" /></div> </section>); }

function FeaturedEventsSection() {
  const trackRef = useRef(null);
  const move = (direction) => trackRef.current?.scrollBy({ left: direction * Math.min(trackRef.current.clientWidth * .72, 520), behavior: 'smooth' });
  return <section className={'featured-events-section section-wrap'} id={'featured-events'} aria-labelledby={'featured-events-heading'}>
    <div className={'featured-events-heading reveal'}>
      <div><p className={'eyebrow'}>DISCOVER WHAT’S NEXT</p><h2 id={'featured-events-heading'}>Featured events.</h2><p>Real opportunities from the student builder community.</p></div>
      <div className={'event-controls'} aria-label={'Featured events carousel controls'}>
        <button type={'button'} onClick={() => move(-1)} aria-label={'Show previous events'}><ChevronLeft size={18} /></button>
        <button type={'button'} onClick={() => move(1)} aria-label={'Show more events'}><ChevronRight size={18} /></button>
      </div>
    </div>
    <div className={'events-track'} ref={trackRef} tabIndex={0} aria-label={'Featured hackathons'}>
      {featuredEvents.map((event, index) => <a className={'event-card'} href={event.href} target={'_blank'} rel={'noreferrer'} key={event.title} aria-label={`${event.title}, ${event.host}, opens on Unstop`}>
        <div className={'event-image-wrap'}><img src={event.image} alt={`${event.title} official event artwork`} loading={index < 2 ? 'eager' : 'lazy'} /><span className={'event-source'}>UNSTOP ↗</span></div>
        <div className={'event-card-meta'}><span>{event.type}</span><span><CalendarDays size={12} />{event.date}</span></div>
        <h3>{event.title}</h3><p>{event.detail}</p><div className={'event-card-foot'}><span>{event.host}</span><ArrowUpRight size={15} aria-hidden={'true'} /></div>
      </a>)}
    </div>
    <p className={'events-attribution'}>Event listings and artwork belong to their organisers and are linked to their Unstop pages.</p>
  </section>;
}
function ToolkitSection() {
  return <section className={'toolkit-section section-wrap'} id={'toolkit'}>
    <div className={'section-heading centered reveal'}><p className={'eyebrow'}>A TOOL FOR THE TASK</p><h2>Purpose-built AI for the<br />work around a hackathon.</h2><p>Each tool supports a specific moment in the process. AI can assist the work; people remain in control of decisions.</p></div>
    <div className={'toolkit-art-grid'}>
      <figure className={'toolkit-art-card toolkit-art-idea reveal'}><img src={ideaCheckCrop} alt="IdeaCheck illustration: a floating dimensional checklist with an idea symbol and completed checks." loading="lazy" /></figure>
      <figure className={'toolkit-art-card toolkit-art-mate reveal reveal-delay-1'}><img src={hackMateCrop} alt="HackMate illustration: overlapping profile tiles for teammate discovery." loading="lazy" /></figure>
      <figure className={'toolkit-art-card toolkit-art-rules reveal'}><img src={ruleBotCrop} alt="RuleBot illustration: layered conversation bubbles." loading="lazy" /></figure>
      <figure className={'toolkit-art-card toolkit-art-rounds reveal reveal-delay-1'}><img src={roundsCrop} alt="R1, R2 and R3 analyser illustration: dimensional bars for round based review." loading="lazy" /></figure>
      <figure className={'toolkit-art-card toolkit-art-student reveal'}><img src={studentPanelCrop} alt="Student Panel Chatbot illustration: a friendly student support assistant." loading="lazy" /></figure>
    </div>
  </section>;
}

const productDemos = [
  { step: '01 / DISCOVER', title: 'Find your next opportunity.', detail: 'Browse events by interest and see the key details at a glance.', screenTitle: 'Explore hackathons and events', image: exploreScreen, kind: 'discovery' },
  { step: '02 / SHAPE AN IDEA', title: 'Make a promising idea clearer.', detail: 'Get strengths, focus areas and useful next steps in plain language.', screenTitle: 'IdeaCheck student feedback', image: ideaCheckScreen, kind: 'review' },
  { step: '03 / TAKE PART', title: 'Keep the event journey together.', detail: 'See participation, round progress, team context and event updates.', screenTitle: 'ReBuild ’26 event workspace', image: eventInfoScreen, kind: 'journey' },
  { step: '04 / RECOGNISE', title: 'Keep your achievement close.', detail: 'Access a shareable student identity with a QR code and profile link.', screenTitle: 'CampusCode Digital ID', image: digitalIdScreen, kind: 'recognition' },
];

function ProductDemosSection() {
  const pairs = [productDemos.slice(0, 2), productDemos.slice(2, 4)];
  return <section className={'product-section section-wrap'} id={'product-demos'}>
    <div className={'section-heading centered reveal'}><p className={'eyebrow'}>A CLOSER LOOK</p><h2>See the work take shape.</h2><p>From the first search to the final recognition, each step has a clear place.</p></div>
    <div className={'demo-pair-stack'}>
      {pairs.map((pair, pairIndex) => <div className={'demo-pair'} key={pairIndex}>
        {pair.map(({ step, title, detail, screenTitle, image, kind }, index) => <article className={`demo-feature-row demo-${kind} reveal${index ? ' reveal-delay-1' : ''}`} key={step}>
          <div className={'demo-caption'}><span>{step}</span><h3>{title}</h3><p>{detail}</p></div>
          <ScreenshotSlot className={'demo-screen'} title={screenTitle} src={image} />
        </article>)}
      </div>)}
    </div>
  </section>;
}

function FaqSection() { return (<section className={'faq-section section-wrap'} id={'faq'}> <div className={'faq-intro reveal'}><p className={'eyebrow'}>GOOD TO KNOW</p><h2>Questions,<br />answered.</h2><p>Clear answers about what CampusCode does and how its tools fit into a hackathon.</p><span className={'faq-mark'}>?</span></div> <div className={'faq-list reveal reveal-late'}> <details className={'faq-item'}><summary>What is CampusCode?<span className={'faq-plus'}></span></summary><p>CampusCode is a hackathon platform for students to discover and participate in events, and for organisers to create events, manage rounds and submissions, support evaluation, and conclude the event.</p></details> <details className={'faq-item'}><summary>Who can use CampusCode?<span className={'faq-plus'}></span></summary><p>Students and participants can discover and join hackathons. Organisers can create and manage events. Evaluators and reviewers can work with organised submissions through round-based review workflows.</p></details> <details className={'faq-item'}><summary>How does HackMate help me find a team?<span className={'faq-plus'}></span></summary><p>HackMate supports teammate discovery, including search using a CampusCode ID. It helps you look for potential teammates; team formation is not guaranteed.</p></details> <details className={'faq-item'}><summary>What do the AI tools actually do?<span className={'faq-plus'}></span></summary><p>IdeaCheck supports idea screening, RuleBot helps with rules and guidelines, R1/R2/R3 analysers support round-based review, and the Student Panel Chatbot gives students a place to ask questions. AI supports these tasks; it does not replace official event rules or human decisions.</p></details> <details className={'faq-item'}><summary>How do rounds and project submissions work?<span className={'faq-plus'}></span></summary><p>Students can submit ideas and projects and follow event progress. Organisers can manage submissions alongside the rounds configured for their hackathon. Specific submission requirements depend on the event.</p></details> <details className={'faq-item'}><summary>What are the certificate and Digital ID?<span className={'faq-plus'}></span></summary><p>Participants can access verifiable certificates and a QR-based Digital ID through CampusCode. The exact verification process and external acceptance depend on the product’s implementation and the recipient.</p></details> <details className={'faq-item'}><summary>Where can I explore or create an event?<span className={'faq-plus'}></span></summary><p>This preview does not include live CampusCode account or event destinations. Use the student and organiser paths on this page to see how each journey works.</p></details> </div> </section>); }

function FinalCtaSection() { return (<section className={'final-cta section-wrap reveal'} id={'final-cta'}> <div className={'cta-grid'}></div><span className={'cta-star'}>✳</span><p className={'eyebrow'}>BUILD. COMPETE. SHIP.</p><h2>Your next hackathon<br />starts <em>here.</em></h2><p>Find an event where you can build—or bring your own hackathon to CampusCode.</p><div className={'cta-actions'}><MagneticButton><a className={'button button-dark'} href={'#students'}>Explore the student journey <span>↗</span></a></MagneticButton><a className={'button button-outline'} href={'#organisers'}>Run a hackathon <span>↗</span></a></div> </section>); }

function SiteFooter() { return (<footer className={'site-footer section-wrap'}><div className={'footer-top'}><div className={'footer-brand'}><a className={'brand'} href={'#top'} aria-label={'CAMPUSCODE home'}><img className={'brand-mark'} src={campuscodeLogoMark} alt="" aria-hidden="true"/><span className={'brand-wordmark'}>CAMPUSCODE</span></a><p>A connected platform for the people<br />and work behind every hackathon.</p></div><div className={'footer-column'}><span>EXPLORE</span><a href={'#platform'}>Platform</a><a href={'#features'}>Features</a><a href={'#toolkit'}>AI toolkit</a><a href={'#product-demos'}>Product tour</a><a href={'#faq'}>FAQ</a></div><div className={'footer-column'}><span>YOUR JOURNEY</span><a href={'#students'}>For students</a><a href={'#organisers'}>For organisers</a><a href={'#featured-events'}>Featured events</a></div><div className={'footer-column footer-brandline'}><span>THE PROMISE</span><b>Build.<br />Compete.<br />Ship.</b><span className={'footer-star'}>✳</span></div></div><div className={'footer-bottom'}><span>© <span id={'year'}></span> CAMPUSCODE</span><span>Made for the work that happens at hackathons.</span><a href={'#top'}>BACK TO TOP ↑</a></div></footer>); }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const authMatch = window.location.pathname.match(/^\/(login|signup)\/?$/);
  const isDashboard = /^\/dashboard\/?$/.test(window.location.pathname);
  const isExplore = /^\/explore\/?$/.test(window.location.pathname);
  const isEventWorkspace = /^\/events\/rebuild-26\/?$/.test(window.location.pathname);
  const isMyEvents = /^\/my-events\/?$/.test(window.location.pathname);
  const isHackMate = /^\/hackmate\/?$/.test(window.location.pathname);
  const isIdeaCheck = /^\/ideacheck\/?$/.test(window.location.pathname);
  const isDigitalId = /^\/digital-id\/?$/.test(window.location.pathname);
  useEffect(() => {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);
  if (authMatch) return <AuthPage initialMode={authMatch[1]} />;
  if (isDashboard) return <DashboardPage />;
  if (isExplore) return <DashboardPage initialView="explore" />;
  if (isEventWorkspace) return <DashboardPage initialView="event" />;
  if (isMyEvents) return <DashboardPage initialView="my-events" />;
  if (isHackMate) return <DashboardPage initialView="hackmate" />;
  if (isIdeaCheck) return <DashboardPage initialView="ideacheck" />;
  if (isDigitalId) return <DashboardPage initialView="digital-id" />;
  const closeMenu = () => setMenuOpen(false);
  return <div className="app-shell" onClick={(event) => { if (event.target.closest('a')) closeMenu(); }}>
    <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <motion.main>
      <motion.div {...entranceMotion(reduceMotion, 0)}><Hero /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 1)}><PlatformSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 2)}><FeaturesSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 3)}><ToolkitSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 4)}><FeaturedEventsSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 5)}><AudienceSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 6)}><ProductDemosSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 7)}><FaqSection /></motion.div>
      <motion.div {...entranceMotion(reduceMotion, 8)}><FinalCtaSection /></motion.div>
    </motion.main>
    <SiteFooter />
  </div>;
}
