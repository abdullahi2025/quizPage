let currentQuestion = 0;
const totalQuestions = 10;

function answerQuestion(){
    if(currentQuestion <= 10){
        currentQuestion = currentQuestion + 1;
        updateProgressBar();
        if (currentQuestion == 10){
            alert("quiz done")
            }
        }
    else{
        /* this will end up opening up a final page*/
        alert("quiz done")
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
      btn.onclick = () => checkAnswer(answers[index] === currentQuestion.answer);
    });
  
    // Update progress
    progressLabel.textContent = `Progress: ${currentQuestionIndex + 1}/${sportsQuestions.length}`;
  }
  
  // Check the Answer
  function checkAnswer(isCorrect) {
    if (isCorrect) {
      score++;
      alert("Correct!");
    } else {
      alert("Wrong!");
    }
    currentQuestionIndex++;
    loadQuestion();
  }
  
  // Show Final Score
  function showFinalScore() {
    questionElement.textContent = `Quiz Complete! Your score: ${score}/${sportsQuestions.length}`;
    answerButtons.forEach(btn => (btn.style.display = "none"));
    progressLabel.textContent = "Quiz Finished";
  }
  
  // Initialize Quiz
  document.addEventListener("DOMContentLoaded", () => {
    shuffleQuestions(); // Shuffle questions before the quiz starts
    loadQuestion(); // Load the first question
  })  ;