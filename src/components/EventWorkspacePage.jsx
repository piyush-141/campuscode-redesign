import { useEffect, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Award, Bell, Check, ChevronRight, Clock3, Copy, ExternalLink, FileText, Medal, Send, Sparkles, UsersRound } from 'lucide-react';
import campuscodeLogoMark from '../assets/campuscode-logo-mark.png';

const tabs = ['Overview', 'Rounds', 'My Team', 'Results', 'Leaderboard', 'Certificates', 'Announcements'];
const rounds = [
  { id: '01', name: 'Round 1 · Recreate', status: 'Completed', date: '6 Nov 2026 · 10:00 PM', note: 'Recreate the CampusCode student flow faithfully: dashboard, login, register and student dashboard. Frontend only; mock data is fine.', submitted: true, ended: true },
  { id: '02', name: 'Round 2 · New UI', status: 'Live', date: '8 Nov 2026 · 10:00 PM', note: 'Create a new interface for the CampusCode participant dashboard. Keep it responsive, clear and focused on the student experience.', submitted: false, deadline: '2026-11-08T22:00:00+05:30', ended: false },
];
const leaderboard = [
  { rank: '01', team: 'Pixel Forge', members: 'Team of 3', score: '94.8', change: '↑ 2' },
  { rank: '02', team: 'Build Theory', members: 'Team of 4', score: '92.4', change: '↑ 1' },
  { rank: '03', team: 'Northstar', members: 'Team of 2', score: '90.1', change: '—' },
  { rank: '04', team: 'Interface Club', members: 'Team of 3', score: '88.6', change: '↑ 3' },
  { rank: '05', team: 'Sunday Stack', members: 'Team of 2', score: '86.9', change: '↓ 1' },
];

function Eyebrow({ children }) { return <p className="event-eyebrow">{children}</p>; }
function SectionHeading({ label, title, detail }) { return <div className="event-tab-heading"><Eyebrow>{label}</Eyebrow><h2>{title}</h2>{detail && <p>{detail}</p>}</div>; }
function Panel({ children, className = '' }) { return <section className={`event-panel ${className}`}>{children}</section>; }

function Overview({ setTab }) {
  return <div className="event-tab-content event-overview-content">
    <section className="event-cover">
      <div className="event-cover-mark"><img src={campuscodeLogoMark} alt="CampusCode" /></div>
      <div className="event-cover-copy"><Eyebrow>CAMPUSCODE PRESENTS</Eyebrow><h2>ReBuild <em>’26</em></h2><p>The dashboard recreation hackathon</p><div className="event-tags"><span><i /> Student showcase</span><span><i /> Round 2 in review</span><span><i /> Online</span></div></div>
      <div className="event-cover-index">01 <span>/ EVENT</span></div>
    </section>
    <div className="event-overview-stats"><Panel><span>PARTICIPATION</span><strong>Registered</strong><small>Individual entry</small></Panel><Panel><span>ROUND STATUS</span><strong><i className="event-status-dot" />In review</strong><small>Round 2 · New UI</small></Panel><Panel><span>TEAM</span><strong>Not assigned</strong><small>Find collaborators with HackMate</small></Panel></div>
    <div className="event-overview-grid">
      <Panel className="event-round-preview"><div className="event-panel-top"><div><Eyebrow>YOUR EVENT PATH</Eyebrow><h3>Rounds at a glance</h3></div><button onClick={() => setTab('Rounds')}>View rounds <ArrowUpRight size={14} /></button></div>{rounds.map((round) => <div className="event-round-row" key={round.id}><span className={`event-round-number ${round.submitted ? 'is-done' : ''}`}>{round.submitted ? <Check size={13} /> : round.id}</span><div><strong>{round.name}</strong><small>{round.date}</small></div><span className={`event-round-status ${round.status === 'Completed' ? 'is-complete' : 'is-review'}`}>{round.status}</span></div>)}</Panel>
      <Panel className="event-team-prompt"><span className="event-team-icon"><UsersRound size={18} /></span><Eyebrow>TEAM WORKSPACE</Eyebrow><h3>Build better, together.</h3><p>You’re currently participating without an assigned team. Find collaborators or keep exploring solo.</p><button onClick={() => setTab('My Team')}>Explore team options <ArrowUpRight size={14} /></button></Panel>
    </div>
    <Panel className="event-announcement-preview"><span className="event-announcement-icon"><Bell size={15} /></span><div><Eyebrow>ORGANISER UPDATE · 7 NOV</Eyebrow><strong>Round 2 submissions are under review.</strong><p>Keep an eye on Results for the next update from the organisers.</p></div><button onClick={() => setTab('Announcements')} aria-label="View announcements"><ChevronRight size={17} /></button></Panel>
  </div>;
}

