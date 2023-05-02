const words = ['programming', 'algorithm', 'developer', 'database', 'interface', 'encryption', 'debugging', 'security', 'networking', 'server', 'application', 'web', 'javascript', 'python', 'java', 'csharp', 'php', 'ruby', 'swift', 'html', 'css', 'sql', 'mysql', 'postgresql', 'mongodb', 'nodejs', 'react', 'angular', 'vue', 'bootstrap'];





function drawHangman(mistakes, drawnParts) {
    const canvas = document.getElementById('hangman');
    const ctx = canvas.getContext('2d');

    const hangmanParts = [
        () => {  // scaffold
          ctx.beginPath();
          ctx.moveTo(60, canvas.height - 20);
          ctx.lineTo(60, 50);
          ctx.stroke();
        },
        () => {  // rope
          ctx.beginPath();
          ctx.moveTo(60, 50);
          ctx.lineTo(200, 50);
          ctx.stroke();
        },
        () => {  // head
          ctx.beginPath();
          ctx.arc(200, 70, 20, 0, Math.PI * 2);
          ctx.stroke();
        },
        () => {  // body
          ctx.beginPath();
          ctx.moveTo(200, 90);
          ctx.lineTo(200, 150);
          ctx.stroke();
        },
        () => {  // left arm
          ctx.beginPath();
          ctx.moveTo(200, 100);
          ctx.lineTo(170, 130);
          ctx.stroke();
        },
        () => {  // right arm
          ctx.beginPath();
          ctx.moveTo(200, 100);
          ctx.lineTo(230, 130);
          ctx.stroke();
        },
        () => {  // left leg
          ctx.beginPath();
          ctx.moveTo(200, 150);
          ctx.lineTo(170, 180);
          ctx.stroke();
        },
        () => {  // right leg
          ctx.beginPath();
          ctx.moveTo(200, 150);
          ctx.lineTo(230, 180);
          ctx.stroke();
        }
      ];

    if (!drawnParts.includes(mistakes)) {
        hangmanParts[mistakes]();
        drawnParts.push(mistakes);
    }
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function updateWordDisplay(guess, wordContainer, word) {
  const wordLetters = word.split('');
  const wordChars = wordContainer.innerHTML.split('');
  
  for (let i = 0; i < wordLetters.length; i++) {
    if (wordLetters[i] === guess) {
      wordChars[i] = guess;
    }
  }
  
  wordContainer.innerHTML = wordChars.join('');
}

function startGame() {
  const word = getRandomWord();
  let incorrectGuesses = 0;
  const guessedLetters = [];
  let drawnParts = [];
  
  const guessForm = document.getElementById('guess-form');
  const guessInput = document.getElementById('guess-input');
  const wordContainer = document.getElementById('word');
  const letterContainer = document.getElementById('letters');
  const mistakesContainer = document.getElementById('mistakes');

  guessedLetters.length = 0;
  drawnParts.length = 0;
  wordContainer.innerHTML = '_'.repeat(word.length);
  mistakesContainer.innerHTML = `${incorrectGuesses} mistakes`;

  drawHangman(0, drawnParts);
  
  guessForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const guess = guessInput.value.trim().toLowerCase();
    
    if (!guess) {
      alert('Please enter a letter');
      return;
    }
    
    if (guessedLetters.includes(guess)) {
      alert('You already guessed that letter!');
      return;
    }
    
    guessedLetters.push(guess);
    const correctGuess = word.includes(guess);
    
    if (correctGuess) {
      updateWordDisplay(guess, wordContainer, word);
    } else {
      incorrectGuesses++;
      mistakesContainer.innerHTML = `${incorrectGuesses} mistakes`;
      drawHangman(incorrectGuesses, drawnParts);
    }
    
    letterContainer.innerHTML = `Guessed letters: ${guessedLetters.join(', ')}`;
    
    if (wordContainer.innerHTML === word) {
      alert('You win!');
    } else if (incorrectGuesses >= 7) {
      alert(`You lose! The word was ${word}.`);
    }
    
    guessInput.value = '';
    guessInput.focus();
  });
  
  guessInput.focus();
}


startGame();

