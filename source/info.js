//info.js

//runs when page is loaded
window.addEventListener("DOMContentLoaded", () => {
    let infoModal = document.getElementById("info-modal");
    let infoBtn = document.getElementById("info-btn");
    let infoSpan = document.getElementById("info-span");

    infoBtn.onclick = function() {
        infoModal.style.display = "block";
    }

    infoSpan.onclick = function() {
        infoModal.style.display = "none";
    }

    window.addEventListener("click", function(event) {
        if (event.target == infoModal) {
            infoModal.style.display = "none";
        }
    });

});

