// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. MOCK DATA ---
    // Make sure these paths are correct!
    // It looks for 1.png, 2.png, etc. INSIDE a folder named "img"
    const candidates = [
        { id: 1, name: "Ikmal Wiawan", photo: "img/1.png" },
        { id: 2, name: "Lulu Lukman", photo: "img/2.png" },
        { id: 3, name: "Yosep Rohayadi", photo: "img/1.png" },
        { id: 4, name: "Zainal Aripin", photo: "img/2.png" },
        { id: 5, name: "Muhammad Zainul Arifin, S.H.", photo: "img/1.png" }
    ];

    // --- 2. GET DOM ELEMENTS ---
    const candidateGrid = document.getElementById("candidate-grid");
    const submitButton = document.getElementById("submit-selection");
    const modal = document.getElementById("confirmation-modal");
    const modalCandidateInfo = document.getElementById("modal-candidate-info");
    const modalBackButton = document.getElementById("modal-back-btn");
    const modalConfirmButton = document.getElementById("modal-confirm-btn");

    let selectedCandidate = null;

    // --- 3. FUNCTIONS ---

    function renderCandidates() {
        if (!candidateGrid) {
            console.error("Error: Could not find element with id 'candidate-grid'");
            return;
        }

        candidateGrid.innerHTML = ""; // Clear existing grid
        candidates.forEach(candidate => {
            const card = document.createElement("div");
            card.className = "candidate-card";
            card.dataset.id = candidate.id; // Store candidate ID on the element

            card.innerHTML = `
                <div class="image-wrapper">
                    <span class="candidate-number">${candidate.id}</span>
                    <img src="${candidate.photo}" alt="${candidate.name}">
                </div>
                <div class="name">${candidate.name}</div>
            `;

            // Add click event listener to each card
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

    function showModal() {
        if (!selectedCandidate) return;

        modalCandidateInfo.innerHTML = `
            <img src="${selectedCandidate.photo}" alt="${selectedCandidate.name}">
            <div class="name">${selectedCandidate.name}</div>
        `;
        modal.style.display = "flex";
    }

    function hideModal() {
        modal.style.display = "none";
    }

    function resetSelection() {
        selectedCandidate = null;
        const allCards = document.querySelectorAll(".candidate-card");
        allCards.forEach(card => card.classList.remove("selected"));
        submitButton.disabled = true;
        // hideModal();
    }

    // --- 4. ADD EVENT LISTENERS ---
    submitButton.addEventListener("click", showModal);
    modalBackButton.addEventListener("click", hideModal);
    modalConfirmButton.addEventListener("click", () => {
        // 1. Hide the confirmation modal immediately
        hideModal();

        // 2. Use a 0ms setTimeout. This tells the browser:
        // "Finish hiding the first modal, and then run this next."
        setTimeout(() => {
            // 3. Show the "Thank You" modal
            thankYouModal.style.display = "flex";

            // 4. Set the 2-second timer to hide it and reset
            setTimeout(() => {
                thankYouModal.style.display = "none";
                resetSelection();
            }, 2000); // 2-second display
        }, 0); // 0ms delay to run in the next browser task
    });
    
    // --- 5. INITIALIZE ---
    renderCandidates();
    console.log("Candidate script loaded and executed."); // Check for this in the console
});