const toggle   = document.getElementById('nav-toggle');
const nav      = document.getElementById('primary-navigation');
if (toggle && nav) {
  const firstLink = nav.querySelector('a');
  const lastLink  = nav.querySelector('a:last-of-type');

  function setOpen(state){
    toggle.setAttribute('aria-expanded', state);
    nav.setAttribute   ('aria-expanded', state);
    document.body.classList.toggle('nav-open', state);
    state ? firstLink.focus() : toggle.focus();
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded')!=='true'));

  document.addEventListener('click', e=>{
    if(!nav.contains(e.target)&&!toggle.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') setOpen(false);
    if(nav.getAttribute('aria-expanded')==='true'){
      if(e.key==='Tab' && e.shiftKey && document.activeElement===firstLink){e.preventDefault(); lastLink.focus();}
      if(e.key==='Tab' && !e.shiftKey && document.activeElement===lastLink){e.preventDefault(); firstLink.focus();}
    }
  });
}