const flashcards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "What is 5 + 7?", answer: "12" },
    { question: "What is the Capital of New Jersey?", answer: "Trenton" },
    { question: "What is LOL stand for?", answer: "Laugh Out Loud" }
  ];
  
let currentCard = 0;
let showingAnswer = false;
let correct = 0;
let total = 0;
let skipped = 0;
let answered = false;

const questionDiv = document.querySelector('.question');
const answerDiv = document.querySelector('.answer');
const scoreText = document.getElementById("score");

// Flip Button
document.getElementById('flip-btn').addEventListener('click', () => {
  showingAnswer = !showingAnswer;
  answerDiv.style.display = showingAnswer ? 'block' : 'none';
  questionDiv.style.display = showingAnswer ? 'none' : 'block';
});

// Next Button
document.getElementById('next-btn').addEventListener('click', () => {
  if (!answered) {
    skipped++;
    updateScore();
  }

  currentCard++;
  answered = false;

  if (currentCard >= flashcards.length) {
    // End of deck
    questionDiv.style.display = 'none';
    answerDiv.style.display = 'none';

    document.getElementById('flip-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;
    document.getElementById('correct-btn').disabled = true;
    document.getElementById('wrong-btn').disabled = true;

    const endMessage = document.createElement('p');
    endMessage.textContent = "🎉 You've finished the flashcards!";
    endMessage.style.fontSize = "20px";
    endMessage.style.color = "#4b0082";
    document.body.appendChild(endMessage);

    // Show prize
    document.getElementById('prize').style.display = 'block';

    return;
  }

  // Load next card
  questionDiv.textContent = flashcards[currentCard].question;
  answerDiv.textContent = flashcards[currentCard].answer;
  questionDiv.style.display = 'block';
  answerDiv.style.display = 'none';
});

// Correct Button
document.getElementById("correct-btn").addEventListener("click", () => {
  if (!answered) {
    correct++;
    total++;
    updateScore();
    answered = true;
  }
});

// Wrong Button
document.getElementById("wrong-btn").addEventListener("click", () => {
  if (!answered) {
    total++;
    updateScore();
    answered = true;
  }
});

// Update score + skipped
function updateScore() {
  scoreText.textContent = `Score: ${correct} / ${total} | Skipped: ${skipped}`;
}

// 🔁 Restart Button
document.getElementById("restart-btn").addEventListener("click", () => {
  // Reset everything
  currentCard = 0;
  showingAnswer = false;
  correct = 0;
  total = 0;
  skipped = 0;
  answered = false;

  // Reset flashcard content
  questionDiv.textContent = flashcards[currentCard].question;
  answerDiv.textContent = flashcards[currentCard].answer;
  questionDiv.style.display = 'block';
  answerDiv.style.display = 'none';

  // Enable all buttons
  document.getElementById('flip-btn').disabled = false;
  document.getElementById('next-btn').disabled = false;
  document.getElementById('correct-btn').disabled = false;
  document.getElementById('wrong-btn').disabled = false;

  // Update score
  updateScore();

  // Hide prize again
  document.getElementById('prize').style.display = 'none';

  // Remove end message if it exists
  const messages = document.querySelectorAll('body > p');
  messages.forEach((msg) => {
    if (msg.textContent.includes("You've finished the flashcards!")) {
      msg.remove();
    }
  });
});
