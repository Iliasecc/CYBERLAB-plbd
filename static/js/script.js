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



function toggleFullScreen(sectionClass) {
    var section = document.querySelector('.' + sectionClass);
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
        section.classList.add('fullscreen-mode'); // Ajoute la classe fullscreen-mode lorsque le mode plein écran est activé
    } else {
        document.exitFullscreen();
        section.classList.remove('fullscreen-mode'); // Supprime la classe fullscreen-mode lorsque le mode plein écran est désactivé
    }
}








// Assurez-vous que le script est exécuté après le chargement du document
document.addEventListener("DOMContentLoaded", function() {
    // Vous pouvez ajouter d'autres initialisations ici si nécessaire
});


function openImageModal(imageSrc) {
    var modalImage = document.getElementById('modal-image');
    modalImage.src = imageSrc;

    var overlay = document.getElementById('image-overlay');
    overlay.style.display = 'flex';

}

function closeImageModal() {
    var overlay = document.getElementById('image-overlay');
    overlay.style.display = 'none';
}
function openVideoModal(videoSrc) {
    var videoPlayer = document.getElementById('video-player');
    videoPlayer.src = videoSrc;
    
    var videoOverlay = document.getElementById('video-overlay');
    videoOverlay.style.display = 'flex';
    
    videoPlayer.style.width = '50%'; // Par exemple, vous pouvez définir la largeur à 50%
    videoPlayer.style.height = 'auto'; 
}

function closeVideoModal() {
    var videoPlayer = document.getElementById('video-player');
    videoPlayer.pause();
    
    var videoOverlay = document.getElementById('video-overlay');
    videoOverlay.style.display = 'none';
}

// Ajoutez ce script pour gérer l'affichage/masquage de la zone de code

// Modifier la taille initiale de CodeMirror dans votre script.js
// Utiliser CodeMirror pour la nouvelle zone de texte
function toggleCodeSection() {
    var codeSection = document.getElementById("codeSection");

    // Toggle la visibilité de la zone de code
    codeSection.style.display = (codeSection.style.display === "none" || codeSection.style.display === "") ? "block" : "none";

    // Rafraîchir l'éditeur CodeMirror lorsqu'il devient visible
    if (codeSection.style.display === "block") {
        pythonEditor.refresh();
    }
}
var pythonEditor = CodeMirror.fromTextArea(document.getElementById("pythonEditor"), {
    mode: "text/x-python",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
});

var widthPython = window.innerWidth;
var outputPython = document.getElementById("outputPython");
var runPython = document.getElementById("runPython");

pythonEditor.setSize(0.7 * widthPython, "150");

runPython.addEventListener("click", async function () {
    try {
        var codePython = {
            code: pythonEditor.getValue(),
            lang: "Python"
        };

        console.log(codePython);

        var oDataPython = await fetch("http://127.0.0.1:3000/indexx.html", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(codePython)
        });

        var dPython = await oDataPython.json();
        
        // Afficher la sortie ou l'erreur dans la zone de sortie
        if (dPython.output) {
            outputPython.value = dPython.output;
        } else if (dPython.error) {
            outputPython.value = "Erreur : " + dPython.error;
        }
    } catch (error) {
        console.error("Erreur lors de l'exécution du code :", error);
        outputPython.value = "Erreur inattendue lors de l'exécution.";
    }
});

