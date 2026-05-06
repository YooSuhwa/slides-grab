// editor-review.js — Deck review panel: state, rendering, events

import { escapeHtml } from './editor-utils.js';
import { goToSlide } from './editor-navigation.js';

const reviewBtn = document.getElementById('btn-review-deck');
const reviewPanel = document.getElementById('review-panel');

const REVIEW_CATEGORY_LABELS = {
  structure: '구조 · 흐름',
  content: '내용 · 메시지',
  visual: '시각 · 정돈',
  impact: '임팩트 · 마무리',
};

const REVIEW_SEVERITY_MAP = {
  error: { tier: 'high', badge: 'High', icon: '!' },
  warn: { tier: 'med', badge: 'Med', icon: '!' },
  info: { tier: 'low', badge: 'Low', icon: 'i' },
};

function reviewSetState(state) {
  const modal = document.getElementById('review-modal-v2');
  if (modal) modal.setAttribute('data-state', state);
}

function reviewShowError(message) {
  const errEl = document.getElementById('review-error-text');
  if (errEl) errEl.textContent = message;
  reviewSetState('error');
}

function reviewClosePanel() {
  if (reviewPanel) reviewPanel.hidden = true;
}

function reviewHeadlineFor(score) {
  if (score >= 90) return '전반적으로 <span class="ok">아주 좋아요</span>.';
  if (score >= 80) return '<span class="ok">전체적으로 좋습니다</span> — 다듬을 부분만 살짝.';
  if (score >= 70) return '괜찮지만 <span class="wn">다듬을 부분</span>이 있어요.';
  if (score >= 60) return '<span class="wn">구조부터 다시</span> 한 번 살펴보세요.';
  return '<span class="er">전반적인 개선</span>이 필요합니다.';
}

function reviewToneClass(score) {
  if (score >= 80) return '';
  if (score >= 60) return 'warn';
  return 'danger';
}

function reviewBuildBreakdown(categories) {
  const order = ['structure', 'content', 'visual', 'impact'];
  return order
    .map((key) => {
      const cat = categories?.[key];
      if (!cat) return '';
      const score = Math.max(0, Math.min(100, Math.round(cat.score ?? 0)));
      const tone = reviewToneClass(score);
      const cls = tone ? ` ${tone}` : '';
      const label = REVIEW_CATEGORY_LABELS[key] || cat.label || key;
      return `
        <div class="rv-bd-cell">
          <div class="lbl">${escapeHtml(label)}</div>
          <div class="val">
            <span class="v${cls}">${score}</span>
            <span class="of">/100</span>
          </div>
          <div class="bar"><div class="f${cls}" style="width:${score}%"></div></div>
        </div>`;
    })
    .join('');
}

function reviewBuildIssue(issue) {
  const map = REVIEW_SEVERITY_MAP[issue.severity] || REVIEW_SEVERITY_MAP.info;
  const slideNum = Number.isFinite(issue.slide) ? issue.slide : null;
  const wherePill = slideNum
    ? `<div class="rv-issue-where"><span>슬라이드</span><span class="pill"><span class="dot"></span>${String(slideNum).padStart(2, '0')}</span></div>`
    : '';
  const action = slideNum
    ? `<div class="rv-issue-actions">
         <button class="rv-goto" type="button" data-slide-index="${slideNum - 1}">
           <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
           ${slideNum}번 슬라이드로 가기
         </button>
       </div>`
    : '';
  return `
    <div class="rv-issue ${map.tier}">
      <div class="rv-issue-icon">${map.icon}</div>
      <div class="rv-issue-body">
        <div class="rv-issue-title">${escapeHtml(issue.message || '')}<span class="badge">${map.badge}</span></div>
        ${wherePill}
      </div>
      ${action}
    </div>`;
}

let reviewDeckName = '';
async function reviewResolveDeckName() {
  if (reviewDeckName) return reviewDeckName;
  try {
    const res = await fetch('/api/editor-config');
    if (res.ok) {
      const cfg = await res.json();
      reviewDeckName = cfg.deckName || '';
    }
  } catch { /* fall through */ }
  return reviewDeckName;
}

