# interface-CYBERLAB
cyberlab-plbd
page d identification : index.html
styless.css
main.js

page d exp1:   indexx.html
styles.css
script.js

page d exp2: index2.html 
styles1.css
script.js

page de profile: profile.html
essay.css
script.js 


page de sumission: submit.html
submit.css
script.js
#pythonCode {
    width: 100%;
    height: 100px;
    overflow-y: auto; /* Permet à la zone de texte de défiler verticalement */
}

window.watsonAssistantChatOptions = {
    integrationID: "d9ab082d-21f9-4d83-bdd0-26d45c408f7c", // The ID of this integration.
    region: "eu-de", // The region your integration is hosted in.
    serviceInstanceID: "c8ac51bc-6630-4efb-ab1a-88f60f4b2d60", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
function logout() {
    window.location.href = "index.html";
}


document.getElementById('startLiveVideoButton').addEventListener('click', function() {
    var videoElement = document.getElementById('liveVideo');
    
    // Vérifier si le flux vidéo est déjà en cours
    if (videoStream && !videoStream.paused) {
        // Si c'est le cas, arrêtez le flux vidéo
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
        videoElement.srcObject = null; // Assurez-vous de vider la source vidéo
    } else {
        // Si ce n'est pas le cas, accédez à la webcam de l'utilisateur
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Mettre le flux vidéo de la webcam dans la balise vidéo
                videoElement.srcObject = stream;
                videoStream = stream; // Stocker le flux vidéo dans la variable
            })
            .catch(function(error) {
                console.error('Erreur lors de l\'accès à la webcam :', error);
            });
    }
});
