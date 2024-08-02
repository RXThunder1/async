let deckId = '';

async function initializeDeck() {
    const response = await fetch('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    deckId = data.deck_id;
}

async function drawCard() {
    if (!deckId) {
        await initializeDeck();
    }
    
    const response = await fetch(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    const card = data.cards[0];
    
    const cardDisplay = document.getElementById('cardDisplay');
    cardDisplay.innerHTML = `Card drawn: ${card.value} of ${card.suit}`;

    if (data.remaining === 0) {
        document.getElementById('drawCardButton').disabled = true;
        cardDisplay.innerHTML += '<br>No cards left in the deck.';
    }
}

document.getElementById('drawCardButton').addEventListener('click', drawCard);

// Initialize the deck when the page loads
initializeDeck();