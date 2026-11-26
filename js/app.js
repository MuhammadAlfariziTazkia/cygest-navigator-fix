/* =========================================================================
   Cygest · Patient Navigator — APP
   Hash routes:  #/explore   #/recognize/<id>   #/recommend/<id>[/<evidence#>]
   ========================================================================= */
(() => {
  'use strict';

  const { CATEGORIES, PROFILES } = window.NAV_DATA;
  const STEPS = ['explore', 'recognize', 'recommend'];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const byId = (id) => PROFILES.find((p) => p.id === id);
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------------------------------------------------------- Icons */
  const P = {
    work: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7M3 12.5h18M10.5 12.5v2h3v-2"/>',
    travel: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    needle: '<path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6"/><path d="M3 3l18 18" stroke-width="2.4"/>',
    stomach: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    wallet: '<path d="M19 7V4.5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1V12h-3.5a2 2 0 0 0 0 4H21v3.5a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-14"/>',
    drop: '<path d="M12 2.7S6 9 6 13.7a6 6 0 0 0 12 0C18 9 12 2.7 12 2.7z"/><path d="M9.2 14.2a2.9 2.9 0 0 0 2.8 2.8"/>',
    microbe: '<circle cx="12" cy="12" r="4.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2"/><circle cx="10.5" cy="11" r=".6"/><circle cx="13.3" cy="13" r=".6"/>',
    bleed: '<path d="M12 2.7S6 9 6 13.7a6 6 0 0 0 12 0C18 9 12 2.7 12 2.7z"/><path d="M8.3 14h2l1-2 1.6 4 1-2h1.8"/>',
    lowp4: '<path d="M3 3v18h18"/><path d="M7 7l4 6 3-2 5 6"/><path d="M3 10.5h18" stroke-dasharray="2 2.5" opacity=".7"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
    route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
    fit: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
    flask: '<path d="M9 3h6M10 3v6.5L4.6 18.6A1.6 1.6 0 0 0 6 21h12a1.6 1.6 0 0 0 1.4-2.4L14 9.5V3M7.5 15h9"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    liver: '<path d="M3 10.5C3 6.5 8 4.5 13 4.5s8 1.8 8 4.8-3 6.2-7 7.2-5 3-7 3-4-5-4-9z"/>',
    zzz: '<path d="M4 7h6l-6 8h6M14 4h5l-5 6h5"/>',
    uterus: '<path d="M4 5c0 3 1.5 5 4 5.5 1 .2 2 1 2 2.5v7h4v-7c0-1.5 1-2.3 2-2.5 2.5-.5 4-2.5 4-5.5"/><path d="M4 5c1 0 2 .5 2 1.5M20 5c-1 0-2 .5-2 1.5"/>',
    pessary: '<path d="M12 2.5c2.6 2 3.2 5 3.2 8v8a3.2 3.2 0 0 1-6.4 0v-8c0-3 .6-6 3.2-8z"/><path d="M10.2 9.5c.4-1.8 1-3 1.8-3.8"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6.5 6.5 2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2"/>',
  };
  const icon = (name, cls = 'icon') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ''}</svg>`;
  const catColor = (cat) => `var(--cat-${cat})`;

  /* ---------------------------------------------------------------- State */
  const state = {
    step: 'explore',
    pid: null,
    ev: 0,
    filter: null,
  };

  /* ------------------------------------------------------------- Elements */
  const stage = $('#stage');
  const switcher = $('#switcher');
  const prevBtn = $('#prevBtn');
  const nextBtn = $('#nextBtn');
  const refBtn = $('#refBtn');
  const refSheet = $('#refSheet');
  const lightbox = $('#lightbox');

  /* --------------------------------------------------------- Persona art */
  function art(p, { vt = false } = {}) {
    const style = `--c:${catColor(p.cat)}${vt ? ';view-transition-name:hero-art' : ''}`;
    if (p.photo) {
      return `<div class="art has-photo" style="${style}"><img src="${esc(p.photo)}" alt="" loading="lazy" decoding="async"></div>`;
    }
    return `<div class="art" style="${style}">
      <span class="art__blob art__blob--1"></span><span class="art__blob art__blob--2"></span>
      <span class="art__icon"><span class="art__disc">${icon(p.icon)}</span></span>
    </div>`;
  }
  const badge = (cat) => `<span class="badge" style="--c:${catColor(cat)}">${cat}</span>`;

  /* ======================================================================
     PAGE RENDERERS
     ====================================================================== */
  function pageExplore() {
    const counts = PROFILES.reduce((a, p) => ((a[p.cat] = (a[p.cat] || 0) + 1), a), {});
    const legend = Object.values(CATEGORIES).map((c) => `
      <button class="legend__item${state.filter === c.key ? ' is-on' : ''}" data-filter="${c.key}" style="--c:${catColor(c.key)}" aria-pressed="${state.filter === c.key}">
        ${badge(c.key)}
        <span><strong>${esc(c.name)} · ${counts[c.key] || 0}</strong><small>${esc(c.desc)}</small></span>
      </button>`).join('');

    const cards = PROFILES.map((p, i) => {
      const dim = state.filter && state.filter !== p.cat;
      return `
      <button class="pcard${state.pid === p.id ? ' is-current' : ''}${dim ? ' is-dim' : ''}" data-pid="${p.id}" data-a style="--i:${2 + i * 0.6}" aria-label="${esc(p.name)} — ${esc(p.hook)}">
        ${art(p, { vt: state.pid === p.id })}
        <span class="pcard__body">
          <span class="pcard__name">${badge(p.cat)}${esc(p.name)}</span>
          <span class="pcard__hook">${esc(p.hook)}</span>
        </span>
        <span class="pcard__go">${icon('arrowR')}</span>
      </button>`;
    }).join('');

    return `
    <div class="explore">
      <div class="explore__intro">
        <span class="eyebrow" data-a style="--i:0">Step 1 · Explore</span>
        <h1 class="explore__title" data-a style="--i:1">Which patient are you trying to <em class="save" aria-label="SAVE">${Object.keys(CATEGORIES).map((k) => `<span style="--c:${catColor(k)}">${k}</span>`).join('')}</em> recently?</h1>
        <p class="explore__lead" data-a style="--i:2">Pilih profil pasien yang paling sering Dokter temui untuk melihat kebutuhan dan rekomendasi LPS yang paling sesuai.</p>
        <div class="legend${state.filter ? ' is-filtering' : ''}" data-a style="--i:3">${legend}</div>
      </div>
      <div class="pgrid">${cards}</div>
    </div>`;
  }

  function pageRecognize(p) {
    const cat = CATEGORIES[p.cat];
    // Checklist dianimasikan otomatis (lihat playRecognize), bukan di-tap
    const checks = p.recognize.map((t, i) => {
      // "Judul: isi" → judul ditebalkan
      const m = t.match(/^([^:]{3,40}):\s(.+)$/);
      const html = m ? `<b>${esc(m[1])}:</b> ${esc(m[2])}` : esc(t);
      return `<li class="check" data-a style="--i:${2 + i}">
        <span class="check__box">${icon('check')}</span><span>${html}</span>
      </li>`;
    }).join('');

    return `
    <div class="recog">
      <div class="hero" data-a style="--i:0">
        ${art(p, { vt: true })}
        <span class="tag hero__tag">${badge(p.cat)}${esc(cat.name)}</span>
        <div class="hero__over">
          <h2 class="hero__name">${esc(p.name)}</h2>
          <p class="hero__hook">${esc(p.hook)}</p>
        </div>
      </div>
      <div class="recog__content">
        <div data-a style="--i:1">
          <span class="eyebrow">Step 2 · Recognize</span>
          <h2 class="recog__q" style="margin-top:.45rem">Does your patient experience these?</h2>
        </div>
        <ul class="checks">${checks}</ul>
        <div class="need" id="need" data-a style="--i:${3 + p.recognize.length}">
          <span class="need__icon">${icon('target')}</span>
          <div><h3>Individualization need</h3><p>${esc(p.need)}</p></div>
        </div>
        <button class="cta" data-go="recommend" data-a style="--i:${4 + p.recognize.length}">
          See suggested LPS <span class="cta__arrow">${icon('arrowR')}</span>
        </button>
      </div>
    </div>`;
  }

  function pageRecommend(p) {
    const r = p.route;
    const routeChip = (key, label) => {
      const cls = r.primary === key ? 'is-primary' : r[key] ? 'is-on' : 'is-off';
      return `<span class="route ${cls}">${r[key] ? icon('check') : icon('x')}${label}</span>`;
    };
    const tabs = p.evidence.map((e, i) => `
      <button class="etab${i === state.ev ? ' is-active' : ''}" data-ev="${i}" role="tab" aria-selected="${i === state.ev}">
        <span class="etab__n">${i + 1}</span>${esc(e.tab)}
      </button>`).join('');

    return `
    <div class="reco">
      <div class="reco__side">
        <div class="solution" data-a style="--i:0">
          <div class="solution__head">
            <span class="eyebrow">Suggested individualized LPS</span>
            <span class="solution__for">${badge(p.cat)}${esc(p.name)}</span>
          </div>
          <h2 class="solution__title">${esc(p.headline)}</h2>
          <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
        <div class="pillars">
          <div class="pillar" data-a style="--i:1">
            <div class="pillar__head"><span class="pillar__ic">${icon('pill')}</span><span>Regimen</span></div>
            <span class="pillar__lbl">Regimen</span>
            <div><div class="pillar__val">${esc(p.regimen)}</div><div class="pillar__sub">${esc(p.regimenNote)}</div></div>
          </div>
          <div class="pillar" data-a style="--i:2">
            <div class="pillar__head"><span class="pillar__ic">${icon('route')}</span><span>Route</span></div>
            <span class="pillar__lbl">Route</span>
            <div style="display:grid;gap:.35rem">
              <div class="routes">${routeChip('vaginal', 'Vaginal')}${routeChip('rectal', 'Rectal')}</div>
              <div class="pillar__sub">${esc(r.text)}</div>
            </div>
          </div>
          <div class="pillar pillar--fit" data-a style="--i:3">
            <div class="pillar__head"><span class="pillar__ic">${icon('fit')}</span><span>Fit</span></div>
            <span class="pillar__lbl">Fit</span>
            <div class="pillar__sub" style="color:var(--ink);font-weight:500">${esc(p.fit)}</div>
          </div>
        </div>
      </div>

      <section class="evi" data-a style="--i:2" aria-label="Supporting clinical evidence">
        <div class="evi__head">
          <h3>${icon('flask')}Supporting clinical evidence</h3>
          <span class="evi__count" id="evCount">${state.ev + 1} / ${p.evidence.length}</span>
        </div>
        <div class="evi__tabs" role="tablist">${tabs}</div>
        <div class="evi__viewport" id="evViewport">${evidenceCard(p, state.ev)}</div>
      </section>
    </div>`;
  }

  /* ---------------------------------------------------------- Evidence */
  function evidenceCard(p, i) {
    const e = p.evidence[i];
    const refs = `<span class="refs">${e.refs.map((n) => `<button data-ref="${n}" aria-label="Referensi ${n}">${n}</button>`).join('')}</span>`;
    const figs = e.figs.length ? `<div class="ev__figs">${e.figs.map((f, fi) => `
      <button class="fig" data-fig="${fi}" aria-label="Perbesar grafik: ${esc(f.caption)}">
        <span class="fig__img"><img src="${f.src}" alt="${esc(f.caption)}" decoding="async"></span>
        <span class="fig__cap">${icon('expand')}<span>${esc(f.caption)}</span></span>
      </button>`).join('')}</div>` : '';
    return `
    <article class="ev is-in${e.figs.length ? ' has-figs' : ''}" data-index="${i}">
      <div class="ev__text">
        <h4 class="ev__title">${esc(e.title)}</h4>
        <p class="ev__body">${esc(e.body)}${refs}</p>
        ${e.extra ? `<p class="ev__extra">${icon('check')}<span>${esc(e.extra)}</span></p>` : ''}
      </div>
      <div class="ev__viz">${viz(e.viz, p)}</div>
      ${figs}
    </article>`;
  }

  const fmt = (v, d = 0) => Number(v).toFixed(d);

  function barsHTML(g) {
    const vals = g.items.map((x) => x.value);
    const max = Math.max(...vals, g.threshold ? g.threshold.value : 0) * 1.12 || 1;
    const rows = g.items.map((it) => `
      <div class="bar${it.hi ? ' is-hi' : ''}">
        <div class="bar__top"><span>${esc(it.label)}</span>
          <span class="bar__val"><span class="js-count" data-to="${it.value}" data-dec="${g.decimals ?? 0}">${fmt(0, g.decimals ?? 0)}</span>${g.unit ? `<small>${esc(g.unit)}</small>` : ''}${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</span>
        </div>
        <div class="bar__track"><div class="bar__fill" data-w="${(it.value / max) * 100}"></div>${g.threshold ? `<span class="bar__thr" style="left:${(g.threshold.value / max) * 100}%"></span>` : ''}</div>
      </div>`).join('');
    return `
      <div class="viz__title"><span>${esc(g.title)}</span>${g.note ? `<span class="pchip">${esc(g.note)}</span>` : ''}</div>
      <div class="bars">${rows}</div>
      ${g.threshold ? `<span class="thr-label">${esc(g.threshold.label)}</span>` : ''}
      ${g.lowerBetter ? `<span class="lower-note">Lebih rendah = lebih baik</span>` : ''}`;
  }

  function viz(v, p) {
    if (!v) return '';
    switch (v.type) {
      case 'bars':
        return `<div class="viz">${barsHTML(v)}</div>`;
      case 'multi':
        return `<div class="viz multi">${v.groups.map((g) => `<div style="display:grid;gap:.7rem">${barsHTML(g)}</div>`).join('<hr style="border:0;border-top:1px solid var(--line);margin:0">')}</div>`;
      case 'stats':
        return `<div class="stats">${v.items.map((s) => `
          <div class="stat">
            <span class="stat__num">${s.text ? esc(s.text) : `${s.prefix ? `<small>${esc(s.prefix)}</small>` : ''}<span class="js-count" data-to="${s.value}" data-dec="${s.decimals || 0}">0</span>${s.suffix ? `<small>${esc(s.suffix)}</small>` : ''}`}</span>
            <span class="stat__label">${esc(s.label)}</span>
          </div>`).join('')}</div>`;
      case 'flow':
        return `<div class="viz flow">
          <div class="lane lane--muted">
            <span class="lane__label">Oral progesterone</span>
            <div class="lane__row">
              <span class="node">${icon('pill')}Oral</span><span class="arrow">${icon('chevR')}</span>
              <span class="node is-bad">${icon('liver')}First-pass hati</span><span class="arrow">${icon('chevR')}</span>
              <span class="node is-bad">${icon('zzz')}Metabolit sedatif</span>
            </div>
          </div>
          <div class="lane">
            <span class="lane__label" style="color:var(--brand)">Cygest vaginal / rectal</span>
            <div class="lane__row">
              <span class="node is-cyg">${icon('pessary')}Cygest</span><span class="arrow">${icon('chevR')}</span>
              <span class="node is-good">${icon('spark')}Bypass hati</span><span class="arrow">${icon('chevR')}</span>
              <span class="node is-good">${icon('uterus')}Langsung ke uterus</span>
            </div>
          </div>
        </div>`;
      case 'schedule':
        return `<div class="viz"><div class="sched">
          <div class="slot"><span class="slot__ic">${icon('sun')}</span><strong>Pagi</strong><span>sebelum bekerja</span><b>Cygest 400 mg</b></div>
          <div class="slot slot--night"><span class="slot__ic">${icon('moon')}</span><strong>Malam</strong><span>sebelum tidur</span><b>Cygest 400 mg</b></div>
          <div class="sched__foot"><span>Torpedo-shaped</span><span>Self-lubricating</span><span>Tanpa aplikator</span></div>
        </div></div>`;
      case 'routes':
        return `<div class="viz"><div class="dual">
          <div class="dual__card"><span class="dual__ok">${icon('check')}</span><strong>Vaginal</strong><span>Izin edar resmi</span></div>
          <span class="dual__plus">+</span>
          <div class="dual__card"><span class="dual__ok">${icon('check')}</span><strong>Rectal</strong><span>Izin edar resmi</span></div>
          <div class="dual__foot">Satu sediaan pesari micronized progesterone · dua rute</div>
        </div></div>`;
      case 'equal':
        return `<div class="viz"><div class="viz__title"><span>Rectal vs. Vaginal</span></div><div class="equal">${v.items.map((t) => `
          <div class="eqrow"><span>${esc(t)}</span><em class="r">Rectal</em><i>≈</i><em>Vaginal</em></div>`).join('')}</div></div>`;
      default:
        return '';
    }
  }

  /* -------------------------------------------------------- Animations */
  /* Recognize: centang item satu per satu (atas → bawah), lalu sorot
     "Individualization need", lalu tombol CTA berdenyut memancing klik. */
  let seqTimers = [];
  function playRecognize(root) {
    seqTimers.forEach(clearTimeout);
    seqTimers = [];
    const items = $$('.check', root);
    const need = $('.need', root);
    const cta = $('.cta', root);
    if (!items.length) return;
    const at = (ms, fn) => seqTimers.push(setTimeout(fn, reduced() ? 0 : ms));

    const START = 900;  // setelah reveal bertahap selesai
    const STEP = 520;   // jeda antar centang
    items.forEach((el, i) => at(START + i * STEP, () => el.classList.add('is-on')));
    const done = START + items.length * STEP;
    at(done + 80, () => need && need.classList.add('is-pulse'));
    at(done + 650, () => {
      // Di layar pendek CTA disembunyikan → pancing tombol Next di dock
      const target = cta && cta.offsetParent ? cta : nextBtn;
      target.classList.add('is-nudge');
    });
  }

  function animateIn(root) {
    nextBtn.classList.remove('is-nudge');
    playRecognize(root);
    const run = () => {
      $$('.bar__fill', root).forEach((b) => { b.style.width = `${b.dataset.w}%`; });
      $$('.flow', root).forEach((f) => f.classList.add('is-run'));
      $$('.js-count', root).forEach(countUp);
    };
    if (reduced()) { run(); return; }
    setTimeout(() => requestAnimationFrame(run), 220);
  }

  function countUp(el) {
    const to = parseFloat(el.dataset.to);
    const dec = parseInt(el.dataset.dec || '0', 10);
    if (reduced() || to === 0) { el.textContent = fmt(to, dec); return; }
    const dur = 1000;
    let t0 = null;
    const tick = (t) => {
      if (t0 === null) t0 = t;
      const k = Math.max(0, Math.min(1, (t - t0) / dur));
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * e, dec);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ======================================================================
     ROUTER & RENDER
     ====================================================================== */
  function parseHash() {
    const [, step = 'explore', pid = null, ev = '0'] = (location.hash || '#/explore').split('/');
    const p = pid && byId(pid);
    if (!STEPS.includes(step) || (step !== 'explore' && !p)) return { step: 'explore', pid: state.pid, ev: 0 };
    return { step, pid: p ? p.id : state.pid, ev: Math.max(0, Math.min((p ? p.evidence.length : 1) - 1, parseInt(ev, 10) || 0)) };
  }

  function go(step, pid = state.pid, ev = 0) {
    const hash = step === 'explore' ? '#/explore' : `#/${step}/${pid}${step === 'recommend' && ev ? `/${ev}` : ''}`;
    if (location.hash === hash) return;
    // Ganti tab evidence tidak menambah riwayat (Back langsung ke langkah sebelumnya)
    if (step === 'recommend' && state.step === 'recommend' && pid === state.pid) {
      history.replaceState(null, '', hash);
      route();
      return;
    }
    location.hash = hash;
  }

  let rendering = false;
  function route() {
    const next = parseHash();
    const prevStep = state.step;
    const prevPid = state.pid;

    // Ganti evidence saja (halaman sama) → tidak render ulang halaman
    if (next.step === 'recommend' && prevStep === 'recommend' && next.pid === prevPid && $('.reco', stage)) {
      showEvidence(next.ev);
      return;
    }

    const dir = STEPS.indexOf(next.step) !== STEPS.indexOf(prevStep)
      ? Math.sign(STEPS.indexOf(next.step) - STEPS.indexOf(prevStep))
      : Math.sign(PROFILES.findIndex((p) => p.id === next.pid) - PROFILES.findIndex((p) => p.id === prevPid)) || 1;

    state.step = next.step;
    state.pid = next.pid;
    state.ev = next.ev;
    render(dir || 1, prevStep === null);
  }

  function buildPage() {
    const p = state.pid && byId(state.pid);
    const page = document.createElement('section');
    page.className = 'page';
    page.dataset.step = state.step;
    page.innerHTML = state.step === 'explore' ? pageExplore()
      : state.step === 'recognize' ? pageRecognize(p)
      : pageRecommend(p);
    return page;
  }

  function render(dir = 1, first = false) {
    const old = $('.page:not(.is-leaving)', stage);
    const page = buildPage();
    page.style.setProperty('--dir', dir);
    document.documentElement.style.setProperty('--dir', dir);

    const swap = () => {
      $$('.page', stage).forEach((el) => el.remove());
      stage.appendChild(page);
      updateChrome();
      animateIn(page);
    };

    const canVT = !first && old && document.startViewTransition && !reduced();
    if (canVT) {
      // Shared element hanya untuk Explore <-> Recognize
      const shared = (old.dataset.step === 'explore' && state.step === 'recognize') || (old.dataset.step === 'recognize' && state.step === 'explore');
      if (!shared) $$('[style*="view-transition-name"]', old).forEach((el) => { el.style.viewTransitionName = 'none'; });
      if (!shared) $$('[style*="view-transition-name"]', page).forEach((el) => { el.style.viewTransitionName = 'none'; });
      rendering = true;
      const vt = document.startViewTransition(swap);
      vt.finished.finally(() => { rendering = false; });
      return;
    }

    if (old && !first && !reduced()) {
      old.style.setProperty('--dir', dir);
      old.classList.add('is-leaving');
      page.classList.add('is-entering');
      stage.appendChild(page);
      updateChrome();
      animateIn(page);
      setTimeout(() => old.remove(), 280);
    } else {
      swap();
    }
  }

  /* ---------------------------------------------- Evidence tab switching */
  function showEvidence(i) {
    const p = byId(state.pid);
    if (!p) return;
    i = Math.max(0, Math.min(p.evidence.length - 1, i));
    const dir = Math.sign(i - state.ev) || 1;
    if (i === state.ev && $('.ev', stage)) { updateChrome(); return; }
    state.ev = i;

    const vp = $('#evViewport');
    const old = $('.ev:not(.is-out)', vp);
    vp.style.setProperty('--dir', dir);
    const wrap = document.createElement('div');
    wrap.innerHTML = evidenceCard(p, i);
    const card = wrap.firstElementChild;
    if (old) {
      old.classList.remove('is-in');
      old.classList.add('is-out');
      setTimeout(() => old.remove(), 250);
    }
    vp.appendChild(card);
    animateIn(card);

    $$('.etab', stage).forEach((t, ti) => {
      t.classList.toggle('is-active', ti === i);
      t.setAttribute('aria-selected', ti === i);
      if (ti === i) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduced() ? 'auto' : 'smooth' });
    });
    $('#evCount').textContent = `${i + 1} / ${p.evidence.length}`;
    updateChrome();
  }

  /* ------------------------------------------------- Shell (topbar & dock) */
  function updateChrome() {
    const idx = STEPS.indexOf(state.step);
    const p = state.pid && byId(state.pid);

    $$('.step').forEach((s, i) => {
      s.classList.toggle('is-active', i === idx);
      s.classList.toggle('is-done', i < idx);
      s.disabled = i > 0 && !p;
      if (i === idx) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current');
    });
    $('#stepFill').style.width = `${idx * 50}%`;
    refBtn.hidden = state.step !== 'recommend';

    // Prev
    prevBtn.disabled = idx === 0;
    $('#prevLabel').textContent = idx === 2 ? 'Recognize' : 'Explore';

    // Next
    let label = 'Recognize';
    nextBtn.disabled = false;
    if (state.step === 'explore') { label = 'Recognize'; nextBtn.disabled = !p; }
    else if (state.step === 'recognize') label = 'Recommend';
    else {
      label = state.ev < p.evidence.length - 1 ? 'Next evidence' : 'Profil lain';
    }
    $('#nextLabel').textContent = label;

    // Switcher
    if (state.step === 'explore') {
      switcher.innerHTML = `<span class="switcher__hint">${p ? `Terakhir: <b>${esc(p.name)}</b> · tap kartu untuk mulai` : 'Tap profil pasien untuk memulai diskusi'}</span>`;
    } else {
      switcher.innerHTML = PROFILES.map((q) => `
        <button class="chip${q.id === state.pid ? ' is-active' : ''}" data-switch="${q.id}" style="--c:${catColor(q.cat)}" role="tab" aria-selected="${q.id === state.pid}" aria-label="${esc(q.name)}">
          <span class="chip__dot">${icon(q.icon)}</span><span class="chip__name">${esc(q.name)}</span>
        </button>`).join('');
      const active = $('.chip.is-active', switcher);
      if (active) requestAnimationFrame(() => active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'auto' }));
    }
  }

  function next() {
    const p = state.pid && byId(state.pid);
    if (state.step === 'explore') { if (p) go('recognize'); return; }
    if (state.step === 'recognize') { go('recommend'); return; }
    if (state.ev < p.evidence.length - 1) go('recommend', state.pid, state.ev + 1);
    else go('explore');
  }
  function prev() {
    if (state.step === 'recommend') go('recognize');
    else if (state.step === 'recognize') go('explore');
  }

  /* ---------------------------------------------------- References sheet */
  function openRefs(flash) {
    const p = byId(state.pid);
    if (!p) return;
    $('#refList').innerHTML = p.refs.map((r) => `<li>${esc(r)}</li>`).join('');
    refSheet.classList.add('is-open');
    refSheet.setAttribute('aria-hidden', 'false');
    if (flash) {
      const li = $$('#refList li')[flash - 1];
      if (li) { li.classList.add('is-flash'); li.scrollIntoView({ block: 'nearest' }); }
    }
  }
  function closeRefs() { refSheet.classList.remove('is-open'); refSheet.setAttribute('aria-hidden', 'true'); }

  /* ------------------------------------------------------------ Lightbox */
  const lb = { figs: [], i: 0 };
  function openLightbox(figs, i) {
    lb.figs = figs; lb.i = i;
    showFig();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function showFig() {
    const f = lb.figs[lb.i];
    const img = $('#lbImg');
    img.classList.remove('is-zoom');
    img.style.transform = '';
    img.src = f.src;
    img.alt = f.caption;
    $('#lbCaption').textContent = f.caption;
    const many = lb.figs.length > 1;
    $('#lbCount').textContent = many ? `Grafik ${lb.i + 1} / ${lb.figs.length}` : 'Grafik asli';
    $('#lbPrev').style.visibility = many ? 'visible' : 'hidden';
    $('#lbNext').style.visibility = many ? 'visible' : 'hidden';
  }
  function closeLightbox() { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); }

  $('#lbImg').addEventListener('click', (e) => {
    const img = e.currentTarget;
    if (img.classList.toggle('is-zoom')) {
      const r = img.getBoundingClientRect();
      img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
      img.style.transform = 'scale(2.2)';
    } else {
      img.style.transform = '';
    }
  });
  $('#lbPrev').addEventListener('click', () => { lb.i = (lb.i - 1 + lb.figs.length) % lb.figs.length; showFig(); });
  $('#lbNext').addEventListener('click', () => { lb.i = (lb.i + 1) % lb.figs.length; showFig(); });

  /* ======================================================================
     EVENTS
     ====================================================================== */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button, [data-close]');
    if (!t) return;

    if (t.hasAttribute('data-close')) {
      if (t.closest('#refSheet')) closeRefs();
      if (t.closest('#lightbox')) closeLightbox();
      return;
    }
    if (t.dataset.pid) {
      if (rendering) return;
      // Pindahkan shared-element ke kartu yang di-tap
      $$('.pcard .art', stage).forEach((a) => { a.style.viewTransitionName = ''; });
      $('.art', t).style.viewTransitionName = 'hero-art';
      state.pid = t.dataset.pid;
      go('recognize', t.dataset.pid);
      return;
    }
    if (t.dataset.filter) {
      state.filter = state.filter === t.dataset.filter ? null : t.dataset.filter;
      $('.legend', stage).classList.toggle('is-filtering', !!state.filter);
      $$('.legend__item', stage).forEach((b) => {
        const on = b.dataset.filter === state.filter;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on);
      });
      $$('.pcard', stage).forEach((c) => {
        const p = byId(c.dataset.pid);
        c.classList.toggle('is-dim', !!state.filter && p.cat !== state.filter);
      });
      return;
    }
    if (t.dataset.go) { go(t.dataset.go); return; }
    if (t.dataset.step) { if (!t.disabled) go(t.dataset.step); return; }
    if (t.dataset.switch) { go(state.step, t.dataset.switch); return; }
    if (t.dataset.ev !== undefined) { go('recommend', state.pid, +t.dataset.ev); return; }
    if (t.dataset.ref) { openRefs(+t.dataset.ref); return; }
    if (t.dataset.fig !== undefined) {
      const p = byId(state.pid);
      openLightbox(p.evidence[state.ev].figs, +t.dataset.fig);
      return;
    }
    if (t === nextBtn) { next(); return; }
    if (t === prevBtn) { prev(); return; }
    if (t === refBtn) { openRefs(); }
  });

  // Keyboard (desktop / keyboard iPad)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeRefs(); closeLightbox(); return; }
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'ArrowRight') $('#lbNext').click();
      if (e.key === 'ArrowLeft') $('#lbPrev').click();
      return;
    }
    if (refSheet.classList.contains('is-open')) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Swipe: di panel evidence → ganti evidence; di tempat lain → ganti langkah
  let sx = 0, sy = 0, st = 0, sTarget = null;
  stage.addEventListener('touchstart', (e) => {
    const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now(); sTarget = e.target;
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.7 || Date.now() - st > 700) return;
    if (sTarget && sTarget.closest('.evi__tabs, .legend')) return;
    if (sTarget && sTarget.closest('.evi__viewport')) {
      const p = byId(state.pid);
      const i = state.ev + (dx < 0 ? 1 : -1);
      if (i >= 0 && i < p.evidence.length) go('recommend', state.pid, i);
      return;
    }
    dx < 0 ? next() : prev();
  }, { passive: true });

  // Swipe di lightbox
  let lx = 0;
  lightbox.addEventListener('touchstart', (e) => { if (e.touches.length === 1) lx = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if ($('#lbImg').classList.contains('is-zoom') || lb.figs.length < 2) return;
    const dx = e.changedTouches[0].clientX - lx;
    if (Math.abs(dx) > 60) (dx < 0 ? $('#lbNext') : $('#lbPrev')).click();
  }, { passive: true });

  window.addEventListener('hashchange', route);

  /* ---------------------------------------------------------------- Boot */
  // Preload grafik agar lightbox instan saat presentasi
  const preload = new Set(PROFILES.flatMap((p) => p.evidence.flatMap((e) => e.figs.map((f) => f.src))));
  window.addEventListener('load', () => preload.forEach((src) => { const i = new Image(); i.src = src; }));

  state.step = null;
  if (!location.hash) history.replaceState(null, '', '#/explore');
  route();
})();
