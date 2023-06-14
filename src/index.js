import API from './cat-api';
import SlimSelect from 'slim-select';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

function fillSelectOptions(breeds) {
  return breeds.map(breed => `<option value=${breed.id}>${breed.name}</option>`).join('');
}
function renderinfoAboutCatCard(imageCat, cat) {
  if (catInfo.children.length !== 0) {
    destroyCatInfo();
  }
  return `
  <img class = "photo-of-cat" src="${imageCat.url}" alt="${cat.alt_names}" width="100%">
  <h2 class = "name-breed-cat">${cat.name}</h2>
  <p class = "desc-cat">${cat.description}</p>
  <p class = "temp-cat"><span class = "temp-cat-second-part">Temperament:</span> ${cat.temperament}</p>`
}
function destroyCatInfo() {
  [...catInfo.children].forEach(infoCat => {
    infoCat.remove();
  });
}
function onChangeSelect() {
  API.fetchCatByBreed(selectEl.value, catInfo, loaderEl)
    .then(data => {
      catInfo.classList.remove('is-hidden');
      loaderEl.classList.add('is-hidden');
      catInfo.insertAdjacentHTML('beforeend', renderinfoAboutCatCard(data[0], data[0].breeds[0]));
    })
    .catch(error => { console.log(error) })
}

API.fetchBreeds(loaderEl)
  .then(breeds => {
    selectEl.classList.remove('is-hidden');
    loaderEl.classList.add('is-hidden');
    selectEl.insertAdjacentHTML('beforeend', fillSelectOptions(breeds));
    new SlimSelect({
      select: '.breed-select'
    });
  })
  .catch(error => { console.log(error) });

selectEl.addEventListener('change', onChangeSelect);