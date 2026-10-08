const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
const dialog = document.querySelector('#lightbox');
const largeImage = document.querySelector('#lightbox-image');
const caption = document.querySelector('#lightbox-caption');
let opener;
document.querySelectorAll('.image-open').forEach(button => button.addEventListener('click', () => {
  opener = button; largeImage.src = button.dataset.image;
  largeImage.alt = button.dataset.caption || button.querySelector('img')?.alt || '';
  caption.textContent = button.dataset.caption || ''; dialog.showModal();
  document.body.style.overflow = 'hidden';
}));
document.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
}});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
const cards = [...document.querySelectorAll('.gallery figure')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const showMore = document.querySelector('#show-more');
let currentFilter = 'all'; let expanded = false;
function updateGallery() {
  const matching = cards.filter(card => currentFilter === 'all' || card.dataset.category === currentFilter);
  cards.forEach(card => { card.hidden = !matching.includes(card) || (currentFilter === 'all' && !expanded && matching.indexOf(card) >= 9); });
  document.querySelector('#gallery-status').textContent = `${cards.filter(card => !card.hidden).length} of ${matching.length} photographs`;
  showMore.hidden = currentFilter !== 'all' || expanded || matching.length <= 9;
  filterButtons.forEach(button => { const active = button.dataset.filter === currentFilter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
}
filterButtons.forEach(button => button.addEventListener('click', () => { currentFilter = button.dataset.filter; expanded = false; updateGallery(); }));
showMore.addEventListener('click', () => { expanded = true; updateGallery(); });
updateGallery();
