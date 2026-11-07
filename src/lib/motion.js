const easeOut = [0.22, 1, 0.36, 1];

export function entranceMotion(reducedMotion = false, index = 0) {
  const delay = reducedMotion ? 0 : Math.min(index * 0.055, 0.22);
  return {
    initial: reducedMotion ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(6px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    transition: { duration: reducedMotion ? 0 : 0.68, ease: easeOut, delay },
  };
}

export function pageEntrance(reducedMotion = false) {
  return {
    initial: reducedMotion ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 12, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: reducedMotion ? 0 : 0.72, ease: easeOut },
  };
}
