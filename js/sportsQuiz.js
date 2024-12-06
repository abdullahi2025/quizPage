
let currentQuestion = 0;
const totalQuestions = 10;

function answerQuestion(){
  if(currentQuestion <= 10){
      currentQuestion = currentQuestion + 1;
      updateProgressBar();
      if (currentQuestion == 10){
         minute = 0;
         seconds = 0;
         showFinalScore();
        }
      }
  else{
      /* this will end up opening up a final page*/
      showFinalScore();
      }
}
function updateProgressBar(){
  const progressBar = document.getElementById("progressBar");
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  progressBar.style.width = progressPercentage + "%"
  progressBar.textContent = `${currentQuestion}/${totalQuestions}`;
  }

function handleButtonClick(event){
  const buttonClicked = event.target.id;
  console.log(`Button clicked: ${buttonClicked}`)
  answerQuestion();
  }
  document.querySelectorAll('.button-container button').forEach(button =>{
      button.addEventListener('click', handleButtonClick);
  })

// Handle "I GIVE UP" button click
document.getElementById("giveUpButton").addEventListener("click", function (event) {
 event.preventDefault(); // Prevent default behavior
 document.getElementById("customConfirm").classList.remove("hidden"); // Show custom dialog
 disableButtons(true); // Disable answer buttons
});

// Handle custom dialog buttons
document.getElementById("confirmYes").addEventListener("click", function () {
 // Redirect to TopicsPage.html
 window.location.href = "TopicsPage.html";
});

document.getElementById("confirmNo").addEventListener("click", function () {
 // Hide the custom dialog
 document.getElementById("customConfirm").classList.add("hidden");
 disableButtons(false); // Re-enable answer buttons
});

// Function to enable/disable answer buttons
function disableButtons(disable) {
 document.querySelectorAll('.button-container button').forEach(button => {
   button.disabled = disable;
   button.style.opacity = disable ? "0.5" : "1"; // Visual feedback for disabled state
   button.style.pointerEvents = disable ? "none" : "auto"; // Prevent interaction
 });
}












// JSON Data: Full list of 10 questions
const jsonData = [
  {
    id: "Sports",
    Questions: [
      {
        question: "What does FIFA stand for in English?",
        answer: "International Federation of Association Football",
        incorrect: {
          in1: "International Football Association Federation",
          in2: "Federation of International Football Associations",
          in3: "Football International Federation Association",
        },
      },
      {
        question: "Which country has won the most World Cups?",
        answer: "Brazil",
        incorrect: {
          in1: "Germany",
          in2: "Italy",
          in3: "Argentina",
        },
      },
      {
        question: "Who was the world’s highest-paid athlete in 2023?",
        answer: "Cristiano Ronaldo",
        incorrect: {
          in1: "Lionel Messi",
          in2: "LeBron James",
          in3: "Roger Federer",
        },
      },
      {
        question: "In what city is the NFL Hall of Fame located?",
        answer: "Canton, Ohio",
        incorrect: {
          in1: "Chicago, Illinois",
          in2: "Green Bay, Wisconsin",
          in3: "New York City, New York",
        },
      },
      {
        question: "Simone Biles is famous for her skill in what sport?",
        answer: "Gymnastics",
        incorrect: {
          in1: "Figure Skating",
          in2: "Diving",
          in3: "Track and Field",
        },
      },
      {
        question: "Where does the Tour de France finish each year?",
        answer: "Avenue des Champs-Élysées in Paris",
        incorrect: {
          in1: "Eiffel Tower in Paris",
          in2: "Arc de Triomphe in Paris",
          in3: "Notre Dame Cathedral in Paris",
        },
      },
      {
        question: "What was the first name of Argentinian soccer star Maradona?",
        answer: "Diego",
        incorrect: {
          in1: "Lionel",
          in2: "Carlos",
          in3: "Jorge",
        },
      },
      {
        question: "What height is a regulation NBA basket?",
        answer: "10 feet / 3.02 meters",
        incorrect: {
          in1: "12 feet / 3.66 meters",
          in2: "9 feet / 2.74 meters",
          in3: "11 feet / 3.35 meters",
        },
      },
      {
        question: "What is the national sport of Japan?",
        answer: "Sumo wrestling",
        incorrect: {
          in1: "Judo",
          in2: "Karate",
          in3: "Kendo",
        },
      },
      {
        question: "What sporting event has a strict dress code of all white?",
        answer: "Wimbledon",
        incorrect: {
          in1: "The Masters",
          in2: "US Open",
          in3: "Tour de France",
        },
      },
    ],
  },
];

 // Variables
let sportsQuestions = jsonData.find(category => category.id === "Sports").Questions;
let currentQuestionIndex = 0;
let score = 0;
 // HTML Elements
