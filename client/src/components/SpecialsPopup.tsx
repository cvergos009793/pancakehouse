import React, { useEffect, useRef, useState } from 'react';
import { MENU_ITEMS, WAFFLE_SPECIAL } from '../constants';

const dismissalKey = 'maple-leaf-bold-specials-dismissed';

export default function SpecialsPopup() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(dismissalKey) === 'true'; } catch { /* The card still works without storage. */ }
    if (dismissed) return;
    const timer = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(dismissalKey, 'true'); } catch { /* Dismissing the card does not require storage. */ }
  };

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const focusWasInside = panel.current?.contains(document.activeElement);
      close();
      if (focusWasInside) trigger.current?.focus();
    };
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panel.current?.contains(target) || trigger.current?.contains(target)) return;
      close();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [open]);

  return <aside className="specials-widget" aria-label="Breakfast specials">
    {open && <section className="specials-panel" id="specials-panel" role="dialog" aria-modal="false" aria-labelledby="specials-title" ref={panel}>
      <button type="button" className="specials-close" onClick={close} aria-label="Close specials">×</button>
      <p className="specials-kicker">SERVED WITH A FARM EGG</p>
      <h2 id="specials-title">House Specials.</h2>
      <div className="specials-feature">
        <div><h3>{WAFFLE_SPECIAL.name}</h3><p>{WAFFLE_SPECIAL.description}</p></div>
        <strong>{WAFFLE_SPECIAL.price}</strong>
      </div>
      <ul>{MENU_ITEMS.map(item => <li key={item.id}><span>#{item.id} · {item.name}</span><strong>{item.price}</strong></li>)}</ul>
      <a className="button" href="#full-menu" onClick={close}>View Our Full Menu</a>
    </section>}
    <button type="button" className="specials-trigger" ref={trigger} aria-expanded={open} aria-controls={open ? 'specials-panel' : undefined} onClick={() => open ? close() : setOpen(true)}>
      <img className="specials-mascot" src="/brand/rooster.png" alt="" aria-hidden="true" width="42" height="56" /><span>House Specials<small>Pancakes, waffles & eggs</small></span><span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
  </aside>;
}
