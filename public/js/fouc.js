// Helper function
let domReady = (cb) => {
  console.log(document.readyState);
  document.readyState === 'interactive' ||  document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
  // Display body when DOM is loaded
  document.body.style.visibility = 'visible';
});