const getCountries = async () => {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = response.json();

  return countries;
};

export default { getCountries };
