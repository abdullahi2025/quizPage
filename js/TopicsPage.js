// Select all buttons and containers for animations
const buttons = document.querySelectorAll('.button-container button');
const animationContainer = document.getElementById('items'); // Container for animations
const readySetGoDiv = document.getElementById('ready-set-go'); // Ready, Set, Go! message container


// Map each button to a unique set of symbols
const buttonSymbolsMap = {
 'Pop Culture': ['♪', '♫', '♬', '♩', '♭', '♮', '♯'], // Music notes for Pop Culture
 'Sports': ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥎', '🏓', '🏸'], // Sports emojis for Sports
 'Foods': ['🍎', '🍔', '🍕', '🍩', '🍦', '🍇', '🍉', '🥗', '🍹', '☕'] // Food and drink emojis
};


// Function to create a single animated icon
function createIcon(symbols) {
 const icon = document.createElement('div');
 icon.classList.add('icon');


 // Randomize the icon's content, size, position, and animation duration
 icon.innerText = symbols[Math.floor(Math.random() * symbols.length)];
 icon.style.left = `${Math.random() * 100}vw`; // Random horizontal position
 icon.style.animationDuration = `${3 + Math.random() * 2}s`; // Random animation duration
 icon.style.fontSize = `${1 + Math.random() * 2}rem`; // Random font size


 // Add the icon to the container
 animationContainer.appendChild(icon);


 // Remove the icon after the animation ends
 setTimeout(() => {
   icon.remove();
 }, 2000); // Matches the `float` animation duration
}


// Function to start icons on hover
function startIcons(button) {
 // Retrieve the corresponding symbols for the button
 const symbols = buttonSymbolsMap[button.textContent];


 // Start creating icons at an interval
 const interval = setInterval(() => createIcon(symbols), 200);


 // Stop creating icons when hover ends
 button.addEventListener(
   'mouseleave',
   () => {
     clearInterval(interval); // Stop the interval
   },
   { once: true } // Ensures the event listener is removed after it fires
 );
}


// Function to display the "Ready, Set, Go!" message and navigate
function showReadySetGo(href) {
 // Display the "Ready, Set, Go!" message
 readySetGoDiv.classList.remove('hidden');
 readySetGoDiv.style.display = 'block'; // Ensure it's visible


 // Wait 2 seconds before navigating to the new page
 setTimeout(() => {
   window.location.href = href; // Navigate to the target page
 }, 2000); // Ensure the navigation occurs
}


// Attach hover and click event listeners to buttons
buttons.forEach((button) => {
 // Handle hover for animations
 button.addEventListener('mouseenter', () => startIcons(button));


 // Handle click for "Ready, Set, Go!" and navigation
 button.addEventListener('click', (event) => {
   event.preventDefault(); // Prevent default navigation behavior
   const href = button.getAttribute('data-href'); // Get the URL from data-href
   showReadySetGo(href); // Call function to display message and navigate
 });
});
