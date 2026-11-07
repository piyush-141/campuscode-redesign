import { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { entranceMotion } from '../lib/motion.js';
import { ArrowDown, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { featuredEvents } from '../data/featuredEvents.js';
import campuscodeLogoMark from '../assets/campuscode-logo-mark.png';

const eventMeta = {
  'Rack It Up 2026': { category: 'Tech', mode: 'Online', registration: 'See event details', kind: 'hackathon', closingAt: null },
  'INNOVATE INDIA 2026': { category: 'Tech', mode: 'Online', registration: 'See event details', kind: 'hackathon', closingAt: '2026-12-06', closingLabel: 'Through 6 Dec 2026' },
  'Gen-AI Product Hackathon': { category: 'AI/ML', mode: 'See event details', registration: 'See event details', kind: 'hackathon', closingAt: null },
  'VOYAGEHACK 4.0': { category: 'Tech', mode: 'See event details', registration: 'Register by 12 Nov', kind: 'competition', closingAt: '2026-11-12', closingLabel: 'Register by 12 Nov 2026' },
  'Eurogrip TORQ Challenge 4.0': { category: 'Business', mode: 'Online', registration: 'See event details', kind: 'competition', closingAt: '2026-11-22', closingLabel: 'Through 22 Nov 2026' },
  Overclock: { category: 'Tech', mode: 'See event details', registration: 'Registration through 15 Dec', kind: 'hackathon', closingAt: '2026-12-15', closingLabel: 'Registration through 15 Dec' },
};
const categories = ['Tech', 'Design', 'AI/ML', 'Product', 'Business'];
const getMeta = (event) => eventMeta[event.title] || { category: 'Tech', mode: 'See event details', registration: 'See event details', kind: 'hackathon' };
const unique = (events) => [...new Map(events.map((event) => [event.title, event])).values()];

function getDateBadge(date) {
  const match = date.match(/(\d{1,2})(?:\s*[–-]\s*(\d{1,2}))?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);
  if (!match) return { day: 'DATE', month: 'TBA' };
  return { day: match[2] ? `${match[1]}–${match[2]}` : match[1], month: match[3].toUpperCase() };
}

function EventCard({ event, size = 'regular', label, index = 0 }) {
  const reduceMotion = useReducedMotion();
  const meta = getMeta(event);
  const dateBadge = getDateBadge(event.date);
  const detailsHref = '/events/rebuild-26';
  return <motion.article {...entranceMotion(reduceMotion, index)} className={`explore-event-card explore-event-${size}`}>
    <div className="explore-event-art"><img src={event.image} alt={`${event.title} event artwork`} loading="lazy" /><span className="explore-art-category">{label || meta.category}</span><span className="explore-date-badge"><strong>{dateBadge.day}</strong><small>{dateBadge.month}</small></span></div>
    <div className="explore-card-content"><div className="explore-event-meta"><span>{event.host}</span>{meta.mode !== 'See event details' && <span className="explore-mode">{meta.mode}</span>}</div><h3>{event.title}</h3><p className="explore-summary">{event.detail}</p><div className="explore-card-bottom"><span className="explore-status">{meta.registration}</span></div><div className="explore-card-actions"><a className="explore-details-button" href={detailsHref}>View details <ArrowUpRight size={13} /></a></div></div>
  </motion.article>;
}

function Carousel({ title, eyebrow, description, items, featured = false, id }) {
  const track = useRef(null);
  const scroll = (direction) => track.current?.scrollBy({ left: direction * Math.max(270, track.current.clientWidth * 0.76), behavior: 'smooth' });
  if (!items.length) return null;
  return <section className={`explore-section ${featured ? 'explore-featured-section' : ''}`} id={id}>
    <div className="explore-section-heading"><div><p className="explore-eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div><div className="explore-carousel-controls"><button aria-label={`Previous ${title}`} onClick={() => scroll(-1)}><ChevronLeft size={17} /></button><button aria-label={`Next ${title}`} onClick={() => scroll(1)}><ChevronRight size={17} /></button></div></div>
    <div ref={track} className={`explore-carousel ${featured ? 'explore-carousel-featured' : ''}`} tabIndex={0} aria-label={`${title} events`}>
      {items.map((event, index) => <EventCard key={`${id}-${event.title}`} event={event} size="regular" index={index} />)}
    </div>
  </section>;
}

export default function ExplorePage({ embedded = false }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [kind, setKind] = useState('All opportunities');
  const [sort, setSort] = useState('Recommended');
  const events = useMemo(() => unique(featuredEvents.map((event) => ({ ...event, ...getMeta(event) }))), []);
  const byTitle = (title) => events.find((event) => event.title === title);
  const featured = ['Rack It Up 2026', 'INNOVATE INDIA 2026', 'Gen-AI Product Hackathon'].map(byTitle).filter(Boolean);
  // ReBuild ’26 is the user's current hackathon activity in the demo dashboard.
  // Use that signal to prioritise build-focused opportunities, with no pretend profile data.
  const personalized = ['VOYAGEHACK 4.0', 'Overclock', 'Gen-AI Product Hackathon'].map(byTitle).filter(Boolean);
  const closingSoon = events.filter((event) => event.closingAt).sort((a, b) => a.closingAt.localeCompare(b.closingAt));
  const popular = ['Overclock', 'Rack It Up 2026', 'INNOVATE INDIA 2026'].map(byTitle).filter(Boolean);
  const competitions = events.filter((event) => getMeta(event).kind === 'competition');
  const filtered = events.filter((event) => {
    const text = `${event.title} ${event.host} ${event.detail} ${event.type}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (!category || getMeta(event).category === category) && (kind === 'All opportunities' || (kind === 'Hackathons' ? getMeta(event).kind === 'hackathon' : getMeta(event).kind === 'competition'));
  }).sort((a, b) => sort === 'Deadline' ? (getMeta(a).closingAt || '9999').localeCompare(getMeta(b).closingAt || '9999') : 0);

  const PageTag = embedded ? 'div' : 'main';
  return <PageTag className={`explore-page${embedded ? ' explore-page-embedded' : ''}`}>
    {!embedded && <header className="explore-topbar"><a className="explore-brand" href="/dashboard" aria-label="CampusCode dashboard"><img src={campuscodeLogoMark} alt="" /><span>campus<span>code</span></span></a><nav aria-label="Explore navigation"><a href="#curated">Discover</a><a href="#all-events">All opportunities</a></nav><a className="explore-back" href="/dashboard"><ArrowLeft size={15} /> Workspace</a></header>}
    <div className="explore-main">
      <section className="explore-hero" aria-labelledby="explore-title"><div className="explore-hero-copy"><p className="explore-eyebrow"><span className="explore-live-dot" /> OPPORTUNITIES FOR BUILDERS</p><h1 id="explore-title">Find your next<br /><em>thing to build.</em></h1><p className="explore-hero-description">Hackathons, challenges and competitions worth your time.</p></div>
        <div className="explore-search-wrap"><label className="explore-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, skills or organisers" aria-label="Search events, skills or organisers" />{query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}<kbd>⌘ K</kbd></label><div className="explore-category-filters" aria-label="Filter by category"><span>EXPLORE BY</span>{categories.map((item) => <button key={item} className={category === item ? 'is-selected' : ''} onClick={() => setCategory(category === item ? '' : item)} aria-pressed={category === item}>{item}</button>)}</div></div>
        <a className="explore-scroll-hint" href="#curated">SCROLL TO EXPLORE <ArrowDown size={13} /></a>
      </section>

      <div className="explore-curated" id="curated">
        <Carousel id="featured" eyebrow="A GOOD PLACE TO START" title="Featured opportunities" description="A few worthwhile places to put your energy." items={featured} featured />
        <Carousel id="for-you" eyebrow="FOR YOUR NEXT BUILD" title="Personalised for you" description="Picked around your ReBuild ’26 hackathon activity." items={personalized} />
        <Carousel id="closing-soon" eyebrow="DATES TO KEEP IN VIEW" title="Closing soon" description="Opportunities with the nearest published dates first." items={closingSoon} />
        <Carousel id="popular" eyebrow="BUILDER FAVOURITES" title="Popular hackathons" items={popular} />
        <Carousel id="competitions" eyebrow="BEYOND THE BUILD" title="Quizzes & competitions" items={competitions} />
      </div>

      <section className="explore-listing" id="all-events"><div className="explore-section-heading"><div><p className="explore-eyebrow">THE FULL LINEUP</p><h2>Explore all opportunities.</h2><p>Find the right challenge and take a closer look.</p></div></div>
        <div className="explore-listing-tools"><div className="explore-kind-tabs" role="group" aria-label="Opportunity type">{['All opportunities', 'Hackathons', 'Competitions'].map((item) => <button key={item} className={kind === item ? 'is-active' : ''} onClick={() => setKind(item)}>{item}</button>)}</div><label className="explore-sort"><SlidersHorizontal size={14} /><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort opportunities"><option>Recommended</option><option>Deadline</option></select></label></div>
        {filtered.length ? <div className="explore-listing-grid">{filtered.map((event, index) => <EventCard key={`all-${event.title}`} event={event} index={index} />)}</div> : <div className="explore-empty"><Sparkles size={18} /><strong>No events in this view yet.</strong><span>Try another category or clear your search.</span><button onClick={() => { setQuery(''); setCategory(''); setKind('All opportunities'); }}>Clear filters</button></div>}
        <p className="explore-source-note">Listings and artwork are provided by event organisers. Dates and registration details link to the host listing.</p>
      </section>
      <footer className="explore-footer"><span>© CAMPUSCODE · BUILD. COMPETE. SHIP.</span><a href="/dashboard">Back to workspace <ArrowUpRight size={13} /></a></footer>
    </div>
  </PageTag>;
}
