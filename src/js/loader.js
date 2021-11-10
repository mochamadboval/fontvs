import { loaders } from './variable';
import { changeFilterType } from './options';

export function startLoader() {
  loaders[0].classList.remove('hidden');
}

export function stopLoader() {
  for (const loader of loaders) {
    loader.classList.add('hidden');
  }
}

global.startFilterLoader = (id) => {
  const ID = id.replace(/\D/g, '');

  const fontLoader = document.getElementById(`Font${ID}`);
  fontLoader.classList.remove('bg-white');
  fontLoader.classList.add('animate-pulse', 'bg-gray-200');

  const variantLoader = document.getElementById(`Variant${ID}`);
  variantLoader.innerHTML = '<option hidden>...</option>';

  setTimeout(() => {
    changeFilterType(ID);
  }, 20);
};

export function stopFilterLoader(ID) {
  const fontLoader = document.getElementById(`Font${ID}`);
  fontLoader.classList.remove('animate-pulse', 'bg-gray-200');
  fontLoader.classList.add('bg-white');
}
