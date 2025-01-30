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
  
      // Update categories dropdown
      populateCategories();
    } else {
      alert('Please fill out both fields.');
    }
  }
  
  // Function to populate the categories dropdown
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
  
    // Extract unique categories from the quotes array
    const categories = [...new Set(quotes.map(quote => quote.category))];
  
    // Clear existing options (except the first one)
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    // Add new options
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore the last selected filter
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
      categoryFilter.value = lastFilter;
    }
  
    // Filter quotes based on the selected category
    filterQuotes();
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
  
    // Save the selected filter to localStorage
    localStorage.setItem('lastFilter', selectedCategory);
  
    // Filter quotes
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    // Display the filtered quotes
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const randomQuote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `
        <p><strong>${randomQuote.text}</strong></p>
        <p><em>Category: ${randomQuote.category}</em></p>
      `;
    } else {
      quoteDisplay.innerHTML = 'No quotes found for this category.';
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
        populateCategories(); // Update categories dropdown
        showRandomQuote();
      } catch (error) {
        alert('Invalid JSON file. Please upload a valid quotes file.');
      }
    };
    fileReader.readAsText(file);
  }
  
  // Function to fetch quotes from the server
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const serverQuotes = await response.json();
  
      // Simulate server quotes by mapping them to our format
      const formattedQuotes = serverQuotes.map(post => ({
        text: post.title,
        category: 'Server', // Default category for server quotes
      }));
  
      // Merge server quotes with local quotes (server takes precedence)
      const mergedQuotes = [...formattedQuotes, ...quotes];
      const uniqueQuotes = [...new Map(mergedQuotes.map(quote => [quote.text, quote])).values()];
  
      // Update local quotes
      quotes = uniqueQuotes;
      saveQuotes();
  
      // Notify the user
      showNotification('Quotes synced with the server.');
    } catch (error) {
      showNotification('Failed to fetch quotes from the server.', true);
    }
  }
  
  // Function to show notifications
  function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = isError ? '#ffebee' : '#e0f7fa';
    notification.style.borderColor = isError ? '#ffcdd2' : '#b2ebf2';
  }
  
  // Add event listener to the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();
  
  // Populate categories dropdown when the page loads
  populateCategories();
  
  // Display quotes when the page loads
  showRandomQuote();
  
  // Fetch quotes from the server every 10 seconds
  setInterval(fetchQuotesFromServer, 10000);