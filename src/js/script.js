// Ano dinâmico
let data = document.getElementById('year').textContent = new Date().getFullYear();

// Efeitos de revelação on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Barras de skill animadas
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const fill = e.target.querySelector('.fill');
      if (fill) {
        const lvl = +fill.dataset.level || 80;
        fill.style.width = lvl + '%';
      }
      skillObserver.unobserve(e.target);
    }
  })
}, { threshold: .4 });
document.querySelectorAll('.skills > div').forEach(el => skillObserver.observe(el));

// Modal de prévia
function openModal(id) {
  const m = document.getElementById(id); if (!m) return; m.hidden = false; document.body.style.overflow = 'hidden';
}
function closeModals() {
  document.querySelectorAll('.modal').forEach(m => m.hidden = true); document.body.style.overflow = 'auto';
}
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', (e) => { e.preventDefault(); openModal(btn.dataset.open); })
})
document.querySelectorAll('.modal, .modal-close').forEach(el => {
  el.addEventListener('click', (e) => { if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) closeModals(); })
})
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModals(); })

// Toggle Noir (alto contraste)
const noir = document.getElementById('noirToggle');
noir.addEventListener('change', () => {
  document.documentElement.classList.toggle('noir', noir.checked);
});

// Formulário: fallback para mailto
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = encodeURIComponent(data.get('name'));
  const email = encodeURIComponent(data.get('email'));
  const message = encodeURIComponent(data.get('message'));
  const subject = encodeURIComponent('Contato pelo Portfólio HQ');
  const body = encodeURIComponent(`Nome: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\nMensagem:\n${decodeURIComponent(message)}`);
  window.location.href = `mailto:seu-email@exemplo.com?subject=${subject}&body=${body}`;
});

// Acessibilidade básica por teclado nos painéis
document.querySelectorAll('.panel').forEach(panel => {
  panel.addEventListener('keydown', (e) => { if (e.key === 'Enter') { const btn = panel.querySelector('[data-open]'); if (btn) btn.click(); } });
})



