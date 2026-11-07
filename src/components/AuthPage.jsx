import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { pageEntrance } from '../lib/motion.js';
import campuscodeLogoMark from '../assets/campuscode-logo-mark.png';
import { MagneticButton } from './ui/magnetic-button.tsx';

function modeFromPath() {
  return window.location.pathname.replace(/\/$/, '') === '/signup' ? 'signup' : 'login';
}

export default function AuthPage({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const reduceMotion = useReducedMotion();
  const isSignup = mode === 'signup';

  useEffect(() => {
    const syncMode = () => {
      setMode(modeFromPath());
    };
    window.addEventListener('popstate', syncMode);
    return () => window.removeEventListener('popstate', syncMode);
  }, []);

  const changeMode = (event, nextMode) => {
    event.preventDefault();
    const nextPath = nextMode === 'signup' ? '/signup' : '/login';
    if (window.location.pathname !== nextPath) window.history.pushState({}, '', nextPath);
    setMode(nextMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.assign('/dashboard');
  };

  const previewOAuth = () => window.location.assign('/dashboard');

  return <motion.main className={'auth-page'} {...pageEntrance(reduceMotion)}>
    <div className={'auth-layout'}>
      <section className={'auth-form-column'} aria-label={isSignup ? 'Create a CampusCode account' : 'Sign in to CampusCode'}>
        <a className={'auth-brand'} href={'/'} aria-label={'CampusCode home'}><img src={campuscodeLogoMark} alt="CampusCode" /></a>
        <AnimatePresence mode={'wait'} initial={false}>
          <motion.div
            className={'auth-form-content'}
            key={mode}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12, filter: reduceMotion ? 'blur(0px)' : 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8, filter: reduceMotion ? 'blur(0px)' : 'blur(4px)' }}
            transition={{ duration: reduceMotion ? 0.14 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1>{isSignup ? 'Create your account.' : 'Welcome back.'}</h1>
            <p className={'auth-intro'}>{isSignup ? 'One place to discover, compete and build.' : 'Sign in to return to your hackathons, teams and submissions.'}</p>
            <form className={'auth-form'} onSubmit={handleSubmit}>
              {isSignup && <label className={'auth-field'}><span>Full name</span><input autoComplete={'name'} name={'name'} placeholder={'Your name'} required /></label>}
              <label className={'auth-field'}><span>Email</span><input autoComplete={'email'} name={'email'} type={'email'} placeholder={'you@example.com'} required /></label>
              <label className={'auth-field'}><span>Password</span><input autoComplete={isSignup ? 'new-password' : 'current-password'} name={'password'} type={'password'} placeholder={isSignup ? 'Create a password' : 'Enter your password'} minLength={isSignup ? 8 : undefined} required /></label>
              <MagneticButton className={'auth-submit-wrap'}><button className={'button button-dark auth-submit'} type={'submit'}>{isSignup ? 'Create account' : 'Sign in'}</button></MagneticButton>
            </form>
            <div className={'auth-divider'} aria-hidden={'true'}><span>or</span></div>
            <div className={'auth-oauth-actions'} aria-label={'Sample sign-in providers'}>
              <button className={'auth-oauth-button'} type={'button'} aria-label={'Continue with Google'} onClick={() => previewOAuth('Google')}><GoogleMark /></button>
              <button className={'auth-oauth-button'} type={'button'} aria-label={'Continue with Facebook'} onClick={() => previewOAuth('Facebook')}><FacebookMark /></button>
              <button className={'auth-oauth-button'} type={'button'} aria-label={'Continue with Apple'} onClick={() => previewOAuth('Apple')}><AppleMark /></button>
            </div>
            <p className={'auth-switch'}>
              {isSignup ? 'Already have an account?' : 'New to CampusCode?'}{' '}
              <a href={isSignup ? '/login' : '/signup'} onClick={(event) => changeMode(event, isSignup ? 'login' : 'signup')}>{isSignup ? 'Sign in' : 'Sign up'}</a>
            </p>
          </motion.div>
        </AnimatePresence>
      </section>
      <aside className={'auth-brand-panel'} aria-label={'Build. Compete. Ship.'}>
        <div className={'auth-panel-shape auth-panel-shape-one'}></div>
        <div className={'auth-panel-shape auth-panel-shape-two'}></div>
        <div className={'auth-panel-shape auth-panel-shape-three'}></div>
        <h2>Build.<br />Compete.<br />Ship.</h2>
        <span className={'auth-panel-mark'} aria-hidden={'true'}>✳</span>
      </aside>
    </div>
  </motion.main>;
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21"><path fill="#4285F4" d="M21.6 12.23c0-.72-.06-1.42-.18-2.1H12v3.98h5.38a4.6 4.6 0 0 1-2 3.01v2.5h3.23c1.9-1.75 2.99-4.33 2.99-7.39Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.38l-3.23-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.13H3.08v2.58A9.98 9.98 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.95a6 6 0 0 1 0-3.9V7.47H3.08a10 10 0 0 0 0 9.06l3.33-2.58Z"/><path fill="#EA4335" d="M12 5.92c1.47 0 2.79.5 3.83 1.52l2.87-2.87C16.95 2.95 14.7 2 12 2a9.98 9.98 0 0 0-8.92 5.47l3.33 2.58C7.2 7.68 9.4 5.92 12 5.92Z"/></svg>;
}

function FacebookMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" fill="#1877F2"/><path fill="#fff" d="M13.4 20v-7.3h2.45l.37-2.85H13.4V8.03c0-.82.23-1.38 1.42-1.38h1.52V4.1c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.78v2.08H8v2.85h2.47V20h2.93Z"/></svg>;
}

function AppleMark() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21"><path fill="#fff" d="M16.37 12.62c.02 2.2 1.93 2.93 1.95 2.94-.02.05-.3 1.03-.99 2.04-.59.86-1.2 1.72-2.16 1.74-.94.02-1.25-.56-2.34-.56s-1.44.54-2.33.58c-.94.04-1.66-.93-2.26-1.78-1.23-1.78-2.17-5.02-.91-7.21.63-1.09 1.75-1.78 2.97-1.8.93-.02 1.8.63 2.36.63.56 0 1.61-.78 2.72-.67.47.02 1.79.19 2.63 1.43-.07.04-1.57.92-1.64 2.66ZM14.58 6.4c.5-.6.84-1.43.75-2.26-.72.03-1.6.48-2.12 1.08-.47.54-.88 1.38-.77 2.18.8.06 1.63-.4 2.14-1Z"/></svg>;
}
