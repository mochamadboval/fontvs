/* eslint-disable brace-style */

import { fonts } from './variable';
import { stopFilterLoader } from './loader';

global.optionsToggle = (event) => {
  const parentTarget = event.target.parentElement;
  const sectionElement = parentTarget.nextElementSibling.nextElementSibling;

  if (sectionElement.classList.contains('hidden')) {
    event.target.classList.remove('rotate-180');
    sectionElement.classList.remove('hidden');
  } else {
    event.target.classList.add('rotate-180');
    sectionElement.classList.add('hidden');
  }
};

function createFontList(selectFont, serif, sansSerif, monospace, handwriting, display) {
  selectFont.innerHTML = '';

  for (const font of fonts) {
    if (
      font.category === serif
      || font.category === sansSerif
      || font.category === monospace
      || font.category === handwriting
      || font.category === display
    ) {
      selectFont.innerHTML += `<option>${font.name}</option>`;
    }
  }
}

export function createFontOption() {
  const selectFont = document.getElementById(`Font${count}`);

  createFontList(selectFont, 'serif', 'sans-serif');
}

export function createSizeOption() {
  const selectSize = document.getElementById(`Size${count}`);

  for (let i = 8; i <= 96; i += 2) {
    if (i === 16) {
      selectSize.innerHTML += `<option selected>${i}</option>`;
    } else {
      selectSize.innerHTML += `<option>${i}</option>`;
    }
  }
}

export function changeFilterType(ID) {
  const filterType = document.querySelectorAll(`.type-${ID}`);
  const selectFont = document.getElementById(`Font${ID}`);

  let display; let handwriting; let monospace; let sansSerif; let
    serif;

  if (filterType[0].checked ? (display = 'display') : (display = undefined));
  if (filterType[1].checked ? (handwriting = 'handwriting') : (handwriting = undefined));
  if (filterType[2].checked ? (monospace = 'monospace') : (monospace = undefined));
  if (filterType[3].checked ? (sansSerif = 'sans-serif') : (sansSerif = undefined));
  if (filterType[4].checked ? (serif = 'serif') : (serif = undefined));

  createFontList(selectFont, serif, sansSerif, monospace, handwriting, display);

  setTimeout(() => {
    stopFilterLoader(ID);
  }, 1);
}

function changeText(ID, value) {
  let variant = document.getElementById(`Variant${ID}`).value;
  const name = document.getElementById(`Name${ID}`);
  const text = document.getElementById(`Text${ID}`);

  if (variant === '100 Thin') { variant = '100'; }
  else if (variant === '100 Thin italic') { variant = '100italic'; }
  else if (variant === '200 Extra-light') { variant = '200'; }
  else if (variant === '200 Extra-light italic') { variant = '200italic'; }
  else if (variant === '300 Light') { variant = '300'; }
  else if (variant === '300 Light italic') { variant = '300italic'; }
  else if (variant === '500 Medium') { variant = '500'; }
  else if (variant === '500 Medium italic') { variant = '500italic'; }
  else if (variant === '600 Semi-bold') { variant = '600'; }
  else if (variant === '600 Semi-bold italic') { variant = '600italic'; }
  else if (variant === '700 Bold') { variant = '700'; }
  else if (variant === '700 Bold italic') { variant = '700italic'; }
  else if (variant === '800 Extra-bold') { variant = '800'; }
  else if (variant === '800 Extra-bold italic') { variant = '800italic'; }
  else if (variant === '900 Black') { variant = '900'; }
  else if (variant === '900 Black italic') { variant = '900italic'; }
  else if (variant === 'Italic') { variant = 'italic'; }
  else if (variant === 'Regular') { variant = 'regular'; }

  fonts.forEach((font) => {
    if (value === font.name) {
      if (value === 'Lexend') {
        value = 'Lexend Ori';
      }

      const file = new FontFace(value, `url(${font.files[variant]}`);

      file.load().then((data) => {
        document.fonts.add(data);
        text.style.fontFamily = `${value}, ${font.category}`;
        name.style.fontFamily = `${value}, ${font.category}`;
      });
    }
  });
}

function createVariantOption(ID, value) {
  const selectVariant = document.getElementById(`Variant${ID}`);
  selectVariant.innerHTML = '';

  fonts.forEach((font) => {
    if (value === font.name) {
      font.variants.sort().forEach((variant) => {
        if (variant === '100') { variant = '100 Thin'; }
        else if (variant === '100italic') { variant = '100 Thin italic'; }
        else if (variant === '200') { variant = '200 Extra-light'; }
        else if (variant === '200italic') { variant = '200 Extra-light italic'; }
        else if (variant === '300') { variant = '300 Light'; }
        else if (variant === '300italic') { variant = '300 Light italic'; }
        else if (variant === '500') { variant = '500 Medium'; }
        else if (variant === '500italic') { variant = '500 Medium italic'; }
        else if (variant === '600') { variant = '600 Semi-bold'; }
        else if (variant === '600italic') { variant = '600 Semi-bold italic'; }
        else if (variant === '700') { variant = '700 Bold'; }
        else if (variant === '700italic') { variant = '700 Bold italic'; }
        else if (variant === '800') { variant = '800 Extra-bold'; }
        else if (variant === '800italic') { variant = '800 Extra-bold italic'; }
        else if (variant === '900') { variant = '900 Black'; }
        else if (variant === '900italic') { variant = '900 Black italic'; }
        else if (variant === 'italic') { variant = 'Italic'; }
        else if (variant === 'regular') { variant = 'Regular'; }

        if (variant === 'Regular') {
          selectVariant.innerHTML += `<option selected>${variant}</option>`;
        } else {
          selectVariant.innerHTML += `<option>${variant}</option>`;
        }
      });
    }
  });
}

global.changeFont = (id, value) => {
  const ID = id.replace(/\D/g, '');

  const name = document.getElementById(`Name${ID}`);
  name.innerText = value;

  createVariantOption(ID, value);
  changeText(ID, value);
};

global.changeVariant = (id) => {
  const ID = id.replace(/\D/g, '');

  const name = document.getElementById(`Name${ID}`);

  changeText(ID, name.innerText);
};

global.changeSize = (id, value) => {
  const ID = id.replace(/\D/g, '');

  const text = document.getElementById(`Text${ID}`);
  text.style.fontSize = `${value}px`;
};
