import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type Variant = 'sweet' | 'savoury';
// Position the food, rather than the centre of the table, inside each crop.
const foodFocus: Record<string, string> = {
  'blueberry-pancakes': '47% 62%',
  'breakfast-spread': '50% 51%',
  burger: '60% 76%',
  'classic-breakfast': '37% 52%',
  'club-sandwich': '52% 74%',
  coffee: '55% 62%',
  'fruit-waffle': '50% 55%',
  'steak-and-eggs': '98% 54%',
  'breakfast-wrap': '62% 67%',
  'fried-eggs': '48% 65%',
  'french-toast': '49% 70%',
  'syrup-pour': '52% 76%',
  'waffle-spread': '31% 73%',
};

type Shot = { photo: string; detail: string; label: string; detailLabel: string; shape?: string };
const edits: Record<Variant, Shot[]> = {
  sweet: [
    { photo: 'fruit-waffle', detail: 'drink-coffee', label: 'Fruit-Topped Waffles', detailLabel: 'Bottomless coffee', shape: 'portrait' },
    { photo: 'french-toast', detail: 'drink-orange-juice', label: 'Golden French Toast', detailLabel: 'Orange juice', shape: 'plate' },
    { photo: 'syrup-pour', detail: 'drink-coffee', label: 'Pass the Syrup', detailLabel: 'Bottomless coffee', shape: 'portrait' },
    { photo: 'waffle-spread', detail: 'drink-orange-juice', label: 'Around the Breakfast Table', detailLabel: 'Orange juice', shape: 'portrait' },
    { photo: 'blueberry-pancakes', detail: 'drink-coffee', label: 'Blueberry Pancakes', detailLabel: 'Bottomless coffee', shape: 'portrait' },
  ],
  savoury: [
    { photo: 'steak-and-eggs', detail: 'drink-coffee', label: 'Steak and Eggs', detailLabel: 'Bottomless coffee', shape: 'plate' },
    { photo: 'classic-breakfast', detail: 'drink-orange-juice', label: 'Farm Eggs Your Way', detailLabel: 'Orange juice', shape: 'plate' },
    { photo: 'burger', detail: 'drink-iced', label: 'Burgers for Lunch', detailLabel: 'Cold drink with ice', shape: 'portrait' },
    { photo: 'club-sandwich', detail: 'drink-iced', label: 'Ham and Egg Sandwich', detailLabel: 'Cold drink with ice', shape: 'portrait' },
    { photo: 'breakfast-wrap', detail: 'drink-orange-juice', label: 'Breakfast Wrap and Home Fries', detailLabel: 'Orange juice', shape: 'portrait' },
    { photo: 'breakfast-spread', detail: 'drink-coffee', label: 'Breakfast at Maple Leaf', detailLabel: 'Bottomless coffee', shape: 'round' },
  ],
};

export default function FoodMontage({ variant, fullBleed = false }: { variant: Variant; fullBleed?: boolean }) {
  const stage = useRef<HTMLElement>(null);
  const isVisible = useRef(false);
  const shots = edits[variant];

  useGSAP(() => {
    const root = stage.current;
    if (!root) return;
    const frames = Array.from(root.querySelectorAll<HTMLElement>('.montage-frame'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const edit = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: 'power3.out' } });
    gsap.set(frames, { autoAlpha: 0 });
    gsap.set(frames[0], { autoAlpha: 1 });

    frames.forEach((frame, index) => {
      const start = index * 4.3;
      const main = frame.querySelector('.montage-main');
      const detail = frame.querySelector('.montage-detail');
      const label = frame.querySelector('.montage-label');
      const enterFrom = index % 2 === 0 ? -1 : 1;
      edit.addLabel(`shot-${index + 1}`, start)
        .call(() => { root.dataset.shot = String(index + 1); }, [], start)
        .fromTo(frame, { autoAlpha: index === 0 ? 1 : 0 }, { autoAlpha: 1, duration: .9, ease: 'sine.inOut', immediateRender: false }, start)
        .fromTo(main, { xPercent: fullBleed ? 0 : 12 * enterFrom, yPercent: fullBleed ? 0 : 12, scale: fullBleed ? 1 : .85, rotation: fullBleed ? 0 : -8 * enterFrom }, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0, duration: .85, immediateRender: false }, start)
        .fromTo(detail, { xPercent: -12 * enterFrom, yPercent: -15, scale: .72, rotation: 12 * enterFrom }, { xPercent: 0, yPercent: 0, scale: 1, rotation: 0, duration: .8, ease: 'back.out(1.1)', immediateRender: false }, start + .15)
        .fromTo(label, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5, immediateRender: false }, start + .35);
      if (index > 1) edit.set(frames[index - 1], { autoAlpha: 0 }, start + .9);
      if (index === frames.length - 1) {
        edit.to(frame, { autoAlpha: 0, duration: .9, ease: 'sine.inOut' }, start + 4.3);
      }
    });

    const syncPlayback = () => {
      if (reduceMotion.matches) {
        edit.pause(.95);
      } else {
        edit.paused(!isVisible.current || document.hidden);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
      syncPlayback();
    }, { threshold: .15 });
    observer.observe(root);
    document.addEventListener('visibilitychange', syncPlayback);
    reduceMotion.addEventListener('change', syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      reduceMotion.removeEventListener('change', syncPlayback);
    };
  }, { scope: stage, dependencies: [variant, fullBleed], revertOnUpdate: true });

  return <figure className={`montage-stage montage-${variant}${fullBleed ? ' montage-full' : ''}`} ref={stage} aria-label={variant === 'sweet' ? 'Food photo edit featuring our fruit-topped waffles, French toast, blueberry pancakes, syrup, and coffee' : 'Food photo edit featuring our steak and eggs, breakfast wraps, burgers, ham and egg sandwich, and coffee'}>
    <div className="montage-backdrop" aria-hidden="true" />
    <div className="montage-frames" aria-hidden="true">
      {shots.map((shot, index) => <div key={shot.photo} className={`montage-frame montage-frame-${index + 1}`}>
        <div className={`montage-main montage-shape-${shot.shape}`}><img style={{ objectPosition: foodFocus[shot.photo] }} src={`/food/${shot.photo}.webp`} alt="" width="1100" height="1100" decoding="async" /></div>
        <div className="montage-detail"><img src={`/food/${shot.detail}.webp`} alt="" width="288" height="288" decoding="async" /><span>{shot.detailLabel}</span></div>
        <div className="montage-label">{shot.label}</div>
      </div>)}
    </div>
  </figure>;
}
