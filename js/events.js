/* ------------------------------------------------------------------
   Campus Wellness Collective  •  Workshops & Events calendar logic
   Pure-JS month view, keyboard friendly, no external libraries.
------------------------------------------------------------------- */

const eventData = [
  { date: '2025-05-03', title: 'Mindful Breathing 101', time: '15:00' },
  { date: '2025-05-10', title: 'Yoga Flow for Finals',   time: '10:00' },
  { date: '2025-05-18', title: 'Sound-Bath Meditation',  time: '18:30' },
  { date: '2025-06-04', title: 'Journaling for Growth',  time: '16:00' },
];

document.addEventListener('DOMContentLoaded', () => {
  const cal     = document.querySelector('.calendar');
  const modal   = document.getElementById('modal');
  const mTitle  = modal.querySelector('.modal-title');
  const mList   = modal.querySelector('.modal-list');
  const mClose  = modal.querySelector('.modal-close');

  let current   = new Date();

  function render() {
    const y = current.getFullYear();
    const m = current.getMonth();
    const first = new Date(y, m, 1);
    const last  = new Date(y, m + 1, 0);
    const monthLabel = first.toLocaleString('en-US', { month:'long', year:'numeric' });

    cal.innerHTML = `
      <div class="cal-head">
        <button class="cal-prev" aria-label="Previous month">‹</button>
        <h2>${monthLabel}</h2>
        <button class="cal-next" aria-label="Next month">›</button>
      </div>
      <div class="cal-grid" role="grid" aria-label="Events calendar">
        ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
          .map(d=>`<div class="cal-dow" role="columnheader">${d}</div>`).join('')}
      </div>`;
    
    const grid = cal.querySelector('.cal-grid');
    [...Array(first.getDay())].forEach(() => grid.append(blankCell()));
    for (let d = 1; d <= last.getDate(); d++) {
      const dateObj = new Date(y, m, d);
      const iso = dateObj.toISOString().slice(0,10);
      const todaysEvents = eventData.filter(ev => ev.date === iso);
      grid.append(dayCell(d, iso, todaysEvents));
    }

    cal.querySelector('.cal-prev').onclick = () => { current.setMonth(m-1); render(); };
    cal.querySelector('.cal-next').onclick = () => { current.setMonth(m+1); render(); };
  }

  const blankCell = () => {
    const c = document.createElement('div');
    c.className = 'cal-cell cal-pad';
    c.setAttribute('aria-hidden','true');
    return c;
  };

  const dayCell = (num, iso, evts) => {
    const btn = document.createElement('button');
    btn.className = 'cal-cell';
    btn.setAttribute('role','gridcell');
    btn.textContent = num;
    btn.dataset.date = iso;

    if (evts.length) {
      btn.classList.add('has-event');
      btn.setAttribute('aria-label', `${num} – ${evts.length} event${evts.length>1?'s':''}`);
      btn.onclick = () => openModal(evts, iso);
    } else {
      btn.disabled = true;
    }
    return btn;
  };

  function openModal(evts, iso) {
    mTitle.textContent =
      new Date(iso).toLocaleString('en-US', { weekday:'long', month:'long', day:'numeric' });

    mList.innerHTML = evts.map(ev => `
        <li><time datetime="${ev.date}T${ev.time}">${ev.time}</time> — ${ev.title}</li>`).join('');

    modal.classList.add('show');
    modal.removeAttribute('hidden');
    modal.focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('hidden','');
  }

  mClose.onclick = closeModal;
  modal.addEventListener('keydown', e => (e.key === 'Escape') && closeModal());

  render();
});