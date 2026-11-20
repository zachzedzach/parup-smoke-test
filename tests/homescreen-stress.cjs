const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const dir = path.resolve(__dirname, '..') + path.sep;
let passed = 0;

function app(reducedMotion = false) {
  const dom = new JSDOM('<html class="homescreen-mode"><body></body></html>', {
    runScripts: 'outside-only',
    url: 'https://example.test/?homescreen=1',
  });
  const w = dom.window;
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

function site(homeScreen) {
  const html = `<html${homeScreen ? ' class="homescreen-mode"' : ''}><body>
    <button class="hero-photo-card"><img class="hero-photo" data-src="assets/a.webp"></button>
    <button class="hero-photo-card"><img class="hero-photo" data-src="assets/b.webp"></button>
    <button class="hero-photo-card"><img class="hero-photo" data-src="assets/c.webp"></button>
  </body></html>`;
  const w = new JSDOM(html, { runScripts: 'outside-only', url: `https://example.test/${homeScreen ? '?homescreen=1' : ''}` }).window;
  // Let resolved preview-animation promises finish before disposing of their document.
  w.close = () => {};
  w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  w.ROUNDFOLK_CONFIG = {};
  w.eval(fs.readFileSync(path.join(dir, 'assets/allo-wave.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(dir, 'site.js'), 'utf8'));
  return w;
}

function previewSite(phone = false, reduce = true) {
  const html = '<html><body><section class="app-preview-stage"><div class="preview-guide"><a class="open-app-link" href="?homescreen=1">Open the full-screen preview</a></div><article class="interactive-round phone-preview"><div id="embedded-app-mount"></div></article></section><dialog id="focused-preview-dialog"><button class="focused-preview-close">×</button><div class="focused-preview-stage"></div></dialog></body></html>';
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
    party = 'Just me', holes = '18 holes', pace = 'Steady', vibes = [], playWith = [],
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

check('marketing loads the first photo eagerly and the rest lazily', () => {
  const w = site(false), photos = [...w.document.querySelectorAll('.hero-photo')];
  assert.equal(photos[0].getAttribute('src'), 'assets/a.webp');
  assert.equal(photos[0].fetchPriority, 'high');
  assert.equal(photos[0].loading, 'eager');
  assert(photos.slice(1).every(photo => photo.loading === 'lazy'));
  w.close();
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

check('touch preview uses the full-screen takeover and has an exit', () => {
  const w = previewSite(true, true), link = w.document.querySelector('.open-app-link');
  const event = new w.MouseEvent('click', { bubbles: true, cancelable: true });
  link.dispatchEvent(event);
  assert(event.defaultPrevented);
  const dialog = w.document.querySelector('#focused-preview-dialog');
  assert(dialog.open && dialog.classList.contains('is-mobile-takeover'));
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
  click(w, '[data-action="begin"]'); next(w);
  assert(w.document.querySelector('[aria-invalid="true"]'));
  assert(!w.document.body.textContent.includes('Nonbinary'));
  assert.equal(w.document.querySelectorAll('[data-input="name"]').length, 1);
  w.close();
});

check('handicap slider starts at zero, supports decimals and plus indexes, and exact entry validates 54.0', () => {
  const w = app(); atStep(w, 0);
  const range = w.document.querySelector('[data-handicap-range]'), entry = w.document.querySelector('[data-input="handicap"]');
  assert(range);
  assert.equal(range.value, '0');
  assert.equal(entry.value, '0.0');
  range.value = '-1.2'; range.dispatchEvent(new w.Event('input', { bubbles: true }));
  assert.equal(entry.value, '+1.2');
  assert.equal(w.document.querySelector('[data-handicap-value]').textContent, '+1.2');
  input(w, '[data-input="handicap"]', '54.0');
  assert(!entry.hasAttribute('aria-invalid'));
  input(w, '[data-input="handicap"]', '54.1');
  assert.equal(entry.getAttribute('aria-invalid'), 'true');
  assert(w.document.querySelector('.handicap-error').textContent.includes('54.0'));
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
  w.close();
});

check('partner score filter stays optional and supports any score', () => {
  const w = app(); atStep(w, 1);
  const disclosure = w.document.querySelector('.partner-score-filter');
  assert(disclosure && !disclosure.open);
  disclosure.open = true;
  assert.equal(w.document.querySelectorAll('[data-playing-level]').length, 7);
  click(w, '[data-playing-level="2"]');
  assert.equal(w.document.querySelector('[data-playing-level="2"]').getAttribute('aria-pressed'), 'true');
  click(w, '[data-any-level]');
  assert.equal(w.document.querySelector('[data-any-level]').getAttribute('aria-pressed'), 'true');
  w.close();
});

check('course picker starts near the golfer and searches by county', () => {
  const w = app(); atStep(w, 2, { city: 'Provo, UT' });
  assert.equal(w.document.querySelector('[data-course]').dataset.course, 'East Bay Golf Course');
  assert.equal(w.document.querySelector('.setup-page>.pref-intro'), null);
  input(w, '#course-search', 'Utah County');
  const rows = [...w.document.querySelectorAll('[data-course]')];
  assert(rows.length > 1);
  assert(rows.every(row => row.dataset.county === 'Utah'));
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
  input(w, '[data-day-time="Friday"]', '16:41');
  input(w, '[data-day-time="Sunday"]', '08:00');
  assert.equal(w.document.querySelector('[data-day-time="Friday"]').value, '16:45');
  assert.equal(w.document.querySelector('[data-day-time="Friday"]').step, '900');
  click(w, '[data-day-toggle="Friday"]');
  click(w, '[data-day-toggle="Friday"]');
  assert.equal(w.document.querySelector('[data-day-time="Friday"]').value, '16:45');
  assert.equal(w.document.querySelector('[data-day-time="Sunday"]').value, '08:00');
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
  assert(w.document.body.textContent.includes('How many golfers are already in your group?'));
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
  const everyone = w.document.querySelector('input[name=playWith][value="Everyone"]');
  const women = w.document.querySelector('input[name=playWith][value="Women golfers"]');
  const men = w.document.querySelector('input[name=playWith][value="Men golfers"]');
  assert(everyone.checked);
  click(w, 'input[name=playWith][value="Women golfers"]');
  assert(women.checked && !everyone.checked && !men.checked);
  click(w, 'input[name=playWith][value="Men golfers"]');
  assert(men.checked && !everyone.checked && !women.checked);
  click(w, 'input[name=playWith][value="Everyone"]');
  assert(everyone.checked && !women.checked && !men.checked);
  w.close();
});

check('self-rating can be skipped and preferences say not set', () => {
  const w = app(); finishSetup(w, { skill: null, days: [] });
  click(w, '[data-action="edit"]');
  assert(w.document.body.textContent.includes('Usual score: Not set'));
  w.close();
});

check('completed profile leads to clear example groups and capacity copy', () => {
  const w = app(); finishSetup(w, { courses: ['East Bay Golf Course'], days: ['Friday'] });
  assert.equal(w.document.querySelector('.preferences-content h1').textContent, 'Groups for your week');
  assert(w.document.querySelector('.clubhouse-title').textContent.includes('Choose a group to preview asking to play'));
  assert(w.document.querySelector('.golf-plan-card [data-request]').textContent.includes('Preview asking to play'));
  assert(w.document.querySelector('.golf-plan-card').textContent.includes('East Bay Golf Course'));
  assert.equal(w.document.querySelector('.group-seats small').textContent, 'Room for you');
  assert(!w.document.body.textContent.includes('Need room for you'));
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
  assert(w.document.querySelector('.empty-partners').textContent.includes('Choose the days you’re usually free'));
  w.close();
});

check('save and skip actions can be recovered from Saved', () => {
  const w = app(); click(w, '[data-action="sample"]');
  click(w, '[data-save="jordan"]');
  click(w, '[data-pass="jordan"]');
  click(w, '[data-view="saved"]');
  assert(w.document.querySelector('[data-plan="jordan"]'));
  click(w, '[data-pass="jordan"]');
  click(w, '[data-view="home"]');
  assert(w.document.querySelector('[data-plan="jordan"]'));
  w.close();
});

check('a mutual yes leads to the selected course booking page', () => {
  const w = app();
  finishSetup(w, { courses: ['Sleepy Ridge Golf Course'], days: ['Saturday'], party: 'Me and 1 other' });
  click(w, '[data-request="jordan"]');
  assert(w.document.body.textContent.includes('Waiting for their answer'));
  assert(!w.document.querySelector('.booking-next a'));
  click(w, '[data-reply="jordan"]');
  const booking = w.document.querySelector('.booking-next a');
  assert(booking);
  assert.equal(booking.href, w.FOURTH_BOOKING_LINKS['Sleepy Ridge Golf Course'].url);
  assert(w.document.querySelector('.booking-summary').textContent.includes('Sleepy Ridge Golf Course'));
  assert(w.document.querySelector('.booking-summary').textContent.includes('Saturday'));
  w.close();
});

check('every public or municipal course has a direct booking or phone destination', () => {
  const w = app(), courses = w.FOURTH_COURSES.filter(course => course.access !== 'private');
  assert.equal(courses.length, 94);
  for (const course of courses) {
    const url = w.FOURTH_BOOKING_LINKS[course.name]?.url;
    assert(url && (url.startsWith('https://') || url.startsWith('tel:+')), `${course.name} needs a booking destination`);
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
