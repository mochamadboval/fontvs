import { fonts } from './variable';
import { addEditor } from './editor';
import { stopLoader } from './loader';

const newEditor = document.getElementById('newEditor');

function loadEditor() {
  addEditor();
  count += 1;
  addEditor();
  stopLoader();
}

async function fetchAPI() {
  const response = await fetch('https://fontvs-worker.mochamadboval.workers.dev/');
  const data = await response.json();

  data.forEach((font) => {
    fonts.push(font);
  });

  loadEditor();
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAPI();
});

newEditor.addEventListener('click', () => {
  count += 1;
  addEditor();
});