function RoundTimer({ deadline, ended, onExpire }) {
  const getRemaining = () => {
    if (ended) return 0;
    return Math.max(0, new Date(deadline).getTime() - Date.now());
  };
  const [remaining, setRemaining] = useState(getRemaining);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getRemaining();
      setRemaining(next);
      if (next === 0 && !ended) onExpire(true);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, ended]);
  const totalSeconds = Math.floor(remaining / 1000);
  const units = [Math.floor(totalSeconds / 3600), Math.floor((totalSeconds % 3600) / 60), totalSeconds % 60];
  return <div className={`event-round-timer${remaining === 0 ? ' is-ended' : ''}`}><div><span>{ended || remaining === 0 ? 'ROUND ENDED' : 'TIME LEFT'}</span><strong>{ended || remaining === 0 ? 'TIME UP' : units.map((value) => String(value).padStart(2, '0')).join(':')}</strong><small>Deadline · {ended ? '6 Nov 2026, 10:00 PM' : '8 Nov 2026, 10:00 PM IST'} · Sample timer</small></div><Clock3 size={19} /></div>;
}

function Rounds() {
  const [selected, setSelected] = useState('02');
  const [submitted, setSubmitted] = useState(false);
  const round = rounds.find((item) => item.id === selected);
  const [deadlinePassed, setDeadlinePassed] = useState(Boolean(round.deadline && Date.now() >= new Date(round.deadline).getTime()));
  const roundClosed = round.ended || deadlinePassed || Boolean(round.deadline && Date.now() >= new Date(round.deadline).getTime());
  const handleSubmit = (event) => { event.preventDefault(); setSubmitted(true); };
  return <div className="event-tab-content"><SectionHeading label="BUILD / ROUNDS" title="Your rounds." detail="Round briefs, submission progress and deadlines in one place." /><div className="event-round-tabs" role="tablist" aria-label="Hackathon rounds">{rounds.map((item) => <button key={item.id} role="tab" aria-selected={selected === item.id} className={selected === item.id ? 'is-active' : ''} onClick={() => { setSelected(item.id); setSubmitted(false); setDeadlinePassed(Boolean(item.deadline && Date.now() >= new Date(item.deadline).getTime())); }}><span>{item.id}</span><span><strong>{item.name}</strong><small>{item.status}</small></span><ChevronRight size={15} /></button>)}</div><Panel className="event-round-detail"><div className="event-detail-top"><Eyebrow>ROUND {round.id} DETAILS</Eyebrow><span className={`event-round-status ${round.status === 'Completed' ? 'is-complete' : 'is-live'}`}><i />{roundClosed ? 'Completed' : round.status}</span></div><h3>{round.name}</h3><div className="event-round-info"><span><Clock3 size={14} />{round.date}</span><span><FileText size={14} />Frontend submission</span><span>Individual participation</span></div><div className="event-round-content-grid"><div className="event-round-brief"><span className="event-round-section-label">WHAT YOU NEED TO SUBMIT</span><p>{round.note}</p><div className="event-brief-meta"><span><b>DELIVERABLE</b>Responsive web interface</span><span><b>AI USAGE</b>Not required</span><span><b>PARTICIPATION</b>Individual</span></div></div><div className="event-round-workspace"><div className="event-round-workspace-head"><div><Eyebrow>HACKATHON WORKSPACE</Eyebrow><strong>ReBuild ’26</strong></div><span className={`event-round-status ${roundClosed ? 'is-complete' : 'is-live'}`}>{roundClosed ? 'Completed' : round.status}</span></div><div className="event-round-workspace-summary"><span>YOUR ENTRY</span><strong>{roundClosed ? 'Submission window closed' : submitted ? 'Submission received' : 'Ready to submit'}</strong><small>Round {round.id} · {round.name.split(' · ')[1]}</small></div><div className="event-round-workspace-line"><span>PARTICIPATION</span><strong>Individual</strong></div><div className="event-round-workspace-line"><span>TEAM</span><strong>Not assigned</strong></div></div></div><RoundTimer deadline={round.deadline} ended={round.ended} onExpire={setDeadlinePassed} />{roundClosed ? <div className="event-round-locked"><Check size={15} /><div><strong>Round {round.id} is complete</strong><span>Submissions are closed. Your entry has been received.</span></div><span className="event-round-status is-complete">COMPLETED</span></div> : submitted ? <div className="event-round-locked is-submitted"><Check size={15} /><div><strong>Submission received</strong><span>This is a frontend preview. No data was sent to a server.</span></div><span className="event-round-status is-live">SAVED</span></div> : <form className="event-submission-form" onSubmit={handleSubmit}><div className="event-submission-form-heading"><div><Eyebrow>ROUND {round.id} SUBMISSION</Eyebrow><h4>Share your work.</h4><p>Add your project links for the organisers to review.</p></div><span className="event-submission-send"><Send size={15} /></span></div><label>GitHub repository<input type="url" placeholder="https://github.com/you/project" required /></label><label>Live demo link<input type="url" placeholder="https://your-project.example" required /></label><div className="event-submission-form-bottom"><label className="event-submission-note">Note for organisers<input type="text" placeholder="Anything you'd like the reviewers to know?" /></label><button type="submit">Submit for review <ArrowUpRight size={14} /></button></div><small className="event-demo-footnote">Demo interaction · submission is not sent to a backend.</small></form>}</Panel></div>;
}

