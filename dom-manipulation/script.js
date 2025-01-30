// Array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
    { text: "Strive not to be a success, but rather to be of value.", category: "Success" },
  ];
  
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
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      alert('Quote added successfully!');
    } else {
      alert('Please fill out both fields.');
    }
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();