function submitQuiz() {
    var quizForm = document.getElementById('quizForm');
    var userAnswers = [];
    for (var i = 0; i < quizForm.elements.length; i++) {
        var element = quizForm.elements[i];
        if (element.type === 'radio' && element.checked) {
            userAnswers.push(element.value);
        }
    }

    var correctAnswers = ['a', 'a', 'c', 'c', 'b']; // Réponses correctes pour chaque question
    var score = 0;
    for (var j = 0; j < userAnswers.length; j++) {
        if (userAnswers[j] === correctAnswers[j]) {
            score++;
        }
    }
    if (document.fullscreenElement) {
        // Quitter le mode plein écran
        toggleFullScreen('results-section');
        // Définir l'arrière-plan à blanc
        var resultsSection = document.querySelector('.results-section');
        resultsSection.style.backgroundColor = 'white';
    }
    var resultsMessage;
    if (score < 4) {
        resultsMessage = "😕 Dommage ! Vous devez obtenir au moins 4 bonnes réponses pour valider votre TP. Veuillez retenter votre chance.";
        showResultsMessage(resultsMessage, 'red');
    } else {
        resultsMessage = "🎉 Excellent travail ! Vous avez obtenu " + score + " bonnes réponses. Il ne vous reste plus qu'à déposer votre compte rendu.";
        showResultsMessage(resultsMessage, 'green');
        animateCelebration();
    }
    if (score >= 4) {
    // Afficher la zone de dépôt de PDF
    document.querySelector('form[action="/submit"]').style.display = 'block';
    document.querySelector('.results-section').style.display = 'none';
    document.getElementById('aiResponse').style.display = 'block';

}

}

function showResultsMessage(message, color) {
    var resultsPopup = document.createElement('div');
    resultsPopup.classList.add('results-popup');
    resultsPopup.style.backgroundColor = color;

    var messageElement = document.createElement('p');
    messageElement.textContent = message;
    resultsPopup.appendChild(messageElement);

    var okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.style.color = color === 'red' ? 'red' : 'green'; // Définir la couleur du bouton OK
    okButton.style.fontSize = '16px'; // Diminuer la taille de la police du bouton OK
    okButton.style.padding = '5px 10px'; // Ajouter un peu de rembourrage au bouton OK
    okButton.style.border = 'none'; // Supprimer la bordure du bouton OK
    okButton.style.borderRadius = '5px'; // Ajouter une bordure arrondie au bouton OK
    okButton.style.cursor = 'pointer'; // Changer le curseur lorsque survolé
    okButton.addEventListener('click', function() {
        resultsPopup.remove();
    });
    resultsPopup.appendChild(okButton);

    document.body.appendChild(resultsPopup);
}




function animateCelebration() {
    var celebration = document.createElement('div');
    celebration.classList.add('celebration');
    document.body.appendChild(celebration);
    for (var i = 0; i < 300; i++) {
        var confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        celebration.appendChild(confetti);
    }
    setTimeout(function() {
        celebration.remove();
    }, 5000);
}




// Modifiez cette fonction dans votre fichier script.js


let videoStream; // Déclarer une variable pour stocker le flux vidéo

document.getElementById('startLiveVideoButton').addEventListener('click', function() {
    var videoElement = document.getElementById('liveVideo');
    
    // Vérifier si le flux vidéo est déjà en cours
    if (videoStream && !videoStream.paused) {
        // Si c'est le cas, arrêtez le flux vidéo
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
        videoElement.srcObject = null; // Assurez-vous de vider la source vidéo
    } else {
        // Si ce n'est pas le cas, accédez au flux vidéo de la caméra de la Raspberry Pi
        fetch('http://192.168.1.100:5000') // Modifiez l'URL en fonction de votre serveur
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération du flux vidéo');
                }
                return response.blob();
            })
            .then(function(blob) {
                // Créez un objet URL à partir du flux vidéo
                const videoUrl = URL.createObjectURL(blob);
                // Mettre le flux vidéo de la caméra de la Raspberry Pi dans la balise vidéo
                videoElement.src = videoUrl;
            })
            .catch(function(error) {
                console.error('Erreur lors de l\'accès au flux vidéo de la caméra de la Raspberry Pi :', error);
            });
    }
});
document.getElementById('fullscreenButton').addEventListener('click', function() {
    var videoElement = document.getElementById('liveVideo');
    
    // Vérifiez si le mode plein écran est pris en charge
    if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Pour Firefox
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Pour Chrome, Safari et Opera
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // Pour Internet Explorer et Edge
        videoElement.msRequestFullscreen();
    }
});



