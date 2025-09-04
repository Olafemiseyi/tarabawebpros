/**
 * Floating Action Button (Scroll Top and WhatsApp)
 */
const actionButton = document.querySelector('#action-button');
const scrollIcon = document.querySelector('.scroll-icon');
if (actionButton && scrollIcon) {
  // Toggle sub-icons and main icon
  actionButton.addEventListener('click', (e) => {
    if (e.target.closest('.main-icon')) {
      e.stopPropagation();
      actionButton.classList.toggle('active');
    }
  });

  // Scroll to top
  scrollIcon.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    actionButton.classList.remove('active');
  });

  // Hide scroll icon when at top
  function toggleScrollIcon() {
    if (window.scrollY <= 100) {
      scrollIcon.classList.add('hidden');
    } else {
      scrollIcon.classList.remove('hidden');
    }
  }
  window.addEventListener('scroll', toggleScrollIcon);
  window.addEventListener('load', toggleScrollIcon);
} else {
  console.error('Action button (#action-button) or scroll icon (.scroll-icon) not found');
}