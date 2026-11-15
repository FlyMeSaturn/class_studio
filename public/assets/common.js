document.querySelector('[data-share]')?.addEventListener('click',async()=>{
  const status=document.querySelector('.share-status');
  try {
    await navigator.clipboard.writeText(location.href.split('#')[0]);
    status.textContent='수업 주소를 복사했습니다.';
  } catch {
    const fallback=document.querySelector('.share-fallback');
    fallback.hidden=false;
    const input=fallback.querySelector('input');input.value=location.href.split('#')[0];input.focus();input.select();
    status.textContent='주소를 선택했습니다. 복사하여 공유해 주세요.';
  }
});

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
