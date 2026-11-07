import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { entranceMotion, pageEntrance } from '../lib/motion.js';
import {
  Activity, ArrowUpRight, Award, Bell, CalendarDays, Check,
  ChevronDown, ChevronRight, CircleHelp, Compass, IdCard,
  LayoutDashboard, LogOut, Menu, MessageSquareText, RefreshCw, Settings,
  Sparkles, UserRound, UsersRound, X,
} from 'lucide-react';
import campuscodeLogoMark from '../assets/campuscode-logo-mark.png';
import { featuredEvents } from '../data/featuredEvents.js';
import { myEvents } from '../data/myEvents.js';
import ExplorePage from './ExplorePage.jsx';
import EventWorkspacePage from './EventWorkspacePage.jsx';
import MyEventsPage from './MyEventsPage.jsx';
import HackMatePage from './HackMatePage.jsx';
import IdeaCheckPage from './IdeaCheckPage.jsx';
import DigitalIdPage from './DigitalIdPage.jsx';

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Explore Hackathons', icon: Compass, href: '/explore' },
  { label: 'My Events', icon: CalendarDays, href: '/my-events' },
  { label: 'HackMate', icon: UsersRound, href: '/hackmate' },
  { label: 'AI Tools', icon: Sparkles, href: '#ai-toolkit', expandable: true },
  { label: 'Communications', icon: MessageSquareText, href: '/dashboard#communications' },
];

const workspaceStats = [
  { label: 'My Events', state: 'Ongoing', value: '02', note: "Events you're participating in", icon: Activity, tone: 'purple', href: '#my-events' },
  { label: 'Upcoming deadlines', state: '1 approaching', value: '03', note: 'Registration and submissions', icon: CalendarDays, tone: 'lime', href: '#deadlines' },
  { label: 'Completed events', state: 'Finished', value: '00', note: 'Events completed', icon: Check, tone: 'ink', href: '#my-events' },
  { label: 'Certificates', state: 'Earned', value: '00', note: 'Certificates earned', icon: Award, tone: 'purple', href: '/events/rebuild-26?tab=Certificates' },
];

const activityEvents = myEvents.map((event) => ({
  ...event,
  name: event.name,
  state: event.status,
  detail: event.progress,
  image: event.banner,
  joined: true,
}));

const upcomingDeadlines = [
  { date: '12 NOV', title: 'VOYAGEHACK 4.0', detail: 'Register by 12 Nov', href: featuredEvents.find((event) => event.title === 'VOYAGEHACK 4.0')?.href },
  { date: '22 NOV', title: 'Eurogrip TORQ Challenge 4.0', detail: 'Through 22 Nov 2026', href: featuredEvents.find((event) => event.title === 'Eurogrip TORQ Challenge 4.0')?.href },
  { date: '06 DEC', title: 'INNOVATE INDIA 2026', detail: 'Through 6 Dec 2026', href: featuredEvents.find((event) => event.title === 'INNOVATE INDIA 2026')?.href },
];

const communications = [
  { icon: Activity, tag: 'SUBMISSION', title: 'ReBuild ’26', detail: 'Round 2 · Submission pending', href: '/events/rebuild-26?tab=Rounds' },
  { icon: CalendarDays, tag: 'REGISTRATION', title: 'VOYAGEHACK 4.0', detail: 'Register by 12 Nov', href: featuredEvents.find((event) => event.title === 'VOYAGEHACK 4.0')?.href, external: true },
  { icon: Bell, tag: 'EVENT UPDATE', title: 'Eurogrip TORQ Challenge 4.0', detail: 'Through 22 Nov 2026', href: featuredEvents.find((event) => event.title === 'Eurogrip TORQ Challenge 4.0')?.href, external: true },
];

