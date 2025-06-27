
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// PWA Install Prompt Handler
let deferredPrompt: any = null;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install prompt available');
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Store the event so it can be triggered later
  deferredPrompt = e;
  
  // Show custom install prompt after a short delay
  setTimeout(() => {
    showInstallPrompt();
  }, 3000); // Show after 3 seconds
});

// Function to show custom install prompt
function showInstallPrompt() {
  if (deferredPrompt && !isAppInstalled()) {
    // Create a simple notification-style prompt
    const installBanner = document.createElement('div');
    installBanner.id = 'pwa-install-banner';
    installBanner.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ec4899;
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        max-width: calc(100vw - 40px);
        width: 100%;
        max-width: 400px;
        text-align: center;
        animation: slideDown 0.3s ease-out;
      ">
        <div style="margin-bottom: 6px; font-size: 16px;">📱 Install Gavi Gadgets App</div>
        <div style="font-size: 12px; opacity: 0.9; margin-bottom: 10px; line-height: 1.3;">Get the full experience with our mobile app!</div>
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
          <button id="install-btn" style="
            background: white;
            color: #ec4899;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            font-size: 12px;
            min-width: 80px;
            flex: 1;
            max-width: 120px;
          ">Install Now</button>
          <button id="dismiss-btn" style="
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            font-size: 12px;
            min-width: 60px;
            flex: 1;
            max-width: 80px;
          ">Later</button>
        </div>
      </div>
      <style>
        @keyframes slideDown {
          from { transform: translate(-50%, -100%); opacity: 0; }
          to { transform: translateX(-50%); opacity: 1; }
        }
        @media (max-width: 640px) {
          #pwa-install-banner > div {
            padding: 10px 12px !important;
            font-size: 13px !important;
          }
          #pwa-install-banner > div > div:first-child {
            font-size: 14px !important;
          }
          #pwa-install-banner button {
            font-size: 11px !important;
            padding: 6px 12px !important;
          }
        }
      </style>
    `;

    document.body.appendChild(installBanner);

    // Handle install button click
    document.getElementById('install-btn')?.addEventListener('click', async () => {
      if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the deferred prompt
        deferredPrompt = null;
      }
      
      // Remove the banner
      document.getElementById('pwa-install-banner')?.remove();
    });

    // Handle dismiss button click
    document.getElementById('dismiss-btn')?.addEventListener('click', () => {
      document.getElementById('pwa-install-banner')?.remove();
      // Store that user dismissed it (optional - prevents showing again for this session)
      sessionStorage.setItem('installPromptDismissed', 'true');
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      document.getElementById('pwa-install-banner')?.remove();
    }, 10000);
  }
}

// Check if app is already installed
function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true ||
         sessionStorage.getItem('installPromptDismissed') === 'true';
}

// Handle successful app installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed successfully');
  deferredPrompt = null;
  
  // Show success message
  const successBanner = document.createElement('div');
  successBanner.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
    ">
      ✅ App installed successfully!
    </div>
  `;
  
  document.body.appendChild(successBanner);
  
  setTimeout(() => {
    successBanner.remove();
  }, 3000);
});

createRoot(document.getElementById("root")!).render(<App />);
