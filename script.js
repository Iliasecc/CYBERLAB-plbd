function toggleHamburgerMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    hamburgerMenu.style.display = hamburgerMenu.style.display === 'none' ? 'block' : 'none';
}
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

