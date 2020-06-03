const allButton = document.getElementById('all-quotes');
const randomButton = document.getElementById('random-quote');
const input = document.getElementById('text');
const authorButton = document.getElementById('author');
const addContainer = document.getElementById('cont');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const resetQuotes = () => {
  addContainer.innerHTML = '';
}

const renderError = response => {
  addContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) =>{
  resetQuotes();
    if(quotes.length > 0){
        quotes.forEach(quote =>{
            const newQuote = document.createElement('div');
            newQuote.classList.add("row");
            newQuote.classList.add("my-5");
            
            const a = document.createElement('div');
            a.classList.add("col");
            
            a.innerHTML = `<p class="quote-text h4 font-weight-normal font-italic text-success text-center">${quote.quote}</p><p class="attribution h5 font-weight-bold text-info font-italic my-0 py-0 text-center">-${quote.person}</p>`;
            
            newQuote.appendChild(a);
            addContainer.appendChild(newQuote);
        });
    } else{
        addContainer.innerHTML = '<p>Your request returned no quotes.<p>';
    }
};

allButton.onclick = () =>{
  fetch('/api/quotes').then(response =>{
      if(response.ok){
          return response.json();
      } else{
          renderError(response);
      }
  }).then(response =>{
      renderQuotes(response.quotes);
  });
};

randomButton.onclick = () =>{
  fetch('/api/quotes/random').then(response =>{
      if(response.ok){
          return response.json();
      } else{
          renderError(response);
      }
  }).then(response =>{
      renderQuotes([response.quote]);
  });
};

authorButton.onclick = () =>{
  fetch(`/api/quotes?person=${input.value}`).then(response =>{
      if(response.ok){
          return response.json();
      } else{
          renderError(response);
      }
  }).then(response =>{
      renderQuotes(response.quotes);
  });
};
