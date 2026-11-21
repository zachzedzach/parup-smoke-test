const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const dir = path.resolve(__dirname, '..') + path.sep;
let passed = 0;

function app(reducedMotion = false, heroImage) {
  const dom = new JSDOM('<html class="homescreen-mode"><body></body></html>', {
    runScripts: 'outside-only',
    url: 'https://example.test/?homescreen=1',
  });
  const w = dom.window;
  w.__timers = new Map();
  let timerId = 0;
  w.setTimeout = (fn, delay) => { const id = ++timerId; w.__timers.set(id, { fn, delay }); return id; };
  w.clearTimeout = id => w.__timers.delete(id);
  if (heroImage) w.FOURTH_CLUB_HERO_IMAGE = heroImage;
  w.matchMedia = () => ({ matches: reducedMotion, addEventListener() {}, removeEventListener() {} });
  w.structuredClone = structuredClone;
  w.requestAnimationFrame = () => 1;
  w.cancelAnimationFrame = () => {};
  w.Element.prototype.getAnimations = () => [];
  w.Element.prototype.animate = () => ({ finished: Promise.resolve(), cancel() {} });
  for (const file of ['assets/allo-wave.js', 'assets/utah-courses.js', 'assets/course-booking-links.js', 'assets/homescreen.js']) {
    w.eval(fs.readFileSync(path.join(dir, file), 'utf8'));
  }
  return w;
}

