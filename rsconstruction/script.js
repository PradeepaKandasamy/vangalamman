// script.js - navbar mobile toggle, solid header on scroll, hero parallax + slow zoom
(() => {
  const header = document.getElementById('site-header') || document.querySelector('.site-header');
  const hero = document.getElementById('hero');
  const heroBg = document.getElementById('hero-bg') || document.querySelector('.hero-bg');
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  /* ------------------ MOBILE MENU (ARIA + outside click + close on link) ------------------ */
  function openMenu(open) {
    if (!toggle || !mobileMenu || !header) return;
    toggle.setAttribute('aria-expanded', String(!!open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    header.classList.toggle('menu-open', !!open);

    // while menu is open, ensure header is visible/solid for readability
    if (open) header.classList.add('solid');
    else onScroll(); // restore header solidness depending on scroll position
  }

  if (toggle && mobileMenu) {
    // initialize attributes if not present
    if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');
    if (!mobileMenu.hasAttribute('aria-hidden')) mobileMenu.setAttribute('aria-hidden', 'true');

    toggle.addEventListener('click', (e) => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      openMenu(!isOpen);
    });

    // close when clicking a link inside mobile menu
    mobileMenu.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a');
      if (a) openMenu(false);
    });

    // click outside to close
    document.addEventListener('click', (e) => {
      // don't close if clicking the toggle or inside the mobile menu
      if (!mobileMenu.contains(e.target) && !toggle.contains(e.target)) {
        if (mobileMenu.getAttribute('aria-hidden') === 'false') openMenu(false);
      }
    });

    // close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.getAttribute('aria-hidden') === 'false') {
        openMenu(false);
        toggle.focus();
      }
    });
  }

  /* ------------------ HEADER SOLID ON SCROLL ------------------ */
  function onScroll(){
    // if header doesn't exist just exit
    if (!header) return;
    const threshold = hero ? (hero.offsetHeight - 160) : 80;
    if (window.scrollY > threshold) header.classList.add('solid');
    else header.classList.remove('solid');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------ HERO PARALLAX + SLOW ZOOM ------------------
     Architecture:
     - Maintain scale, tx, ty state
     - applyTransform() composes them into a single transform string so they don't overwrite each other
     - Parallax (mousemove) updates tx/ty and sets a slightly larger scale
     - When small screen (<=820) parallax is disabled and only a subtle scale zoom runs
  -----------------------------------------------------------------*/
  let scale = 1.03;
  let tx = 0;
  let ty = 0;
  let zoomDir = 1;

  function applyTransform() {
    if (!heroBg) return;
    // Use translate then scale to keep motion natural
    heroBg.style.transform = `scale(${scale}) translate(${tx}px, ${ty}px)`;
  }

  function onMove(e){
    if (!hero || !heroBg) return;
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width; // approx -0.5 .. 0.5
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    tx = x * 10; // small horizontal movement
    ty = y * 8;  // small vertical movement
    scale = 1.06; // slightly zoomed while moving
    applyTransform();
  }

  function onLeave(){
    // reset to neutral values
    tx = 0;
    ty = 0;
    scale = 1.03;
    applyTransform();
  }

  function enableParallax(){
    if (!hero || !heroBg) return;

    if (window.innerWidth <= 820) {
      // turn off parallax interactivity on small screens
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      // reset transforms and keep subtle zoom handled by interval below
      tx = 0;
      ty = 0;
      scale = 1.03;
      applyTransform();
      return;
    }

    // desktop: enable mouse parallax
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
  }

  window.addEventListener('resize', enableParallax);
  enableParallax();

  // slow idle zoom when not hovered (works both desktop and mobile; parallax overrides while hovering)
  setInterval(() => {
    if (!heroBg) return;

    // if hero exists and is hovered, skip (parallax onMove handles transform)
    if (hero && hero.matches(':hover') && window.innerWidth > 820) return;

    // subtle ping-pong between 1.03 and 1.07
    if (scale >= 1.07) zoomDir = -1;
    if (scale <= 1.03) zoomDir = 1;
    scale += zoomDir * 0.0015;

    // On small screens we only want scale (tx/ty remain zero)
    if (window.innerWidth <= 820) {
      tx = 0;
      ty = 0;
    }

    applyTransform();
  }, 90); // slightly faster loop for smoother motion

  /* ------------------ End IIFE ------------------ */
})();
// AUTO ADD ACTIVE CLASS TO CURRENT NAV LINK
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  let currentPage = window.location.pathname.split("/").pop();  
  if (currentPage === "") currentPage = "home.html"; // default page

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
// SERVICES PANEL - open/close logic
(function(){
  const overlay = document.getElementById('panel-overlay');
  const panel = document.getElementById('services-panel');
  const panelClose = panel ? panel.querySelector('.panel-close') : null;

  function openPanel(panelId){
    if (!overlay || !panel) return;
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden','false');
    document.body.classList.add('menu-open'); // lock scroll
    // focus trap starter
    panelClose && panelClose.focus();
    // optionally remove mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden','true');
    if (navToggle) navToggle.setAttribute('aria-expanded','false');
  }

  function closePanel(){
    if (!overlay || !panel) return;
    overlay.setAttribute('aria-hidden','true');
    overlay.setAttribute('hidden','');
    document.body.classList.remove('menu-open');
  }

  // open when clicking `.has-panel` (both desktop and mobile links)
  document.addEventListener('click', function(e){
    const el = e.target.closest('.has-panel');
    if (!el) return;
    // only handle Services panel for now
    const panelId = el.dataset.panel;
    if (!panelId) return;
    e.preventDefault();
    // open the requested panel
    if (panelId === 'services-panel') openPanel(panelId);
  });

  // close handlers
  if (panelClose) panelClose.addEventListener('click', closePanel);
  // click outside panel to close
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) closePanel();
  });

  // close on ESC
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      const visible = overlay && overlay.getAttribute('aria-hidden') === 'false';
      if (visible) closePanel();
    }
  });
})();
// Projects filter (simple client-side)
(function(){
  const grid = document.getElementById('projects-grid');
  const buttons = document.querySelectorAll('.filter-btn');

  if (!grid || !buttons) return;

  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=> {
      buttons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const items = grid.querySelectorAll('.project-card');

      items.forEach(item=>{
        if (filter === 'all') item.style.display = '';
        else {
          item.style.display = item.dataset.type === filter ? '' : 'none';
        }
      });
    });
  });
})();
// BRAND PANEL: open/close + accessibility
(function(){
  const trigger = document.getElementById('brand-panel-trigger');
  const overlay = document.getElementById('brand-panel-overlay');
  const panel = document.getElementById('brand-panel');
  const closeBtn = document.getElementById('brand-panel-close');

  if (!trigger || !overlay || !panel) return;

  function openPanel(){
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open'); // locks body scroll
    // move focus into first focusable element (close button)
    closeBtn.focus();
    // hide main content to assistive tech (optional if you have main id)
    const main = document.querySelector('main');
    if (main) main.setAttribute('aria-hidden', 'true');
    // trap focus (simple)
    document.addEventListener('focus', trapFocus, true);
  }

  function closePanel(){
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    const main = document.querySelector('main');
    if (main) main.removeAttribute('aria-hidden');
    trigger.focus();
    document.removeEventListener('focus', trapFocus, true);
  }

  function onDocumentKey(e){
    if (e.key === 'Escape') closePanel();
  }

  // click outside to close
  overlay.addEventListener('click', function(e){
    if (e.target === overlay) closePanel();
  });

  trigger.addEventListener('click', function(e){
    const open = overlay.hidden === false;
    if (open) closePanel();
    else {
      openPanel();
      document.addEventListener('keydown', onDocumentKey);
    }
  });

  closeBtn.addEventListener('click', function(){ closePanel(); document.removeEventListener('keydown', onDocumentKey); });

  // Basic focus trap: keep focus inside panel while open
  function trapFocus(e){
    if (!overlay || overlay.hidden) return;
    if (!panel.contains(e.target)){
      e.stopPropagation();
      panel.focus();
    }
  }

})();

