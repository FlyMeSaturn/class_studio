const pageSelect = document.querySelector('[data-page-select]');
pageSelect?.addEventListener('change', () => {
  document.getElementById(pageSelect.value)?.scrollIntoView({ behavior: 'instant', block: 'start' });
});
document.querySelector('[data-plan-zoom]')?.addEventListener('click', event => {
  const expanded = document.querySelector('.plan-document').classList.toggle('is-expanded');
  event.currentTarget.setAttribute('aria-pressed', String(expanded));
  event.currentTarget.textContent = expanded ? '화면에 맞추기' : '크게 보기';
});

const songDialog = document.querySelector('.song-dialog');
if (songDialog && typeof songDialog.showModal === 'function') {
  const player = songDialog.querySelector('video');
  const title = songDialog.querySelector('h2');
  for (const card of document.querySelectorAll('[data-video-title]')) {
    card.setAttribute('aria-haspopup', 'dialog');
    card.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      title.textContent = card.dataset.videoTitle;
      if (!songDialog.open) songDialog.showModal();
      player.poster = card.querySelector('img').src;
      player.src = card.href;
      player.play().catch(() => {}); // Native controls remain available when autoplay is blocked.
    });
  }
  songDialog.querySelector('[data-video-close]').addEventListener('click', () => songDialog.close());
  songDialog.addEventListener('click', event => {
    if (event.target === songDialog) songDialog.close();
  });
  songDialog.addEventListener('close', () => {
    if (songDialog.open) return;
    player.pause();
    player.removeAttribute('src');
    player.removeAttribute('poster');
    player.load();
  });
}

const photoDialog = document.querySelector('.photo-dialog');
if (photoDialog && typeof photoDialog.showModal === 'function') {
  const photos = [...document.querySelectorAll('[data-photo-index]')];
  const full = photoDialog.querySelector('[data-photo-full]');
  let current = 0;
  const showPhoto = index => {
    current = (index + photos.length) % photos.length;
    const source = photos[current].querySelector('img');
    full.src = photos[current].href;
    full.alt = source.alt;
    photoDialog.querySelector('[data-photo-caption]').textContent = source.alt;
    photoDialog.querySelector('[data-photo-counter]').textContent = `${current + 1} / ${photos.length}`;
  };
  photos.forEach((link, index) => link.addEventListener('click', event => {
    event.preventDefault(); showPhoto(index); photoDialog.showModal();
  }));
  photoDialog.querySelector('[data-photo-close]').addEventListener('click', () => photoDialog.close());
  photoDialog.querySelector('[data-photo-prev]').addEventListener('click', () => showPhoto(current - 1));
  photoDialog.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(current + 1));
  photoDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); }
  });
  photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
}
