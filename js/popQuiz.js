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
     id: "Pop Culture",
     Questions: [
       {
         question: "Who has won the most total Academy Awards?",
         answer: "Walt Disney",
         incorrect: {
           in1: "Steven Spielberg",
           in2: "Katharine Hepburn",
           in3: "Alfred Hitchcock",
         },
       },
       {
         question: "What is the most streamed song of all time?",
         answer: "Blinding Lights - The Weekend",
         incorrect: {
           in1: "Shape of You - Ed Sheeran",
           in2: "Despacito - Luis Fonsi",
           in3: "Uptown Funk - Mark Ronson",
         },
       },
       {
         question: "What company was originally called 'Cadabra'?",
         answer: "Amazon",
         incorrect: {
           in1: "eBay",
           in2: "Apple",
           in3: "Netflix",
         },
       },
       {
         question: "Queen guitarist Brian May is also an expert in what scientific field?",
         answer: "Astrophysics",
         incorrect: {
           in1: "Biology",
           in2: "Chemistry",
           in3: "Geology",
         },
       },
       {
         question: "How many ghosts chase Pac-Man at the start of each game?",
         answer: "4",
         incorrect: {
           in1: "3",
           in2: "5",
           in3: "6",
         },
       },
       {
         question: "What shoe brand makes the 'Mexico 66'?",
         answer: "Onitsuka Tiger",
         incorrect: {
           in1: "Nike",
           in2: "Adidas",
           in3: "Puma",
         },
       },
       {
         question: "What game studio makes the Red Dead Redemption series?",
         answer: "Rockstar Games",
         incorrect: {
           in1: "Ubisoft",
           in2: "EA Sports",
           in3: "Bethesda",
         },
       },
       {
         question: "What character have both Robert Downey Jr. and Benedict Cumberbatch played?",
         answer: "Sherlock Holmes",
         incorrect: {
           in1: "Doctor Strange",
           in2: "Tony Stark",
           in3: "James Bond",
         },
       },
       {
         question: "What is the highest-rated film on IMDb as of January 1, 2024?",
         answer: "The Shawshank Redemption",
         incorrect: {
           in1: "The Godfather",
           in2: "The Dark Knight",
           in3: "Pulp Fiction",
         },
       },
       {
         question: "Complete the following lyrics: 'I should have changed that stupid lock…'",
         answer: "I should have made you leave your key",
         incorrect: {
           in1: "I should have closed the door for free",
           in2: "I should have thrown away the key",
           in3: "I should have asked you to leave",
         },
       },
     ],
   },
];


 // Variables
 let popQuestions = jsonData.find(category => category.id === "Pop Culture").Questions;
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
   popQuestions = shuffleArray(popQuestions);
 }
  // Load a Question
 function loadQuestion() {
   if (currentQuestionIndex >= popQuestions.length) {
     showFinalScore();
     return;
   }
    const currentQuestion = popQuestions[currentQuestionIndex];
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
   progressLabel.textContent = `Progress: ${currentQuestionIndex + 1}/${popQuestions.length}`;
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
  questionElement.textContent = `Quiz Complete! Your score: ${score}/${popQuestions.length} - `;
 
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


