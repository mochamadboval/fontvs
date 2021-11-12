import { container } from './variable';
import { createSizeOption } from './options';

function createTextArea() {
  const textArea = document.createElement('section');

  const infoWrapper = document.createElement('div');
  infoWrapper.classList.add('mb-1', 'mt-2', 'text-center', 'text-gray-500');

  const info = document.createElement('small');
  info.innerText = 'Tap text to edit';

  infoWrapper.append(info);

  const text = document.createElement('p');
  text.contentEditable = true;
  text.id = `Text${count}`;
  text.innerText = 'The quick brown fox jumps over the lazy dog.';

  textArea.append(infoWrapper, text);
  return textArea;
}

function createSelect(id, width, margin) {
  const select = document.createElement('select');
  select.classList.add(width, margin, 'bg-white', 'border', 'border-gray-200', 'my-2', 'p-2', 'rounded', 'shadow');
  select.id = id;

  const option = document.createElement('option');
  option.hidden = true;
  option.innerText = '...';

  select.append(option);
  return select;
}

function createFilterButton() {
  const button = document.createElement('button');
  button.classList.add('bg-green-600', 'block', 'mb-4', 'mt-2', 'mx-auto', 'px-2', 'py-1', 'rounded', 'text-gray-50', 'hover:bg-gray-900');
  button.id = `Button${count}`;
  button.setAttribute('onclick', 'startFilterLoader(this.id)');
  button.innerText = 'Apply';

  return button;
}

function createType(name) {
  const typeWrapper = document.createElement('div');
  typeWrapper.classList.add('mx-2', 'my-1');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add(`type-${count}`, 'mr-1');
  checkbox.id = `${name}${count}`;

  const label = document.createElement('label');
  label.htmlFor = `${name}${count}`;
  label.innerText = name;

  typeWrapper.append(checkbox, label);
  return typeWrapper;
}

function createFilterType() {
  const filterType = document.createElement('div');
  filterType.classList.add('flex', 'flex-wrap', 'justify-center');

  const display = createType('Display');

  const handwriting = createType('Handwriting');

  const monospace = createType('Monospace');

  const sansSerif = createType('Sans-serif');

  const serif = createType('Serif');

  filterType.append(display, handwriting, monospace, sansSerif, serif);
  return filterType;
}

function createLabel(name, margin) {
  const filterLabel = document.createElement('p');
  filterLabel.classList.add(margin, 'text-center');

  const filterText = document.createElement('span');
  filterText.classList.add('bg-gray-900', 'px-2', 'py-1', 'text-gray-50');
  filterText.innerText = name;

  filterLabel.append(filterText);
  return filterLabel;
}

function createOptions() {
  const options = document.createElement('section');
  options.classList.add('bg-gray-50', 'border-green-600', 'border-l', 'border-r', 'pt-4', 'px-4', 'shadow-inner');

  const filterLabel = createLabel('Filter Type', 'mb-2');

  const filterType = createFilterType();

  const filterButton = createFilterButton();

  const selectLabel = createLabel('Select Font', 'my-2');

  const selectFont = createSelect(`Font${count}`, 'w-full');
  selectFont.setAttribute('onchange', 'changeFont(this.id, this.value)');

  const selectWrapper = document.createElement('div');
  selectWrapper.classList.add('flex');

  const selectVariant = createSelect(`Variant${count}`, 'w-2/3', 'mr-2');
  selectVariant.setAttribute('onchange', 'changeVariant(this.id)');

  const selectSize = createSelect(`Size${count}`, 'w-1/3', 'ml-2');
  selectSize.setAttribute('onchange', 'changeSize(this.id, this.value)');

  selectWrapper.append(selectVariant, selectSize);

  const lineOptions = document.createElement('hr');
  lineOptions.classList.add('-mx-4', 'my-2', 'border-green-600');

  options.append(
    filterLabel, filterType, filterButton, selectLabel, selectFont, selectWrapper, lineOptions,
  );
  return options;
}

function createHeader() {
  const header = document.createElement('header');
  header.classList.add('flex', 'justify-between');

  const name = document.createElement('h2');
  name.classList.add('text-2xl');
  name.id = `Name${count}`;
  name.innerText = '...';

  const toggle = document.createElement('div');
  toggle.classList.add('cursor-pointer', 'px-4', 'self-center', 'transform');
  toggle.setAttribute('onclick', 'optionsToggle(event)');
  toggle.innerHTML = '&#9650;';

  header.append(name, toggle);
  return header;
}

export function addEditor() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('p-4', 'w-auto', 'sm:w-1/2');

  const card = document.createElement('article');
  card.classList.add('bg-white', 'h-auto', 'p-4', 'rounded', 'shadow', 'w-auto');

  const header = createHeader();

  const lineHeader = document.createElement('hr');
  lineHeader.classList.add('border-green-600', 'mt-2');

  const options = createOptions();

  const textArea = createTextArea();

  card.append(header, lineHeader, options, textArea);
  wrapper.append(card);
  container.append(wrapper);

  createSizeOption();
}
