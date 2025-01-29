document.addEventListener("DOMContentLoaded", function() {
  // Initialisation des variables de jeu
  let bitcoins = 0;
  let ethereums = 0;
  let litecoins = 0;
  let planetIndex = 1;
  let miningPower = 1;

  let btcMachineProgress = 0;
  let ethMachineProgress = 0;
  let maxLevel = 1024;

  let btcMachineCount = 0;
  let ethMachineCount = 0;

  // Sélection des éléments du DOM
  const btcProgressBar = document.getElementById("btcProgressBar");
  const ethProgressBar = document.getElementById("ethProgressBar");
  const btcProgressText = document.getElementById("btcProgressText");
  const ethProgressText = document.getElementById("ethProgressText");
  const buyBTCMachineBtn = document.getElementById("buyBTCMachineBtn");
  const buyETHMachineBtn = document.getElementById("buyETHMachineBtn");
  const miningButton = document.getElementById("miningButton");
  const openMenuBtn = document.getElementById("openMenuBtn");
  const slidingMenu = document.getElementById("slidingMenu");

  const btcDisplay = document.getElementById("bitcoins");
  const planetDisplay = document.getElementById("planet");

  // Mise à jour de l'affichage des cryptos
  function updateCryptoDisplay() {
    btcDisplay.textContent = bitcoins;
  }

  // Fonction pour changer de planète
  function updatePlanetDisplay() {
    planetDisplay.textContent = `Planète actuelle : ${getPlanetName(planetIndex)}`;
  }

  // Fonction pour obtenir le nom de la planète
  function getPlanetName(index) {
    const planets = ['Terre', 'Mars', 'Jupiter', 'Venus', 'Saturne', 'Uranus', 'Neptune', 'Pluton'];
    return planets[index - 1] || 'Inconnue';
  }

  // Action de minage lors du clic sur le bouton de minage
  miningButton.addEventListener("click", () => {
    bitcoins += miningPower;
    updateCryptoDisplay();
    generateParticles();
    // Mise à jour des progressions des machines
    btcMachineProgress += 10;
    ethMachineProgress += 5;
    updateProgressBar(btcMachineProgress, maxLevel, btcProgressBar, btcProgressText);
    updateProgressBar(ethMachineProgress, maxLevel, ethProgressBar, ethProgressText);

    // Activation des boutons d'achat de machines si les conditions sont remplies
    if (bitcoins >= 10 && btcMachineCount < 1024) {
      buyBTCMachineBtn.disabled = false;
    }
    if (bitcoins >= 100 && btcMachineCount >= 5) {
      buyETHMachineBtn.disabled = false;
    }
  });

  // Fonction pour générer des particules
  function generateParticles() {
    const particlesContainer = document.getElementById("particlesContainer");
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particlesContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);  // Supprimer les particules après 1 seconde
    }
  }

  // Mise à jour de la barre de progression
  function updateProgressBar(progress, max, progressBar, progressText) {
    const percentage = (progress / max) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${progress} / ${max}`;
  }

  // Menu déroulant
  if (openMenuBtn && slidingMenu) {
    openMenuBtn.addEventListener("click", function() {
      slidingMenu.classList.toggle("open");
    });
  }

  // Affichage des machines de minage
  document.getElementById("showMachinesBtn").addEventListener("click", function() {
    document.getElementById("machinesContainer").style.display = "block";
    document.getElementById("planetsContainer").style.display = "none";
  });

  // Affichage des planètes
  document.getElementById("showPlanetsBtn").addEventListener("click", function() {
    document.getElementById("planetsContainer").style.display = "block";
    document.getElementById("machinesContainer").style.display = "none";
  });

  // Logique pour les planètes
  document.getElementById("nextPlanetBtn").addEventListener("click", () => {
    if (bitcoins >= planetThresholds[planetIndex]) {
      planetIndex++;
      updatePlanetDisplay();
    }
  });

  // Initialisation de l'affichage du jeu
  updateCryptoDisplay();
  updatePlanetDisplay();
});
