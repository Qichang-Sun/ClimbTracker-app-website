document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const screenshotLinks = document.querySelectorAll('.screenshot-link');
  const closeButton = document.querySelector('.close-button');

  screenshotLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      lightboxImg.src = link.href;
      lightbox.style.display = 'flex';
    });
  });

  const closeModal = () => {
    lightbox.style.display = 'none';
  }

  closeButton.addEventListener('click', closeModal);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeModal();
    }
  });

  // Download Counter
  const downloadButton = document.querySelector('.download-button');
  const downloadCountSpan = document.getElementById('download-count');

  const namespace = 'climbtracker-website';
  const key = 'apk-downloads';

  // Function to get the download count
  function getDownloadCount() {
    fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
      .then(response => response.json())
      .then(data => {
        downloadCountSpan.textContent = data.value || 0;
      })
      .catch(error => {
        console.error('Error fetching download count:', error);
        downloadCountSpan.textContent = 'N/A';
      });
  }

  // Function to increment the download count
  function incrementDownloadCount() {
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
      .then(response => response.json())
      .then(data => {
        downloadCountSpan.textContent = data.value;
      })
      .catch(error => console.error('Error updating download count:', error));
  }

  // Add event listener to the download button
  if (downloadButton) {
    downloadButton.addEventListener('click', (e) => {
      // Prevent the default link behavior to ensure the script runs
      e.preventDefault();
      
      // Increment the count via the API
      incrementDownloadCount();

      // Redirect to the download link after a short delay to allow the API call to complete
      setTimeout(() => {
        window.location.href = downloadButton.href;
      }, 300);
    });
  }

  // Initial fetch of the download count
  getDownloadCount();
});