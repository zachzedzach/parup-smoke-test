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

  function signupSource() {
    const platform = sessionStorage.getItem(storePlatformKey);
    const source = platform ? `store_badge_clicked_${platform}` : sessionStorage.getItem(ctaClickedKey) === 'yes' || sessionStorage.getItem(olderCtaClickedKey) === 'yes' || sessionStorage.getItem(legacyCtaClickedKey) === 'yes' ? 'early_access_button_clicked' : 'direct';
    const campaign = Object.entries(campaignParams).map(([key, value]) => `${key}=${value}`);
    return [source, ...campaign].join(';').slice(0, 180);
  }

  function track(name, details = {}) {
    const params = { method: 'Roundfolk smoke test', early_access_cta_clicked: sessionStorage.getItem(ctaClickedKey) === 'yes' || sessionStorage.getItem(olderCtaClickedKey) === 'yes' || sessionStorage.getItem(legacyCtaClickedKey) === 'yes', ...details, ...campaignParams };
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  function trackDetail(name, params) {
    params = { ...params, ...campaignParams };
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.clarity === 'function') {
      const detail = params.section_id || params.percent || params.seconds;
      window.clarity('event', detail ? `${name}_${detail}` : name);
    }
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
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, 'clarity', 'script', config.clarityProjectId);
    Object.entries(campaignParams).forEach(([key, value]) => window.clarity('set', key, value));
  }

  const storeGate = document.getElementById('store-gate');
  document.querySelectorAll('[data-store-platform]').forEach((button) => {
    button.addEventListener('click', () => {
      const platform = button.dataset.storePlatform || 'unknown';
      const clickKey = `roundfolk_store_badge_clicked_${platform}`;
      const firstPlatformClick = sessionStorage.getItem(clickKey) !== 'yes';
      sessionStorage.setItem(clickKey, 'yes');
      sessionStorage.setItem(storePlatformKey, platform);
      if (sourceField) sourceField.value = signupSource();
      if (firstPlatformClick) track('roundfolk_store_badge_clicked', { store_platform: platform });
      if (storeGate && !storeGate.open) {
        storeGate.showModal();
        track('roundfolk_store_gate_shown', { store_platform: platform });
      }
    });
  });
  storeGate?.querySelector('.gate-close')?.addEventListener('click', () => storeGate.close());

  const slotButtons = [...document.querySelectorAll('.tee-slot')];
  const customTimeToggle = document.getElementById('toggle-custom-time');
  const customTimeIcon = document.getElementById('custom-time-icon');
  const customTimePicker = document.getElementById('custom-time-picker');
  const customTimeOptions = document.getElementById('custom-time-options');
  const customTimeButtons = [...document.querySelectorAll('[data-custom-time]')];
  const customDayButtons = [...document.querySelectorAll('[data-custom-day]')];
  const resetRoundButton = document.getElementById('reset-round');
  const cartChoice = document.getElementById('cart-choice');
  const cartChoiceHint = document.getElementById('cart-choice-hint');
  const cartChoiceButtons = [...document.querySelectorAll('[data-cart-choice]')];
  const photoButton = document.getElementById('photo-snap');
  const photoThumb = document.getElementById('round-photo-thumb');
  const bio = document.getElementById('allo-bio');
  const bioCount = document.querySelector('.char-count');
  const postRoundButton = document.getElementById('post-round');
  const roundResponse = document.getElementById('round-response');
  const responseMessage = document.getElementById('response-message');
  const screenTabs = [...document.querySelectorAll('.phone-tab[data-show-screen]')];
  const phoneScreens = [...document.querySelectorAll('.phone-screen[data-screen]')];
  const showPhoneScreen = (name) => {
    phoneScreens.forEach(screen => { screen.hidden = screen.dataset.screen !== name; });
    screenTabs.forEach(tab => {
      const active = tab.dataset.showScreen === name;
      tab.classList.toggle('is-active', active);
      if (active) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
    });
    if (name === 'round') document.querySelector('.phone-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    trackDetail('roundfolk_preview_screen_opened', { screen: name });
  };
  document.querySelectorAll('[data-show-screen]').forEach(button => button.addEventListener('click', () => showPhoneScreen(button.dataset.showScreen)));
  document.querySelectorAll('[data-person-action]').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.people-card');
    const feedback = card?.querySelector('.people-feedback');
    if (!feedback) return;
    feedback.hidden = false;
    feedback.textContent = button.dataset.personAction === 'save' ? 'Saved for later. You can come back to this round.' : 'Passed quietly. Maya won’t get a notification.';
    card.querySelectorAll('[data-person-action]').forEach(action => { action.disabled = true; });
    trackDetail('roundfolk_preview_person_action', { action: button.dataset.personAction });
  }));
  const responseActions = document.getElementById('response-actions');
  const responseConfirmation = document.getElementById('response-confirmation');
  let chosenSlot = null;
  let bioRevealTimer = 0;
  const bioTypingTimers = [];
  let currentCartChoice = cartChoice?.dataset.choice || 'no_preference';
  let roundWasPosted = false;
  const exampleBioLines = [
    'I’m up for an early round or a quick nine after work.',
    'I like a relaxed pace and some friendly competition.'
  ];

  function updateRoundMessage() {
    if (!responseMessage) return;
    if (!chosenSlot) return;
    const [day, time] = chosenSlot.split(' · ');
    responseMessage.textContent = `Maya picked ${day} at ${time} too. She’s up for a round. Are you?`;
  }

  function typeBio() {
    if (!bio || bio.dataset.typed === 'true') return;
    bioTypingTimers.forEach((timer) => window.clearTimeout(timer));
    bioTypingTimers.length = 0;
    bio.dataset.typed = 'true';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const completeText = exampleBioLines.join(' ');
    if (reduced) {
      bio.textContent = `${exampleBioLines[0]} ${exampleBioLines[1]}`;
      if (bioCount) {
        bioCount.hidden = false;
        bioCount.textContent = `${completeText.length} / 120`;
      }
      return;
    }
    bio.replaceChildren();
    let charIndex = 0;
    completeText.split(/(\s+)/).forEach((word) => {
      [...word].forEach((character) => {
        const glyph = document.createElement('span');
        glyph.className = 'allo-glyph';
        glyph.textContent = character === ' ' ? '\u00a0' : character;
        const wordWeight = /^(early|nine|conversation|golf\.)$/.test(word.trim()) ? 780 : /^(quick|after|easy|kind)$/.test(word.trim()) ? 340 : 500;
        const wave = [0, 70, 150, 30, 110][charIndex % 5];
        glyph.style.setProperty('--glyph-weight', String(Math.max(280, Math.min(850, wordWeight + wave - 65))));
        bio.append(glyph);
        charIndex += 1;
      });
    });
    bio.classList.add('is-typing');
    if (bioCount) {
      bioCount.hidden = false;
      bioCount.textContent = '0 / 120';
    }
    [...bio.querySelectorAll('.allo-glyph')].forEach((glyph, index) => bioTypingTimers.push(window.setTimeout(() => {
      glyph.classList.add('is-visible');
      if (bioCount) bioCount.textContent = `${index + 1} / 120`;
    }, index * 38)));
  }

  if (bio) bio.dataset.typed = 'false';

  function scheduleBioReveal() {
    if (!bio) return;
    window.clearTimeout(bioRevealTimer);
    bioTypingTimers.forEach((timer) => window.clearTimeout(timer));
    bioTypingTimers.length = 0;
    bio.dataset.typed = 'false';
    bio.classList.remove('is-typing');
    bio.textContent = 'Now for the good bit…';
    if (bioCount) bioCount.hidden = true;
    bioRevealTimer = window.setTimeout(typeBio, 1000);
  }

  function selectSlot(button, slot) {
    chosenSlot = slot;
    slotButtons.forEach((suggested) => {
      const selected = suggested === button;
      suggested.classList.toggle('is-selected', selected);
      suggested.setAttribute('aria-pressed', String(selected));
    });
    customTimeButtons.forEach((timeButton) => {
      const selected = timeButton.dataset.slot === chosenSlot;
      timeButton.classList.toggle('is-selected', selected);
      timeButton.setAttribute('aria-pressed', String(selected));
    });
    if (postRoundButton) postRoundButton.disabled = false;
    if (roundWasPosted && responseActions && responseConfirmation) {
      responseActions.hidden = false;
      responseConfirmation.hidden = true;
    }
    updateRoundMessage();
    scheduleBioReveal();
    track('roundfolk_preview_time_selected', { tee_time: chosenSlot });
  }

  slotButtons.forEach((button) => button.addEventListener('click', () => selectSlot(button, button.dataset.slot)));
  customTimeToggle?.addEventListener('click', () => {
    const opening = customTimePicker?.hidden ?? false;
    if (customTimePicker) customTimePicker.hidden = !opening;
    customTimeToggle.setAttribute('aria-expanded', String(opening));
    if (customTimeIcon) customTimeIcon.textContent = opening ? '−' : '＋';
    track('roundfolk_preview_custom_time_opened', { open: opening });
  });
  customDayButtons.forEach((button) => button.addEventListener('click', () => {
    customDayButtons.forEach((dayButton) => {
      const selected = dayButton === button;
      dayButton.classList.toggle('is-selected', selected);
      dayButton.setAttribute('aria-pressed', String(selected));
    });
    customTimeOptions.hidden = false;
    customTimeButtons.forEach((timeButton) => {
      timeButton.dataset.slot = `${button.dataset.customDay} · ${timeButton.dataset.customTime}`;
      timeButton.classList.remove('is-selected');
      timeButton.setAttribute('aria-pressed', 'false');
    });
    track('roundfolk_preview_custom_day_selected', { weekday: button.dataset.customDay });
  }));
  customTimeButtons.forEach((button) => button.addEventListener('click', () => {
    if (!button.dataset.slot) return;
    slotButtons.forEach((suggested) => {
      suggested.classList.remove('is-selected');
      suggested.setAttribute('aria-pressed', 'false');
    });
    selectSlot(null, button.dataset.slot);
  }));
  cartChoiceButtons.forEach((button) => button.addEventListener('click', () => {
    currentCartChoice = button.dataset.cartChoice;
    if (cartChoice) cartChoice.dataset.choice = currentCartChoice;
    cartChoiceButtons.forEach((choiceButton) => choiceButton.setAttribute('aria-pressed', String(choiceButton === button)));
    if (cartChoiceHint) cartChoiceHint.textContent = { rent_cart: 'Rent a cart', walk: 'Walk', no_preference: 'No preference' }[currentCartChoice];
    track('roundfolk_preview_cart_choice', { cart_choice: currentCartChoice });
  }));

  photoButton?.addEventListener('click', () => {
    photoThumb?.classList.remove('camera-flash');
    photoThumb?.classList.add('has-photo');
    if (photoThumb) {
      photoThumb.hidden = false;
      photoThumb.innerHTML = '<img src="assets/roundfolk-group.jpg" alt="Example golfer photo" /><span class="photo-flash" aria-hidden="true"></span>';
    }
    photoButton.innerHTML = '<span aria-hidden="true">↻</span> Change example photo';
    window.requestAnimationFrame(() => photoThumb?.classList.add('camera-flash'));
    track('roundfolk_preview_photo_tapped', { example_photo_shown: true });
  });

  postRoundButton?.addEventListener('click', () => {
    roundWasPosted = true;
    if (roundResponse) roundResponse.hidden = false;
    postRoundButton.innerHTML = 'Round is out there <span aria-hidden="true">✓</span>';
    postRoundButton.classList.add('is-posted');
    updateRoundMessage();
    track('roundfolk_preview_round_posted', { tee_time: chosenSlot, cart_choice: currentCartChoice });
  });

  document.getElementById('round-yes')?.addEventListener('click', () => {
    if (!roundWasPosted || !responseConfirmation) return;
    responseActions.hidden = true;
    responseConfirmation.hidden = false;
    responseConfirmation.textContent = `Maya’s in too. ${chosenSlot.replace(' · ', ' at ')}. See you there!`;
    track('roundfolk_preview_round_accepted');
  });

  document.getElementById('round-later')?.addEventListener('click', () => {
    if (!roundWasPosted || !responseConfirmation) return;
    responseActions.hidden = true;
    responseConfirmation.hidden = false;
    responseConfirmation.textContent = 'No worries. Your next round is still open.';
    track('roundfolk_preview_round_passed');
  });

  resetRoundButton?.addEventListener('click', () => {
    window.clearTimeout(bioRevealTimer);
    bioTypingTimers.forEach((timer) => window.clearTimeout(timer));
    bioTypingTimers.length = 0;
    chosenSlot = null;
    currentCartChoice = 'no_preference';
    roundWasPosted = false;

    slotButtons.forEach((button) => {
      button.classList.remove('is-selected');
      button.setAttribute('aria-pressed', 'false');
    });
    if (customTimePicker) customTimePicker.hidden = true;
    if (customTimeToggle) customTimeToggle.setAttribute('aria-expanded', 'false');
    if (customTimeIcon) customTimeIcon.textContent = '＋';
    customDayButtons.forEach((button) => {
      button.classList.remove('is-selected');
      button.setAttribute('aria-pressed', 'false');
    });
    if (customTimeOptions) customTimeOptions.hidden = true;
    customTimeButtons.forEach((button) => {
      delete button.dataset.slot;
      button.classList.remove('is-selected');
      button.setAttribute('aria-pressed', 'false');
    });
    if (cartChoice) cartChoice.dataset.choice = 'no_preference';
    cartChoiceButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.cartChoice === 'no_preference')));
    if (cartChoiceHint) cartChoiceHint.textContent = 'No preference';
    if (bio) {
      bio.dataset.typed = 'false';
      bio.classList.remove('is-typing');
      bio.textContent = 'Pick a tee time to see an example.';
    }
    if (bioCount) {
      bioCount.hidden = true;
      bioCount.textContent = '0 / 120';
    }
    if (photoThumb) {
      photoThumb.classList.remove('camera-flash', 'has-photo');
      photoThumb.innerHTML = '';
      photoThumb.hidden = true;
    }
    if (photoButton) photoButton.innerHTML = '<span aria-hidden="true">＋</span> Add photo';
    if (postRoundButton) {
      postRoundButton.disabled = true;
      postRoundButton.innerHTML = 'Put this round out there <span aria-hidden="true">↗</span>';
      postRoundButton.classList.remove('is-posted');
    }
    if (roundResponse) roundResponse.hidden = true;
    if (responseActions) responseActions.hidden = false;
    if (responseConfirmation) {
      responseConfirmation.hidden = true;
      responseConfirmation.textContent = '';
    }
    track('roundfolk_preview_reset');
  });

  if (!form || !submit || !status) return;
  if (sourceField) sourceField.value = signupSource();
  document.querySelectorAll('[data-early-access-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      const firstEarlyAccessClick = sessionStorage.getItem(ctaClickedKey) !== 'yes' && sessionStorage.getItem(olderCtaClickedKey) !== 'yes' && sessionStorage.getItem(legacyCtaClickedKey) !== 'yes';
      sessionStorage.setItem(ctaClickedKey, 'yes');
      if (sourceField) sourceField.value = signupSource();
      if (firstEarlyAccessClick) track('roundfolk_early_access_cta_clicked');
    });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || viewedSections.has(entry.target.id)) return;
      viewedSections.add(entry.target.id);
      trackDetail('roundfolk_section_viewed', { section_id: entry.target.id, section_name: entry.target.dataset.analyticsName || entry.target.id });
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('main > section[id]').forEach((section) => sectionObserver.observe(section));

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    [25, 50, 75, 90].forEach((threshold) => {
      if (depth >= threshold && !sentScrollDepths.has(threshold)) {
        sentScrollDepths.add(threshold);
        trackDetail('roundfolk_scroll_depth', { percent: threshold });
      }
    });
  }, { passive: true });
  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    visibleSeconds += 1;
    if ([10, 30, 60].includes(visibleSeconds)) trackDetail('roundfolk_visible_time', { seconds: visibleSeconds });
  }, 1000);
  if (endpoint) {
    form.action = endpoint;
    submit.disabled = false;
    status.textContent = '';
  } else {
    submit.disabled = true;
  }

  form.addEventListener('submit', (event) => {
    if (!endpoint) {
      event.preventDefault();
      status.textContent = 'The signup form is being connected.';
      return;
    }
    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }
    submit.disabled = true;
    status.textContent = 'Sending your signup…';
    track('roundfolk_signup_started');
  });

  window.addEventListener('message', (event) => {
    if (!frame || event.source !== frame.contentWindow || !['https://script.google.com', 'https://script.googleusercontent.com'].includes(event.origin) || !['parup-signup', 'roundfolk-signup'].includes(event.data?.type)) return;
    if (event.data.status === 'success') {
      form.reset();
      submit.disabled = false;
      status.textContent = 'You’re on the list. We’ll be in touch when Roundfolk is ready.';
      track('roundfolk_signup_completed');
    } else if (event.data.status === 'duplicate') {
      submit.disabled = false;
      status.textContent = 'You’re already on the list. We’ll be in touch when Roundfolk is ready.';
      track('roundfolk_signup_duplicate');
    } else {
      submit.disabled = false;
      status.textContent = 'We could not save that signup. Please check your connection and try again.';
      track('roundfolk_signup_failed');
    }
  });
})();
