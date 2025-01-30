// Array of quote objects
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Success" },
  ];
  
  // Function to save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `
      <p><strong>${randomQuote.text}</strong></p>
      <p><em>Category: ${randomQuote.category}</em></p>
    `;
  }
  
  // Function to create the "Add Quote" form dynamically
  function createAddQuoteForm() {
    const formContainer = document.getElementById('formContainer');
  
    const form = document.createElement('div');
    form.innerHTML = `
      <h2>Add a New Quote</h2>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
    `;
  
    formContainer.appendChild(form);
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory,
      };
  
      quotes.push(newQuote);
      saveQuotes(); // Save quotes to localStorage
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
    } else {
      alert('Please fill out both fields.');
    }
  }
  
  // Function to export quotes to a JSON file
  function exportQuotes() {
    const data = JSON.stringify(quotes, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        showRandomQuote();
      } catch (error) {
        alert('Invalid JSON file. Please upload a valid quotes file.');
      }
    };
    fileReader.readAsText(file);
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();
  
  // Display quotes when the page loads
  showRandomQuote();