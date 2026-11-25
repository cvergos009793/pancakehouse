import { MenuItem, Rule, Review } from '@/types';

// Prices and descriptions from MAPLE LEAF FINAL MENU PRICES.pdf.
export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'The Marauder Stack', description: '2 Pancakes, 2 Strips of Bacon, 2 Sausages, and 1 Egg.', price: '$14.95', image: '/assets/marauder-stack.webp' },
  { id: '2', name: 'French Toast Frenzy', description: '3 Slices of French Toast, 2 Slices of Back Bacon, 2 Sausages, and 1 Egg.', price: '$17.95', image: '/assets/french-toast-frenzy.webp' },
  { id: '3', name: 'The Lumberjack', description: '2 Slices of Back Bacon, 2 Sausages, 2 Eggs, Home Fries, and Toast.', price: '$15.95', image: '/assets/lumberjack.webp' },
  { id: '4', name: 'Exam Week Special', description: '2 Strips of Bacon, 2 Sausages, 2 Eggs, Home Fries, and Toast.', price: '$13.95', image: '/assets/exam-week-special.webp' },
];

export const WAFFLE_SPECIAL = {
  name: 'Waffle Special',
  description: '1 Waffle, 2 Strips of Bacon, 2 Sausages, and 1 Egg.',
  price: '$17.95',
};

export const RULES: Rule[] = [
  { id: 1, title: 'NO ONE LEAVES HUNGRY', text: "Portions are sized for offensive linemen and hungry engineering students." },
  { id: 2, title: 'COFFEE IS BOTTOMLESS', text: "The pot never stops until your hands stop shaking." },
  { id: 3, title: 'CHAOS IS WELCOME', text: "Bacon sizzling? Students debating physics? It's all part of the Saturday soundtrack." },
  { id: 4, title: 'SINCE 1995', text: 'Founded by Gus Vergos. Serving Mac and our Hamilton neighbours with good, warm food and a kind welcome.' },
];

export const REVIEWS: Review[] = [
  { id: 'r1', name: 'JASON, 2nd Year Eng', role: 'Professional Napper', quote: "The syrup is 80% of my blood stream." },
  { id: 'r2', name: 'MS. PATTERSON', role: 'Local Legend', quote: "I've been coming here for 30 years. The chairs are uncomfortable but the bacon is perfect." },
  { id: 'r3', name: 'THE HAMILTON SPEC', role: 'Newspaper', quote: "AN INSTITUTION OF SUGAR AND NOSTALGIA." }
];
