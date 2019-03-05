const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false; //locks board while cards flip
let firstCard, secondCard;



function flipCard() {
	if (lockBoard) return; // user cant flip while lockBoard true
	if (this === firstCard) return; //return if clicked is same card
	this.classList.add("flip");

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;

	checkForMatch();
}

function checkForMatch() {
	//changed below from name to framework as per comment suggestion
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
	isMatch ? disableCards() : unflipCards();
}


function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);

	resetBoard();
}

function unflipCards() {
	lockBoard = true; // lock board

	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");

		resetBoard();
	}, 1500);
}


function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}


// immediately invoked function expression
(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
}) ();

cards.forEach(card => card.addEventListener("click", flipCard));

