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
    // TODO: Implémenter la logique pour aller sur le tableau de bord.
}

function viewProfile() {
    // TODO: Implémenter la logique pour afficher le profil.
}

function downloadResults() {
    // TODO: Implémenter la logique pour télécharger les résultats.
}

function submitReport() {
    // TODO: Implémenter la logique pour déposer un compte rendu.
}

function logout() {
    // TODO: Implémenter la logique pour se déconnecter.
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



