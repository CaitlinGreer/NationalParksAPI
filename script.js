'use strict';

const apiKey = 'ZdeDHGIZLomANuO9KnLl9fRXr51h2RpwOpo5Q057';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson){
  console.log(responseJson);
//clear previous results
  $('.js-results-list').empty();

//iterate through results array
for (let i = 0; i < responseJson.data.length; i++){
  $('.js-results-list').append(
    `<li><h3><a href ="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
    <p>${responseJson.data[i].description}</p>
    </li>`
  )};


//display results
$('#results').removeClass('hidden');

}

function getStateParks(searchTerm, maxResults) {
  const params = {
    key: apiKey,
    stateCode: searchTerm,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = searchUrl + '?' + 'api_' + queryString;
  console.log(url);

fetch(url)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })  
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('.js-error-message').text('Something went wrong');
  });
}




function watchForm() {
  console.log('watchForm is working')
  $('.js-form').submit(event => {
    event.preventDefault();
    const searchTerm = $('.state-input').val();
    const maxResults = $('.max-results').val();
    getStateParks(searchTerm, maxResults);
  })
}

$(watchForm);