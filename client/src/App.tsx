import React, { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { MENU_ITEMS, WAFFLE_SPECIAL } from './constants';
import FoodMontage from './components/FoodMontage';
import SpecialsPopup from './components/SpecialsPopup';
import FullMenu from './components/FullMenu';

const directions = 'https://www.google.com/maps/dir/?api=1&destination=1520+Main+St+W,+Hamilton,+ON+L8S+1C8';
const cateringEmail = 'cvergos2190@gmail.com';
const instagramProfile = 'https://www.instagram.com/mapleleafpancake/';
const menuItems = MENU_ITEMS;
const scenes = [
  { id: 'morning', label: 'Pancake breakfast', eyebrow: 'HAMILTON’S FAMILY PANCAKE HOUSE · SINCE 1995', title: <>EGGS,<br/><em>YOUR WAY.</em></>, subhead: 'We’ll keep the coffee coming.', copy: 'Large farm eggs, cooked just how you like them. Pull up a chair for breakfast and a cup of bottomless coffee.', image: 'marauder-stack', alt: 'Pancakes, bacon, sausage, and a sunny-side-up egg', color: 'yellow', price: menuItems[0].price, special: 'HOUSE SPECIAL #1', link: 'Find Your Breakfast', target: '#full-menu' },
  { id: 'french-toast', label: 'Sweet breakfast favourites', eyebrow: 'OUR AWARD-WINNING BELGIAN WAFFLES', title: <>PASS<br/>THE <em>SYRUP.</em></>, subhead: '', copy: 'Start with a golden Belgian waffle or a stack of blueberry pancakes. For little hands, we make mini pancakes with chocolate chips.', image: 'french-toast-frenzy', alt: 'French toast with eggs, back bacon, and sausage', color: 'red', price: menuItems[1].price, special: 'HOUSE SPECIAL #2', link: 'See the Menu', target: '#full-menu' },
  { id: 'breakfast', label: 'Lunch at the Pancake House', eyebrow: 'LUNCH ON MAIN STREET WEST', title: <>STEAK ON<br/>A <em>KAISER.</em></>, subhead: '', copy: 'We serve our 8 oz steak with eggs or on a kaiser for lunch. Prefer a vegetarian lunch? Try the veggie wrap with peppers, onions, tomatoes, egg, and cheese.', image: 'lumberjack', alt: 'Eggs, home fries, toast, back bacon, and sausage', color: 'cream', price: menuItems[2].price, special: 'HOUSE SPECIAL #3', link: 'Explore Our Menu', target: '#full-menu' },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Logo({ footer = false, striped = false }: { footer?: boolean; striped?: boolean }) {
  const image = footer
    ? { src: '/brand/maple-leaf-logo-transparent.png', width: 2172, height: 724 }
    : striped
      ? { src: '/brand/maple-leaf-logo.png', width: 1696, height: 482 }
      : { src: '/brand/maple-leaf-logo-v2.png', width: 2171, height: 724 };
  return <a className={'brand' + (footer ? ' footer-brand' : '')} href="#morning" aria-label="Maple Leaf Pancake House home">
    <img {...image} alt="Maple Leaf Pancake House" />
  </a>;
}

function HomePage() {
  const orderDialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState('morning');

  useEffect(() => {
    if (window.location.hash === '#morning') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (['#instagram', '#catering'].includes(window.location.hash)) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.classList.contains('food-scene')) setActive(entry.target.id);
          if (entry.target.id === 'menu') setActive('');
        }
      });
    }, { threshold: .2 });
    document.querySelectorAll('.reveal, .food-scene, #menu').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>
    <a href="#content" className="skip-link">Skip to content</a>
    <header className="site-header">
      <div className="brand-banner"><Logo striped /></div>
    </header>
    <nav className="navigation" aria-label="Main navigation">
      <div className="nav-tabs">
        <a className="nav-tab" href="#location"><span>1520 Main St W</span></a>
        <a className="nav-tab" href="#hours"><span>8 AM – 2 PM</span></a>
        <a className="nav-tab nav-menu" href="#full-menu"><span>Menu</span></a>
        <a className="nav-instagram" href="#instagram" aria-label="See our Instagram feed">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          <span>Instagram</span>
        </a>
        <button className="nav-tab nav-order" onClick={() => orderDialog.current?.showModal()}><span>Order Now</span></button>
      </div>
    </nav>
    <main id="content">
      {scenes.map((scene, index) => <section id={scene.id} key={scene.id} className={'food-scene scene-' + scene.color} aria-label={scene.label}>
        <div className="scene-inner">
          <div className="scene-text">
            <p className="eyebrow"><img className="eyebrow-mascot" src="/brand/rooster.png" alt="" aria-hidden="true" width="36" height="48" />{scene.eyebrow}</p>
            {index === 0 ? <h1>{scene.title}</h1> : <h2>{scene.title}</h2>}
            {scene.subhead && <p className="subhead">{scene.subhead}</p>}
            <p className="scene-copy">{scene.copy}</p>
            <a className="button" href={scene.target}>{scene.link}<Arrow /></a>
          </div>
          {index === 0
            ? <img className="hero-food-photo" src="/food/breakfast-spread.webp" alt="A table full of pancakes, eggs, omelettes, home fries, and breakfast favourites" width="1100" height="880" />
            : <FoodMontage variant={index === 1 ? 'sweet' : 'savoury'} fullBleed />}
          {index === 0 && <div className="breakfast-stamp" aria-label="Breakfast served all day"><span>BREAKFAST</span><strong>ALL DAY.</strong><span>8 AM – 2 PM</span></div>}
          {index === 0 && <img className="hero-rooster" src="/brand/rooster.png" alt="Maple Leaf Pancake House rooster mascot holding a fork and knife" width="1089" height="1445" />}
        </div>
        {index === 0 && <div className="scene-bottom"><span>PANCAKES · EGGS · OMELETTES · GOOD MORNINGS</span><p className="scene-signoff">Good Mornings Since 1995</p></div>}
      </section>)}
      <nav className={'scene-dots' + (!active ? ' hidden' : '')} aria-label="Breakfast scenes">{scenes.map(scene => <a key={scene.id} href={'#' + scene.id} aria-label={scene.label} aria-current={active === scene.id ? 'location' : undefined} className={active === scene.id ? 'active' : ''} />)}</nav>

      <section id="menu" className="menu-section">
        <div className="section-heading reveal"><div><p className="eyebrow">FOUR HOUSE SPECIALS</p><h2>HOUSE<br/><em>FAVOURITES.</em></h2></div><p>Large farm eggs, fresh bacon and sausage.<br/>Pick your favourite plate below.</p></div>
        <div className="menu-grid">{menuItems.map(item => <a key={item.id} href="#full-menu" className="menu-item"><div className="menu-photo"><img src={item.image} alt={item.name} loading="lazy" /><span className="menu-number">#{item.id}</span><span className="menu-arrow" aria-hidden="true">↗</span></div><div className="menu-item-title"><h3>{item.name}</h3><span>{item.price}</span></div><p>{item.description}</p></a>)}</div>
        <section id="waffle-special" className="waffle-special" aria-labelledby="waffle-title">
          <div className="waffle-art"><img src="/brand/rooster.png" alt="" loading="lazy" width="1089" height="1445" /></div>
          <div className="waffle-copy"><span className="eyebrow">OUR AWARD-WINNING BELGIAN WAFFLE</span><div className="waffle-heading"><h3 id="waffle-title">Waffle <em>Special!</em></h3><strong className="waffle-price">{WAFFLE_SPECIAL.price}</strong></div><p>{WAFFLE_SPECIAL.description}</p><a className="button" href="#full-menu">View the Full Menu <Arrow /></a></div>

        </section>
        <div className="menu-bottom"><p>You’ll also find vegetarian omelettes, lunch sandwiches, and a kids’ menu with a small drink included.</p><a className="button" href="#full-menu">View the Full Menu <Arrow /></a></div>
      </section>

      <section id="story" className="story-section" aria-labelledby="story-heading">
        <div className="mascot-stage reveal">
          <div className="mascot-circle" aria-hidden="true" />
          <img src="/brand/rooster-with-logo.png" alt="The Maple Leaf Pancake House rooster with our original wordmark" loading="lazy" width="1280" height="1280" />
        </div>
        <div className="story-text reveal">
          <p className="eyebrow">FROM GREECE TO MAIN STREET WEST · EST. 1995</p>
          <h2 id="story-heading">GUS’S<br/><em>TABLE.</em></h2>
          <p className="story-lead">For over 30 years, Hamilton families and McMaster students have shared breakfast at our tables.</p>
          <p>Our story begins with Gus Vergos, who came to Canada from Greece and made Hamilton his home. He established Tally Ho, then opened Maple Leaf Pancake House right next door in 1995.</p>
          <p>Gus wanted to give his neighbours a warm meal and a place where they’d feel at home. Bring the kids for waffles or a friend for bottomless coffee. There’s a seat for you here.</p>
          <ul className="history-awards" aria-label="Restaurant awards">
            <li><span>READERS’ CHOICE</span><strong>Best Omelette</strong></li>
            <li><span>AWARD WINNER</span><strong>Best Waffles</strong></li>
          </ul>
          <a className="text-link" href="#visit">Find Us on Main Street <Arrow /></a>
        </div>
      </section>

      <section id="instagram" className="instagram-section" aria-labelledby="instagram-title">
        <div className="instagram-heading">
          <h2 id="instagram-title">From Our Instagram</h2>
          <a href={instagramProfile} target="_blank" rel="noopener noreferrer">@mapleleafpancake <Arrow /></a>
        </div>
        <iframe
          className="instagram-feed"
          title="Recent posts from Maple Leaf Pancake House on Instagram"
          src={instagramProfile + 'embed/'}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>

      <section id="catering" className="catering-section" aria-labelledby="catering-title">
        <div className="catering-art" aria-hidden="true">
          <img src="/brand/rooster.png" alt="" width="1089" height="1445" loading="lazy" />
        </div>
        <div className="catering-copy">
          <h2 id="catering-title">Catering</h2>
          <p>Bringing the family together or feeding a crowd at Mac? Email us a little about your event so we can help plan the meal.</p>
          <p>Let us know <strong>how many servings you expect to need</strong>, <strong>the date and time</strong>, and <strong>any food allergies</strong> we should know about.</p>
          <a href={`mailto:${cateringEmail}?subject=Catering%20Inquiry`}>{cateringEmail}</a>
        </div>
      </section>

      <section id="visit" className="visit-section"><div className="visit-heading"><p className="eyebrow">1520 MAIN STREET WEST · HAMILTON</p><h2>MEET YOU AT<br/><em>THE PANCAKE<br/>HOUSE!</em></h2></div><div className="visit-details"><div id="location"><span className="detail-label">FIND YOUR WAY</span><p>1520 Main St W<br/>Hamilton, ON L8S 1C8</p></div><div id="hours"><span className="detail-label">WE’RE UP EARLY</span><p>Every Day<br/>8:00 AM – 2:00 PM</p></div><a className="button" href={directions} target="_blank" rel="noopener noreferrer">Get Directions <Arrow /></a></div></section>
    </main>
    <footer><Logo footer /><p>Serving Hamilton and McMaster since 1995.</p><a href="#catering">Catering</a><a href={instagramProfile} target="_blank" rel="noopener noreferrer" aria-label="Visit @mapleleafpancake on Instagram">@mapleleafpancake <Arrow /></a><small>© {new Date().getFullYear()} Maple Leaf Pancake House</small></footer>
    <dialog className="order-dialog" ref={orderDialog} aria-labelledby="order-title" onClick={event => { if (event.target === event.currentTarget) orderDialog.current?.close(); }}>
      <div className="order-content">
        <button className="dialog-close" aria-label="Close ordering options" onClick={() => orderDialog.current?.close()}>✕</button>
        <p className="eyebrow">BREAKFAST & LUNCH TO GO</p>
        <h2 id="order-title">Order Up!</h2>
        <p>Order delivery or call us for pickup.</p>
        <a className="button" href="https://www.ubereats.com/ca/store/maple-leaf-pancake-house/J6q4wK9iT5CUETkX3S2YTw" target="_blank" rel="noopener noreferrer">Uber Eats <Arrow /></a>
        <a className="button pickup-order" href="tel:+19055224995"><span>Pick Up</span><span className="pickup-number">905-522-4995</span></a>
        <small>Call to place your pickup order. Delivery prices are shown on Uber Eats.</small>
      </div>
    </dialog>
    <SpecialsPopup />
    <Analytics /><SpeedInsights />
  </>;
}

export default function App() {
 const [menuOpen,setMenuOpen]=useState(false);
 useEffect(()=>{
  const sync=()=>{setMenuOpen(window.location.hash==='#full-menu');};
  sync(); window.addEventListener('hashchange',sync);
  return ()=>window.removeEventListener('hashchange',sync);
 },[]);
 useEffect(()=>{if(menuOpen) window.scrollTo(0,0);},[menuOpen]);
 return menuOpen ? <FullMenu/> : <HomePage/>;
}
