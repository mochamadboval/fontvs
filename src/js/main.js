import { fonts } from './variable';
import { addEditor } from './editor';
import { stopLoader, startLoader } from './loader';

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
  startLoader();
  count += 1;
  setTimeout(() => {
    addEditor();
    stopLoader();
  }, 1);
});