const questionElement = document.getElementById("question");
const answerButtons = [
  document.getElementById("button1"),
  document.getElementById("button2"),
  document.getElementById("button3"),
  document.getElementById("button4"),
];
const progressLabel = document.getElementById("progress-label");
 // Function to Shuffle Array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
 // Shuffle Questions
function shuffleQuestions() {
  sportsQuestions = shuffleArray(sportsQuestions);
}
 // Load a Question
function loadQuestion() {
  if (currentQuestionIndex >= sportsQuestions.length) {
    showFinalScore();
    return;
  }
   const currentQuestion = sportsQuestions[currentQuestionIndex];
  const answers = shuffleArray([
    currentQuestion.answer,
    currentQuestion.incorrect.in1,
    currentQuestion.incorrect.in2,
    currentQuestion.incorrect.in3,
  ]);
   // Update question and answers
  questionElement.textContent = currentQuestion.question || "Question not found!";
  answerButtons.forEach((btn, index) => {
    btn.textContent = answers[index];
    btn.onclick = () => checkAnswer(btn,answers[index] === currentQuestion.answer, currentQuestion.answer);
  });
   // Update progress
  progressLabel.textContent = `Progress: ${currentQuestionIndex + 1}/${sportsQuestions.length}`;
}
 // Check the Answer
function checkAnswer(clickedButton,isCorrect, correctAnswer) {
  if (isCorrect) {
    clickedButton.classList.add("correct");
    score++;
  
  } else {
    clickedButton.classList.add("incorrect");
    answerButtons.forEach(btn => {
      if (btn.textContent === correctAnswer){
        btn.classList.add("correct")
      }
    });
  }
  setTimeout(function() {
    answerButtons.forEach(function(btn){ btn.classList.remove("correct", "incorrect")});

  currentQuestionIndex++;
  loadQuestion();
  }, 1000);
}

function scoreMessage() {
 let message = "fail";
 if (score === 10) {
   message = "Perfect";
 } else if (score >= 8) {
   message = "Great";
 } else if (score >= 5) {
   message = "Good";
 }
 return message;
}
// Show Final Score with grading and color changes
function showFinalScore() {
 const gradeMessage = getGradeMessage(score); // Get the grade message
 const gradeColor = getGradeColor(score); // Get the color for the grade
 questionElement.textContent = `Quiz Complete! Your score: ${score}/${sportsQuestions.length} - `;
  // Create a new span element to show the grade with the color
 const gradeElement = document.createElement("span");
 gradeElement.textContent = gradeMessage;
 gradeElement.style.color = gradeColor; // Apply the color to the grade

 // Append the grade message with color to the question element
 questionElement.appendChild(gradeElement);

 // Hide answer buttons and update progress
 answerButtons.forEach(btn => (btn.style.display = "none"));
 progressLabel.textContent = "Quiz Finished";
}

// Function to get grade message based on score
function getGradeMessage(score) {
 if (score === 10) {
   return "Perfect!";
 } else if (score >= 8) {
   return "Great!";
 } else if (score >= 5) {
   return "Good!";
 } else {
   return "Bad!";
 }
}

// Function to get grade color based on score
function getGradeColor(score) {
 if (score === 10) {
   return "purple"; // Perfect
 } else if (score >= 8) {
   return "lightgreen"; // Great
 } else if (score >= 5) {
   return "darkgreen"; // Good
 } else {
   return "red"; // Bad
 }
}


 // Initialize Quiz
document.addEventListener("DOMContentLoaded", function() { // change the arrow to a return use chat
  shuffleQuestions(); // Shuffle questions before the quiz starts
  loadQuestion(); // Load the first question
})  ;




// create the timer
const timerElement = document.getElementById('timer');

// set initialization
let minute = 2;
let seconds = 30;

function timeFormat(minute, seconds){
return `${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

}
function updateTimer(){
 if(minute === 0){
  if(seconds === 0){
    showFinalScore();
  }
  else{
    seconds--;
  }
  if(seconds <= 30){
    timerElement.style.color = 'red';
    timerElement.classList.add('shake-and-grow');

    createStars(timerElement.parentElement);


    setTimeout(() => {
      timerElement.classList.remove('shake-and-grow');
    },1000);
  }
}
if(minute > 0){
  if(seconds > 0){
    seconds--;
  }
  else{
    minute--;
    seconds = 59;
  }
}
 timerElement.textContent = timeFormat(minute, seconds);
}

setInterval(updateTimer,1000);

function createStars() {
 const container = document.querySelector('.container');
  for (let i = 0; i < 20; i++) {
   const star = document.createElement('div');
   star.classList.add('star');
  
  
   // Random position within the container
   const x = Math.random() * container.clientWidth;
   const y = Math.random() * container.clientHeight;
  
   star.style.left = `${x}px`;
   star.style.top = `${y}px`;
  
   container.appendChild(star);

   // Remove star after animation
   star.addEventListener('animationend', () => {
     star.remove();
   });
 }
}