function MyTeam() {
  const [copied, setCopied] = useState(false);
  const inviteCode = 'RB26-PY7K';
  const copyCode = async () => { try { await navigator.clipboard.writeText(inviteCode); setCopied(true); window.setTimeout(() => setCopied(false), 1400); } catch { setCopied(false); } };
  return <div className="event-tab-content"><SectionHeading label="BUILD / COLLABORATION" title="Your team space." detail="Your event entry is currently individual. Team up whenever you’re ready." /><div className="event-team-layout"><Panel className="event-team-main"><div className="event-team-state"><span className="event-team-icon"><UsersRound size={20} /></span><Eyebrow>REBUILD ’26 PARTICIPANT</Eyebrow><h3>Working solo for now.</h3><p>No team has been assigned to this entry. You can still manage your submissions and follow event updates here.</p></div><div className="event-team-meta"><div><span>PARTICIPATION TYPE</span><strong>Individual</strong></div><div><span>TEAM MEMBERS</span><strong>Just you</strong></div><div><span>PROJECT</span><strong>Round 2 · New UI</strong></div></div><div className="event-team-member"><span className="event-avatar">PP</span><div><strong>Piyush Pal</strong><small>Participant · You</small></div><span className="event-you-label">YOU</span></div></Panel><Panel className="event-invite-panel"><Eyebrow>INVITE A TEAMMATE</Eyebrow><h3>Have someone in mind?</h3><p>Share your event invite code with a collaborator.</p><div className="event-invite-code"><code>{inviteCode}</code><button onClick={copyCode} aria-label="Copy invite code">{copied ? <Check size={15} /> : <Copy size={15} />}</button></div><small className="event-demo-note">Demo invite code · team actions are preview-only</small><a className="event-outline-action" href="/hackmate">Find teammates <ArrowUpRight size={14} /></a></Panel></div></div>;
}

function Results() {
  return <div className="event-tab-content"><SectionHeading label="EVENT / RESULTS" title="Results & feedback." detail="Your progress and organiser feedback, gathered in one place." /><div className="event-result-banner"><span className="event-result-icon"><Sparkles size={18} /></span><div><Eyebrow>ROUND 2 · IN REVIEW</Eyebrow><h3>Your submission is being reviewed.</h3><p>Results will appear here once the organisers publish them.</p></div><span className="event-result-state">Pending</span></div><div className="event-results-grid"><Panel><Eyebrow>ROUND 1 · RECREATE</Eyebrow><h3>Completed</h3><p>Your dashboard recreation entry has advanced to the next round.</p><div className="event-feedback-row"><span>ORGANISER FEEDBACK</span><strong>Proceed to Round 2</strong></div></Panel><Panel><Eyebrow>ROUND 2 · NEW UI</Eyebrow><h3>Awaiting review</h3><p>The review team is assessing the submitted interface and supporting materials.</p><div className="event-feedback-row"><span>RESULT STATUS</span><strong>Not published</strong></div></Panel></div><p className="event-demo-footnote">Event preview data · updates shown here are illustrative.</p></div>;
}

function Leaderboard() {
  return <div className="event-tab-content"><SectionHeading label="COMPETE / LEADERBOARD" title="The leaderboard." detail="A sample standings preview for ReBuild ’26." /><Panel className="event-leaderboard"><div className="event-leaderboard-top"><div><Eyebrow>ROUND 2 · LIVE STANDINGS</Eyebrow><strong>Updated 8 Nov 2026</strong></div><span className="event-demo-chip">SAMPLE DATA</span></div><div className="event-leaderboard-head"><span>RANK</span><span>TEAM</span><span>SCORE</span><span>CHANGE</span></div>{leaderboard.map((item) => <div className={`event-leaderboard-row ${item.rank === '04' ? 'is-yours' : ''}`} key={item.rank}><span className="event-rank">{item.rank === '01' && <Medal size={15} />}{item.rank !== '01' && item.rank}</span><span className="event-team-name"><strong>{item.team}</strong><small>{item.members}</small></span><strong className="event-score">{item.score}</strong><span className="event-change">{item.change}</span></div>)}<p className="event-demo-footnote">Illustrative leaderboard values for interface preview only. Official standings are published by event organisers.</p></Panel></div>;
}

