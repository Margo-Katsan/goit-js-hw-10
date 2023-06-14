import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_KkDGxNTfQv83JarAi9FscytH8rCcPrR9aio2O14ocrRj5KVpe7TXKwq8B6BNM3LA';

function showNotify() {
  Notify.init({
    width: '500px',
    position: 'center-top',
  })
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function fetchBreeds(loaderEl) {
  loaderEl.classList.remove('is-hidden');
  return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        loaderEl.classList.add('is-hidden');
        showNotify();
        throw new Error(response.statusText);
      }
      
      return response.json();
  });
};
function fetchCatByBreed(breedId, catInfo, loaderEl) {
  catInfo.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
  return fetch(`${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then(response => {
      if (!response.ok) {
        showNotify();
        throw new Error(response.statusText);
      }

      return response.json();
  });
}

export default { fetchBreeds,  fetchCatByBreed};