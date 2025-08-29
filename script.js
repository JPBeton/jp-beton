// Lightbox (čistý JS) pro .lightboxable
(function() {
  const overlay = document.createElement('div');
  overlay.id = 'lightboxOverlay';
  overlay.innerHTML = `
    <button class="lb-close" aria-label="Zavřít">&times;</button>
    <div class="lb-inner">
      <img alt="Náhled">
      <div class="lb-caption"></div>
    </div>`;
  document.body.appendChild(overlay);
  const imgEl = overlay.querySelector('img');
  const capEl = overlay.querySelector('.lb-caption');
  const closeBtn = overlay.querySelector('.lb-close');

  function open(src, caption) {
    imgEl.src = src;
    capEl.textContent = caption || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  function bind() {
    document.querySelectorAll('img.lightboxable').forEach(img => {
      img.addEventListener('click', () => open(img.src, img.dataset.caption || img.alt || ''));
    });
  }
  bind();
})();