chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const video = document.querySelector('video');
    if (request.action === "pause") {
      if (video && !video.paused) {
        video.pause();
      }
    } else if (request.action === "checkVisibility") {
      if (document.visibilityState === "visible" && video && video.paused) {
        video.play();
      } else if (document.visibilityState === "hidden" && video && !video.paused) {
        video.pause();
      }
    }
  });
  
  document.addEventListener("visibilitychange", () => {
    const video = document.querySelector('video');
    if (document.visibilityState === "visible") {
      if (video && video.paused) {
        video.play();
      }
    } else if (document.visibilityState === "hidden") {
      if (video && !video.paused) {
        video.pause();
      }
    }
  });
  