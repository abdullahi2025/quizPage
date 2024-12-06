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
     id: "Food Trivia",
     Questions: [
       {
         question: "What is the primary ingredient in the Middle Eastern dish falafel?",
         answer: "Chickpeas",
         incorrect: {
           in1: "Lentils",
           in2: "Fava beans",
           in3: "Quinoa",
         },
       },
       {
         question: "Which nut is used to make marzipan?",
         answer: "Almonds",
         incorrect: {
           in1: "Hazelnuts",
           in2: "Pistachios",
           in3: "Cashews",
         },
       },
       {
         question: "Which spice is derived from the Crocus flower and is one of the most expensive spices in the world?",
         answer: "Saffron",
         incorrect: {
           in1: "Vanilla",
           in2: "Cardamom",
           in3: "Turmeric",
         },
       },
       {
         question: "Which fruit is known as the 'king of fruits' and has a strong smell?",
         answer: "Durian",
         incorrect: {
           in1: "Mango",
           in2: "Pineapple",
           in3: "Papaya",
         },
       },
       {
         question: "What condiment was used for its medicinal qualities in the 1800s?",
         answer: "Ketchup",
         incorrect: {
           in1: "Mustard",
           in2: "Vinegar",
           in3: "Soy Sauce",
         },
       },
       {
         question: "What's the most stolen grocery item?",
         answer: "Cheese",
         incorrect: {
           in1: "Meat",
           in2: "Chocolate",
           in3: "Alcohol",
         },
       },
       {
         question: "Which fruits are scientifically related to roses?",
         answer: "Apples, pears, cherries, peaches, and strawberries",
         incorrect: {
           in1: "Bananas and pineapples",
           in2: "Oranges and lemons",
           in3: "Grapes and watermelons",
         },
       },
       {
         question: "How many hamburgers does McDonald's sell a day?",
         answer: "6.5 million",
         incorrect: {
           in1: "4 million",
           in2: "10 million",
           in3: "8 million",
         },
       },
       {
         question: "What common leafy green is native to Persia and is often associated with a specific cartoon character who made his maritime debut in 1929?",
         answer: "Spinach",
         incorrect: {
           in1: "Kale",
           in2: "Romaine",
           in3: "Arugula",
         },
       },
       {
         question: "Which Pepsi-owned soda that you wanna 'do' was invented in the 1940s by bottling brothers Barney and Ally Hartman who wanted a better mixer for whiskey? (Hint: The name is actually an old slang term for Scotch whiskey.)",
         answer: "Mountain Dew",
         incorrect: {
           in1: "Dr Pepper",
           in2: "7UP",
           in3: "Pepsi Cola",
         },
       },
     ],
   },
];




 // Variables
 let foodQuestions = jsonData.find(category => category.id === "Food Trivia").Questions;
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
   foodQuestions = shuffleArray(foodQuestions);
 }
  // Load a Question
 function loadQuestion() {
   if (currentQuestionIndex >= foodQuestions.length) {
     showFinalScore();
     return;
   }
    const currentQuestion = foodQuestions[currentQuestionIndex];
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
   progressLabel.textContent = `Progress: ${currentQuestionIndex + 1}/${foodQuestions.length}`;
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
  questionElement.textContent = `Quiz Complete! Your score: ${score}/${foodQuestions.length} - `;
 
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
     timerElement.style.color = 'rgba(213, 8, 8, 0.8)';
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


