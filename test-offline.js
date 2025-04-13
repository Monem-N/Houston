/**
 * Test script for offline functionality
 * 
 * This script tests if the service worker is properly caching files
 * and if the website works offline.
 * 
 * How to use:
 * 1. Open the website in Chrome
 * 2. Open Chrome DevTools (F12)
 * 3. Go to Application tab
 * 4. In the sidebar, click on "Service Workers"
 * 5. Check if the service worker is registered
 * 6. Click on "Offline" checkbox to simulate offline mode
 * 7. Refresh the page to see if it loads from cache
 * 8. Check if the offline indicator appears
 * 9. Navigate to different pages to verify they work offline
 * 10. Uncheck "Offline" to return to online mode
 */

// Function to test if service worker is registered
function testServiceWorkerRegistration() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        console.log('✅ Service Worker is registered');
        console.log('Scope:', registration.scope);
        return true;
      } else {
        console.error('❌ Service Worker is NOT registered');
        return false;
      }
    });
  } else {
    console.error('❌ Service Worker is not supported in this browser');
    return false;
  }
}

// Function to test if cache is populated
async function testCache() {
  if ('caches' in window) {
    try {
      const cache = await caches.open('houston-guide-v1');
      const keys = await cache.keys();
      console.log(`✅ Cache contains ${keys.length} items`);
      
      // Log a few cached items
      console.log('Sample cached items:');
      for (let i = 0; i < Math.min(5, keys.length); i++) {
        console.log(`- ${keys[i].url}`);
      }
      
      return keys.length > 0;
    } catch (error) {
      console.error('❌ Error accessing cache:', error);
      return false;
    }
  } else {
    console.error('❌ Cache API is not supported in this browser');
    return false;
  }
}

// Function to test offline indicator
function testOfflineIndicator() {
  const offlineIndicator = document.getElementById('offline-indicator');
  if (!offlineIndicator) {
    console.error('❌ Offline indicator element not found');
    return false;
  }
  
  // Check if the indicator is visible when offline
  if (!navigator.onLine && window.getComputedStyle(offlineIndicator).display !== 'none') {
    console.log('✅ Offline indicator is visible when offline');
    return true;
  } else if (navigator.onLine && window.getComputedStyle(offlineIndicator).display === 'none') {
    console.log('✅ Offline indicator is hidden when online');
    return true;
  } else {
    console.error('❌ Offline indicator is not working correctly');
    return false;
  }
}

// Function to run all tests
async function runTests() {
  console.log('🔍 Running offline functionality tests...');
  
  const swRegistered = testServiceWorkerRegistration();
  const cachePopulated = await testCache();
  const indicatorWorking = testOfflineIndicator();
  
  if (swRegistered && cachePopulated && indicatorWorking) {
    console.log('✅ All tests passed! The website should work offline.');
  } else {
    console.log('❌ Some tests failed. Check the issues above.');
  }
}

// Run tests when the page is loaded
window.addEventListener('load', runTests);

// Instructions for manual testing
console.log(`
📋 Manual Testing Instructions:
1. Open Chrome DevTools (F12)
2. Go to Application tab
3. In the sidebar, click on "Service Workers"
4. Check if the service worker is registered
5. Click on "Offline" checkbox to simulate offline mode
6. Refresh the page to see if it loads from cache
7. Check if the offline indicator appears
8. Navigate to different pages to verify they work offline
9. Uncheck "Offline" to return to online mode
`);
