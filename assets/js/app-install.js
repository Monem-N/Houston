/**
 * Houston 2025 Guide - App Installation
 * Handles PWA installation prompts and offline functionality
 */

// Helper function to check if passive event listeners are supported
const isPassiveSupported = () => {
  let passive = false;
  try {
    const options = Object.defineProperty({}, "passive", {
      get: function() {
        passive = true;
        return true;
      }
    });
    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {}
  return passive;
};

// Get passive option based on browser support
const passiveOption = isPassiveSupported() ? { passive: true } : false;
const nonPassiveOption = isPassiveSupported() ? { passive: false } : false;

let deferredPrompt;
const installButton = document.getElementById('install-app');
const offlineIndicator = document.getElementById('offline-indicator');

// Hide the install button initially
if (installButton) {
  installButton.style.display = 'none';
}

// Check if the app is already installed
if (window.matchMedia('(display-mode: standalone)').matches || 
    window.navigator.standalone === true) {
  // App is already installed, no need to show the install button
  console.log('App is already installed');
  
  // Maybe show a different message or UI element
  const appStatusElement = document.getElementById('app-status');
  if (appStatusElement) {
    appStatusElement.textContent = 'Application installée';
    appStatusElement.classList.add('installed');
  }
}

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the install button
  if (installButton) {
    installButton.style.display = 'flex';
    
    // Add click handler for the install button
    installButton.addEventListener('click', async () => {
      // Hide the install button
      installButton.style.display = 'none';
      
      // Show the installation prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      // Log the outcome
      console.log(`User response to the install prompt: ${outcome}`);
      
      // We no longer need the prompt
      deferredPrompt = null;
      
      // If the user accepted, maybe show a thank you message
      if (outcome === 'accepted') {
        const appStatusElement = document.getElementById('app-status');
        if (appStatusElement) {
          appStatusElement.textContent = 'Merci d\'avoir installé notre application!';
          appStatusElement.classList.add('installed');
          
          // Hide the message after 5 seconds
          setTimeout(() => {
            appStatusElement.style.display = 'none';
          }, 5000);
        }
      }
    }, passiveOption);
  }
}, nonPassiveOption); // Non-passive because we're calling preventDefault()

// Listen for the appinstalled event
window.addEventListener('appinstalled', (e) => {
  // Log the installation
  console.log('Application installée avec succès');
  
  // Hide the install button if it's still showing
  if (installButton) {
    installButton.style.display = 'none';
  }
  
  // Maybe show a thank you message
  const appStatusElement = document.getElementById('app-status');
  if (appStatusElement) {
    appStatusElement.textContent = 'Application installée avec succès!';
    appStatusElement.classList.add('installed');
    
    // Hide the message after 5 seconds
    setTimeout(() => {
      appStatusElement.style.display = 'none';
    }, 5000);
  }
}, passiveOption);

// Monitor the online/offline status
window.addEventListener('online', updateOfflineStatus, passiveOption);
window.addEventListener('offline', updateOfflineStatus, passiveOption);

// Update the offline status indicator
function updateOfflineStatus() {
  if (!offlineIndicator) return;
  
  if (navigator.onLine) {
    offlineIndicator.style.display = 'none';
  } else {
    offlineIndicator.style.display = 'block';
    offlineIndicator.textContent = 'Mode hors ligne - Contenu disponible localement';
  }
}

// Check the initial offline status
document.addEventListener('DOMContentLoaded', () => {
  updateOfflineStatus();
  
  // Check if service worker is registered
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      console.log('Service Worker prêt avec scope: ', registration.scope);
      
      // Maybe update UI to show that offline mode is available
      const offlineStatusElement = document.getElementById('offline-status');
      if (offlineStatusElement) {
        offlineStatusElement.textContent = 'Disponible hors ligne';
        offlineStatusElement.classList.add('available');
      }
    });
  }
}, passiveOption);
