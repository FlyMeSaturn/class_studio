const header = document.querySelector('.home-header');
if (header) {
  const hero = document.querySelector('.hero');
  const libraryLink = header.querySelector('[data-nav="library"]');
  let queued = false;
  const updateHeader = () => {
    const inLibrary = hero.getBoundingClientRect().bottom <= header.offsetHeight;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    if (inLibrary) libraryLink.setAttribute('aria-current', 'location');
    else libraryLink.removeAttribute('aria-current');
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  window.addEventListener('resize', updateHeader);
  updateHeader();
}
