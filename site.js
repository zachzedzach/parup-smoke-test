(() => {
  const config = window.ROUNDFOLK_CONFIG || window.PARUP_CONFIG || {};
  const form = document.getElementById('signup-form');
  const status = document.getElementById('form-status');
  const submit = form?.querySelector('button[type="submit"]');
  const frame = document.getElementById('signup-response');
  const endpoint = String(config.signupEndpoint || '').trim();
  const sourceField = document.getElementById('signup-source');
  const ctaClickedKey = 'roundfolk_early_access_cta_clicked';
  const olderCtaClickedKey = 'roundfolk_download_cta_clicked';
  const legacyCtaClickedKey = 'parup_download_cta_clicked';
  const storePlatformKey = 'roundfolk_store_badge_platform_clicked';
  const campaignParams = ['utm_source', 'utm_medium', 'utm_campaign'].reduce((params, key) => {
    const value = new URLSearchParams(window.location.search).get(key);
    if (value) params[key] = value.slice(0, 80);
    return params;
  }, {});
  const viewedSections = new Set();
  const sentScrollDepths = new Set();
  let visibleSeconds = 0;
  const phoneContent = document.querySelector('.phone-content');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function scrollPhoneTo(element, block = 'nearest') {
    if (!phoneContent || !element) return;
    const viewport = phoneContent.getBoundingClientRect();
    const target = element.getBoundingClientRect();
    const style = getComputedStyle(phoneContent);
    const top = viewport.top + phoneContent.clientTop + (Number.parseFloat(style.paddingTop) || 0);
    const bottom = viewport.bottom - (Number.parseFloat(style.paddingBottom) || 0);
    let nextTop = phoneContent.scrollTop;
    if (block === 'start') nextTop += target.top - top - 8;
    else if (target.top < top) nextTop += target.top - top - 8;
    else if (target.bottom > bottom) nextTop += target.bottom - bottom + 8;
    phoneContent.scrollTo({ top: Math.max(0, nextTop), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  function signupSource() {
    const platform = sessionStorage.getItem(storePlatformKey);
    const source = platform ? `store_badge_clicked_${platform}` : sessionStorage.getItem(ctaClickedKey) === 'yes' || sessionStorage.getItem(olderCtaClickedKey) === 'yes' || sessionStorage.getItem(legacyCtaClickedKey) === 'yes' ? 'early_access_button_clicked' : 'direct';
    return [source, ...Object.entries(campaignParams).map(([key, value]) => `${key}=${value}`)].join(';').slice(0, 180);
  }

  function track(name, details = {}) {
    const params = { method: 'The Fourth Club smoke test', early_access_cta_clicked: sessionStorage.getItem(ctaClickedKey) === 'yes' || sessionStorage.getItem(olderCtaClickedKey) === 'yes' || sessionStorage.getItem(legacyCtaClickedKey) === 'yes', ...details, ...campaignParams };
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  // Allo's variable weight is restrained to static app copy; controls stay steady.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const copy = document.querySelectorAll('.phone-screen h3,.phone-screen h4,.phone-screen p,.candidate-person b,.flow-list b');
    copy.forEach((element, index) => {
      const weight = Number.parseFloat(getComputedStyle(element).fontWeight);
      if (!Number.isFinite(weight)) return;
      element.style.setProperty('--copy-weight-base', String(weight));
      element.style.setProperty('--copy-pulse-delay', `${-(index % 8) * 0.55}s`);
      element.classList.add('allo-weight-pulse');
    });
  }

  if (config.googleAnalyticsId) {
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.googleAnalyticsId)}`;
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.googleAnalyticsId);
  }
  if (config.clarityProjectId) {
    (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', config.clarityProjectId);
    Object.entries(campaignParams).forEach(([key, value]) => window.clarity('set', key, value));
  }

  const storeGate = document.getElementById('store-gate');
  document.querySelectorAll('[data-store-platform]').forEach(button => button.addEventListener('click', () => {
    const platform = button.dataset.storePlatform || 'unknown';
    sessionStorage.setItem(`roundfolk_store_badge_clicked_${platform}`, 'yes');
    sessionStorage.setItem(storePlatformKey, platform);
    if (sourceField) sourceField.value = signupSource();
    track('roundfolk_store_badge_clicked', { store_platform: platform });
    if (storeGate && !storeGate.open) { storeGate.showModal(); track('roundfolk_store_gate_shown', { store_platform: platform }); }
  }));
  storeGate?.querySelector('.gate-close')?.addEventListener('click', () => storeGate.close());

  const range = document.getElementById('match-window-range');
  const rangeValue = document.getElementById('match-window-value');
  const waitValue = document.getElementById('wait-window-value');
  const results = document.getElementById('match-results');
  const empty = document.getElementById('search-empty');
  const courseSelect = document.getElementById('course-select');
  const courseName = document.getElementById('candidate-course-name');
  const candidateTime = document.getElementById('candidate-time');
  const candidateTimeTwo = document.getElementById('candidate-time-two');
  const courseNameTwo = document.getElementById('candidate-course-name-two');
  const secondCandidate = document.querySelector('[data-group-card="two"]');
  const courseLink = document.getElementById('course-booking-link');
  const timeSelect = document.getElementById('time-select');
  const resultTime = document.getElementById('results-time');
  const dateSelect = document.getElementById('date-select');
  const playerSelect = document.getElementById('players-select');
  const playersCount = document.getElementById('players-count');
  const roundSummary = document.getElementById('round-summary');
  const appointmentTrack = document.getElementById('appointment-track');
  const cartButtons = [...document.querySelectorAll('[data-cart-choice]')];
  let gettingAround = 'cart';
  function setAppointmentStage(stage) {
    appointmentTrack?.setAttribute('data-stage', stage);
    const stepName = stage === 'round' ? 'Your round' : stage === 'group' ? 'Your group' : 'Next up';
    appointmentTrack?.setAttribute('aria-label', `Round planning progress: ${stepName}`);
  }
  function updateRoundSummary() {
    if (!roundSummary) return;
    const day = (dateSelect?.value || 'Saturday, Nov 21').replace(', Nov ', ' · Nov ');
    const place = courseSelect?.options[courseSelect.selectedIndex]?.text || 'Utah County';
    roundSummary.textContent = `${place} · ${day} · ${timeSelect?.value || '7:30 AM'} · ${playerSelect?.value || '1 golfer'} · ${gettingAround === 'cart' ? 'Rent a cart' : gettingAround === 'walk' ? 'Walk' : 'No preference'}`;
  }
  document.querySelectorAll('[data-date]').forEach(button => button.addEventListener('click', () => {
    if (dateSelect) dateSelect.value = button.dataset.date;
    document.querySelectorAll('[data-date]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateRoundSummary();
    track('roundfolk_date_selected', { date: button.dataset.date });
  }));
  dateSelect?.addEventListener('change', () => {
    document.querySelectorAll('[data-date]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.date === dateSelect.value)));
    updateRoundSummary();
  });
  document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
    if (timeSelect) timeSelect.value = button.dataset.time;
    document.querySelectorAll('[data-time]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const moreTime = document.getElementById('more-time-select');
    if (moreTime) moreTime.value = '';
    if (resultTime) resultTime.textContent = timeSelect?.value || '7:30 AM';
    updateCandidateTime();
    updateRoundSummary();
    track('roundfolk_time_selected', { tee_time: button.dataset.time });
  }));
  document.getElementById('more-time-select')?.addEventListener('change', event => {
    if (!event.currentTarget.value) return;
    if (timeSelect) timeSelect.value = event.currentTarget.value;
    document.querySelectorAll('[data-time]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.time === event.currentTarget.value)));
    if (resultTime) resultTime.textContent = event.currentTarget.value;
    updateCandidateTime();
    updateRoundSummary();
    track('roundfolk_time_selected', { tee_time: event.currentTarget.value, custom_time: true });
  });
  function updatePlayerCount(count) {
    if (playerSelect) playerSelect.value = `${count} golfer${count === 1 ? '' : 's'}`;
    if (playersCount) playersCount.textContent = playerSelect?.value || `${count} golfer${count === 1 ? '' : 's'}`;
    const minus = document.getElementById('players-minus');
    const plus = document.getElementById('players-plus');
    minus?.setAttribute('aria-label', 'Set to one golfer');
    plus?.setAttribute('aria-label', 'Set to two golfers');
    updateCandidateTime();
    updateRoundSummary();
  }
  playerSelect?.addEventListener('change', () => updatePlayerCount(playerSelect.value === '2 golfers' ? 2 : 1));
  document.getElementById('players-minus')?.addEventListener('click', () => updatePlayerCount(1));
  document.getElementById('players-plus')?.addEventListener('click', () => updatePlayerCount(2));
  cartButtons.forEach(button => button.addEventListener('click', () => {
    gettingAround = button.dataset.cartChoice;
    cartButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    updateRoundSummary();
    track('roundfolk_getting_around_selected', { preference: gettingAround });
  }));
  courseSelect?.addEventListener('change', updateRoundSummary);
  const courseLinks = {
    any: ['Browse local tee times', 'https://www.readygolfer.co/provo-tee-times'],
    fox: ['Book at Fox Hollow', 'https://app.membersports.com/tee-times/15396/18907/0/0/0'],
    cedar: ['Book at Cedar Hills', 'https://app.membersports.com/tee-times/15381/18891/0/0/0'],
    hobble: ['Book at Hobble Creek', 'https://app.membersports.com/tee-times/15404/18918/0/0/0'],
    talons: ['Book at TalonsCove', 'https://app.membersports.com/tee-times/15455/18982/0/0/0'],
    oaks: ['Book at The Oaks', 'https://cms.spanishfork.gov/revize/spanishforkto/book_tee_time/index.php']
  };
  const courseLabels = { any: 'Fox Hollow · example', fox: 'Fox Hollow', cedar: 'Cedar Hills', hobble: 'Hobble Creek', talons: 'TalonsCove', oaks: 'The Oaks at Spanish Fork' };
  function updateRange() {
    const mins = Number(range?.value ?? 30);
    const text = `${mins} min`;
    if (rangeValue) rangeValue.textContent = text;
    if (waitValue) waitValue.textContent = mins === 0 ? 'the same time' : `${mins} minutes`;
    updateCandidateTime();
    track('roundfolk_match_window_changed', { window_minutes: mins });
  }
  function updateCandidateTime() {
    if (!candidateTime || !timeSelect) return;
    const [clock, meridiem] = timeSelect.value.split(' ');
    let [hour, minute] = clock.split(':').map(Number);
    let total = (hour % 12) * 60 + minute + (meridiem === 'PM' ? 720 : 0);
    total += Number(range?.value ?? 30) === 0 ? 0 : 15;
    total %= 1440;
    const h24 = Math.floor(total / 60);
    const label = `${h24 % 12 || 12}:${String(total % 60).padStart(2, '0')} ${h24 >= 12 ? 'PM' : 'AM'}`;
    candidateTime.textContent = label;
    if (candidateTimeTwo) {
      const offset = Number(range?.value ?? 30);
      let secondTotal = (hour % 12) * 60 + minute + (meridiem === 'PM' ? 720 : 0) + (offset === 0 ? 0 : 30);
      secondTotal %= 1440;
      const secondHour = Math.floor(secondTotal / 60);
      candidateTimeTwo.textContent = `${secondHour % 12 || 12}:${String(secondTotal % 60).padStart(2, '0')} ${secondHour >= 12 ? 'PM' : 'AM'}`;
    }
    if (secondCandidate) secondCandidate.hidden = Number(range?.value ?? 30) < 30 || playerSelect?.value === '2 golfers';
  }
  range?.addEventListener('input', updateRange);
  document.getElementById('find-groups')?.addEventListener('click', () => {
    if (empty) empty.hidden = true;
    if (results) results.hidden = false;
    setAppointmentStage('group');
    document.querySelectorAll('.match-feedback').forEach(note => { note.hidden = true; });
    if (waitToggle) { waitToggle.setAttribute('aria-pressed', 'false'); waitToggle.textContent = 'Try the wait option'; }
    const waitFeedback = document.getElementById('wait-feedback');
    if (waitFeedback) waitFeedback.hidden = true;
    const label = courseLabels[courseSelect?.value || 'any'];
    if (courseName) courseName.textContent = label;
    if (courseNameTwo) courseNameTwo.textContent = courseSelect?.value === 'any' ? 'Cedar Hills' : label;
    if (resultTime) resultTime.textContent = timeSelect?.value || '7:30 AM';
    updateRoundSummary();
    updateCandidateTime();
    const booking = courseLinks[courseSelect?.value || 'any'];
    if (courseLink) { courseLink.textContent = `${booking[0]} ↗`; courseLink.href = booking[1]; }
    track('roundfolk_group_search', { course_area: courseSelect?.value || 'any', date: dateSelect?.value, golfers: playerSelect?.value, tee_time: timeSelect?.value || '7:30 AM', match_window_minutes: range?.value ?? 30 });
    scrollPhoneTo(document.querySelector('.candidate-card'), 'start');
  });
  courseSelect?.addEventListener('change', () => {
    const booking = courseLinks[courseSelect.value];
    if (courseLink && booking) { courseLink.textContent = `${booking[0]} ↗`; courseLink.href = booking[1]; }
  });
  timeSelect?.addEventListener('change', () => {
    const isSuggested = [...document.querySelectorAll('[data-time]')].some(button => button.dataset.time === timeSelect.value);
    document.querySelectorAll('[data-time]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.time === timeSelect.value)));
    const moreTime = document.getElementById('more-time-select');
    if (moreTime) moreTime.value = isSuggested ? '' : timeSelect.value;
    if (resultTime) resultTime.textContent = timeSelect.value;
    updateCandidateTime();
    updateRoundSummary();
  });
  document.querySelector('.match-results')?.addEventListener('click', event => {
    const button = event.target.closest('[data-group][data-decision]');
    if (!button) return;
    const note = document.getElementById(`match-feedback-${button.dataset.group}`);
    if (!note) return;
    note.hidden = false;
    note.textContent = button.dataset.decision === 'join'
      ? 'Your yes is on the card. Their yes matters too. If you both agree, finish booking with the course.'
      : 'No worries. Your search stays open, or book this tee time as usual.';
    if (button.dataset.decision === 'join') setAppointmentStage('agree');
    track('roundfolk_group_interest', { group_option: button.dataset.group, decision: button.dataset.decision });
  });
  const waitToggle = document.getElementById('wait-toggle');
  waitToggle?.addEventListener('click', () => {
    const active = waitToggle.getAttribute('aria-pressed') !== 'true';
    waitToggle.setAttribute('aria-pressed', String(active));
    waitToggle.textContent = active ? 'Hide example' : 'Try the wait option';
    const note = document.getElementById('wait-feedback');
    if (note) note.hidden = !active;
    track('roundfolk_wait_intent', { waiting: active, match_window_minutes: range?.value ?? 30 });
  });

  const skillLevels = [
    { name: 'Novice / Beginner', score: 'Breaking 100+', detail: 'Just learning contact, direction, and getting the ball airborne.' },
    { name: 'Developing Player', score: 'Breaking 90–100', detail: 'Building confidence, learning course flow, and avoiding the big numbers.' },
    { name: 'Competent Club Player', score: 'Breaking 80s', detail: 'A steady recreational golfer with predictable shots and a growing short game.' },
    { name: 'Advanced Amateur', score: 'Single-digit handicap', detail: 'Consistent ball striking, thoughtful course choices, and a dependable short game.' },
    { name: 'Scratch Golfer', score: 'Even par', detail: 'A highly skilled player who can regularly keep a round near par.' },
    { name: 'Elite Amateur / Mini-Tour Pro', score: 'Under par', detail: 'A competitive player who regularly scores below par in strong fields.' },
    { name: 'Professional / Touring Pro', score: 'Tour level (PGA/LPGA)', detail: 'A full-time professional competing at the highest levels of the game.' }
  ];
  const skillOptions = document.getElementById('skill-level-options');
  const skillName = document.getElementById('selected-skill-name');
  const skillDescription = document.getElementById('skill-level-description');
  const skillToggle = document.getElementById('skill-level-toggle');
  let selectedSkill = 0;
  if (skillOptions) {
    skillOptions.innerHTML = skillLevels.map((level, i) => `<button type="button" class="skill-level-option" data-level="${i}" aria-pressed="${i === 0}"><span>${i + 1}</span><span><b>${level.name}</b><small>${level.score}</small></span></button>`).join('');
    skillOptions.addEventListener('click', event => {
      const item = event.target.closest('[data-level]');
      if (!item) return;
      selectedSkill = Number(item.dataset.level);
      skillName.textContent = skillLevels[selectedSkill].name;
      skillDescription.textContent = skillLevels[selectedSkill].detail;
      skillOptions.querySelectorAll('[data-level]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.level) === selectedSkill)));
      track('roundfolk_profile_skill_selected', { level: selectedSkill + 1 });
    });
  }
  skillToggle?.addEventListener('click', () => {
    const open = skillToggle.getAttribute('aria-expanded') !== 'true';
    skillToggle.setAttribute('aria-expanded', String(open));
    skillOptions.hidden = !open;
  });
  document.querySelectorAll('[name="play-with"]').forEach(input => input.addEventListener('change', () => track('roundfolk_profile_preferences_changed')));
  document.getElementById('profile-visibility')?.addEventListener('change', event => track('roundfolk_profile_visibility', { visibility: event.currentTarget.value }));

  const screens = [...document.querySelectorAll('.phone-screen[data-screen]')];
  const tabs = [...document.querySelectorAll('.phone-tab[data-show-screen]')];
  document.querySelectorAll('[data-show-screen]').forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.showScreen;
    screens.forEach(screen => { screen.hidden = screen.dataset.screen !== name; });
    tabs.forEach(tab => { const active = tab.dataset.showScreen === name; tab.classList.toggle('is-active', active); if (active) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current'); });
    phoneContent?.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    track('roundfolk_preview_screen_opened', { screen: name });
  }));
  document.getElementById('reset-round')?.addEventListener('click', () => {
    document.querySelector('[data-show-screen="round"]')?.click();
    if (courseSelect) courseSelect.value = 'any';
    if (timeSelect) timeSelect.selectedIndex = 0;
    if (dateSelect) dateSelect.value = 'Saturday, Nov 21';
    document.querySelectorAll('[data-date]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.date === dateSelect?.value)));
    document.querySelectorAll('[data-time]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.time === timeSelect?.value)));
    const moreTime = document.getElementById('more-time-select');
    if (moreTime) moreTime.value = '';
    if (playerSelect) playerSelect.selectedIndex = 0;
    updatePlayerCount(1);
    gettingAround = 'cart';
    cartButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cartChoice === 'cart')));
    setAppointmentStage('round');
    updateRoundSummary();
    if (range) range.value = '30';
    updateRange();
    results.hidden = true;
    empty.hidden = false;
    document.querySelectorAll('.match-feedback').forEach(note => { note.hidden = true; });
    if (waitToggle) { waitToggle.setAttribute('aria-pressed', 'false'); waitToggle.textContent = 'Try the wait option'; }
    const waitFeedback = document.getElementById('wait-feedback');
    if (waitFeedback) waitFeedback.hidden = true;
    if (skillName) skillName.textContent = 'Novice / Beginner';
    if (skillDescription) skillDescription.textContent = skillLevels[0].detail;
    selectedSkill = 0;
    document.querySelectorAll('[name="play-with"]').forEach(input => { input.checked = true; });
    const visibility = document.getElementById('profile-visibility');
    if (visibility) visibility.selectedIndex = 0;
    skillOptions?.querySelectorAll('[data-level]').forEach((button, i) => button.setAttribute('aria-pressed', String(i === 0)));
    track('roundfolk_preview_reset');
  });

  if (!form || !submit || !status) return;
  if (sourceField) sourceField.value = signupSource();
  document.querySelectorAll('[data-early-access-cta]').forEach(link => link.addEventListener('click', () => {
    sessionStorage.setItem(ctaClickedKey, 'yes');
    if (sourceField) sourceField.value = signupSource();
    track('roundfolk_early_access_cta_clicked');
  }));
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || viewedSections.has(entry.target.id)) return;
    viewedSections.add(entry.target.id);
    track('roundfolk_section_viewed', { section_id: entry.target.id, section_name: entry.target.dataset.analyticsName || entry.target.id });
  }), { threshold: 0.5 });
  document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    [25, 50, 75, 90].forEach(threshold => { if (depth >= threshold && !sentScrollDepths.has(threshold)) { sentScrollDepths.add(threshold); track('roundfolk_scroll_depth', { percent: threshold }); } });
  }, { passive: true });
  window.setInterval(() => { if (document.visibilityState === 'visible') { visibleSeconds++; if ([10, 30, 60].includes(visibleSeconds)) track('roundfolk_visible_time', { seconds: visibleSeconds }); } }, 1000);
  if (endpoint) { form.action = endpoint; submit.disabled = false; status.textContent = ''; }
  else submit.disabled = true;
  form.addEventListener('submit', event => {
    if (!endpoint) { event.preventDefault(); status.textContent = 'The signup form is being connected.'; return; }
    if (!form.reportValidity()) { event.preventDefault(); return; }
    submit.disabled = true; status.textContent = 'Sending your signup…'; track('roundfolk_signup_started');
  });
  window.addEventListener('message', event => {
    if (!frame || event.source !== frame.contentWindow || !['https://script.google.com', 'https://script.googleusercontent.com'].includes(event.origin) || !['parup-signup', 'roundfolk-signup'].includes(event.data?.type)) return;
    if (event.data.status === 'success') { form.reset(); submit.disabled = false; status.textContent = 'You’re on the list. We’ll be in touch when The Fourth Club is ready.'; track('roundfolk_signup_completed'); }
    else if (event.data.status === 'duplicate') { submit.disabled = false; status.textContent = 'You’re already on the list. We’ll be in touch when The Fourth Club is ready.'; track('roundfolk_signup_duplicate'); }
    else { submit.disabled = false; status.textContent = 'We could not save that signup. Please check your connection and try again.'; track('roundfolk_signup_failed'); }
  });
})();