async function reviewLoadAndRender() {
  reviewSetState('loading');
  const deckName = await reviewResolveDeckName();
  if (!deckName) {
    reviewShowError('덱을 찾을 수 없습니다.');
    return;
  }

  try {
    const res = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deckName }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      reviewShowError(`분석 실패: ${err.error}`);
      return;
    }

    const data = await res.json();
    renderReviewResult(data);
  } catch (err) {
    reviewShowError(`분석 실패: ${err.message}`);
  }
}

function renderReviewResult(data) {
  const score = Math.max(0, Math.min(100, Math.round(data.score ?? 0)));
  const slideCount = Number.isFinite(data.slideCount) ? data.slideCount : 0;
  const issues = Array.isArray(data.issues) ? data.issues : [];
  const strengths = Array.isArray(data.strengths) ? data.strengths : [];
  const grade = data.grade || '—';
  const tone = reviewToneClass(score);

  const scoreNum = document.getElementById('review-score-num');
  if (scoreNum) {
    scoreNum.classList.remove('warn', 'danger');
    if (tone) scoreNum.classList.add(tone);
  }
  const scoreValue = document.getElementById('review-score-value');
  if (scoreValue) scoreValue.textContent = String(score);

  const gradeEl = document.getElementById('review-score-grade');
  if (gradeEl) {
    gradeEl.textContent = `Grade ${grade}`;
    gradeEl.classList.remove('warn', 'danger');
    if (tone) gradeEl.classList.add(tone);
  }

  const eyebrow = document.getElementById('review-eyebrow');
  if (eyebrow) eyebrow.textContent = `AI 리뷰 · ${data.deckName || ''}`;

  const headline = document.getElementById('review-headline');
  if (headline) headline.innerHTML = reviewHeadlineFor(score);

  const summary = document.getElementById('review-summary');
  if (summary) {
    summary.innerHTML = `<b>${slideCount}장</b> 슬라이드에서 강점 <b>${strengths.length}개</b>, 이슈 <b>${issues.length}개</b>를 찾았어요.`;
  }

  const breakdown = document.getElementById('review-breakdown');
  if (breakdown) breakdown.innerHTML = reviewBuildBreakdown(data.categories);

  const issuesEl = document.getElementById('review-issues');
  const issuesEmpty = document.getElementById('review-issues-empty');
  const issuesCount = document.getElementById('review-issues-count');
  if (issuesEl) {
    issuesEl.innerHTML = issues.map(reviewBuildIssue).join('');
    issuesEl.hidden = issues.length === 0;
  }
  if (issuesEmpty) issuesEmpty.hidden = issues.length !== 0;
  if (issuesCount) issuesCount.textContent = `${issues.length}개`;

  const strengthsEl = document.getElementById('review-strengths');
  const strengthsSection = document.getElementById('review-strengths-section');
  const strengthsCount = document.getElementById('review-strengths-count');
  if (strengthsEl) {
    strengthsEl.innerHTML = strengths
      .map((s) => `<div class="rv-str"><span class="dt">✓</span><span>${escapeHtml(s)}</span></div>`)
      .join('');
  }
  if (strengthsSection) strengthsSection.hidden = strengths.length === 0;
  if (strengthsCount) strengthsCount.textContent = `${strengths.length}개`;

  const footMeta = document.getElementById('review-foot-meta');
  if (footMeta) {
    footMeta.innerHTML = `<span><b>${slideCount}장</b> 슬라이드</span><span>이슈 <b>${issues.length}</b></span><span>강점 <b>${strengths.length}</b></span>`;
  }

  reviewSetState('ready');
}

if (reviewBtn && reviewPanel) {
  reviewBtn.addEventListener('click', () => {
    reviewPanel.hidden = false;
    void reviewLoadAndRender();
  });

  reviewPanel.addEventListener('click', (e) => {
    if (e.target === reviewPanel) { reviewClosePanel(); return; }
    if (!(e.target instanceof Element)) return;
    if (e.target.closest('#review-close, #review-close-foot')) { reviewClosePanel(); return; }
    const goto = e.target.closest('[data-slide-index]');
    if (goto instanceof HTMLElement) {
      const idx = parseInt(goto.dataset.slideIndex || '', 10);
      reviewClosePanel();
      if (Number.isInteger(idx) && idx >= 0) void goToSlide(idx);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !reviewPanel.hidden) {
      reviewClosePanel();
    }
  });
}

const retryBtn = document.getElementById('review-retry');
if (retryBtn) retryBtn.addEventListener('click', () => void reviewLoadAndRender());
