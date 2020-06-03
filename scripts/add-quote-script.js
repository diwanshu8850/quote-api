const quoteInput = document.getElementById('quote-input');
const personInput = document.getElementById('person-input');
const submit = document.getElementById('submit');
const addQuote = document.getElementById('add');

submit.onclick = () =>{
    
    fetch(`/api/quotes?quote=${quoteInput.value}&person=${personInput.value}`, {
        method: 'POST'
        
    }).then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(jsonResponse =>{
        renderResponse(jsonResponse.quote);
    });
    
};

const renderResponse = (response) =>{
    const newQuote = document.createElement('div');
    newQuote.classList.add("row");
    newQuote.classList.add("justify-content-center");
    
    const a = document.createElement('div');
    a.classList.add("col-");
    a.innerHTML = `<h3 class="font-italic mt-5 text-success">Congrats, your quote was added!</h3><p class="font-italic h3">Go to the <a href="../index.html">home page</a> to request and view all quotes.</p>`
    
    //console.log(response.quote);
    //console.log(response.person);
    newQuote.appendChild(a);
    addQuote.appendChild(newQuote);
    
};
