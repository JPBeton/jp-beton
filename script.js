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
 
/* ===== EmailJS – odeslání formuláře ===== */
(() => {
  const PUBLIC_KEY  = 'HOmFZFi6MdKWGXzhN';   // ← tvůj public key
  const SERVICE_ID  = 'service_b0qy9qf';
  const TEMPLATE_ID = 'template_4tgl7n9';

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.emailjs) return;

    emailjs.init(PUBLIC_KEY);

    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const status = document.createElement('p');
    status.className = 'form-status';
    status.style.marginTop = '8px';
    form.appendChild(status);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Odesílám…';
      }
      status.textContent = '';

      const payload = {
        from_name: form.from_name?.value.trim() || '',
        reply_to : form.reply_to?.value.trim()  || '',
        phone    : form.phone?.value.trim()     || '',
        message  : form.message?.value.trim()   || '',
        date     : new Date().toLocaleString('cs-CZ'),
        title    : 'Poptávka'
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID, payload)
        .then(() => {
          status.style.color = 'green';
          status.textContent = 'Děkujeme, zpráva byla úspěšně odeslána.';
          form.reset();
        })
        .catch((err) => {
          console.error('EmailJS error:', err);
          status.style.color = 'crimson';
          status.textContent = 'Odeslání se nepodařilo. Zkuste to prosím znovu.';
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText || 'Odeslat poptávku';
          }
        });
    });
  });
})();
