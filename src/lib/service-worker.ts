/**
 * Service Worker registration
 */

export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  // Register immediately, don't wait for load event
  navigator.serviceWorker
    .register("/sw.js", {
      scope: "/",
    })
    .then((registration) => {
      console.log("Service Worker registered:", registration.scope);

      // Check for updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("New service worker available");
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

