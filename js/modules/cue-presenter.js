/*
  Spontan Ngomong - Presenter Cue Cards Module (Mode Ngajar)
  Handles sequential presenter deck, glanceable key triggers, and tap-to-expand deep script details.
*/

import { TEACHING_DECK } from './topics-data.js';
import { loadTeachingStep, saveTeachingStep } from './storage.js';

let currentStepIndex = 0;
let isDetailExpanded = false;

export function initCuePresenter() {
  currentStepIndex = loadTeachingStep();
  if (currentStepIndex < 0 || currentStepIndex >= TEACHING_DECK.length) {
    currentStepIndex = 0;
  }
}

export function getCurrentStep() {
  return TEACHING_DECK[currentStepIndex] || TEACHING_DECK[0];
}

export function getStepIndex() {
  return currentStepIndex;
}

export function getTotalSteps() {
  return TEACHING_DECK.length;
}

export function nextStep() {
  if (currentStepIndex < TEACHING_DECK.length - 1) {
    currentStepIndex++;
  } else {
    currentStepIndex = 0; // Loop back to start
  }
  isDetailExpanded = false;
  saveTeachingStep(currentStepIndex);
  return getCurrentStep();
}

export function prevStep() {
  if (currentStepIndex > 0) {
    currentStepIndex--;
  } else {
    currentStepIndex = TEACHING_DECK.length - 1;
  }
  isDetailExpanded = false;
  saveTeachingStep(currentStepIndex);
  return getCurrentStep();
}

export function resetPresenter() {
  currentStepIndex = 0;
  isDetailExpanded = false;
  saveTeachingStep(0);
  return getCurrentStep();
}

export function toggleDetailExpand() {
  isDetailExpanded = !isDetailExpanded;
  return isDetailExpanded;
}

export function getIsDetailExpanded() {
  return isDetailExpanded;
}

export function renderPresenterCard(container, item) {
  if (!container || !item) return;

  const glanceHtml = (item.glanceClues || []).map(clue => {
    // Parse bold markdown **text** to HTML
    const formatted = clue.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return `<li class="cue-bullet-item">${formatted}</li>`;
  }).join('');

  container.innerHTML = `
    <div class="presenter-card-wrapper ${isDetailExpanded ? 'expanded' : ''}">
      
      <!-- Top Step Header -->
      <div class="presenter-card-header">
        <div class="presenter-step-badge">
          <span>📍 Langkah ${item.stepNumber} dari ${item.totalSteps}</span>
        </div>
        <div class="presenter-title-box">
          <h3 class="presenter-step-title">${item.title}</h3>
        </div>
      </div>

      <!-- Main Glanceable Key Clues -->
      <div class="presenter-glance-box" id="presenter-glance-trigger" title="Klik untuk lihat / tutup detail script">
        <div class="glance-label-row">
          <span class="glance-section-badge">🎯 CLUE KUNCI (Dibaca Sekilas saat Bicara)</span>
          <span class="glance-tap-hint">${isDetailExpanded ? '▲ Tutup Script' : '▼ Klik / Tap jika Lupa Script'}</span>
        </div>
        <ul class="cue-bullet-list">
          ${glanceHtml}
        </ul>
      </div>

      <!-- Expandable Deep Script & Phrasing Context -->
      <div class="presenter-deep-script ${isDetailExpanded ? 'show' : ''}" id="presenter-deep-script">
        <div class="deep-script-inner">
          <div class="deep-script-header">
            <span>💡 SCRIPT & KONTEKS LENGKAP (Patokan Ngomong)</span>
          </div>
          <div class="deep-script-content">
            ${item.deepScript}
          </div>
        </div>
      </div>

      <!-- Interactive Expand Toggle Button -->
      <button class="toggle-script-btn ${isDetailExpanded ? 'active' : ''}" id="toggle-script-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="${isDetailExpanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}"></polyline>
        </svg>
        <span>${isDetailExpanded ? 'Sembunyikan Script Lengkap' : 'Buka Script & Contoh Kalimat (Jika Lupa)'}</span>
      </button>

    </div>
  `;

  // Attach internal card click handlers
  const glanceTrigger = container.querySelector('#presenter-glance-trigger');
  const toggleBtn = container.querySelector('#toggle-script-btn');

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleDetailExpand();
    renderPresenterCard(container, item);
  };

  if (glanceTrigger) glanceTrigger.addEventListener('click', handleToggle);
  if (toggleBtn) toggleBtn.addEventListener('click', handleToggle);
}
