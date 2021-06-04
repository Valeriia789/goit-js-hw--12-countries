function fetchCountries (searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
    if(response.ok) {
      return response.json();
    }

    console.log('Упс, треба хоч пару букв написати');
  });
}

export default {fetchCountries}
