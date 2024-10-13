const MAX_BUBBLES = 20; // Limit number of bubbles
const MAX_BACKGROUND_BUBBLES = 10; // Limit number of background bubbles
const bubbleSound = document.getElementById("bubbleSound");

// Create background bubbles
function createBackgroundBubble() {
    const backgroundBubble = document.createElement("div");
    backgroundBubble.classList.add("background-bubble");
    const size = Math.random() * 20 + 10; // Random size between 10px and 30px
    backgroundBubble.style.width = `${size}px`;
    backgroundBubble.style.height = `${size}px`;
    backgroundBubble.style.left = Math.random() * window.innerWidth + "px";
    backgroundBubble.style.top = window.innerHeight + "px"; // Start from the bottom
    backgroundBubble.style.opacity = Math.random(); // Random opacity for effect

    document.body.appendChild(backgroundBubble);

    // Animate the bubble
    setTimeout(() => {
        backgroundBubble.style.transition = 'transform 6s linear, opacity 6s linear'; // Smooth transition
        backgroundBubble.style.transform = `translateY(-${window.innerHeight + 50}px)`; // Move up
        backgroundBubble.style.opacity = 0; // Fade out effect
    }, 10); // Delay to allow the transition to apply

    // Remove the background bubble after the animation is complete
    setTimeout(() => {
        document.body.removeChild(backgroundBubble);
    }, 6100); // Match the duration of the animation + some buffer
}

// Create bubbles on mouse movement
document.addEventListener("mousemove", (event) => {
    const soap = document.querySelector(".soap");
    soap.style.left = event.pageX + "px";
    soap.style.top = event.pageY + "px";
    createBubble(event.pageX, event.pageY);
    changeBackgroundColor(event);
});

// Create bubbles on mouse click
document.addEventListener("click", (event) => {
    for (let i = 0; i < 5; i++) { // Burst effect
        createBubble(event.pageX, event.pageY);
    }
});

// Function to create a bubble
function createBubble(x, y) {
    const currentBubbles = document.querySelectorAll('i');
    if (currentBubbles.length >= MAX_BUBBLES) return; // Limit bubble count

    const bubble = document.createElement("i");
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
    bubble.style.setProperty("--x", getRandomPosition());
    bubble.style.setProperty("--y", getRandomPosition());
    bubble.style.setProperty("--size", getRandomSize()); // Set random size
    bubble.style.backgroundColor = getRandomColor(); // Set random color for the bubble
    bubble.style.pointerEvents = 'none';

    document.body.appendChild(bubble);
    bubbleSound.currentTime = 0; // Reset sound to start
    bubbleSound.play(); // Play sound

    // Remove the bubble after 2 seconds
    setTimeout(() => {
        document.body.removeChild(bubble);
    }, 2000);
}

// Generate random position for the bubble movement
function getRandomPosition() {
    return Math.random() * 400 - 200 + "px"; // Random offset from the original position
}

// Generate a random size for the bubble
function getRandomSize() {
    return Math.random() * 1.5 + 0.5; // Random scale between 0.5 and 2
}

// Generate a random color for the bubble
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Change background color dynamically based on mouse movement
function changeBackgroundColor(event) {
    const x = (event.clientX / window.innerWidth) * 255;
    const y = (event.clientY / window.innerHeight) * 255;
    document.body.style.backgroundColor = `rgb(${Math.floor(x)}, ${Math.floor(y)}, 60)`;
}

// Initialize background bubbles at intervals
setInterval(() => {
    createBackgroundBubble();
}, 2000); // Create a new background bubble every 2 seconds
