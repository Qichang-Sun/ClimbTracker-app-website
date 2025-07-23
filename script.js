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
});