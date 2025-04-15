// Grab elements
const moodSelect = document.getElementById("mood");
const logButton = document.getElementById("log-mood");
const historyList = document.getElementById("history-list");
const commentInput = document.getElementById("mood-comment");

// Create moodEntries array
let moodEntries = [];

// Load saved entries from localStorage
const savedMoods = JSON.parse(localStorage.getItem("moodHistory"));
if (savedMoods && Array.isArray(savedMoods)) {
  moodEntries = savedMoods;
  moodEntries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

// Log Mood Button
logButton.addEventListener("click", () => {
  const selectedMood = moodSelect.value;
  const comment = commentInput.value.trim();
  const timestamp = new Date().toLocaleString();

  let entryText = `${timestamp} - ${selectedMood}`;
  if (comment !== "") {
    entryText += ` - "${comment}"`;
  }

  // Create a new list item
  const newEntry = document.createElement("li");
  newEntry.textContent = entryText;
  historyList.prepend(newEntry); // Add to top

  // Add to array and localStorage
  moodEntries.unshift(entryText);
  localStorage.setItem("moodHistory", JSON.stringify(moodEntries));

  // Clear comment input
  commentInput.value = "";
});
