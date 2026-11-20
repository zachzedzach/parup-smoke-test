(() => {
  // The installed preview hides the marketing page, so don't download its hero photo there.
  if (!document.documentElement.classList.contains('homescreen-mode')) {
    document.querySelectorAll('.hero-photo[data-src]').forEach((photo, index) => {
      photo.src = photo.dataset.src;
      if (index === 0) {
        photo.fetchPriority = 'high';
        photo.loading = 'eager';
      } else {
        photo.loading = 'lazy';
      }
    });
  }

  const heroCards = [...document.querySelectorAll('.hero-photo-card')];
  heroCards.forEach(card => card.addEventListener('click', () => {
    heroCards.forEach(other => other.setAttribute('aria-pressed', String(other === card)));
  }));

  const openPreviewLink = document.querySelector('.open-app-link');
  const previewDialog = document.getElementById('focused-preview-dialog');
  const previewStage = previewDialog?.querySelector('.focused-preview-stage');
  const previewClose = previewDialog?.querySelector('.focused-preview-close');
  const previewPhone = document.querySelector('.app-preview-stage > .interactive-round');
  let previewReturnPoint = null;
  let previewScrollY = 0;

  function animatePreview(phone, fromRect, toRect) {
    if (!phone?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();
    const dx = fromRect.left - toRect.left;
    const dy = fromRect.top - toRect.top;
    const sx = fromRect.width / Math.max(toRect.width, 1);
    const sy = fromRect.height / Math.max(toRect.height, 1);
    const start = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    const frames = [{ transformOrigin: 'top left', transform: start }, { transformOrigin: 'top left', transform: 'none' }];
    const animation = phone.animate(frames, { duration: 480, easing: 'cubic-bezier(.23,1,.32,1)' });
    return animation.finished.catch(() => {});
  }

  openPreviewLink?.addEventListener('click', event => {
    const phoneRoute = window.matchMedia('(pointer: coarse)').matches;
    if (phoneRoute || !previewDialog?.showModal || !previewStage || !previewPhone) return;
    event.preventDefault();
    const fromRect = previewPhone.getBoundingClientRect();
    previewScrollY = window.scrollY;
    previewReturnPoint = document.createComment('app-preview-return');
    previewPhone.before(previewReturnPoint);
    previewStage.append(previewPhone);
    previewDialog.showModal();
    const toRect = previewPhone.getBoundingClientRect();
    previewDialog.classList.remove('is-taking-over');
    animatePreview(previewPhone, fromRect, toRect).then(() => {
      if (previewDialog.open) previewDialog.classList.add('is-taking-over');
    });
    previewClose?.focus({ preventScroll: true });
  });

  function closeFocusedPreview() {
    if (!previewDialog?.open || !previewPhone || !previewReturnPoint?.parentNode) return;
    const fromRect = previewPhone.getBoundingClientRect();
    previewDialog.close();
    previewReturnPoint.parentNode.insertBefore(previewPhone, previewReturnPoint);
    previewReturnPoint.remove();
    previewReturnPoint = null;
    window.scrollTo(0, previewScrollY);
    const toRect = previewPhone.getBoundingClientRect();
    animatePreview(previewPhone, fromRect, toRect);
    openPreviewLink?.focus({ preventScroll: true });
  }

  previewClose?.addEventListener('click', closeFocusedPreview);
  previewDialog?.addEventListener('cancel', event => { event.preventDefault(); closeFocusedPreview(); });
  previewDialog?.addEventListener('click', event => { if (event.target === previewDialog) closeFocusedPreview(); });

  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy && window.startAlloWave) window.startAlloWave(heroCopy, '.hero-wave-line');

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
    return [source, ...Object.entries(campaignParams).map(([key, value]) => `${key}=${value}`)].join(';').slice(0, 180);
  }

  function track(name, details = {}) {
    const params = { method: 'The Fourth Club smoke test', early_access_cta_clicked: sessionStorage.getItem(ctaClickedKey) === 'yes' || sessionStorage.getItem(olderCtaClickedKey) === 'yes' || sessionStorage.getItem(legacyCtaClickedKey) === 'yes', ...details, ...campaignParams };
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.clarity === 'function') window.clarity('event', name);
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
