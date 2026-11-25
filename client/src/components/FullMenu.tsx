import React, { useState } from 'react';
import { MENU_ITEMS, WAFFLE_SPECIAL } from '../constants';
type Entry = [string, string, string?];
const breakfast: Entry[] = [
 ['2 Eggs, Home Fries and Toast','11.95','Choice of bacon, sausage, or ham.'],['1 Egg, Home Fries and Toast','10.25','Choice of bacon, sausage, or ham.'],['Back Bacon with 2 Eggs, Home Fries and Toast','14.95'],['Back Bacon, 1 Egg, Home Fries and Toast','12.95'],['Meatless Breakfast','8.95','2 eggs, home fries, and toast.'],['8-oz New York Steak, 3 Eggs, Home Fries and Toast','28.95'],['Chicken Breast, 2 Eggs, Home Fries and Toast','22.95'],['2 Pork Chops, 2 Eggs, Home Fries and Toast','27.95'],['1 Pork Chop and 2 Eggs','23.95'],['Chopped Steak, 2 Eggs, Home Fries and Toast','20.95'],['Eggs Benedict','18.95','Choice of bacon, back bacon, or ham.'],['Eggs Florentine','16.95','With spinach; no meat.'],['Smoked Salmon Eggs Benedict','20.95']
];
const lunch: Entry[] = [
 ['Choice of Sandwich','11.95','Choose a toasted Western, BLT, grilled cheese, or bacon and egg sandwich. Served with fries or home fries.'],['Chicken BLT Wrap','18.95','Chicken, bacon, lettuce, and tomato.'],['Meat Breakfast Wrap','16.95','Your choice of meat with cheese, egg, peppers, onions, and tomatoes.'],['Veggie Breakfast Wrap','14.95','Cheese, egg, peppers, onions, and tomatoes.'],['Philly Cheesesteak Wrap','17.95','Philly meat, cheese, peppers, and BBQ sauce.'],['Hamburger with Side','14.95'],['Cheeseburger with Side','16.95'],['Bacon Cheeseburger with Side','18.95'],['Chicken Fingers with Choice of Side','16.95'],['Chicken Clubhouse with Side','19.95'],['8-oz Steak on a Kaiser with Side','22.95'],['Back Bacon on a Kaiser with Side','16.95'],['Home Fries Poutine','12.95','Hollandaise sauce, cheese, fried onions, and bacon.']
];
const sweet: Entry[] = [
 ['3 Buttermilk Pancakes','12.75'],['3 Flavoured Pancakes','15.95','Choice of strawberries, blueberries, banana, chocolate chips, or cinnamon. Mix flavours: one topping per pancake.'],['3 Pancakes with Sausage, Ham or Bacon','16.95'],['3 Pancakes with Back Bacon','17.95'],['3 Pancakes with 2 Eggs and Home Fries','17.95'],['3 Slices of French Toast','12.95'],['2 Slices of French Toast with Bacon, Sausage or Ham','12.95'],['2 Slices of French Toast with Back Bacon','14.95'],['2 Slices of French Toast with Home Fries or 1 Egg','10.95'],['Waffle','13.95']
];
const omelettes: Entry[] = [
 ['Plain','12.95'],['Cheese','14.95'],['Ham, Bacon or Western','15.95'],['Ham, Bacon or Western with Cheese','17.95'],['Mushroom or Spinach','15.95'],['Mushroom or Spinach with Cheese','17.95'],['Greek or Veggie','17.95'],['Chili or Spanish','17.95'],["Meat Lovers’ Omelette",'17.95'],['Meat Skillet','19.95'],['Veggie Skillet','18.95']
];
const sides: Entry[] = [['Fries','4.50'],['Onion Rings','5.50'],['Home Fries','4.95'],['Bacon, Sausage or Ham','5.95'],['Turkey Bacon','6.95'],['Back Bacon','6.95'],['Toast','2.95'],['Extra Egg','2.00'],['1 Pancake','4.25'],['Fruit Bowl — Small','5.95'],['Fruit Bowl — Large','9.95'],['Hollandaise Sauce','3.00']];
const drinks: Entry[] = [['Coffee','3.25'],['Tea','2.75'],['Herbal Tea','3.00'],['Hot Chocolate','2.95'],['Orange or Apple Juice','2.95 / 3.95','Small / Large'],['Grapefruit or Tomato Juice','2.95 / 3.95','Small / Large'],['Chocolate or White Milk','2.95 / 3.95','Small / Large'],['Pop — 355 mL Can','2.95','Coke, Diet Coke, ginger ale, or iced tea.']];
const kids: Entry[] = [['Bacon & Egg','8.95'],['Mini Pancakes','9.50'],['Mini Chocolate Chip Pancakes','11.95'],['Chicken Fingers','12.95'],['Grilled Cheese and Fries','11.95']];
function Section({title,items,note,extra}:{title:string;items:Entry[];note?:string;extra?:string}) {
 return <section className="full-menu-category"><h2>{title}</h2>{note && <p className="full-menu-note">{note}</p>}<dl>{items.map(([name,price,description])=><div className="full-menu-item" key={name}><dt>{name}{description && <p>{description}</p>}</dt><dd>${price}</dd></div>)}</dl>{extra && <p className="full-menu-extra">{extra}</p>}</section>;
}
const menuLabels = {
  front: 'Specials & Classics',
  back: 'Sweets, Omelettes & More',
};

