const pageSelect = document.querySelector('[data-page-select]');
pageSelect?.addEventListener('change', () => {
  document.getElementById(pageSelect.value)?.scrollIntoView({ behavior: 'instant', block: 'start' });
});
document.querySelector('[data-plan-zoom]')?.addEventListener('click', event => {
  const expanded = document.querySelector('.plan-document').classList.toggle('is-expanded');
  event.currentTarget.setAttribute('aria-pressed', String(expanded));
  event.currentTarget.textContent = expanded ? '화면에 맞추기' : '크게 보기';
});

const pptViewer = document.querySelector('[data-ppt-viewer]');
if (pptViewer) {
  const content = pptViewer.querySelector('.ppt-content');
  const stage = content.querySelector('.ppt-stage');
  const strip = content.querySelector('.ppt-thumbnails');
  const thumbnails = [...strip.querySelectorAll('.ppt-thumbnail')];
  const counter = pptViewer.querySelector('[data-ppt-count]');
  const previous = content.querySelector('[data-ppt-prev]');
  const next = content.querySelector('[data-ppt-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const last = thumbnails.length - 1;
  let current = 0;
  let lastWheel = -Infinity;

  function showSlide(index, animate = false) {
    const target = Math.max(0, Math.min(last, index));
    stage.scrollTo({
      left: target * stage.clientWidth,
      behavior: animate && !reduceMotion.matches ? 'smooth' : 'instant',
    });
    return target;
  }

  stage.addEventListener('scroll', () => {
    const index = Math.max(0, Math.min(last, Math.round(stage.scrollLeft / stage.clientWidth)));
    if (index === current) return;
    thumbnails[current].removeAttribute('aria-current');
    current = index;
    const thumbnail = thumbnails[current];
    thumbnail.setAttribute('aria-current', 'true');
    counter.textContent = `슬라이드 ${current + 1} / ${thumbnails.length}`;
    previous.disabled = current === 0;
    next.disabled = current === last;

    const item = thumbnail.getBoundingClientRect();
    const rail = strip.getBoundingClientRect();
    if (item.left < rail.left || item.right > rail.right) {
      strip.scrollLeft += item.left - rail.left - (rail.width - item.width) / 2;
    }
  }, { passive: true });

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      showSlide(index);
    });
  });
  previous.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current + 1));

  content.addEventListener('wheel', event => {
    if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const index = current + Math.sign(event.deltaY);
    if (index < 0 || index > last) return;
    event.preventDefault();
    if (event.timeStamp - lastWheel < 250) return;
    lastWheel = event.timeStamp;
    showSlide(index, true);
  }, { passive: false });

  content.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const targets = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: last };
    if (!Object.hasOwn(targets, event.key)) return;
    event.preventDefault();
    const target = showSlide(targets[event.key]);
    if (event.target.matches('.ppt-thumbnail')) thumbnails[target].focus({ preventScroll: true });
  });
}

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
  const fullCaption = photoDialog.querySelector('[data-photo-caption]');
  let current = 0;
  const showPhoto = index => {
    current = (index + photos.length) % photos.length;
    const source = photos[current].querySelector('img');
    full.src = photos[current].href;
    full.alt = source.alt;
    const caption = photos[current].querySelector('figcaption');
    if (caption.querySelector('[data-photo-subject]')) {
      fullCaption.replaceChildren(...caption.cloneNode(true).childNodes);
    } else {
      fullCaption.textContent = source.alt;
    }
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
