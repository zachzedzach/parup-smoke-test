(() => {
  const config = window.PARUP_CONFIG || {};
  const form = document.getElementById('signup-form');
  const status = document.getElementById('form-status');
  const submit = form?.querySelector('button[type="submit"]');
  const frame = document.getElementById('signup-response');
  const endpoint = String(config.signupEndpoint || '').trim();

  function track(name) {
    if (typeof window.gtag === 'function') window.gtag('event', name, { method: 'ParUp early access' });
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
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, 'clarity', 'script', config.clarityProjectId);
  }

  if (!form || !submit || !status) return;
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
    } else {
      submit.disabled = false;
      status.textContent = 'We could not save that signup. Please check your connection and try again.';
    }
  });
})();
