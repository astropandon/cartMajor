document.addEventListener('DOMContentLoaded', () => {
    // Champs du formulaire
    const nameInput = document.getElementById('nameInput');
    const titleInput = document.getElementById('titleInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const addressInput = document.getElementById('addressInput');
    const websiteInput = document.getElementById('websiteInput');
    const imageInput = document.getElementById('imageInput');
    const downloadBtn = document.getElementById('downloadImageBtn');
    const cardElement = document.getElementById('businessCard');

    // Éléments de la carte de visite
    const cardName = document.getElementById('cardName');
    const cardTitle = document.getElementById('cardTitle');
    const cardEmail = document.getElementById('cardEmail');
    const cardPhone = document.getElementById('cardPhone');
    const cardAddress = document.getElementById('cardAddress');
    const cardWebsite = document.getElementById('cardWebsite');
    const cardProfilePic = document.getElementById('cardProfilePic');

    // Fonction pour mettre à jour la carte avec les textes par défaut
    const updateCard = () => {
        cardName.textContent = nameInput.value || 'Nom Complet';
        cardTitle.textContent = titleInput.value || 'Profession';
        cardEmail.textContent = emailInput.value || 'email@exemple.com';
        cardPhone.textContent = phoneInput.value || '06 12 34 56 78';
        cardAddress.textContent = addressInput.value || 'Adresse';
        cardWebsite.textContent = websiteInput.value || 'www.exemple.com';
    };

    // Écouteurs d'événements pour les champs de texte
    [nameInput, titleInput, emailInput, phoneInput, addressInput, websiteInput].forEach(input => {
        input.addEventListener('input', updateCard);
    });

    // Écouteur d'événement pour le champ d'image
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                cardProfilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Écouteur d'événement pour le bouton de téléchargement d'image
    downloadBtn.addEventListener('click', () => {
        html2canvas(cardElement, {
            scale: 4, // Échelle plus élevée pour une meilleure qualité
            useCORS: true 
        }).then(canvas => {
            // Convertit le canvas en une URL de données d'image
            const imageData = canvas.toDataURL('image/png');

            // Crée un lien temporaire pour déclencher le téléchargement
            const link = document.createElement('a');
            const filename = `carte-${nameInput.value.trim() || 'utilisateur'}.png`;
            link.href = imageData;
            link.download = filename;
            
            // Déclenche le téléchargement
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

    // Met à jour la carte au chargement initial
    updateCard();
});