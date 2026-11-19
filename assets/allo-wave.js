(() => {
  const active = new WeakMap();

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
            const entries = [];
            const letters = [];
            lines.forEach((line, lineIndex) => {
              if (lineIndex) svg.append(document.createTextNode(' '));
              const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              text.setAttribute('x', '0');
              text.setAttribute('y', String(82 + lineIndex * 108));
              text.setAttribute('font-size', '100');
              text.setAttribute('font-family', 'Allo');
              text.setAttribute('font-weight', '650');
              text.setAttribute('style', 'font-variation-settings:"wght" 650,"ROND" 65;white-space:pre');
              for (const character of Array.from(line)) {
                const letter = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                letter.textContent = character;
                text.append(letter);
                letters.push(letter);
              }
              svg.append(text);
              entries.push({ text, line });
            });
            phrase.replaceChildren(svg);
            let widest = 0;
            for (const entry of entries) {
              let width = 0;
              try { width = entry.text.getComputedTextLength(); } catch {}
              if (!width) width = measure(entry.line);
              entry.text.setAttribute('textLength', String(width));
              entry.text.setAttribute('lengthAdjust', 'spacing');
              widest = Math.max(widest, width);
            }
            if (!widest) continue;
            svg.setAttribute('viewBox', `0 0 ${widest} ${108 * lines.length}`);
            svg.style.width = `${widest / 100}em`;
            state.runs.push({ letters, positions: letters.map((_, index) => index / Math.max(1, letters.length - 1)) });
          }
          if (state.media.matches) return;
          const start = performance.now();
          const animate = now => {
            if (generation !== state.generation || state.media.matches) return;
            if (!document.hidden && root.getBoundingClientRect().bottom > 0 && root.getBoundingClientRect().top < innerHeight) {
              const time = (now - start) / 1000;
              for (const run of state.runs) run.letters.forEach((letter, index) => {
                const end = index === 0 || index === run.letters.length - 1;
                const phase = 2 * Math.PI * run.positions[index] - time * 2 * Math.PI / 5.8;
                const weight = end ? 650 : 650 + 120 * Math.sin(phase + .12 * Math.sin(phase));
                letter.style.fontVariationSettings = `"wght" ${weight.toFixed(2)}, "ROND" 65`;
              });
            }
            state.frame = requestAnimationFrame(animate);
          };
          state.frame = requestAnimationFrame(animate);
        };
        if (document.fonts?.load) document.fonts.load('650 100px Allo').then(initialize).catch(() => {});
        else initialize();
      };
      state.media.addEventListener?.('change', () => {
        cancelAnimationFrame(state.frame);
        if (state.media.matches) state.runs.forEach(run => run.letters.forEach(letter => { letter.style.fontVariationSettings = '"wght" 650, "ROND" 65'; }));
        else state.rebuild();
      });
      active.set(root, state);
    }
    state.selector = selector;
    state.rebuild();
  };
})();
