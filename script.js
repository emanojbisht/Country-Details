'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const searchInputEl = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

///////////////////////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    countriesContainer.innerHTML = '';
    const html = `
        <article class="country">
            <img class="country__img" src="${data.flags['svg']}" />
            <div class="country__data">
                <h3 class="country__name">${data.name['common']}</h3>
                <h4 class="country__region">${data.continents[0]}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${Object.values(
                  data.languages
                )}</p>
                <p class="country__row"><span>💰</span>${
                  Object.keys(data.currencies)[0]
                }</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });

  request.onloadend = function () {
    if (request.status === 404) {
      alert('Country not found!');
    }
  };
};

searchButton.addEventListener('click', function () {
  if (searchInputEl.value === '') {
    alert('Please enter a country!!');
  } else {
    const country = searchInputEl.value;
    country.toLowerCase();
    getCountryData(country);
  }
});
