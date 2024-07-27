// // Load quotes from local storage or initialize with default quotes
// let quotes = JSON.parse(localStorage.getItem('quotes')) || [
//     { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
//     { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
//     { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" }
//   ];
  
//   // Save quotes to local storage
//   function saveQuotes() {
//     localStorage.setItem('quotes', JSON.stringify(quotes));
//   }
  
//   // Function to show a random quote
//   function showRandomQuote() {
//     const quoteDisplay = document.getElementById('quoteDisplay');
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>- ${randomQuote.category}</em></p>`;
//   }
  
//   // Function to create and display the form for adding new quotes
//   function createAddQuoteForm() {
//     const formContainer = document.createElement('div');
//     formContainer.innerHTML = `
//       <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
//       <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
//       <button id="addQuoteButton">Add Quote</button>
//     `;
  
//     document.body.appendChild(formContainer);
  
//     // Add event listener to the "Add Quote" button
//     document.getElementById('addQuoteButton').addEventListener('click', addQuote);
//   }
  
//   // Function to add a new quote
//   function addQuote() {
//     const newQuoteText = document.getElementById('newQuoteText').value;
//     const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
//     if (newQuoteText === '' || newQuoteCategory === '') {
//       alert('Please fill in both fields');
//       return;
//     }
  
//     const newQuote = { text: newQuoteText, category: newQuoteCategory };
//     quotes.push(newQuote);
//     saveQuotes(); // Save to local storage
  
//     // Clear input fields
//     document.getElementById('newQuoteText').value = '';
//     document.getElementById('newQuoteCategory').value = '';
  
//     alert('New quote added successfully!');
//   }
  
//   // Function to export quotes as JSON
//   function exportQuotesAsJson() {
//     const dataStr = JSON.stringify(quotes, null, 2);
//     const blob = new Blob([dataStr], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
  
//     const downloadAnchorNode = document.createElement('a');
//     downloadAnchorNode.setAttribute("href", url);
//     downloadAnchorNode.setAttribute("download", "quotes.json");
//     document.body.appendChild(downloadAnchorNode); // Required for FF
//     downloadAnchorNode.click();
//     downloadAnchorNode.remove();
//   }
  
//   // Function to import quotes from a JSON file
//   function importFromJsonFile(event) {
//     const fileReader = new FileReader();
//     fileReader.onload = function(event) {
//       const importedQuotes = JSON.parse(event.target.result);
//       quotes.push(...importedQuotes);
//       saveQuotes();
//       alert('Quotes imported successfully!');
//       showRandomQuote(); // Refresh displayed quote
//     };
//     fileReader.readAsText(event.target.files[0]);
//   }
  
//   // Add event listener to "Show New Quote" button
//   document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
//   // Add event listener to the "Export Quotes" button
//   document.getElementById('exportQuotes').addEventListener('click', exportQuotesAsJson);
  
//   // Initialize with a random quote
//   showRandomQuote();
  
//   // Create and display the form for adding new quotes
//   createAddQuoteForm();
  
// Load quotes and category filter from local storage or initialize with default values

// Load quotes and category filter from local storage or initialize with default values
// Load quotes and category filter from local storage or initialize with default values
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspiration" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" }
  ];
  let lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Save last selected category to local storage
  function saveLastSelectedCategory(category) {
    localStorage.setItem('lastSelectedCategory', category);
  }
  
  // Function to show a random quote
  function showRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length === 0) {
      document.getElementById('quoteDisplay').textContent = 'No quotes available for this category';
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    displayQuote(randomQuote);
  }
  
  // Function to display a quote
  function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `${quote.text} - ${quote.category}`;
  }
  
  // Function to get filtered quotes based on selected category
  function getFilteredQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === 'all') {
      return quotes;
    }
    return quotes.filter(quote => quote.category === selectedCategory);
  }
  
  // Function to create and display the form for adding new quotes
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteButton">Add Quote</button>
    `;
    document.body.appendChild(formContainer);
    document.getElementById('addQuoteButton').addEventListener('click', addQuote);
  }
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    if (newQuoteText === '' || newQuoteCategory === '') {
      alert('Please fill in both fields');
      return;
    }
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('New quote added successfully!');
  }
  
  // Function to export quotes as JSON
  function exportQuotesAsJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", url);
    downloadAnchorNode.setAttribute("download", "quotes.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
      populateCategories();
      showRandomQuote();
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Function to populate category filter dropdown
  function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
    categoryFilter.value = lastSelectedCategory;
  }
  
  // Function to filter quotes based on selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    saveLastSelectedCategory(selectedCategory);
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length > 0) {
      displayQuote(filteredQuotes[0]);
    } else {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.textContent = 'No quotes available for this category';
    }
  }
  
  // Initialize the application
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('exportQuotes').addEventListener('click', exportQuotesAsJson);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  populateCategories();
  filterQuotes();
  createAddQuoteForm();
  