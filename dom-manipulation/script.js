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
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
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