import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { entranceMotion } from '../lib/motion.js';
import { ArrowUpRight, Check, ChevronDown, Filter, Search, UsersRound, X } from 'lucide-react';

const students = [
  { initials: 'AS', name: 'Aarav Sharma', id: 'CC-240128', college: 'IIIT Nagpur', skills: ['React', 'Node.js', 'UI/UX'], match: 94, seeking: 'Backend / Full-stack teammate', status: 'Looking for team' },
  { initials: 'SP', name: 'Sneha Patil', id: 'CC-240156', college: 'VNIT Nagpur', skills: ['Python', 'ML', 'Data Science'], match: 87, seeking: 'AI / ML project teammate', status: 'Open to teaming' },
  { initials: 'RK', name: 'Rohan Kulkarni', id: 'CC-240173', college: 'IIIT Nagpur', skills: ['Flutter', 'Firebase', 'Backend'], match: 79, seeking: 'Frontend / Flutter teammate', status: 'Individual' },
];
const filters = ['Potential teammates', 'All students', 'High match', 'Looking for team', 'Individual'];

function StudentCard({ student, onOpen, index, reduceMotion }) {
  return <motion.button {...entranceMotion(reduceMotion, index)} className="hackmate-student-card" onClick={() => onOpen(student)} aria-label={`View ${student.name}'s profile`}>
    <div className="hackmate-card-top"><span className="hackmate-avatar">{student.initials}</span><span className={`hackmate-match ${student.match >= 85 ? 'is-high' : ''}`}>{student.match}% <small>match</small></span></div>
    <h3>{student.name}</h3><p className="hackmate-school">{student.id}<span>·</span>{student.college}</p>
    <div className="hackmate-skills">{student.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
    <div className="hackmate-card-foot"><span>{student.status}</span><span className="hackmate-card-arrow"><ArrowUpRight size={14} /></span></div>
  </motion.button>;
}

function StudentDrawer({ student, onClose }) {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (!student) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [student, onClose]);
  if (!student) return null;
  return <div className="hackmate-drawer-layer" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <aside className="hackmate-profile-drawer" role="dialog" aria-modal="true" aria-labelledby="hackmate-profile-name">
      <button className="hackmate-drawer-close" onClick={onClose} aria-label="Close student profile"><X size={17} /></button>
      <span className="hackmate-avatar hackmate-avatar-large">{student.initials}</span>
      <p className="hackmate-eyebrow">STUDENT PROFILE</p>
      <h2 id="hackmate-profile-name">{student.name}</h2>
      <p className="hackmate-profile-meta">{student.college}<span>·</span>{student.id}</p>
      <div className="hackmate-profile-match"><strong>{student.match}%</strong><span>match for ReBuild ’26</span></div>
      <div className="hackmate-drawer-section"><p className="hackmate-eyebrow">SKILLS & INTERESTS</p><div className="hackmate-skills">{student.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
      <div className="hackmate-drawer-section"><p className="hackmate-eyebrow">LOOKING FOR</p><strong className="hackmate-seeking">{student.seeking}</strong></div>
      <button className={`hackmate-connect${connected ? ' is-connected' : ''}`} onClick={() => setConnected(true)}>{connected ? <>Request sent <Check size={14} /></> : <>Connect with {student.name.split(' ')[0]} <ArrowUpRight size={14} /></>}</button>
      <p className="hackmate-demo-label">Illustrative profile · Connection preview</p>
    </aside>
  </div>;
}

export default function HackMatePage() {
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Potential teammates');
  const [selected, setSelected] = useState(null);
  const results = useMemo(() => students.filter((student) => {
    const searchText = `${student.name} ${student.id} ${student.college} ${student.skills.join(' ')}`.toLowerCase();
    const matchesFilter = filter === 'High match' ? student.match >= 85 : filter === 'Looking for team' ? student.status === 'Looking for team' : filter === 'Individual' ? student.status === 'Individual' : filter === 'Potential teammates' ? student.status !== 'Individual' : true;
    return matchesFilter && (!search || searchText.includes(search.toLowerCase()));
  }), [search, filter]);

  return <main className="hackmate-page">
    <header className="hackmate-page-heading"><div><p className="hackmate-eyebrow">01 / HACKMATE</p><h1>Find your team<span>.</span></h1></div><div className="hackmate-total"><strong>{String(results.length).padStart(2, '0')}</strong><span>PROFILES</span></div></header>
    <section className="hackmate-event-context"><div className="hackmate-context-label"><p className="hackmate-eyebrow">01 · EVENT CONTEXT</p><strong>Select hackathon</strong></div><label className="hackmate-event-select"><select aria-label="Select a registered hackathon"><option value="rebuild-26">ReBuild ’26 · Registered</option></select><ChevronDown size={15} /></label></section>
    <section className="hackmate-discovery"><div className="hackmate-discovery-head"><p className="hackmate-eyebrow">02 · DISCOVERY</p><span>Registered participants</span></div><label className="hackmate-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or CampusCode ID" aria-label="Search students by name or CampusCode ID" />{search && <button onClick={() => setSearch('')} aria-label="Clear search">×</button>}</label><div className="hackmate-filter-row"><span><Filter size={12} /> FILTER</span>{filters.map((item) => <button key={item} className={filter === item ? 'is-active' : ''} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div></section>
    <section className="hackmate-results"><div className="hackmate-results-heading"><div><p className="hackmate-eyebrow">03 · MATCH RESULTS</p><h2>{filter === 'All students' ? 'All students' : 'Potential teammates'}<span> · {results.length} found</span></h2></div><span className="hackmate-sort-label">SORT · BEST MATCH</span></div>{results.length ? <div className="hackmate-results-grid">{results.sort((a, b) => b.match - a.match).map((student, index) => <StudentCard key={student.id} student={student} onOpen={setSelected} index={index} reduceMotion={reduceMotion} />)}</div> : <div className="hackmate-no-results"><UsersRound size={17} /><span>No matching students. Try another search or filter.</span></div>}<p className="hackmate-data-note">Illustrative student profiles and match scores.</p></section>
    <StudentDrawer student={selected} onClose={() => setSelected(null)} />
  </main>;
}
