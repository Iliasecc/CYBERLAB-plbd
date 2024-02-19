


document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener('click', () => {
        // Toggle the 'open' class on navLinks
        navLinks.classList.toggle("open");

        // Toggle the 'fade' class on each link
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        // Toggle the 'toggle' class on hamburger
        hamburger.classList.toggle("toggle");
    });
});


function activateChatbot() {
    // Afficher la zone de discussion
    document.getElementById('chatbot-popup').style.display = 'block';
}

function toggleChatbot() {
    var popup = document.getElementById("chatbot-popup");
    var icon = document.getElementById("icon");

    // Toggle la visibilité de la popup
    popup.style.display = (popup.style.display === "none" || popup.style.display === "") ? "block" : "none";

    // Toggle la classe pour changer l'icône de cercle à X
    icon.classList.toggle("to-x");
}



function goToDashboard() {
    window.location.href = "index.html";
}

function viewProfile() {
    window.location.href = "profile.html";
}

function submitReportBtn() {
    window.location.href = "submit.html"
}
document.addEventListener("DOMContentLoaded", function () {
    const pdfInput = document.getElementById("pdfInput");
    const pdfContainer = document.getElementById("pdfContainer");

    // Chargez le PDF précédemment enregistré depuis le stockage local
    const savedPdf8 = localStorage.getItem("savedPdf8");

    if (savedPdf8) {
        displayPdf(savedPdf8);
    } else {
        showSubmitPdfBtn();
    }

    function displayPdf(pdfUrl) {
        const pdfEmbed = document.createElement("embed");
        pdfEmbed.src = pdfUrl;
        pdfEmbed.type = "application/pdf";
        pdfEmbed.width = "100%";
        pdfEmbed.height = "500px";

        pdfContainer.innerHTML = "";
        pdfContainer.appendChild(pdfEmbed);

        // Ajoutez un bouton de suppression au-dessus du PDF
        const deletePdfIcon = document.createElement("button");
        deletePdfIcon.textContent = "Delete PDF";
        deletePdfIcon.addEventListener("click", deletePdf);

        pdfContainer.appendChild(deletePdfIcon);
    }

    function showSubmitPdfBtn() {
        // Vérifiez si le bouton Soumettre PDF existe et affichez-le
        const submitPdfBtn = document.getElementById("submitPdfBtn");
        if (submitPdfBtn) {
            submitPdfBtn.style.display = "block";
        } else {
            // Si le bouton Soumettre PDF n'existe pas, créez-le et ajoutez un gestionnaire d'événements
            const submitPdfBtn = document.createElement("button");
            submitPdfBtn.id = "submitPdfBtn";
            submitPdfBtn.textContent = "Submit PDF";
            submitPdfBtn.addEventListener("click", submitPdf);

            pdfContainer.appendChild(submitPdfBtn);
        }
    }

    function submitPdf() {
        const file = pdfInput.files[0];

        if (file && file.type === "application/pdf") {
            const reader = new FileReader();

            reader.onload = function (e) {
                const pdfUrl = e.target.result;

                // Enregistrez l'URL du PDF dans le stockage local
                localStorage.setItem("savedPdf8", pdfUrl);

                // Affichez le PDF sur la page
                displayPdf(pdfUrl);
            };

            reader.readAsDataURL(file);
        } else {
            alert("Veuillez sélectionner un fichier PDF valide.");
        }
    }
 
    function deletePdf() {
        // Supprimez le PDF enregistré du stockage local
        localStorage.removeItem("savedPdf8");
    
        // Réaffichez le bouton Soumettre PDF
        window.location.href = "submit.html"
    
        // Supprimez le PDF de la page
        pdfContainer.innerHTML = "";
    }
    
    

    // Ajoutez un gestionnaire d'événements pour le bouton Soumettre PDF
    document.getElementById("submitPdfBtn").addEventListener("click", submitPdf);
});











function logout() {
    window.location.href = "indexxx.html";
}

function changeExperience() {
    // TODO: Implémenter la logique pour changer d'expérience.
}





function sendMessage() {
    // TODO: Implémenter la logique pour envoyer un message dans la zone de chat.
}

function startLiveVideo() {
    // TODO: Implémenter la logique pour démarrer la vidéo en direct.
}

function toggleFullScreen(sectionId) {
    var section = document.querySelector('.' + sectionId);
    var video = section.querySelector('video');

    if (!document.fullscreenElement) {
        if (section.requestFullscreen) {
            section.requestFullscreen().catch(err => {
                console.error(`Erreur lors du passage en mode plein écran pour la section : ${err.message}`);
            });
        }
        if (video.requestFullscreen) {
            video.requestFullscreen().catch(err => {
                console.error(`Erreur lors du passage en mode plein écran pour la vidéo : ${err.message}`);
            });
        }
    } else {
        document.exitFullscreen();
    }
}