export default function FullMenu() {
 const [side,setSide]=useState<'front'|'back'>('front');
 const otherSide = side === 'front' ? 'back' : 'front';
 const changeSide = (next: 'front' | 'back') => {
  setSide(next);
  window.scrollTo({ top: 0, behavior: 'instant' });
 };
 return <main className="full-menu-page">
  <nav className="printed-menu-nav" aria-label="Menu navigation">
    <a href="#morning">Home</a>
    <div aria-label="Menu sections" role="group">
      <button aria-pressed={side === 'front'} onClick={() => changeSide('front')}>{menuLabels.front}</button>
      <button aria-pressed={side === 'back'} onClick={() => changeSide('back')}>{menuLabels.back}</button>
    </div>
    <a href="tel:+19055224995" aria-label="Call 905-522-4995 for pickup">Pick Up</a>
  </nav>
  <h1 className="printed-menu-masthead"><img src="/menu/printed-masthead.webp" alt="Maple Leaf Pancake House Menu" /></h1>
  <div className="printed-menu-paper">
  <p className="printed-menu-ribbon">Breakfast Served All Day!</p>
  <div className="full-menu-sheet" key={side}>
   {side==='front' ? <>
    <section className="full-menu-specials"><h2>Maple Leaf House Specials</h2><div className="full-menu-special-grid">{MENU_ITEMS.map(item=><article key={item.id}><span className="full-menu-number">#{item.id}</span><h3>{item.name}</h3><strong>{item.price}</strong><p>{item.description}</p></article>)}</div><div className="full-menu-waffle"><img src="/brand/rooster.png" alt=""/><div><h3>Waffle Special</h3><p>{WAFFLE_SPECIAL.description}</p></div><strong>{WAFFLE_SPECIAL.price}</strong></div></section>
    <p className="full-menu-drink">Add a Drink: Coffee $3.25 · Orange or Apple Juice — Small $2.95 / Large $3.95</p>
    <div className="full-menu-columns"><Section title="Classic Breakfast" items={breakfast}/><Section title="Sandwiches, Burgers & Wraps" note="Served with a choice of fries, onion rings, or home fries." items={lunch}/></div>
   </> : <>
    <div className="full-menu-columns"><div><Section title="Pancakes, French Toast & Waffles" items={sweet} extra="Add whipped cream +$2.00 · Additional toppings +$2.50"/><Section title="Drinks" items={drinks}/></div><div><Section title="3-Egg Fluffy Omelettes" note="Served with home fries and toast." items={omelettes} extra="Egg whites +$2.00 · Additional ingredient +$1.50"/><Section title="Side Orders" items={sides}/></div></div>
    <div className="printed-kids"><Section title="Kids’ Meals" note="Includes a small drink for children aged 12 and under." items={kids}/></div>
   </>}
  </div>
  <div className="full-menu-end"><button onClick={()=>changeSide(otherSide)}>View {menuLabels[otherSide]}</button><p><img src="/brand/rooster.png" alt="" />Maple Leaf Pancake House · Est. 1995</p></div>
  </div>
 </main>;
}
