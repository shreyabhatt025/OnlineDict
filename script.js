// Step 1: Get the input box, button, and result area from the HTML page
const inputBox = document.getElementById("searchInput");
const searchButton = document.getElementById("searchBtn");
const resultArea = document.getElementById("result");

// Step 2: When user clicks the Search button
searchButton.addEventListener("click", function () {
  // Get the word typed by the user
  const userWord = inputBox.value.trim();

  // If input is empty, show a message and stop
  if (userWord === "") {
    alert("Please type a word.");
    return;
  }

  // Build the API URL using the word the user typed
  const apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`;

  // Clear previous results
  resultArea.innerHTML = "Loading...";

  // Step 3: Call the dictionary API to get meaning
  fetch(apiURL)
    .then(function (response) {
      // If the word is not found, throw error
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json(); // Convert the response to JSON
    })
    .then(function (data) {
      // Step 4: Take out the first meaning from the response
      const word = data[0].word;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const definitions = data[0].meanings[0].definitions;

      // Step 5: Create a list of meanings
      let output = `<h3>${word} <small>(${partOfSpeech})</small></h3><ol>`;
      definitions.forEach(function (def) {
        output += `<li>${def.definition}</li>`;
      });
      output += `</ol>`;

      // Step 6: Add audio if available
      const audio = data[0].phonetics[0]?.audio;
      if (audio) {
        output += `<br><audio controls src="${audio}"></audio>`;
      }

      // Show everything in result area
      resultArea.innerHTML = output;
    })
    .catch(function (error) {
      // If something went wrong (e.g., word not found)
      resultArea.innerHTML = `<p style="color:red;">Sorry, no definition found.</p>`;
    });
});

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchButton.click(); // Pretend like the user clicked the button
  }
});
