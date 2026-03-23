  /* ── CURSOR ── */
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,input').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '50px'; cursor.style.height = '50px';
      cursor.style.background = 'rgba(251,255,72,0.15)';
      cursor.style.borderColor = '#FBFF48';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '24px'; cursor.style.height = '24px';
      cursor.style.background = 'rgba(255,255,255,0.15)';
      cursor.style.borderColor = '#33FF57';
    });
  });

  /* ── DIFFICULTY STATE ── */
  let maxRange = 50, maxLives = 8;  // defaults match entry screen default (EASY)

  const diffColors = { 50: '#33FF57', 100: '#FBFF48', 500: '#FF9F1C', 1000: '#FF2A2A' };

  /* ── ENTRY SCREEN DIFFICULTY ── */
  let entryMax = 50, entryLives = 8;

  function entrySetDiff(btn) {
    document.querySelectorAll('.entry-diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    entryMax   = parseInt(btn.dataset.max);
    entryLives = parseInt(btn.dataset.lives);
    // Update live preview
    document.getElementById('preview-range').textContent = '1 – ' + entryMax;
    document.getElementById('preview-lives').textContent = entryLives;
    document.getElementById('preview-range').style.color = diffColors[entryMax] || '#33FF57';
  }

  /* ── ENTRY BUTTON ── */
  document.getElementById('entry-btn').addEventListener('click', () => {
    // Apply chosen difficulty
    maxRange = entryMax;
    maxLives = entryLives;

    // Sync in-game difficulty buttons
    document.querySelectorAll('.diff-btn').forEach(b => {
      b.classList.remove('active');
      if (parseInt(b.dataset.max) === maxRange) b.classList.add('active');
    });

    // Update subtitle
    document.getElementById('subtitle-text').textContent =
      '> Range: 1–' + maxRange + ' | ' + maxLives + ' lives | No mercy.';

    // Set input maxlength
    guessInput.maxLength = String(maxRange).length;

    // Render hearts and start game
    renderHearts(maxLives);
    resetGame();

    // Hide entry screen
    const es = document.getElementById('entry-screen');
    es.classList.add('hide');
    setTimeout(() => es.style.display = 'none', 650);
    guessInput.focus();
  });

  /* ── IN-GAME DIFFICULTY ── */
  function setDiff(btn) {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    maxRange = parseInt(btn.dataset.max);
    maxLives = parseInt(btn.dataset.lives);
    document.getElementById('subtitle-text').textContent =
      '> Range: 1–' + maxRange + ' | ' + maxLives + ' lives | No mercy.';
    guessInput.maxLength = String(maxRange).length;
    renderHearts(maxLives);
    resetGame();
  }

  /* ── HEARTS ── */
  function renderHearts(count) {
    const row = document.querySelector('.lives-row');
    row.innerHTML = '<span class="lives-label">Lives:</span>';
    for (let i = 1; i <= count; i++) {
      const span = document.createElement('span');
      span.className = 'heart';
      span.id = 'h' + i;
      span.textContent = '❤️';
      row.appendChild(span);
    }
  }

  function updateHearts() {
    for (let i = 1; i <= maxLives; i++) {
      const h = document.getElementById('h' + i);
      if (h) h.classList.toggle('lost', i > lives);
    }
  }

  /* ── GAME STATE ── */
  var answer, no_of_guesses, guesses_num, lives, lowerBound, upperBound, gameOver;

  function initGame() {
    answer        = Math.floor(Math.random() * maxRange) + 1;
    no_of_guesses = 0;
    guesses_num   = [];
    lives         = maxLives;
    lowerBound    = 1;
    upperBound    = maxRange;
    gameOver      = false;
  }

  const guessInput  = document.getElementById('guess');
  const msg1        = document.getElementById('message1');
  const msgBox      = document.getElementById('msg-box');
  const guessCount  = document.getElementById('guess-count');
  const livesCount  = document.getElementById('lives-count');
  const lowerEl     = document.getElementById('lower-bound');
  const upperEl     = document.getElementById('upper-bound');
  const trail       = document.getElementById('guesses-trail');
  const rangeFill   = document.getElementById('range-fill');
  const rangeMarker = document.getElementById('range-marker');
  const rangeText   = document.getElementById('range-text');

  guessInput.addEventListener('keypress', e => { if (e.key === 'Enter') play(); });

  function updateRangeBar() {
    const denom = maxRange - 1 || 1;
    const left  = ((lowerBound - 1) / denom) * 100;
    const width = ((upperBound - lowerBound) / denom) * 100;
    rangeFill.style.left  = left + '%';
    rangeFill.style.width = width + '%';
    if (gameOver) {
      rangeMarker.style.left        = ((answer - 1) / denom) * 100 + '%';
      rangeMarker.style.background  = '#33FF57';
      rangeMarker.style.borderColor = '#33FF57';
    }
    rangeText.textContent = lowerBound + ' — ' + upperBound;
    lowerEl.textContent   = lowerBound;
    upperEl.textContent   = upperBound;
  }

  function addChip(num, type) {
    const chip = document.createElement('span');
    chip.className   = 'guess-chip ' + type;
    chip.textContent = num;
    trail.appendChild(chip);
  }

  function setMessage(text, type) {
    msg1.textContent = text;
    msgBox.className = 'message-box ' + (type || '');
  }

  function shakeInput() {
    guessInput.classList.remove('shake');
    void guessInput.offsetWidth;
    guessInput.classList.add('shake');
    setTimeout(() => guessInput.classList.remove('shake'), 400);
  }

  function play() {
    if (gameOver) return;
    const user_guess = parseInt(guessInput.value);

    if (isNaN(user_guess) || user_guess < 1 || user_guess > maxRange) {
      shakeInput();
      setMessage('⚠️ Enter a number between 1 and ' + maxRange + '.', '');
      guessInput.value = ''; guessInput.focus(); return;
    }
    if (guesses_num.includes(user_guess)) {
      shakeInput();
      setMessage('⚠️ Already guessed ' + user_guess + '! Try another.', '');
      guessInput.value = ''; return;
    }

    no_of_guesses++;
    guesses_num.push(user_guess);
    guessCount.textContent = no_of_guesses;

    if (user_guess === answer) {
      gameOver = true;
      setMessage('🎉 CORRECT! ' + answer + ' was right! Nailed it in ' + no_of_guesses + ' guess' + (no_of_guesses > 1 ? 'es' : '') + '!', 'win');
      addChip(user_guess, 'win');
      updateRangeBar();
      guessInput.classList.add('disabled');
      document.getElementById('my_btn').classList.add('disabled');
      return;
    }

    lives--;
    livesCount.textContent = lives;
    updateHearts();

    if (lives === 0) {
      gameOver = true;
      setMessage('💀 GAME OVER. The number was ' + answer + '. Better luck next time!', 'lose');
      addChip(user_guess, user_guess < answer ? 'low' : 'high');
      updateRangeBar();
      guessInput.classList.add('disabled');
      document.getElementById('my_btn').classList.add('disabled');
      return;
    }

    if (user_guess < answer) {
      lowerBound = Math.max(lowerBound, user_guess + 1);
      setMessage('📉 Too LOW! Higher than ' + user_guess + '. ' + lives + ' lives left.', 'low');
      addChip(user_guess, 'low');
    } else {
      upperBound = Math.min(upperBound, user_guess - 1);
      setMessage('📈 Too HIGH! Lower than ' + user_guess + '. ' + lives + ' lives left.', 'high');
      addChip(user_guess, 'high');
    }

    updateRangeBar();
    guessInput.value = '';
    guessInput.focus();
  }

  function resetGame() {
    initGame();
    msg1.textContent       = 'Awaiting your first guess, soldier...';
    msgBox.className       = 'message-box';
    guessCount.textContent = '0';
    livesCount.textContent = maxLives;
    trail.innerHTML        = '';
    guessInput.value       = '';
    guessInput.classList.remove('disabled');
    document.getElementById('my_btn').classList.remove('disabled');
    updateHearts();
    updateRangeBar();
    rangeMarker.style.background  = '#FF2A2A';
    rangeMarker.style.borderColor = '#FF2A2A';
  }

  function reset() { resetGame(); guessInput.focus(); }

  /* ── INIT ── */
  renderHearts(maxLives);
  initGame();
  updateHearts();
  updateRangeBar();
