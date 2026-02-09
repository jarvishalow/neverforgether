// ── Countdown to Valentine's Day ──
(function countdown() {
  const target = new Date('2026-02-14T00:00:00').getTime();
  function tick() {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);
    document.getElementById('cd-days').textContent = d;
    document.getElementById('cd-hours').textContent = h;
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
    if (diff > 0) requestAnimationFrame(() => setTimeout(tick, 1000));
  }
  tick();
})();

// ── Email Signup ──
document.querySelectorAll('form[data-signup]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const input = form.querySelector('input[name="email"]');
    const email = input.value.trim();
    if (!email) return;
    
    btn.disabled = true;
    btn.textContent = 'Joining...';
    
    try {
      const res = await fetch('https://neverforgether.co/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing-page' })
      });
      const data = await res.json();
      if (data.success) {
        input.value = '';
        btn.textContent = '✓ You\'re In!';
        btn.style.background = '#27ae60';
        setTimeout(() => {
          btn.textContent = 'Join the Waitlist';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed');
      }
    } catch (err) {
      btn.textContent = 'Try Again';
      btn.style.background = '#c0392b';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Join the Waitlist';
        btn.style.background = '';
      }, 2000);
    }
  });
});

// ── Scroll fade-in ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
