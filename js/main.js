// ===== Mobile menu =====
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

// ===== Footer year =====
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ===== Booking form -> WhatsApp (sirf contact.html par) =====
const WHATSAPP_NUMBER = '919713486455';
const form = document.getElementById('bookingForm');

if (form) {
  const msg = document.getElementById('formMsg');

  // ?puja=Havan jaise link se puja pehle se chun do
  const wanted = new URLSearchParams(location.search).get('puja');
  if (wanted) {
    const opt = [...form.elements.puja.options].find(o => o.value === wanted);
    if (opt) form.elements.puja.value = wanted;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form).entries());

    let ok = true;
    ['name', 'phone', 'puja'].forEach(n => {
      const el = form.elements[n];
      const bad = !el.value.trim();
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });

    if (!ok) {
      msg.textContent = 'Naam, mobile number aur puja chunna zaroori hai.';
      return;
    }
    msg.textContent = '';

    const text =
`Namaste Pandit ji,
Naam: ${d.name.trim()}
Mobile: ${d.phone.trim()}
Puja: ${d.puja}
Tithi: ${d.date || 'tay nahi'}
Area: ${d.area.trim() || 'Hyderabad'}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener'
    );
  });
}

// ===== Gallery lightbox (sirf gallery.html par) =====
const lb = document.getElementById('lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('p');
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.tabIndex = 0;
    const open = () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = img.alt;
      lb.showModal();
    };
    img.addEventListener('click', open);
    img.addEventListener('keydown', e => { if (e.key === 'Enter') open(); });
  });
  lb.addEventListener('click', () => lb.close());
}