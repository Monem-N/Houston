/**
 * Houston 2025 - Image Optimizer
 * Optimizes images for better performance and responsiveness
 */

document.addEventListener('DOMContentLoaded', function() {
  // Convert images to WebP format where supported
  checkWebPSupport().then(supportsWebP => {
    if (supportsWebP) {
      convertImagesToWebP();
    }
  });

  // Enhance lazy loading
  enhanceLazyLoading();
  
  // Add responsive image attributes
  makeImagesResponsive();
});

/**
 * Check if browser supports WebP format
 * @returns {Promise<boolean>} Whether WebP is supported
 */
function checkWebPSupport() {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = () => resolve(true);
    webP.onerror = () => resolve(false);
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
  });
}

/**
 * Convert JPG/PNG images to WebP format where supported
 */
function convertImagesToWebP() {
  const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
  
  images.forEach(img => {
    // Skip images that already have srcset
    if (img.hasAttribute('srcset')) return;
    
    const src = img.getAttribute('src');
    if (!src) return;
    
    // Convert to WebP path
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    // Create srcset with both formats for fallback
    img.setAttribute('srcset', `${webpSrc} 1x, ${src} 1x`);
    img.setAttribute('onerror', `this.srcset=''; this.src='${src}';`);
  });
}

/**
 * Enhance lazy loading implementation
 */
function enhanceLazyLoading() {
  // Use Intersection Observer for better lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img:not([loading])');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Set loading attribute if not present
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
          
          // Load image from data-src if present
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px', // Start loading when image is 200px from viewport
      threshold: 0.01
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('img:not([loading])').forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }
}

/**
 * Add responsive image attributes
 */
function makeImagesResponsive() {
  const images = document.querySelectorAll('img:not(.logo):not(.icon)');
  
  images.forEach(img => {
    // Skip images that already have sizes or srcset
    if (img.hasAttribute('sizes') || img.hasAttribute('srcset')) return;
    
    // Add sizes attribute for responsive images
    img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px');
    
    // Add width and height if missing to prevent layout shifts
    if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
      img.setAttribute('width', 'auto');
      img.setAttribute('height', 'auto');
    }
  });
}