function site(homeScreen, rotationStore = {}) {
  const html = `<html${homeScreen ? ' class="homescreen-mode"' : ''}><body>
    <button class="hero-photo-card"><img class="hero-photo" data-src="assets/a.webp"></button>
    <button class="hero-photo-card"><img class="hero-photo" data-src="assets/b.webp"></button>
    <button class="hero-photo-card"><img class="hero-photo" data-src="assets/c.webp"></button>
  </body></html>`;
  const w = new JSDOM(html, { runScripts: 'outside-only', url: `https://example.test/${homeScreen ? '?homescreen=1' : ''}` }).window;
  // Let resolved preview-animation promises finish before disposing of their document.
  w.close = () => {};
  w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  Object.defineProperty(w, 'localStorage', { value: {
    getItem: key => Object.hasOwn(rotationStore, key) ? rotationStore[key] : null,
    setItem: (key, value) => { rotationStore[key] = String(value); },
  } });
  w.ROUNDFOLK_CONFIG = {};
  w.eval(fs.readFileSync(path.join(dir, 'assets/allo-wave.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(dir, 'site.js'), 'utf8'));
  return w;
}

function previewSite(phone = false, reduce = true) {
  const html = '<html><body><section class="app-preview-stage"><div class="preview-guide"><a class="open-app-link" href="?homescreen=1">Open the full-screen preview<svg aria-hidden="true"></svg></a></div><article class="interactive-round phone-preview"><div id="embedded-app-mount"><button class="app-action">Continue in preview</button></div></article></section><dialog id="focused-preview-dialog"><button class="focused-preview-close">×</button><div class="focused-preview-stage"></div></dialog></body></html>';
  const w = new JSDOM(html, { runScripts: 'outside-only', url: 'https://example.test/#try-round' }).window;
  // Let resolved preview-animation promises finish before disposing of their document.
  w.close = () => {};
  w.matchMedia = query => ({ matches: query.includes('pointer: coarse') ? phone : query.includes('prefers-reduced-motion') ? reduce : false });
  w.__animationCalls = [];
  w.Element.prototype.animate = function (frames, options) {
    w.__animationCalls.push({ frames, options });
    return { finished: Promise.resolve(), cancel() {} };
  };
  w.ROUNDFOLK_CONFIG = {};
  w.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  w.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
  w.scrollTo = () => {};
  w.eval(fs.readFileSync(path.join(dir, 'site.js'), 'utf8'));
  return w;
}

function click(w, selector) {
  const element = w.document.querySelector(selector);
  assert(element, `Missing ${selector}`);
  element.click();
}

function input(w, selector, value) {
  const element = w.document.querySelector(selector);
  assert(element, `Missing ${selector}`);
  element.value = value;
  element.dispatchEvent(new w.Event('input', { bubbles: true }));
}

function next(w) { click(w, '[data-action="next"]'); }

function atStep(w, target, { name = 'Sam', city = 'Provo' } = {}) {
  click(w, '[data-action="begin"]');
  input(w, '[data-input="name"]', name);
  if (city) input(w, '[data-input="city"]', city);
  for (let step = 0; step < target; step++) next(w);
}

function finishSetup(w, options = {}) {
  const {
    name = 'Sam', city = 'Provo', skill = 2, courses = [], days = ['Saturday'], times = {},
    party = 'Just me', holes = '18 holes', pace = 'Steady', vibes = [], playWith = [], smoking = false,
  } = options;
  atStep(w, 0, { name, city });
  next(w); // score
  if (skill !== null) click(w, `[data-skill="${skill}"]`);
  next(w); // courses
  for (const course of courses) {
    const search = w.document.querySelector('#course-search');
    if (search && !w.document.querySelector(`[data-course="${course}"]`)) input(w, '#course-search', course);
    click(w, `[data-course="${course}"]`);
  }
  next(w); // availability
  for (const day of days) click(w, `[data-day-toggle="${day}"]`);
  for (const [day, value] of Object.entries(times)) input(w, `[data-day-time="${day}"]`, value);
  next(w); // usual round
  click(w, `[data-single="party"][data-value="${party}"]`);
  click(w, `[data-single="holes"][data-value="${holes}"]`);
  click(w, `[data-single="pace"][data-value="${pace}"]`);
  next(w); // round preferences
  for (const value of vibes) click(w, `[data-value="${value}"]`);
  for (const value of playWith) click(w, `[data-value="${value}"]`);
  if (smoking) {
    const control = w.document.querySelector('[data-smoking]');
    control.checked = true;
    control.dispatchEvent(new w.Event('change', { bubbles: true }));
  }
  next(w); // results
}

function check(name, fn) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}

check('homescreen skips loading marketing photos', () => {
  const w = site(true), photos = [...w.document.querySelectorAll('.hero-photo')];
  assert.equal(photos.length, 3);
  assert(photos.every(photo => !photo.hasAttribute('src') && photo.dataset.src));
  w.close();
});

check('marketing rotates its photos on each visit and loads them efficiently', () => {
  const sourceText = fs.readFileSync(path.join(dir, 'site.js'), 'utf8');
  const photoLibrary = [...sourceText.matchAll(/'((?:assets\/pexels-golf\/)[^']+\.webp)'/g)].map(match => match[1]);
  assert.equal(photoLibrary.length, 18);
  assert.equal(new Set(photoLibrary).size, photoLibrary.length);
  for (const src of photoLibrary) assert(fs.existsSync(path.join(dir, src)));
  const rotationStore = {};
  const first = site(false, rotationStore), firstPhotos = [...first.document.querySelectorAll('.hero-photo')];
  const firstSet = firstPhotos.map(photo => photo.getAttribute('src'));
  assert.equal(firstPhotos[0].getAttribute('src'), first.FOURTH_CLUB_HERO_IMAGE);
  assert.equal(new Set(firstSet).size, 3);
  assert(firstSet.every(src => src.startsWith('assets/pexels-golf/')));
  assert.equal(firstPhotos[0].fetchPriority, 'high');
  assert.equal(firstPhotos[0].loading, 'eager');
  assert(firstPhotos.slice(1).every(photo => photo.loading === 'lazy'));
  const second = site(false, rotationStore), secondPhotos = [...second.document.querySelectorAll('.hero-photo')];
  const secondSet = secondPhotos.map(photo => photo.getAttribute('src'));
  assert.notEqual(second.FOURTH_CLUB_HERO_IMAGE, first.FOURTH_CLUB_HERO_IMAGE);
  assert.equal(new Set(secondSet).size, 3);
  assert(secondSet.every(src => !firstSet.includes(src)));
  for (const src of [...firstSet, ...secondSet]) assert(fs.existsSync(path.join(dir, src)));
  const phone = app(false, first.FOURTH_CLUB_HERO_IMAGE);
  assert.equal(phone.document.querySelector('.story-visual img').getAttribute('src'), first.FOURTH_CLUB_HERO_IMAGE);
  phone.close();
  first.close();
  second.close();
});

check('hero photo cards are unique and select only the tapped photo', () => {
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  const w = new JSDOM(html).window;
  const photos = [...w.document.querySelectorAll('.hero-photo-card img')];
  assert.equal(photos.length, 3);
  assert.equal(new Set(photos.map(photo => photo.dataset.src)).size, 3);
  assert(photos.every(photo => photo.closest('button').hasAttribute('aria-label')));
  w.close();
  const preview = site(false), cards = [...preview.document.querySelectorAll('.hero-photo-card')];
  cards[1].click();
  assert.deepEqual(cards.map(card => card.getAttribute('aria-pressed')), ['false', 'true', 'false']);
  preview.close();
});

check('desktop preview opens, animates, closes, and returns the phone', () => {
  const w = previewSite(false, false), link = w.document.querySelector('.open-app-link');
  link.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
  const dialog = w.document.querySelector('#focused-preview-dialog'), phone = w.document.querySelector('.interactive-round');
  assert(dialog.open);
  assert.equal(phone.parentElement, w.document.querySelector('.focused-preview-stage'));
  assert.equal(w.__animationCalls[0].options.duration, 560);
  w.document.querySelector('.focused-preview-close').click();
  assert(!dialog.open);
  assert.equal(phone.parentElement, w.document.querySelector('.app-preview-stage'));
  w.close();
});

check('first tap anywhere on the phone expands it before the app action', () => {
  const w = previewSite(true, true), appAction = w.document.querySelector('.app-action');
  let appActionCount = 0;
  appAction.addEventListener('click', () => appActionCount++);
  const event = new w.MouseEvent('click', { bubbles: true, cancelable: true });
  appAction.dispatchEvent(event);
  assert(event.defaultPrevented);
  const dialog = w.document.querySelector('#focused-preview-dialog');
  assert(dialog.open && dialog.classList.contains('is-mobile-takeover'));
  assert.equal(appActionCount, 0, 'the first tap should only open full screen');
  appAction.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert.equal(appActionCount, 1, 'the next tap should activate the app control');
  w.close();
});

check('reduced motion and focused preview styles are supported', () => {
  const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /focused-preview-dialog/);
  const w = previewSite(false, true);
  w.document.querySelector('.open-app-link').dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
  assert.equal(w.__animationCalls.length, 0);
  w.close();
});

check('profile requires a first name and omits the removed gender choice', () => {
  const w = app();
  click(w, '[data-action="begin"]');
  assert(w.document.querySelector('.step-0 h3').textContent.includes("I'm a:"));
  next(w);
  assert(w.document.querySelector('[aria-invalid="true"]'));
  assert(!w.document.body.textContent.includes('Nonbinary'));
  assert.equal(w.document.querySelectorAll('[data-input="name"]').length, 1);
  w.close();
});

check('handicap is a whole-number text field that accepts plus indexes', () => {
  const w = app(); atStep(w, 0);
  const entry = w.document.querySelector('[data-input="handicap"]');
  assert.equal(w.document.querySelector('[data-handicap-range]'), null);
  assert.equal(entry.type, 'text');
  assert.equal(entry.value, '0');
  input(w, '[data-input="handicap"]', '18');
  assert(!entry.hasAttribute('aria-invalid'));
  input(w, '[data-input="handicap"]', '+2');
  assert(!entry.hasAttribute('aria-invalid'));
  input(w, '[data-input="handicap"]', '18.4');
  assert.equal(entry.getAttribute('aria-invalid'), 'true');
  assert(w.document.querySelector('.handicap-error').textContent.includes('whole number'));
  input(w, '[data-input="handicap"]', '55');
  assert.equal(entry.getAttribute('aria-invalid'), 'true');
  w.close();
});

check('score choices have distinct cues, start unselected, and select one range', () => {
  const w = app(); atStep(w, 1);
  assert.equal(w.document.querySelector('.setup-page h1').textContent, 'What do you usually shoot for 18 holes?');
  const choices = [...w.document.querySelectorAll('[data-skill]')];
  assert.equal(choices.length, 7);
  assert(choices.every(choice => choice.getAttribute('aria-pressed') === 'false'));
  assert(choices.every(choice => choice.querySelector('small')?.textContent));
  assert(w.document.body.textContent.includes('change it later'));
  click(w, '[data-skill="3"]');
  assert.equal(choices.filter(choice => choice.getAttribute('aria-pressed') === 'true').length, 1);
  assert.equal(choices[3].querySelector('small').textContent, 'Starting to score around 100');
  assert.equal(w.document.querySelector('.partner-score-filter').open, true);
  w.close();
});

check('choosing a usual score scrolls partner choices into the visible phone area', () => {
  const w = app(); atStep(w, 1);
  const content = w.document.querySelector('.preferences-content');
  const originalRect = w.HTMLElement.prototype.getBoundingClientRect;
  Object.defineProperty(w.HTMLElement.prototype, 'clientHeight', { configurable: true, get() { return this === content ? 640 : 0; } });
  Object.defineProperty(w.HTMLElement.prototype, 'scrollHeight', { configurable: true, get() { return this === content ? 1400 : 0; } });
  w.HTMLElement.prototype.getBoundingClientRect = function() {
    if (this === content) return { top: 200, bottom: 840, left: 0, right: 400, width: 400, height: 640 };
    if (this.classList?.contains('setup-actions')) return { top: 840, bottom: 920, left: 0, right: 400, width: 400, height: 80 };
    if (this.matches?.('.partner-score-filter > summary')) {
      const top = 960 - content.scrollTop;
      return { top, bottom: top + 48, left: 0, right: 400, width: 400, height: 48 };
    }
    return originalRect.call(this);
  };
  click(w, '[data-skill="3"]');
  const summary = w.document.querySelector('.partner-score-filter > summary');
  const summaryRect = summary.getBoundingClientRect();
  assert(w.document.querySelector('.partner-score-filter').open);
  assert(content.scrollTop > 0, 'the phone content itself should scroll');
  assert(summaryRect.top >= 200 && summaryRect.top < 240, 'the partner question should move near the top of the visible content');
  assert(summaryRect.bottom < 840, 'the partner question should sit above the fixed Continue button');
  w.close();
});

check('partner score filter opens after choosing a score and supports any score', () => {
  const w = app(); atStep(w, 1);
  const disclosure = w.document.querySelector('.partner-score-filter');
  assert(disclosure && !disclosure.open);
  click(w, '[data-skill="3"]');
  assert.equal(disclosure.open, true);
  assert.equal(w.document.querySelectorAll('[data-playing-level]').length, 7);
  click(w, '[data-playing-level="2"]');
  assert.equal(w.document.querySelector('[data-playing-level="2"]').getAttribute('aria-pressed'), 'true');
  click(w, '[data-any-level]');
  assert.equal(w.document.querySelector('[data-any-level]').getAttribute('aria-pressed'), 'true');
  w.close();
});

check('course picker keeps geographic order and opens near the profile city', () => {
  const w = app(); atStep(w, 1, { city: 'Provo, UT' });
  const originalRect = w.HTMLElement.prototype.getBoundingClientRect;
  Object.defineProperty(w.HTMLElement.prototype, 'clientHeight', { configurable: true, get() { return this.classList?.contains('course-wheel') ? 180 : 0; } });
  w.HTMLElement.prototype.getBoundingClientRect = function() {
    if (this.classList?.contains('course-wheel')) return { top: 100, bottom: 280, left: 0, right: 400, width: 400, height: 180 };
    if (this.matches?.('[data-course]')) {
      const wheel = this.closest('.course-wheel'), index = [...wheel.querySelectorAll('[data-course]')].indexOf(this), top = 100 + index * 60 - wheel.scrollTop;
      return { top, bottom: top + 60, left: 0, right: 400, width: 400, height: 60 };
    }
    return originalRect.call(this);
  };
  next(w);
  const rows = [...w.document.querySelectorAll('[data-course]')];
  assert.equal(rows[0].dataset.course, 'Bear Lake Golf Course');
  assert(rows.every((row, index) => index === 0 || Number(rows[index - 1].dataset.latitude) >= Number(row.dataset.latitude)));
  assert(rows.findIndex(row => row.dataset.course === 'Logan River Golf Course') < rows.findIndex(row => row.dataset.course === 'East Bay Golf Course'));
  assert(rows.findIndex(row => row.dataset.course === 'East Bay Golf Course') < rows.findIndex(row => row.dataset.course === 'Sun River Golf Course'));
  const wheel = w.document.querySelector('.course-wheel'), target = rows.find(row => row.dataset.course === 'East Bay Golf Course');
  assert(wheel.scrollTop > 0);
  assert(target.getBoundingClientRect().top > wheel.getBoundingClientRect().top);
  assert(target.getBoundingClientRect().top < wheel.getBoundingClientRect().bottom);
  assert.equal(w.document.querySelector('.setup-page>.pref-intro'), null);
  input(w, '#course-search', 'Utah County');
  const countyRows = [...w.document.querySelectorAll('[data-course]')];
  assert(countyRows.length > 1);
  assert(countyRows.every(row => row.dataset.county === 'Utah'));
  w.close();
});

check('course map follows the visible list from northern to southern Utah', () => {
  const w = app(); atStep(w, 2, { city: '' });
  const wheel = w.document.querySelector('.course-wheel'), rows = [...wheel.querySelectorAll('[data-course]')];
  wheel.getBoundingClientRect = () => ({ top: 100, bottom: 280, left: 0, right: 400, width: 400, height: 180 });
  rows.forEach((row, index) => { row.getBoundingClientRect = () => { const top = 100 + index * 60 - wheel.scrollTop; return { top, bottom: top + 60, left: 0, right: 400, width: 400, height: 60 }; }; });
  const scroll = amount => { wheel.scrollTop = amount; wheel.dispatchEvent(new w.Event('scroll', { bubbles: true })); };
  scroll(0);
  const northY = Number(w.document.querySelector('#course-map-band').getAttribute('y'));
  assert.equal(w.document.querySelector('#course-map-area').textContent, rows[1].dataset.county + ' County');
  assert.equal(w.document.querySelectorAll('.course-locator .is-visible').length, 3);
  scroll((rows.length - 3) * 60);
  const southY = Number(w.document.querySelector('#course-map-band').getAttribute('y'));
  assert.equal(w.document.querySelector('#course-map-area').textContent, 'Washington County');
  assert(southY > northY);
  assert.equal(w.document.querySelectorAll('.course-locator .is-visible').length, 3);
  w.close();
});

check('course selection turns its map dot green and removal clears it', () => {
  const w = app(); atStep(w, 2);
  const name = 'East Bay Golf Course';
  click(w, `[data-course="${name}"]`);
  assert(w.document.querySelector(`[data-map-course="${name}"]`).classList.contains('is-selected'));
  click(w, `[data-remove-course="${name}"]`);
  assert(!w.document.querySelector(`[data-map-course="${name}"]`).classList.contains('is-selected'));
  w.close();
});

check('course sorting retains the search screen and shows A to Z order', () => {
  const w = app(); atStep(w, 2);
  click(w, '[data-course-sort="name"]');
  const names = [...w.document.querySelectorAll('[data-course]')].map(row => row.dataset.course);
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
  assert.equal(w.document.querySelector('.setup-page h1').textContent, 'Where do you play?');
  w.close();
});

check('weekday buttons reveal independent quarter-hour times and preserve them', () => {
  const w = app(); atStep(w, 3);
  assert.equal(w.document.querySelectorAll('[data-day-toggle]').length, 7);
  click(w, '[data-day-toggle="Friday"]');
  click(w, '[data-day-toggle="Sunday"]');
  click(w, '[data-day-toggle="Saturday"]');
  input(w, '[data-day-time="Friday"]', '16:41');
  input(w, '[data-day-time="Sunday"]', '08:00');
  assert.equal(w.document.querySelector('[data-day-time="Friday"]').value, '16:45');
  assert.equal(w.document.querySelector('[data-day-time="Friday"]').step, '900');
  click(w, '[data-day-toggle="Friday"]');
  click(w, '[data-day-toggle="Friday"]');
  assert.equal(w.document.querySelector('[data-day-time="Friday"]').value, '16:45');
  assert.equal(w.document.querySelector('[data-day-time="Sunday"]').value, '08:00');
  let pickerOpens = 0;
  const saturdayInput = w.document.querySelector('[data-day-time="Saturday"]');
  saturdayInput.showPicker = () => { pickerOpens++; };
  w.document.querySelector('[data-day-time="Saturday"]').closest('.day-time-row').querySelector('b').click();
  assert.equal(pickerOpens, 1, 'tapping the day label should open its native time picker');
  w.close();
});

check('matching window explains its range and moves in 15-minute increments', () => {
  const w = app(); atStep(w, 3);
  click(w, '[data-day-toggle="Monday"]');
  const slider = w.document.querySelector('#time-tolerance');
  assert.equal(slider.step, '15');
  slider.value = '15';
  slider.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert(w.document.querySelector('#tolerance-explanation').textContent.includes('7:45 AM–8:15 AM'));
  w.close();
});

check('usual round choices clarify party size, holes, and pace', () => {
  const w = app(); atStep(w, 4);
  assert(w.document.body.textContent.includes('How many golfers do you usually bring with you?'));
  click(w, '[data-single="party"][data-value="Me and 1 other"]');
  click(w, '[data-single="holes"][data-value="9 holes"]');
  click(w, '[data-single="pace"][data-value="Quick"]');
  assert.equal(w.document.querySelector('[data-single="party"][aria-pressed="true"]').dataset.value, 'Me and 1 other');
  assert.equal(w.document.querySelector('[data-single="holes"][aria-pressed="true"]').dataset.value, '9 holes');
  assert.equal(w.document.querySelector('[data-single="pace"][aria-pressed="true"]').dataset.value, 'Quick');
  w.close();
});

check('round-style choices stay paired and playing audience is one exclusive radio choice', () => {
  const w = app(); atStep(w, 5);
  click(w, '[data-value="Music is fine"]');
  click(w, '[data-value="Prefer no music"]');
  assert.equal(w.document.querySelector('[data-value="Music is fine"]').getAttribute('aria-pressed'), 'false');
  assert.equal(w.document.querySelector('[data-value="Prefer no music"]').getAttribute('aria-pressed'), 'true');
  const partners = app(); atStep(partners, 1);
  const disclosure = partners.document.querySelector('.partner-preferences');
  assert(disclosure && !disclosure.open);
  disclosure.open = true;
  const everyone = partners.document.querySelector('input[name=playWith][value="Everyone"]');
  const women = partners.document.querySelector('input[name=playWith][value="Women golfers"]');
  const men = partners.document.querySelector('input[name=playWith][value="Men golfers"]');
  assert(everyone.checked);
  click(partners, 'input[name=playWith][value="Women golfers"]');
  assert(women.checked && !everyone.checked && !men.checked);
  click(partners, 'input[name=playWith][value="Men golfers"]');
  assert(men.checked && !everyone.checked && !women.checked);
  click(partners, 'input[name=playWith][value="Everyone"]');
  assert(everyone.checked && !women.checked && !men.checked);
  w.close(); partners.close();
});

check('Smoking includes smoker matches and hides public rounds from golfers who avoid smoking', () => {
  const w = app(); finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Friday'] });
  assert(!w.document.querySelector('[data-plan="casey"]'));
  click(w, '[data-action="edit"]');
  click(w, '[data-edit-step="5"]');
  const smoking = w.document.querySelector('[data-smoking]');
  assert.equal(w.document.querySelectorAll('[data-field="hideFrom"]').length, 2);
  assert.equal(smoking.closest('label').querySelector('b').textContent, 'Smoking');
  assert(smoking.closest('label').textContent.includes('Include golfers who smoke in matches'));
  smoking.checked = true;
  smoking.dispatchEvent(new w.Event('change', { bubbles: true }));
  assert.equal(w.document.querySelector('.visibility-settings>summary small').textContent, 'Anyone comfortable with smoking');
  assert(smoking.closest('label').textContent.includes('public rounds are visible to golfers comfortable with smoking'));
  next(w);
  click(w, '[data-view="home"]');
  assert(w.document.querySelector('[data-plan="casey"]'));
  click(w, '[data-action="create-round"]');
  click(w, '[data-action="post-round"]');
  assert(w.document.body.textContent.includes('visible to anyone comfortable with smoking'));
  click(w, '[data-action="preview-join"]');
  assert(w.document.body.textContent.includes('Alex asked to join · example'));
  assert(!w.document.body.textContent.includes('Jordan asked to join · example'));
  w.close();
});

check('Women and Men round-visibility choices use two equal columns', () => {
  const stylesheet = fs.readFileSync(path.join(dir, 'assets/homescreen.css'), 'utf8');
  assert.match(stylesheet, /\.step-5 \.visibility-settings>\.pref-chips\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(stylesheet, /\.visibility-settings>summary\{grid-template-columns:minmax\(0,1fr\) 18px;grid-template-rows:auto auto\}/);
});

check('turning Smoking off restores smoke-free visibility and hides smoker matches', () => {
  const w = app(); finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Friday'] });
  click(w, '[data-action="edit"]');
  click(w, '[data-edit-step="5"]');
  const smoking = w.document.querySelector('[data-smoking]');
  smoking.checked = true;
  smoking.dispatchEvent(new w.Event('change', { bubbles: true }));
  smoking.checked = false;
  smoking.dispatchEvent(new w.Event('change', { bubbles: true }));
  next(w);
  assert(w.document.body.textContent.includes('Everyone'));
  click(w, '[data-view="home"]');
  assert(!w.document.querySelector('[data-plan="casey"]'));
  w.close();
});

check('self-rating can be skipped and preferences say not set', () => {
  const w = app(); finishSetup(w, { skill: null, days: [] });
  click(w, '[data-action="edit"]');
  assert(w.document.body.textContent.includes('Usual score: Not set'));
  w.close();
});

check('completed profile leads to clear example groups and capacity copy', () => {
  const w = app(); finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Friday'], smoking: true });
  assert.equal(w.document.querySelector('.preferences-content h1').textContent, 'Groups for your week');
  assert(w.document.querySelector('.clubhouse-title').textContent.includes('These examples use your usual courses and times. They’re sample golfers; no real requests are sent.'));
  assert.equal(w.document.querySelector('.golf-plan-card [data-request]').textContent, 'Ask to play');
  assert(w.document.querySelector('.golf-plan-card').textContent.includes('East Bay Golf Course'));
  assert.equal(w.document.querySelector('.group-seats small').textContent, 'Room for you');
  assert(!w.document.body.textContent.includes('Need room for you'));
  const casey = w.document.querySelector('[data-plan="casey"]');
  assert.equal(casey.querySelectorAll('.group-seats > span').length, 4);
  assert(casey.querySelector('.seat-golfer img').src.endsWith('pexels-19003912.webp'));
  assert.equal(casey.querySelector('.group-seats').getAttribute('aria-label'), '1 golfer, 3 open spots');
  click(w, '[data-request="casey"]');
  click(w, '[data-reply="casey"]');
  const acceptedCasey = w.document.querySelector('[data-plan="casey"]');
  assert.equal(acceptedCasey.querySelector('.seat-you').textContent, 'S');
  assert.equal(acceptedCasey.querySelector('.group-seats').getAttribute('aria-label'), '2 golfers, 2 open spots');
  assert.equal(acceptedCasey.querySelector('.group-seats small').textContent, 'You’re in');
  w.close();
});

check('app screens show a back arrow separate from reset and return to the prior view', () => {
  const w = app(); finishSetup(w);
  const homeBack = w.document.querySelector('[data-action=app-back]');
  assert(homeBack, 'rounds screen should show a back arrow');
  assert.equal(homeBack.getAttribute('aria-label'), 'Back');
  assert(w.document.querySelector('[data-action=reset]'), 'reset remains a separate control');
  click(w, '[data-action=app-back]');
  assert.equal(w.document.querySelector('.setup-page').className, 'setup-page step-5');
  assert.equal(w.document.querySelector('[data-action=app-back]'), null);
  assert(w.document.querySelector('[data-action=back]'));

  click(w, '[data-action=back]');
  assert.equal(w.document.querySelector('.preference-sections') !== null, true);
  assert(w.document.querySelector('[data-action=app-back]'), 'preferences should show a back arrow');
  click(w, '[data-action=app-back]');
  assert.equal(w.document.querySelector('.clubhouse-title h1').textContent, 'Groups for your week');

  click(w, '[data-view=saved]');
  assert(w.document.querySelector('[data-action=app-back]'), 'saved rounds should show a back arrow');
  click(w, '[data-action=app-back]');
  assert.equal(w.document.querySelector('.clubhouse-title h1').textContent, 'Groups for your week');
  w.close();
});

check('sample rounds back arrow returns to the welcome screen', () => {
  const w = app(); click(w, '[data-action=sample]');
  click(w, '[data-action=app-back]');
  assert.equal(w.document.querySelector('.welcome-copy h1').textContent, 'There’s room for one more.');
  w.close();
});

check('two-player preference hides plans without two open spots', () => {
  const w = app(); finishSetup(w, { courses: ['Fox Hollow Golf Course'], days: ['Friday'], party: 'Me and 1 other' });
  assert(w.document.querySelector('[data-plan="jordan"]'));
  assert(!w.document.querySelector('[data-plan="alex"]'));
  w.close();
});

check('no usual days produces a useful empty state rather than invented plans', () => {
  const w = app(); finishSetup(w, { days: [] });
  assert.equal(w.document.querySelectorAll('.golf-plan-card').length, 0);
  assert(w.document.querySelector('.empty-partners').textContent.includes('Choose the days you usually play'));
  w.close();
});

check('saved plans stay available without hiding the listing', () => {
  const w = app(); click(w, '[data-action="sample"]');
  click(w, '[data-save="jordan"]');
  click(w, '[data-view="saved"]');
  assert(w.document.querySelector('[data-plan="jordan"]'));
  click(w, '[data-view="home"]');
  assert(w.document.querySelector('[data-plan="jordan"]'));
  assert(!w.document.querySelector('[data-pass]'));
  w.close();
});

check('a mutual yes links to the selected course homepage', () => {
  const w = app();
  finishSetup(w, { courses: ['Sleepy Ridge Golf Course'], days: ['Saturday'], party: 'Me and 1 other' });
  click(w, '[data-request="jordan"]');
  assert.equal(w.document.querySelector('[data-request="jordan"]').textContent, 'Request sent');
  assert(w.document.body.textContent.includes('Waiting for their answer'));
  assert(!w.document.querySelector('.booking-next p'), 'waiting state should not show the removed explanatory copy');
  assert([...w.__timers.values()].some(timer => timer.delay === 15000));
  assert(!w.document.querySelector('.booking-next a'));
  click(w, '[data-reply="jordan"]');
  assert(![...w.__timers.values()].some(timer => timer.delay === 15000));
  const booking = w.document.querySelector('.booking-next a');
  assert(booking);
  assert.equal(booking.href, 'https://www.sleepyridgegolf.com/');
  assert.equal(booking.textContent.trim(), 'Visit course website');
  assert(w.document.querySelector('.booking-next').textContent.includes('Visit the course website for details.'));
  assert(w.document.querySelector('.booking-summary').textContent.includes('Sleepy Ridge Golf Course'));
  assert(w.document.querySelector('.booking-summary').textContent.includes('Saturday'));
  w.close();
});

check('East Bay links to Provo’s official homepage instead of calling the course', () => {
  const w = app();
  finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Saturday'], smoking: true });
  click(w, '[data-request="casey"]');
  click(w, '[data-reply="casey"]');
  const link = w.document.querySelector('.booking-next a');
  assert.equal(link.href, 'https://www.provo.gov/');
  assert.equal(link.textContent.trim(), 'Visit course website');
  assert(!link.href.startsWith('tel:'));
  w.close();
});

check('asking to play simulates the request and opens the launch email signup', () => {
  const w = app();
  finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Friday'], smoking: true });
  const gate = w.document.createElement('dialog');
  gate.id = 'store-gate';
  gate.innerHTML = '<input id="signup-source">';
  w.document.body.append(gate);
  w.HTMLDialogElement.prototype.showModal = function() { this.setAttribute('open', ''); };
  w.ROUNDFOLK_CONFIG = {};
  w.eval(fs.readFileSync(path.join(dir, 'site.js'), 'utf8'));
  click(w, '[data-request="casey"]');
  assert.equal(w.document.querySelector('[data-request="casey"]').textContent, 'Request sent');
  assert(w.document.body.textContent.includes('Waiting for their answer'));
  assert(!w.document.querySelector('.booking-next p'), 'waiting state should not show the removed explanatory copy');
  assert.equal(gate.open, true);
  assert.equal(w.document.querySelector('#signup-source').value, 'interactive_preview_get_app');
  w.close();
});

check('example request is accepted after 15 seconds with a short celebration', () => {
  const w = app();
  finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Friday'], smoking: true });
  click(w, '[data-request="casey"]');
  const pending = [...w.__timers.entries()].find(([, timer]) => timer.delay === 15000);
  assert(pending);
  w.__timers.delete(pending[0]);
  pending[1].fn();
  const card = w.document.querySelector('[data-plan="casey"]');
  assert(card.textContent.includes('Both agreed to play · example'));
  assert(card.querySelector('.seat-you'));
  assert(card.querySelector('.acceptance-confetti'));
  w.close();
});

check('every public or municipal course links to a website homepage', () => {
  const w = app(), courses = w.FOURTH_COURSES.filter(course => course.access !== 'private');
  assert.equal(courses.length, 94);
  for (const course of courses) {
    const url = w.FOURTH_BOOKING_LINKS[course.name]?.url;
    assert(url && url.startsWith('https://'), `${course.name} needs a website homepage`);
    const destination = new URL(url);
    assert.equal(destination.pathname, '/', `${course.name} link should go to the homepage`);
    assert.equal(destination.search, '', `${course.name} homepage should not have a booking query`);
    assert.equal(destination.hash, '', `${course.name} homepage should not have a booking fragment`);
    assert(!/(foreupsoftware|chronogolf|membersports|golfrev|teeitup|tenfore|quick18|golfscape|golfpay|agilysys)/i.test(destination.hostname), `${course.name} should link to its own or operator website`);
  }
  assert(!w.FOURTH_COURSES.some(course => course.access === 'private' && w.document.querySelector(`[data-course="${course.name}"]`)));
  w.close();
});

check('specific round planning is separate from usual weekly availability', () => {
  const w = app(); finishSetup(w, { days: ['Saturday'] });
  click(w, '[data-action="create-round"]');
  assert(w.document.querySelector('.round-builder'));
  assert.equal(w.document.querySelector('.round-builder h1').textContent, 'Plan a specific round');
  assert(w.document.body.textContent.includes('Your usual playing schedule stays the same.'));
  assert(w.document.querySelector('[data-round-field="date"]'));
  assert(w.document.querySelector('[data-round-field="course"]'));
  assert(w.document.querySelector('[data-round-field="start"]'));
  w.close();
});

check('course booking catalog has no duplicate IDs or private course rows', () => {
  const w = app(); atStep(w, 2);
  const ids = [...w.document.querySelectorAll('[id]')].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length);
  assert(![...w.document.querySelectorAll('[data-course]')].some(row => row.textContent.toLowerCase().includes('private')));
  w.close();
});

check('setup progress matches six screens and the app keeps single interactive views', () => {
  const w = app(); atStep(w, 0);
  assert.equal(w.document.querySelector('.preferences-header>span').textContent, '1 of 6');
  assert.equal(w.document.querySelectorAll('.preferences-content').length, 1);
  next(w);
  assert.equal(w.document.querySelector('.preferences-header>span').textContent, '2 of 6');
  w.close();
});

console.log(`${passed} homescreen checks passed`);
