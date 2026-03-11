/* ========================================
   VISUAL EFFECTS — Terminal Theme
   ======================================== */

/* ---- Matrix Rain Canvas ---- */
(function () {
  var canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  var ctx = canvas.getContext('2d');
  var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\|*+~';
  var charArr = chars.split('');
  var fontSize = 14;
  var columns;
  var drops;
  var lastFrame = 0;
  var frameInterval = 33; // ~30fps

  function initColumns() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
  }

  initColumns();

  function draw(timestamp) {
    if (timestamp - lastFrame < frameInterval) {
      requestAnimationFrame(draw);
      return;
    }
    lastFrame = timestamp;

    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < columns; i++) {
      var char = charArr[Math.floor(Math.random() * charArr.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;

      // Head character brighter
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      ctx.fillText(char, x, y);

      // Trailing character dimmer
      if (drops[i] > 1) {
        ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
        ctx.fillText(charArr[Math.floor(Math.random() * charArr.length)], x, y - fontSize);
      }

      drops[i]++;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initColumns, 200);
  });
})();


/* ---- Boot Sequence Animation ---- */
(function () {
  var bootSequence = document.getElementById('boot-sequence');
  var heroMain = document.getElementById('hero-main');
  if (!bootSequence || !heroMain) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    bootSequence.style.display = 'none';
    heroMain.classList.add('visible');
    return;
  }

  var lines = bootSequence.querySelectorAll('.boot-line');
  var lineIndex = 0;
  var bootDelay = 400; // ms between each line

  function showLine(index) {
    if (index >= lines.length) {
      // All lines shown, transition to hero
      setTimeout(function () {
        bootSequence.style.transition = 'opacity 0.5s, transform 0.5s';
        bootSequence.style.opacity = '0';
        bootSequence.style.transform = 'translateY(-12px)';

        setTimeout(function () {
          bootSequence.style.display = 'none';
          heroMain.classList.add('visible');
        }, 500);
      }, 600);
      return;
    }

    var line = lines[index];
    line.classList.add('visible');

    setTimeout(function () {
      showLine(index + 1);
    }, bootDelay);
  }

  // Start boot sequence after a brief initial delay
  setTimeout(function () {
    showLine(0);
  }, 300);
})();


/* ---- Glitch Effect Trigger ---- */
(function () {
  var heroGlitch = document.getElementById('hero-glitch');
  if (!heroGlitch) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  function triggerGlitch() {
    heroGlitch.classList.add('glitching');
    setTimeout(function () {
      heroGlitch.classList.remove('glitching');
    }, 200);

    // Random interval between 4-9 seconds
    var nextDelay = 4000 + Math.random() * 5000;
    setTimeout(triggerGlitch, nextDelay);
  }

  // First glitch after 3 seconds
  setTimeout(triggerGlitch, 3000);
})();
