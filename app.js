const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

// list=search - perform a full text search
// srsearch="inputValue" - search for page titles or content matching  this value.
// srlimit=20 How many total pages to return.
// format=json json response
// "origin=*" fix cors errors

const page_url = 'http://en.wikipedia.org/?curid=';

const form = document.querySelector('.form');
const formInput = document.querySelector('.form-input');
const results = document.querySelector('.results');
const container = document.querySelector('.container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = formInput.value;
  if (!value) {
    container.innerHTML = '<h5 class="error">Please enter search value</h5>';
  }
  const list = await fetchResults(value);
  if (!list) return;
  displayList(list);
});

const fetchResults = async (value) => {
  container.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${value}`);
    const data = await response.json();
    const list = data.query.search;
    if (list.length < 1) {
      container.innerHTML = '<h5 class="error">no search results found</h5>';
      return;
    }
    return data.query.search;
  } catch (error) {
    container.innerHTML = '<h5 class="error">no search results found</h5>';
  }
};

const displayList = (list) => {
  const searchResults = list.map((item) => {
    const { pageid, title, snippet } = item;
    return `<article class="card">
                    <a href="${page_url}${pageid}" class="card-link" target="_blank">
                        <h2>${title}</h2>
                        <p>${snippet}</p>
                    </a>
                </article>`;
  });
  searchResults.unshift('<div class="results">');
  searchResults.push('</div>');
  container.innerHTML = searchResults.join('');
};
