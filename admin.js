document.addEventListener("DOMContentLoaded", () => {
    
    // Data kandidat harus konsisten dengan script.js
    // Dalam aplikasi nyata, ini mungkin berasal dari satu sumber data yang sama
    const candidates = [
        { id: 1, name: "Nanas", photo: "img/1.jpg" },
        { id: 2, name: "Jeruk", photo: "img/2.avif" },
        { id: 3, name: "Strawberry", photo: "img/3.jpg" },
        { id: 4, name: "Semangka", photo: "img/5.jpg" }
    ];

    const resultsContainer = document.getElementById("results-container");
    const resetButton = document.getElementById("reset-button");

    function renderResults() {
        // 1. Ambil data suara dari localStorage
        const votes = JSON.parse(localStorage.getItem("kuwuVotes")) || {};
        
        // 2. Kosongkan kontainer hasil
        resultsContainer.innerHTML = "";

        let totalVotes = 0;
        
        // Hitung total suara tertinggi untuk persentase bar
        const voteCounts = Object.values(votes);
        const maxVotes = voteCounts.length > 0 ? Math.max(...voteCounts) : 1;

        // 3. Buat elemen untuk setiap kandidat
        candidates.forEach(candidate => {
            const voteCount = votes[candidate.id] || 0;
            totalVotes += voteCount;
            
            // Hitung persentase untuk lebar bar
            const barPercentage = (voteCount / maxVotes) * 100;

            const resultItem = document.createElement("div");
            resultItem.className = "result-item";
            
            resultItem.innerHTML = `
                <img src="${candidate.photo}" alt="${candidate.name}" class="candidate-img">
                <div class="candidate-info">
                    <span class="name">${candidate.name} (ID: ${candidate.id})</span>
                    <span class="votes">${voteCount} Suara</span>
                </div>
                <div class="bar-wrapper">
                    <div class="bar" style="width: ${barPercentage}%"></div>
                </div>
            `;
            
            resultsContainer.appendChild(resultItem);
        });

        // Tampilkan total suara
        const totalElement = document.createElement("div");
        totalElement.className = "total-votes";
        totalElement.textContent = `Total Semua Suara: ${totalVotes}`;
        resultsContainer.prepend(totalElement); // Tampilkan di paling atas
    }

    function handleResetVotes() {
        // Konfirmasi sebelum menghapus
        const isConfirmed = confirm("Apakah Anda yakin ingin mereset semua data suara? Tindakan ini tidak dapat dibatalkan.");
        
        if (isConfirmed) {
            // Hapus data dari localStorage
            localStorage.removeItem("kuwuVotes");
            
            // Render ulang hasil (yang sekarang akan menjadi 0 semua)
            renderResults();
            
            alert("Semua data suara telah direset.");
        }
    }

    // Tambahkan event listener ke tombol reset
    resetButton.addEventListener("click", handleResetVotes);

    // Render hasil saat halaman pertama kali dimuat
    renderResults();

    // --- PENAMBAHAN UNTUK PEMBARUAN OTOMATIS ---
    /**
     * Mendengarkan perubahan 'storage'.
     * Ini akan terpicu ketika tab lain (index.html) memodifikasi localStorage.
     */
    window.addEventListener('storage', (event) => {
        // Periksa apakah data yang berubah adalah 'kuwuVotes'
        if (event.key === 'kuwuVotes') {
            console.log("Mendeteksi perubahan suara... Memperbarui hasil.");
            // Jika ya, render ulang hasil di halaman admin
            renderResults();
        }
    });
    // --- AKHIR DARI PENAMBAHAN ---

});