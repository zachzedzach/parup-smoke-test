(() => {
  const active = new WeakMap();
  const waveDuration = 6.4;

  window.startAlloWave = (root, selector) => {
    let state = active.get(root);
    if (!state) {
      state = { frame: 0, generation: 0, runs: [], media: matchMedia('(prefers-reduced-motion: reduce)') };
      state.rebuild = () => {
        cancelAnimationFrame(state.frame);
        const generation = ++state.generation;
        state.runs = [];
        const phrases = [...root.querySelectorAll(state.selector)];
        const initialize = () => {
          if (generation !== state.generation) return;
          for (const phrase of phrases) {
            if (!phrase.isConnected) continue;
            const value = phrase.textContent.trim();
            if (!value) continue;
            phrase.setAttribute('aria-label', value);
            const fontSize = parseFloat(getComputedStyle(phrase).fontSize) || 34;
            const available = ((phrase.matches('.welcome-living-type,.hero-wave-line') ? phrase.parentElement?.clientWidth : phrase.clientWidth) || root.clientWidth || 620) / fontSize * 100;
            const context = typeof CanvasRenderingContext2D !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
            if (context) context.font = '650 100px Allo';
            const measure = text => context ? context.measureText(text).width : text.length * 52;
            const lines = [];
            let current = '';
            for (const word of value.split(/\s+/)) {
              const candidate = current ? `${current} ${word}` : word;
              if (current && measure(candidate) > available) { lines.push(current); current = word; }
              else current = candidate;
            }
            if (current) lines.push(current);

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('class', 'allo-wave-svg');
            const letters = [];
            let widest = 0;
            lines.forEach((line, lineIndex) => {
              const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              text.setAttribute('x', '0');
              text.setAttribute('y', String(82 + lineIndex * 108));
              text.setAttribute('font-size', '100');
              text.setAttribute('font-family', 'Allo');
              text.setAttribute('font-weight', '650');
              text.setAttribute('style', 'font-variation-settings:"wght" 650,"ROND" 65;white-space:pre');
              const characters = Array.from(line);
              let cursor = 0;
              for (const [index, character] of characters.entries()) {
                const letter = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                letter.textContent = character;
                if (character === 'i' && characters[index - 1] === 'F' && value.startsWith('Find your')) cursor -= 7;
                letter.setAttribute('x', String(cursor));
                text.append(letter);
                letters.push(letter);
                const previous = characters.slice(0, index).join('');
                cursor += measure(previous + character) - measure(previous);
              }
              svg.append(text);
            widest = Math.max(widest, measure(line) - (value.startsWith('Find your') && line === 'Find your' ? 7 : 0));
            });
            phrase.replaceChildren(svg);
            if (!widest) continue;
            svg.setAttribute('viewBox', `0 0 ${widest} ${108 * lines.length}`);
            svg.style.width = `${widest / 100}em`;
            const last = letters.length - 1;
            const movingLetters = letters.filter((letter, index) => index !== 0 && index !== last && /[\p{L}\p{N}]/u.test(letter.textContent || ''));
            const rightToLeft = value.toLocaleLowerCase().endsWith('one more.');
            movingLetters.forEach((letter, index) => {
              letter.classList.add('wave-letter');
              const progress = index / Math.max(1, movingLetters.length - 1);
              letter.style.animationDelay = `${-(rightToLeft ? 1 - progress : progress) * waveDuration}s`;
            });
            state.runs.push({ letters });
          }
          if (state.media.matches) state.runs.forEach(run => run.letters.forEach(letter => letter.classList.remove('wave-letter')));
        };
        if (document.fonts?.load) document.fonts.load('650 100px Allo').then(initialize).catch(() => {});
        else initialize();
      };
      state.media.addEventListener?.('change', () => {
        cancelAnimationFrame(state.frame);
        if (state.media.matches) state.runs.forEach(run => run.letters.forEach(letter => letter.classList.remove('wave-letter')));
        else state.rebuild();
      });
      active.set(root, state);
    }
    state.selector = selector;
    state.rebuild();
  };
})();