export default function DashboardPage({ initialView = 'overview' }) {
  const reduceMotion = useReducedMotion();
  const isExploreView = initialView === 'explore';
  const isEventView = initialView === 'event';
  const isMyEventsView = initialView === 'my-events';
  const isHackMateView = initialView === 'hackmate';
  const isIdeaCheckView = initialView === 'ideacheck';
  const isDigitalIdView = initialView === 'digital-id';
  const [active, setActive] = useState(window.location.hash === '#communications' ? 'Communications' : window.location.hash === '#rulebot' || isIdeaCheckView ? 'AI Tools' : isExploreView ? 'Explore Hackathons' : isEventView || isMyEventsView ? 'My Events' : isHackMateView ? 'HackMate' : 'Overview');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notice, setNotice] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(isExploreView || isEventView || isMyEventsView || isHackMateView || isIdeaCheckView || isDigitalIdView);
  const [activeAiTool, setActiveAiTool] = useState(isIdeaCheckView ? 'IdeaCheck' : window.location.hash === '#rulebot' ? 'RuleBot' : '');
  const [aiToolsOpen, setAiToolsOpen] = useState(isIdeaCheckView || window.location.hash === '#rulebot');
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setNotice('Sample dashboard refreshed.');
    window.setTimeout(() => setRefreshing(false), 550);
  };

  const previewAction = (message) => setNotice(message);
  const followNav = (event, href, nextActive, nextAiTool = '') => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setActive(nextActive);
    if (nextActive === 'AI Tools') setActiveAiTool(nextAiTool);
    setMobileNavOpen(false);
    const delay = reduceMotion ? 0 : 300;
    window.setTimeout(() => window.location.assign(href), delay);
  };

  return <div className={'dashboard-page'}>
    <aside className={`dashboard-sidebar${mobileNavOpen ? ' dashboard-sidebar-open' : ''}`}>
      <a className={'dashboard-brand'} href={'/'} aria-label={'CampusCode home'}><img src={campuscodeLogoMark} alt="" /><span>campus<span>code</span><small>HACKATHON ARENA</small></span></a>
      <div className={'dashboard-nav-label'}>WORKSPACE</div>
      <nav className={'dashboard-nav'} aria-label={'Student workspace'}>
        {navigation.map(({ label, icon: Icon, href, expandable }) => expandable ? <div className={'dashboard-nav-group'} key={label}>
          <button className={`dashboard-nav-button${active === label ? ' is-active' : ''}`} aria-expanded={aiToolsOpen} onClick={() => { setAiToolsOpen(!aiToolsOpen); setActive(label); }}><Icon size={17} strokeWidth={1.7} /><span>{label}</span><ChevronDown size={14} className={`dashboard-nav-arrow${aiToolsOpen ? ' is-rotated' : ''}`} />{active === label && <motion.span className={'dashboard-nav-active-bg'} layoutId={'workspace-nav-active'} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 36 }} />}</button>
          {aiToolsOpen && <div className={'dashboard-nav-submenu'}>
            <a href={'/ideacheck'} className={activeAiTool === 'IdeaCheck' ? 'is-active' : ''} onClick={(event) => followNav(event, '/ideacheck', label, 'IdeaCheck')}>IdeaCheck{activeAiTool === 'IdeaCheck' && <motion.span className={'dashboard-nav-submenu-active-bg'} layoutId={'ai-tool-nav-active'} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 36 }} />}</a>
            <a href={'/dashboard#rulebot'} className={activeAiTool === 'RuleBot' ? 'is-active' : ''} onClick={(event) => followNav(event, '/dashboard#rulebot', label, 'RuleBot')}>RuleBot{activeAiTool === 'RuleBot' && <motion.span className={'dashboard-nav-submenu-active-bg'} layoutId={'ai-tool-nav-active'} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 36 }} />}</a>
          </div>}
        </div> : <a key={label} href={href} className={active === label ? 'is-active' : ''} onClick={(event) => followNav(event, href, label)}><Icon size={17} strokeWidth={1.7} /><span>{label}</span>{active === label && <><ChevronRight size={15} className={'dashboard-nav-arrow'} /><motion.span className={'dashboard-nav-active-bg'} layoutId={'workspace-nav-active'} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 36 }} /></>}</a>)}
      </nav>
      <div className={'dashboard-sidebar-bottom'}>
        <div className={'dashboard-help-group'}>
          <button className={'dashboard-bottom-link'} aria-expanded={helpOpen} onClick={() => setHelpOpen(!helpOpen)}><CircleHelp size={17} /><span>Help & Support</span><ChevronDown size={14} className={`dashboard-nav-arrow${helpOpen ? ' is-rotated' : ''}`} /></button>
          {helpOpen && <a className={'dashboard-sub-link'} id={'student-guide'} href={'#student-guide'} onClick={(event) => { event.preventDefault(); previewAction('Student Guide opens in the full CampusCode app.'); setMobileNavOpen(false); }}>Student Guide <ArrowUpRight size={12} /></a>}
        </div>
        <div className={'dashboard-profile-wrap'}>
          {profileOpen && <div className={'dashboard-profile-menu'} role={'menu'}>
            <div className={'dashboard-profile-menu-head'}><span className={'dashboard-avatar'}>PP</span><span><strong>Piyush Pal</strong><small>CampusCode ID <b>Not set</b></small></span></div>
            <div className={'dashboard-profile-menu-links'}>
              <button role={'menuitem'} onClick={() => { previewAction('My profile is a preview in this dashboard.'); setProfileOpen(false); }}><UserRound size={15} />My Profile</button>
              <a role={'menuitem'} className={'dashboard-profile-menu-link'} href={'/digital-id'} onClick={() => setProfileOpen(false)}><IdCard size={15} />Digital ID Card</a>
              <a role={'menuitem'} className={'dashboard-profile-menu-link'} href={'/events/rebuild-26?tab=Certificates'} onClick={() => setProfileOpen(false)}><Award size={15} />My Certificates</a>
              <button role={'menuitem'} onClick={() => { previewAction('Account settings are a preview in this dashboard.'); setProfileOpen(false); }}><Settings size={15} />Account Settings</button>
            </div>
            <a role={'menuitem'} className={'dashboard-logout-link'} href={'/login'}><LogOut size={15} />Log out</a>
          </div>}
          <button className={'dashboard-sidebar-profile'} aria-expanded={profileOpen} aria-label={'Open profile menu'} onClick={() => setProfileOpen(!profileOpen)}><span className={'dashboard-avatar'}>PP</span><span className={'dashboard-sidebar-profile-copy'}><strong>Piyush Pal</strong><small>Student account</small></span><ChevronDown size={14} className={`dashboard-nav-arrow${profileOpen ? ' is-rotated' : ''}`} /></button>
        </div>
      </div>
    </aside>

    <div className={'dashboard-main'}>
      <header className={'dashboard-topbar'}>
        <div className={'dashboard-topbar-heading'}><button className={'dashboard-mobile-menu'} aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileNavOpen(!mobileNavOpen)}>{mobileNavOpen ? <X size={18} /> : <Menu size={18} />}</button><a href={'/dashboard'} className={'dashboard-home-link'}>CAMPUSCODE <i>/</i> STUDENT</a><strong>{isExploreView ? 'EXPLORE HACKATHONS' : isEventView ? 'REBUILD ’26' : isMyEventsView ? 'MY EVENTS' : isHackMateView ? 'HACKMATE' : isIdeaCheckView ? 'IDEACHECK' : isDigitalIdView ? 'DIGITAL ID' : 'OVERVIEW'}</strong></div>
        <div className={'dashboard-top-actions'}>
          <div className={'dashboard-notification-wrap'}>
            <button className={`dashboard-icon-button${notificationsOpen ? ' is-open' : ''}`} aria-label={'Notifications'} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={17} /><span className={'dashboard-notification-dot'} aria-hidden={'true'} /></button>
            {notificationsOpen && <div className={'dashboard-notification-popover'}><strong>You’re all caught up</strong><p>New event updates will appear here.</p><button onClick={() => setNotificationsOpen(false)}>Done</button></div>}
          </div>
          <button className={'dashboard-refresh'} onClick={refresh}><RefreshCw size={15} className={refreshing ? 'is-spinning' : ''} /><span>Refresh</span></button>
        </div>
      </header>

      <motion.div key={initialView} className={'dashboard-screen-transition'} {...pageEntrance(reduceMotion)}>
      {isExploreView ? <div className={'dashboard-content dashboard-explore-content'}><ExplorePage embedded /></div> : isEventView ? <div className={'dashboard-content dashboard-event-content'}><EventWorkspacePage /></div> : isMyEventsView ? <div className={'dashboard-content dashboard-my-events-content'}><MyEventsPage /></div> : isHackMateView ? <div className={'dashboard-content dashboard-hackmate-content'}><HackMatePage /></div> : isIdeaCheckView ? <div className={'dashboard-content dashboard-ideacheck-content'}><IdeaCheckPage /></div> : isDigitalIdView ? <DigitalIdPage /> : <main className={'dashboard-content'} id={'overview'}>
        <section className={'dashboard-welcome'}>
          <p className={'dashboard-eyebrow'}><span></span> GOOD MORNING, PIYUSH</p>
          <div className={'dashboard-welcome-row'}><div><h1>Your workspace</h1><p>Your hackathons, progress and upcoming activities.</p></div></div>
        </section>

        <section className={'dashboard-metrics dashboard-workspace-stats'} aria-label={'Workspace summary'}>
          {workspaceStats.map(({ label, state, value, note, icon: Icon, tone, href }, index) => <motion.a {...entranceMotion(reduceMotion, index)} className={'dashboard-metric dashboard-summary-card'} href={href} key={label}>
            <div className={'dashboard-metric-top'}><span>{label}</span><span className={`dashboard-metric-icon tone-${tone}`}><Icon size={15} strokeWidth={1.7} /></span></div>
            <div className={'dashboard-summary-value-row'}><strong>{value}</strong><span className={'dashboard-summary-state'}>{label === 'My Events' && <i></i>}{state}</span></div><small>{note}</small>
          </motion.a>)}
        </section>

        <div className={'dashboard-columns dashboard-overview-grid'}>
          <section className={'dashboard-panel dashboard-activity-panel'} id={'my-events'}>
            <div className={'dashboard-panel-heading'}><div><p className={'dashboard-eyebrow'}>YOUR WORKSPACE</p><h2>My Activity</h2></div><a href={'/my-events'}>View all <ArrowUpRight size={14} /></a></div>
            <div className={'dashboard-activity-list'} tabIndex={0} aria-label={'Your registered event activity, scroll vertically'}>
              {activityEvents.map((event, index) => <motion.article {...entranceMotion(reduceMotion, index)} className={'dashboard-activity-row'} key={event.name}>
                <span className={`dashboard-activity-logo${event.joined ? ' is-brand' : ' is-event'}`}><img src={event.image} alt="" /></span>
                <div className={'dashboard-activity-copy'}><h3>{event.name}</h3><p>{event.detail}</p></div>
                <span className={`dashboard-activity-status${event.joined ? ' is-ongoing' : ''}`}><i></i>{event.state}</span>
                <a className={'dashboard-activity-open'} aria-label={`Open ${event.name}`} href={event.href}><ArrowUpRight size={16} /></a>
              </motion.article>)}
            </div>
          </section>

          <section className={'dashboard-panel dashboard-deadlines'} id={'deadlines'}>
            <div className={'dashboard-panel-heading'}><div><p className={'dashboard-eyebrow'}>STAY ON TRACK</p><h2>Upcoming deadlines</h2></div><CalendarDays size={17} /></div>
            <div className={'dashboard-deadline-list'}>
              {upcomingDeadlines.map((deadline, index) => <motion.a {...entranceMotion(reduceMotion, index)} className={'dashboard-deadline-row'} href={deadline.href || '/explore'} target={'_blank'} rel={'noreferrer'} key={deadline.title}>
                <time>{deadline.date}</time>
                <div><strong>{deadline.title}</strong><p>{deadline.detail}</p></div>
                <ArrowUpRight size={14} aria-hidden={'true'} />
              </motion.a>)}
            </div>
          </section>

          <section className={'dashboard-panel dashboard-communications'} id={'communications'}>
            <div className={'dashboard-panel-heading'}><div><p className={'dashboard-eyebrow'}>UPDATES</p><h2>Communications</h2></div><MessageSquareText size={16} /></div>
            <p className={'dashboard-comms-copy'}>Announcements and important event updates.</p>
            <div className={'dashboard-comms-list'}>
              {communications.map(({ icon: Icon, tag, title, detail, href, external }, index) => <motion.a {...entranceMotion(reduceMotion, index)} className={'dashboard-comms-row'} href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} key={title}>
                <span className={'dashboard-comms-icon'}><Icon size={14} /></span>
                <div><span>{tag}</span><strong>{title}</strong><p>{detail}</p></div>
              </motion.a>)}
            </div>
          </section>

          <section className={'dashboard-tools'} id={'ai-toolkit'} aria-labelledby={'dashboard-tools-heading'}>
            <div className={'dashboard-tools-heading'}><p className={'dashboard-eyebrow'}>YOUR TOOLS</p><h2 id={'dashboard-tools-heading'}>Quick access</h2></div>
            <div className={'dashboard-quick-links'}>
              <motion.a {...entranceMotion(reduceMotion, 0)} id={'hackmate'} href={'/hackmate'}><span className={'dashboard-quick-icon tone-lime'}><UsersRound size={17} /></span><span>HackMate</span><ArrowUpRight size={14} /></motion.a>
              <motion.a {...entranceMotion(reduceMotion, 1)} id={'ideacheck'} href={'/ideacheck'}><span className={'dashboard-quick-icon tone-purple'}><Sparkles size={17} /></span><span>IdeaCheck</span><ArrowUpRight size={14} /></motion.a>
              <motion.a {...entranceMotion(reduceMotion, 2)} id={'rulebot'} href={'/dashboard#rulebot'}><span className={'dashboard-quick-icon tone-ink'}><CircleHelp size={17} /></span><span>RuleBot</span><ArrowUpRight size={14} /></motion.a>
            </div>
          </section>
        </div>

        <div className={'dashboard-section-divider'} aria-hidden={'true'}></div>

        <section className={'dashboard-discover'} id={'discover-events'} aria-labelledby={'dashboard-discover-title'}>
          <div className={'dashboard-discover-heading'}><div><p className={'dashboard-eyebrow'}>DISCOVER SOMETHING NEW</p><h2 id={'dashboard-discover-title'}>Personalised events for you</h2></div><a href={'/explore'}>View all <ArrowUpRight size={14} /></a></div>
          <div className={'dashboard-featured-track'} tabIndex={0} aria-label={'Personalised hackathons, scroll horizontally'}>
            {featuredEvents.map((event, index) => <motion.a {...entranceMotion(reduceMotion, index)} className={'dashboard-featured-card'} href={event.href} target={'_blank'} rel={'noreferrer'} key={event.title} aria-label={`${event.title}, hosted by ${event.host}`}>
              <div className={'dashboard-featured-image'}><img src={event.image} alt={`${event.title} event artwork`} loading={index < 2 ? 'eager' : 'lazy'} /><span>{event.type}</span></div>
              <div className={'dashboard-featured-meta'}><span>{event.date}</span><ArrowUpRight size={14} /></div>
              <h3>{event.title}</h3><p>{event.host}</p>
            </motion.a>)}
          </div>
        </section>

        {notice && <div className={'dashboard-toast'} role={'status'}><Check size={15} />{notice}<button aria-label={'Dismiss notification'} onClick={() => setNotice('')}><X size={14} /></button></div>}
        </main>}
      </motion.div>
    </div>
  </div>;
}
