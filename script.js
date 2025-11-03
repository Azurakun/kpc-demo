document.addEventListener("DOMContentLoaded", () => {

    // --- 1. MOCK DATA ---
    const candidates = [
        { id: 1, name: "Nanas", photo: "img/1.jpg" },
        { id: 2, name: "Jeruk", photo: "img/2.avif" },
        { id: 3, name: "Strawberry", photo: "img/3.jpg" },
        { id: 4, name: "Semangka", photo: "img/5.jpg" }
    ];

    // --- 2. GET DOM ELEMENTS ---
    const candidateGrid = document.getElementById("candidate-grid");
    const submitButton = document.getElementById("submit-selection");
    const confirmationModal = document.getElementById("confirmation-modal"); // Renamed for clarity
    const modalCandidateInfo = document.getElementById("modal-candidate-info");
    const modalBackButton = document.getElementById("modal-back-btn");
    const modalConfirmButton = document.getElementById("modal-confirm-btn");
    const thankYouModal = document.getElementById("thank-you-modal");

    let selectedCandidate = null;

    // --- 3. FUNCTIONS ---

    function renderCandidates() {
        if (!candidateGrid) {
            console.error("Error: Could not find element with id 'candidate-grid'");
            return;
        }

        candidateGrid.innerHTML = "";
        candidates.forEach(candidate => {
            const card = document.createElement("div");
            card.className = "candidate-card";
            card.dataset.id = candidate.id;

            card.innerHTML = `
                <div class="image-wrapper">
                    <span class="candidate-number">${candidate.id}</span>
                    <img src="${candidate.photo}" alt="${candidate.name}">
                </div>
                <div class="name">${candidate.name}</div>
            `;
            
            card.addEventListener("click", () => handleCardClick(card, candidate));
            candidateGrid.appendChild(card);
        });
    }

    function handleCardClick(clickedCard, candidate) {
        const allCards = document.querySelectorAll(".candidate-card");
        allCards.forEach(card => card.classList.remove("selected"));

        clickedCard.classList.add("selected");
        selectedCandidate = candidate;
        submitButton.disabled = false;
    }

    // Renamed 'showModal' to 'showConfirmationModal' for clarity
    function showConfirmationModal() {
        if (!selectedCandidate) return;

        modalCandidateInfo.innerHTML = `
            <img src="${selectedCandidate.photo}" alt="${selectedCandidate.name}">
            <div class="name">${selectedCandidate.name}</div>
        `;
        confirmationModal.style.display = "flex";
    }

    // Renamed 'hideModal' to 'hideConfirmationModal' for clarity
    function hideConfirmationModal() {
        confirmationModal.style.display = "none";
    }

    // NEW: Function to show the "Thank You" modal
    function showThankYouModal() {
        thankYouModal.style.display = "flex";
    }

    // NEW: Function to hide the "Thank You" modal
    function hideThankYouModal() {
        thankYouModal.style.display = "none";
    }

    function resetSelection() {
        selectedCandidate = null;
        const allCards = document.querySelectorAll(".candidate-card");
        allCards.forEach(card => card.classList.remove("selected"));
        submitButton.disabled = true;
    }


    // --- 4. ADD EVENT LISTENERS ---

    // Show the confirmation modal
    submitButton.addEventListener("click", showConfirmationModal);

    // "Ulangi" (Back) button just hides the confirmation modal
    modalBackButton.addEventListener("click", hideConfirmationModal);

    // Main logic for confirming and showing "Thank You"
    modalConfirmButton.addEventListener("click", () => {
        // 1. Hide the confirmation modal immediately
        hideConfirmationModal();

        // 2. Use requestAnimationFrame for a smoother visual update
        // This ensures the browser has rendered the hidden confirmation modal
        // before showing the thank you modal.
        requestAnimationFrame(() => {
            // 3. Show the "Thank You" modal
            showThankYouModal();

            // 4. Set the 2-second timer to hide it and reset the UI
            setTimeout(() => {
                hideThankYouModal();
                resetSelection(); // Reset the main UI
            }, 2000); // Display for 2 seconds
        });
    });

    // --- 5. INITIALIZE ---
    renderCandidates();
});