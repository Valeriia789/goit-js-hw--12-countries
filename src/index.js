import debounce from 'lodash.debounce';
import './sass/main.scss';
import API from './js/fetchCountries.js';
import getFullList from './js/getCountries.js';
import countryCardTpl from './templates/countryCardTpl.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import onFetchError from './js/pnotify';
// import './js/pnotify';

const refs = {
  searchInput: document.querySelector('.js-search-input'),
  cardContainer: document.querySelector('.js-card-container'),
  listContainer: document.querySelector('.js-countries-list'),
};

createFullList();

refs.searchInput.addEventListener('input', debounce(onSearch, 500), { capture: true });

function onSearch (event) {
  event.preventDefault();
  clearCoutryCard();
  clearCoutriesList();

  const searchQuery = refs.searchInput.value;

  if (searchQuery === '') {
    createFullList();
  }

  API.fetchCountries(searchQuery)
    .then(appendCountriesMarkup)
    .catch(onFetchError);
}

function appendCountriesMarkup (country) {
  if (country.length > 10) {
    onFetchError();
  }

  if (country.length >= 2 && country.length <= 10) {
    renderCountriesList(country);
  }

  if (country.length === 1) {
    renderCountryCard(country);
  }
}

function renderCountryCard (country) {
  const markupCard = countryCardTpl(country);
  refs.cardContainer.innerHTML = markupCard;
}

function renderCountriesList (countries) {
  const markupList = countriesListTpl(countries);
  refs.listContainer.innerHTML = markupList;
}

function clearCoutryCard () {
  refs.cardContainer.innerHTML = '';
}

function clearCoutriesList () {
  refs.listContainer.innerHTML = '';
}

function createFullList() {
  getFullList.getCountries().then(countries => {
    const allCountriesList = countries.map(country => {
      const listEl = document.createElement('li')
      const listElText = document.createElement('p')
      listEl.classList.add('countries-list-item')
      listEl.appendChild(listElText)
      listElText.textContent = country.name
    
      return listEl
    })
    refs.listContainer.append(...allCountriesList)
    });
}

