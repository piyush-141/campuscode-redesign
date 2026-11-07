import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { entranceMotion } from '../lib/motion.js';
import { ArrowUpRight, CalendarDays, Check, UsersRound } from 'lucide-react';
import { myEvents } from '../data/myEvents.js';

const filters = ['All', 'Ongoing', 'Completed'];

function MyEventCard({ event, index, reduceMotion }) {
  const completed = event.status === 'Completed';
  return <motion.article {...entranceMotion(reduceMotion, index)} className="my-event-card">
    <a className="my-event-banner" href={event.href} aria-label={`View details for ${event.name}`}>
      <img src={event.banner} alt={`${event.organiser} event mark`} />
      <span className="my-event-banner-organiser">{event.organiser}</span>
      <span className={`my-event-status ${completed ? 'is-completed' : 'is-ongoing'}`}><i />{event.status}</span>
    </a>
    <div className="my-event-card-content">
      <div className="my-event-card-heading"><div><span className="my-event-kicker">HACKATHON</span><h2>{event.name}</h2></div><span className="my-event-confirmed"><Check size={12} /> Registered</span></div>
      <div className="my-event-meta-grid">
        <div><span>REGISTRATION ID</span><strong>{event.registration}</strong></div>
        <div><span>TEAM</span><strong><UsersRound size={12} />{event.team}</strong></div>
      </div>
      <div className="my-event-progress"><CalendarDays size={13} /><span>{event.progress}</span></div>
      <a className="my-event-open-journey" href={event.href}>Open Journey <ArrowUpRight size={14} /></a>
    </div>
  </motion.article>;
}

export default function MyEventsPage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleEvents = useMemo(() => myEvents.filter((event) => activeFilter === 'All' || event.status === activeFilter), [activeFilter]);
  return <main className="my-events-page">
    <header className="my-events-heading"><div><p className="my-events-eyebrow">YOUR PARTICIPATION</p><h1>My Events<span>.</span></h1><p>Hackathons you’ve registered for or joined.</p></div></header>
    <div className="my-events-toolbar"><div className="my-events-filters" role="group" aria-label="Filter your events">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'is-active' : ''} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}<span>{myEvents.filter((event) => filter === 'All' || event.status === filter).length.toString().padStart(2, '0')}</span></button>)}</div><span className="my-events-count">{visibleEvents.length} {visibleEvents.length === 1 ? 'EVENT' : 'EVENTS'}</span></div>
    {visibleEvents.length ? <div className="my-events-grid">{visibleEvents.map((event, index) => <MyEventCard key={event.id} event={event} index={index} reduceMotion={reduceMotion} />)}</div> : <div className="my-events-empty"><span>{activeFilter}</span><h2>No {activeFilter.toLowerCase()} events.</h2><p>Events you take part in will appear here.</p><a href="/explore">Explore opportunities <ArrowUpRight size={14} /></a></div>}
  </main>;
}
