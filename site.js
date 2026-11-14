(() => {
  const config = window.PARUP_CONFIG || {};
  const form = document.getElementById('signup-form');
  const status = document.getElementById('form-status');
  const submit = form?.querySelector('button[type="submit"]');
  const frame = document.getElementById('signup-response');
  const endpoint = String(config.signupEndpoint || '').trim();
  const sourceField = document.getElementById('signup-source');
  const ctaClickedKey = 'parup_download_cta_clicked';
  const viewedSections = new Set();
  const sentScrollDepths = new Set();
  let lastEngagementMark = 0;

  function track(name) {
    const params = { method: 'ParUp smoke test', download_cta_clicked: sessionStorage.getItem(ctaClickedKey) === 'yes' };
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  function trackDetail(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }

  if (config.googleAnalyticsId) {
    const ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.googleAnalyticsId);
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
  }

  if (!form || !submit || !status) return;
  document.querySelectorAll('[data-download-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      sessionStorage.setItem(ctaClickedKey, 'yes');
      if (sourceField) sourceField.value = 'download_button_clicked';
      track('parup_download_button_clicked');
    });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || viewedSections.has(entry.target.id)) return;
      viewedSections.add(entry.target.id);
      trackDetail('parup_section_viewed', { section_id: entry.target.id, section_name: entry.target.dataset.analyticsName || entry.target.id });
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
        trackDetail('parup_scroll_depth', { percent: threshold });
      }
    });
  }, { passive: true });
  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    lastEngagementMark += 1;
    if ([10, 30, 60].includes(lastEngagementMark)) trackDetail('parup_engaged_time', { seconds: lastEngagementMark });
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
    track('parup_signup_started');
  });

  window.addEventListener('message', (event) => {
    if (!frame || event.source !== frame.contentWindow || !['https://script.google.com', 'https://script.googleusercontent.com'].includes(event.origin) || event.data?.type !== 'parup-signup') return;
    if (event.data.status === 'success') {
      form.reset();
      submit.disabled = false;
      status.textContent = 'You’re on the list. We’ll be in touch when ParUp is ready.';
      track('parup_signup_completed');
    } else if (event.data.status === 'duplicate') {
      submit.disabled = false;
      status.textContent = 'You’re already on the list. We’ll be in touch when ParUp is ready.';
      track('parup_signup_duplicate');
    } else {
      submit.disabled = false;
      status.textContent = 'We could not save that signup. Please check your connection and try again.';
      track('parup_signup_failed');
    }
  });
})();
