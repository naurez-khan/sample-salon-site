const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 10));
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('#bookingForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `Assalam-o-Alaikum, I'd like to request an appointment at Nikhar Salon & Studio.%0A%0AName: ${encodeURIComponent(data.get('name'))}%0APhone: ${encodeURIComponent(data.get('phone'))}%0AService: ${encodeURIComponent(data.get('service'))}%0ADate: ${encodeURIComponent(data.get('date'))}%0ANote: ${encodeURIComponent(data.get('message') || '—')}`;
  document.querySelector('.form-status').textContent = 'Opening WhatsApp with your appointment details…';
  window.open(`https://wa.me/923001234567?text=${message}`, '_blank', 'noopener');
});

const testimonials = [
  ['“I felt completely like myself—just the most beautiful version. The team made my wedding morning so calm and special.”', '— Ayesha R. · Nikhar Bride'],
  ['“The soft glam lasted through the whole event and photographed beautifully. Everyone was so warm and attentive.”', '— Mahnoor S. · Party Makeup'],
  ['“Finally, a salon that listens before it starts. My hair colour is exactly what I had pictured.”', '— Zainab K. · Hair Studio']
];
const quote = document.querySelector('.testimonial-stage blockquote');
const author = document.querySelector('.testimonial-stage > p');
document.querySelectorAll('.dots button').forEach((button, index, buttons) => button.addEventListener('click', () => {
  quote.textContent = testimonials[index][0]; author.textContent = testimonials[index][1];
  buttons.forEach(b => b.classList.remove('active')); button.classList.add('active');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