function Certificates() {
  return <div className="event-tab-content"><SectionHeading label="REWARDS / CERTIFICATES" title="Your recognition." detail="Certificates issued for this event, ready to keep or share." /><div className="event-cert-grid"><Panel className="event-certificate-card"><div className="event-certificate-mark"><img src={campuscodeLogoMark} alt="" /></div><Eyebrow>CAMPUSCODE · REBUILD ’26</Eyebrow><h3>Finalist Certificate</h3><p>Presented to <strong>Piyush Pal</strong> for reaching the final round of ReBuild ’26.</p><div className="event-certificate-foot"><span><Check size={13} />Verified preview</span><span>CC-RB26-0042</span></div><button className="event-outline-action" onClick={() => window.print()}><ArrowDownToLine size={14} /> Save certificate preview</button></Panel><Panel className="event-certificate-info"><span className="event-certificate-icon"><Award size={19} /></span><Eyebrow>YOUR ACHIEVEMENT</Eyebrow><strong>Finalist</strong><p>Round 1 complete · Round 2 in review</p><div className="event-certificate-progress"><span /></div><small>Certificate status · Sample data</small></Panel></div><p className="event-demo-footnote">Certificate details are sample content for this frontend preview.</p></div>;
}

function Announcements() {
  const items = [
    { date: '08 NOV · 09:30', title: 'Round 2 review is underway', detail: 'The review team is currently assessing submissions. Results will be shared here when ready.', type: 'EVENT UPDATE' },
    { date: '07 NOV · 18:00', title: 'Round 2 submissions are closed', detail: 'Thank you to everyone who submitted their new dashboard experience.', type: 'ROUND UPDATE' },
    { date: '06 NOV · 20:15', title: 'Round 1 results are available', detail: 'Participants who advanced can now access the Round 2 brief.', type: 'RESULTS' },
  ];
  return <div className="event-tab-content"><SectionHeading label="COMMUNICATION / OFFICIAL" title="Event announcements." detail="Important updates from the ReBuild ’26 organisers." /><div className="event-announcement-list">{items.map((item, index) => <Panel className="event-announcement-item" key={item.title}><div className="event-announcement-date"><span>{item.date.split(' · ')[0]}</span><small>{item.date.split(' · ')[1]}</small></div><div className="event-announcement-body"><div><Eyebrow>{item.type}</Eyebrow><h3>{item.title}</h3></div><p>{item.detail}</p></div><span className={`event-announcement-unread ${index === 0 ? 'is-new' : ''}`}>{index === 0 ? 'NEW' : 'POSTED'}</span></Panel>)}</div></div>;
}

const tabContent = { Overview, Rounds, 'My Team': MyTeam, Results, Leaderboard, Certificates, Announcements };

export default function EventWorkspacePage() {
  const [activeTab, setActiveTab] = useState(() => {
    const requestedTab = new URLSearchParams(window.location.search).get('tab');
    return tabs.includes(requestedTab) ? requestedTab : 'Overview';
  });
  const changeTab = (tab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    if (tab === 'Overview') url.searchParams.delete('tab');
    else url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };
  useEffect(() => {
    const syncTab = () => {
      const requestedTab = new URLSearchParams(window.location.search).get('tab');
      setActiveTab(tabs.includes(requestedTab) ? requestedTab : 'Overview');
    };
    window.addEventListener('popstate', syncTab);
    return () => window.removeEventListener('popstate', syncTab);
  }, []);
  const TabContent = tabContent[activeTab];
  return <main className="event-workspace-page">
    <div className="event-workspace-top"><div><Eyebrow>YOUR EVENT / LIVE WORKSPACE</Eyebrow><h1>ReBuild ’26<span>.</span></h1><p>Rounds, team, results and updates. All in one place.</p></div><a href="/dashboard#my-events"><ArrowUpRight size={14} /> My activity</a></div>
    <nav className="event-workspace-tabs" aria-label="ReBuild ’26 sections">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'is-active' : ''} aria-current={activeTab === tab ? 'page' : undefined} onClick={() => changeTab(tab)}>{tab}</button>)}</nav>
    <div className="event-workspace-body" key={activeTab}><TabContent setTab={changeTab} /></div>
    <footer className="event-workspace-footer"><span>REBUILD ’26 · CAMPUSCODE</span><span>Participant workspace preview</span></footer>
  </main>;
}
