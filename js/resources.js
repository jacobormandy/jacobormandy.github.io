document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.resource-card');
  const saveBtns   = document.querySelectorAll('.save-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // update pressed state
      filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.type !== filter;
      });
    });
  });

  saveBtns.forEach(btn => {
    const title = btn.dataset.title;
    btn.addEventListener('click', () => {
      const saved = btn.classList.toggle('saved');
      btn.textContent = saved ? '❤️' : '♡';
      btn.setAttribute(
        'aria-label',
        (saved ? 'Unsave' : 'Save') + ` '${title}'`
      );
    });
  });
});
