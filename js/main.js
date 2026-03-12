/* ========================================
   NAVIGATION
   ======================================== */
(function () {
  var header = document.getElementById('nav-header');
  var hamburger = document.getElementById('nav-hamburger');
  var navLinks = document.getElementById('nav-links');
  var links = document.querySelectorAll('.nav-link');

  if (!header) return;

  // Hide/show nav on scroll
  var lastScrollY = 0;
  var ticking = false;

  function updateNav() {
    var currentY = window.scrollY;
    if (currentY > 100) {
      header.classList.toggle('hidden', currentY > lastScrollY);
    } else {
      header.classList.remove('hidden');
    }
    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link tracking via IntersectionObserver
  var sections = document.querySelectorAll('.section, .hero');
  var observerOptions = { rootMargin: '-30% 0px -70% 0px' };

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
})();


/* ========================================
   TYPING EFFECT
   ======================================== */
(function () {
  var typedEl = document.getElementById('typed-text');
  if (!typedEl) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    typedEl.textContent = 'whoami';
    return;
  }

  var phrases = ['git commit -m "it works trust me"', 'sudo make me a sandwich', '// TODO: fix this later', 'allow claude to run :(){ :|:& };: ?', ':q!', '\u00af\\_(\u30c4)_/\u00af'];
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 80;
  var deleteSpeed = 40;
  var pauseEnd = 2200;
  var pauseStart = 600;

  function type() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, pauseStart);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }

  // Start typing after boot sequence (~3s)
  setTimeout(type, 3200);
})();


/* ========================================
   SCROLL REVEAL
   ======================================== */
(function () {
  var revealEls = document.querySelectorAll('.reveal-up');
  if (!revealEls.length) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    revealEls.forEach(function (el) {
      el.classList.add('revealed');
    });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Animate skill bars within this element
        var bars = entry.target.querySelectorAll('.bar-fill[data-width]');
        bars.forEach(function (bar) {
          bar.style.setProperty('--bar-width', bar.getAttribute('data-width') + '%');
          bar.classList.add('animated');
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });
})();


/* ========================================
   SCREEN FLICKER ON SECTION ENTRY
   ======================================== */
(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var sections = document.querySelectorAll('.section');
  var flickered = new Set();

  var flickerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !flickered.has(entry.target)) {
        flickered.add(entry.target);
        document.body.classList.add('flicker');
        setTimeout(function () {
          document.body.classList.remove('flicker');
        }, 300);
      }
    });
  }, { threshold: 0.05 });

  sections.forEach(function (section) {
    flickerObserver.observe(section);
  });
})();


/* ========================================
   SMOOTH ANCHOR SCROLL
   ======================================== */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


/* ========================================
   BACK TO TOP
   ======================================== */
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  var ticking = false;

  function checkScroll() {
    btn.classList.toggle('visible', window.scrollY > 600);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(checkScroll);
      ticking = true;
    }
  });
})();
