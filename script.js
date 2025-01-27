// Carousel Functionality
let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');

function showNextSlide() {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
}

setInterval(showNextSlide, 5000); // Change slide every 5 seconds

// Draw Card Functionality
// document.getElementById('drawCard').addEventListener('click', function() {
//     const cards = [
//         "Pride: You lose a turn.",
//         "Greed: Draw another card.",
//         "Lust: Swap hands with another player.",
//         "Envy: Steal a card from another player.",
//         "Gluttony: Discard your hand and draw new cards.",
//         "Wrath: Attack another player.",
//         "Sloth: Skip your next turn."
//     ];

//     const randomCard = cards[Math.floor(Math.random() * cards.length)];
//     document.getElementById('cardDisplay').textContent = randomCard;
// });

// Pre-Order System
const selectTierButtons = document.querySelectorAll('.select-tier');
const preOrderForm = document.getElementById('pre-order-form');
const tierInput = document.getElementById('tier');
const confirmationMessage = document.getElementById('confirmation-message');

selectTierButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTier = button.getAttribute('data-tier');
        tierInput.value = selectedTier;
        preOrderForm.classList.remove('hidden');
        window.scrollTo({
            top: preOrderForm.offsetTop,
            behavior: 'smooth'
        });
    });
});

preOrderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(preOrderForm);
    const orderDetails = {
        name: formData.get('name'),
        email: formData.get('email'),
        address: formData.get('address'),
        tier: formData.get('tier')
    };

    // Simulate form submission (replace with actual backend integration)
    console.log('Pre-Order Details:', orderDetails);

    // Show confirmation message
    preOrderForm.classList.add('hidden');
    confirmationMessage.classList.remove('hidden');
});

// Card Images
const cardImages = [
    "Seat-Betrayal.jpg", // Pride
    "Fishy-Betrayal.jpg", // Greed
    "Dish-Neglect.jpg", // Lust
    "Crusade-Catalyst.jpg", // Envy
    "Commie-Harvest.jpg", // Gluttony
    "Hit-n-Split.jpg" // Wrath
];

// Shuffle Logic
const shuffleButton = document.getElementById('shuffleButton');
const cards = document.querySelectorAll('.card');
const cardImagesElements = document.querySelectorAll('.card-image');

function shuffleCards() {
    // Reset all cards to face down
    cards.forEach(card => {
        card.classList.remove('flipped');
    });

    // Shuffle the card images
    const shuffledImages = [...cardImages].sort(() => Math.random() - 0.5);

    // Assign unique images to each card
    cardImagesElements.forEach((img, index) => {
        img.src = shuffledImages[index];
    });

    // Add shuffle animation
    cards.forEach(card => {
        card.classList.add('shuffling');
        setTimeout(() => {
            card.classList.remove('shuffling');
        }, 500); // Match animation duration
    });
}

// Flip Card on Click
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!card.classList.contains('shuffling')) {
            card.classList.toggle('flipped');
        }
    });
});

// Shuffle on Button Click
shuffleButton.addEventListener('click', shuffleCards);

// Initial Shuffle
shuffleCards();

const drawCardButton = document.getElementById('drawCard');
const cardImage = document.getElementById('cardImage');
const card = document.querySelector('.card');

let currentCard = null;

drawCardButton.addEventListener('click', () => {
    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
        setTimeout(() => {
            drawNewCard();
        }, 600);
    } else {
        drawNewCard();
    }
});

function drawNewCard() {
    const randomIndex = Math.floor(Math.random() * cardImages.length);
    currentCard = cardImages[randomIndex];
    cardImage.src = currentCard;
    card.classList.add('flipped');
}

card.addEventListener('click', () => {
    if (currentCard) {
        card.classList.toggle('flipped');
    }
});