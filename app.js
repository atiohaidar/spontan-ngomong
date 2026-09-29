/*
  Spontan Ngomong - Main Application Entry Point
  Modular architecture integrating Storage, Speech, Topics Data, and Cue Presenter.
*/

import { loadSettings, saveSettings, loadTopics, saveTopics } from './js/modules/storage.js';
import { speakText, stopSpeech, getIsSpeaking, initSpeechRecognition, toggleVoiceRecognition } from './js/modules/speech.js';
import { DEFAULT_TOPICS, TEACHING_DECK } from './js/modules/topics-data.js';
import { 
  initCuePresenter, 
  getCurrentStep, 
  getStepIndex, 
  getTotalSteps, 
  nextStep, 
  prevStep, 
  resetPresenter, 
  renderPresenterCard, 
  toggleDetailExpand 
} from './js/modules/cue-presenter.js';

// Application State
let state = {
  activeTopics: [],
  doneTopics: [],
  currentTopic: null,
  selectedMode: 'all', // 'all', 'ngajar', 'santai', etc.
  timerSeconds: 0,
  timerInterval: null,
  isListeningVoice: false,
  settings: loadSettings()
};

// DOM Elements
const topicCard = document.getElementById('topic-card');
const allCompletedView = document.getElementById('all-completed-view');
const actionControlsContainer = document.getElementById('action-controls-container');
const topicTextDisplay = document.getElementById('topic-text-display');
const topicCardCategoryBadge = document.getElementById('topic-card-category-badge');
const topicCategoryBtn = document.getElementById('topic-category-btn');
const topicCategoryLabel = document.getElementById('topic-category-label');
const categoryDropdownMenu = document.getElementById('category-dropdown-menu');
const categoryDropdownWrapper = document.getElementById('category-dropdown-wrapper');
const dropdownItems = document.querySelectorAll('.dropdown-item');
const topicCountBadge = document.getElementById('topic-count-badge');
const cardProgressHint = document.getElementById('card-progress-hint');
const practiceTimerDisplay = document.getElementById('practice-timer');
const speakCurrentBtn = document.getElementById('speak-current-btn');
const btnNextTopic = document.getElementById('btn-next-topic');
const btnMarkDone = document.getElementById('btn-mark-done');
const toggleTTSBtn = document.getElementById('toggle-tts-btn');
const toggleVoiceBtn = document.getElementById('toggle-voice-btn');
const voiceStatusText = document.getElementById('voice-status-text');
const resetAllTopicsBtn = document.getElementById('reset-all-topics-btn');
const addMoreFromEmptyBtn = document.getElementById('add-more-from-empty-btn');

// Modal Elements
const topicModal = document.getElementById('topic-modal');
const openTopicsBtn = document.getElementById('open-topics-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const tipsModal = document.getElementById('tips-modal');
const openTipsBtn = document.getElementById('open-tips-btn');
const closeTipsBtn = document.getElementById('close-tips-btn');
const modalTabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const countActiveTab = document.getElementById('count-active-tab');
const countDoneTab = document.getElementById('count-done-tab');
const activeTopicsList = document.getElementById('active-topics-list');
const doneTopicsList = document.getElementById('done-topics-list');
const searchActiveInput = document.getElementById('search-active-input');
const addTopicForm = document.getElementById('add-topic-form');
const bulkTopicsText = document.getElementById('bulk-topics-text');
const bulkAddBtn = document.getElementById('bulk-add-btn');
const restoreAllBtn = document.getElementById('restore-all-btn');
const hardResetStorageBtn = document.getElementById('hard-reset-storage-btn');
const ttsRateSelect = document.getElementById('tts-rate-select');
const toastEl = document.getElementById('toast-message');

const MODE_LABELS = {
  all: '✨ Semua Topik',
  ngajar: '🎓 Mode Ngajar (Vibe Coding)',
  santai: '⚡ Spontan Santai',
  organisasi: '🎓 Kuliah & Organisasi',
  cerita: '📖 Cerita & Nostalgia',
  opini: '💬 Opini Ringan',
  english: '🇬🇧 English Flow',
  deep: '☕ Deep Talk',
  carnegie: '📚 Dale Carnegie'
};

// --- INITIALIZATION ---
function init() {
  initCuePresenter();
  loadTopicsFromStore();
  setupVoiceControl();
  setupEventListeners();
  startTimer();

  // Sync initial UI settings state
  if (toggleTTSBtn) {
    toggleTTSBtn.classList.toggle('active', !!state.settings.autoTTS);
  }
  if (ttsRateSelect) {
    ttsRateSelect.value = state.settings.ttsRate || '1.0';
  }

  renderTopicView();
}

function loadTopicsFromStore() {
  const loaded = loadTopics(DEFAULT_TOPICS);
  state.activeTopics = loaded.activeTopics;
  state.doneTopics = loaded.doneTopics;
  updateBadgeCounts();
}

function saveTopicsToStore() {
  saveTopics(state.activeTopics, state.doneTopics);
  updateBadgeCounts();
}

function getEligibleActiveTopics() {
  if (state.selectedMode === 'ngajar') {
    return TEACHING_DECK;
  }
  if (state.selectedMode === 'all') {
    return state.activeTopics;
  }
  return state.activeTopics.filter(t => {
    if (t.mode) return t.mode === state.selectedMode;
    const cat = (t.category || '').toLowerCase();
    if (state.selectedMode === 'santai') return cat.includes('santai');
    if (state.selectedMode === 'organisasi') return cat.includes('organisasi') || cat.includes('kuliah');
    if (state.selectedMode === 'cerita') return cat.includes('cerita');
    if (state.selectedMode === 'opini') return cat.includes('opini');
    if (state.selectedMode === 'english') return cat.includes('english');
    if (state.selectedMode === 'deep') return cat.includes('deep');
    if (state.selectedMode === 'carnegie') return cat.includes('carnegie') || cat.includes('dale');
    return true;
  });
}

function updateBadgeCounts() {
  const totalActive = state.activeTopics.length;
  const eligibleCount = getEligibleActiveTopics().length;
  const doneCount = state.doneTopics.length;

  if (topicCountBadge) {
    topicCountBadge.textContent = state.selectedMode === 'ngajar'
      ? `${TEACHING_DECK.length} Step Ngajar`
      : state.selectedMode === 'all'
      ? `${totalActive} Topik`
      : `${eligibleCount} / ${totalActive} Topik`;
  }

  if (countActiveTab) countActiveTab.textContent = totalActive;
  if (countDoneTab) countDoneTab.textContent = doneCount;

  // Update counts for dropdown menu
  const countNgajar = document.getElementById('count-mode-ngajar');
  if (countNgajar) countNgajar.textContent = `${TEACHING_DECK.length} Step`;

  const countAll = document.getElementById('count-mode-all');
  if (countAll) countAll.textContent = totalActive;

  const modes = ['santai', 'organisasi', 'cerita', 'opini', 'english', 'deep', 'carnegie'];
  modes.forEach(modeKey => {
    const countEl = document.getElementById(`count-mode-${modeKey}`);
    if (countEl) {
      const count = state.activeTopics.filter(t => {
        if (t.mode) return t.mode === modeKey;
        const cat = (t.category || '').toLowerCase();
        if (modeKey === 'santai') return cat.includes('santai');
        if (modeKey === 'organisasi') return cat.includes('organisasi') || cat.includes('kuliah');
        if (modeKey === 'cerita') return cat.includes('cerita');
        if (modeKey === 'opini') return cat.includes('opini');
        if (modeKey === 'english') return cat.includes('english');
        if (modeKey === 'deep') return cat.includes('deep');
        if (modeKey === 'carnegie') return cat.includes('carnegie') || cat.includes('dale');
        return false;
      }).length;
      countEl.textContent = count;
    }
  });
}

// --- TOPIC & PRESENTER RENDERING ---
function renderTopicView() {
  resetTimer();

  if (state.selectedMode === 'ngajar') {
    renderNgajarMode();
    return;
  }

  // Restore regular action button titles if coming from ngajar mode
  updateActionButtonLabels(false);

  const pool = getEligibleActiveTopics();

  if (pool.length === 0) {
    if (state.activeTopics.length > 0) {
      showToast('Semua topik di mode ini selesai! Menampilkan semua topik.');
      setMode('all');
      return;
    }
    state.currentTopic = null;
    topicCard.style.display = 'none';
    allCompletedView.classList.add('show');
    actionControlsContainer.style.opacity = '0.4';
    actionControlsContainer.style.pointerEvents = 'none';
    return;
  }

  topicCard.style.display = 'flex';
  allCompletedView.classList.remove('show');
  actionControlsContainer.style.opacity = '1';
  actionControlsContainer.style.pointerEvents = 'auto';

  // Pick random topic
  let candidates = pool;
  if (state.currentTopic && pool.length > 1) {
    candidates = pool.filter(t => t.id !== state.currentTopic.id);
  }
  const randomIndex = Math.floor(Math.random() * candidates.length);
  const next = candidates[randomIndex];
  state.currentTopic = next;

  // Smooth fade transition
  topicTextDisplay.style.opacity = '0';
  setTimeout(() => {
    if (next.quote && next.prompt) {
      topicTextDisplay.innerHTML = `
        <div class="book-point-container">
          <div class="book-quote-box">
            <div class="book-quote-header">
              <span>📖 Prinsip Buku</span>
            </div>
            <div class="book-quote-text">"${escapeHTML(next.quote)}"</div>
          </div>
          <div class="book-prompt-box">
            <span class="book-prompt-label">🎯 Tantangan Cerita:</span>
            <div class="book-prompt-text">${escapeHTML(next.prompt)}</div>
          </div>
        </div>
      `;
    } else {
      topicTextDisplay.textContent = next.text;
    }

    if (topicCardCategoryBadge) {
      topicCardCategoryBadge.textContent = next.category || 'General';
      topicCardCategoryBadge.style.display = 'inline-block';
    }
    if (cardProgressHint) {
      cardProgressHint.textContent = `${pool.length} Tersisa di Mode Ini`;
    }
    topicTextDisplay.style.opacity = '1';

    if (state.settings.autoTTS) {
      const speakableText = next.prompt ? `${next.quote}. Pertanyaan: ${next.prompt}` : next.text;
      speakTopic(speakableText, next.category);
    }
  }, 100);
}

function renderNgajarMode() {
  topicCard.style.display = 'flex';
  allCompletedView.classList.remove('show');
  actionControlsContainer.style.opacity = '1';
  actionControlsContainer.style.pointerEvents = 'auto';

  if (topicCardCategoryBadge) {
    topicCardCategoryBadge.style.display = 'none'; // Hide default badge in favor of card-internal step badge
  }

  const stepData = getCurrentStep();
  state.currentTopic = stepData;

  updateActionButtonLabels(true);

  if (cardProgressHint) {
    cardProgressHint.textContent = `Sequential Step ${getStepIndex() + 1} dari ${getTotalSteps()}`;
  }

  topicTextDisplay.style.opacity = '0';
  setTimeout(() => {
    renderPresenterCard(topicTextDisplay, stepData);
    topicTextDisplay.style.opacity = '1';

    if (state.settings.autoTTS) {
      const cluesText = (stepData.glanceClues || []).map(c => c.replace(/\*\*/g, '')).join('. ');
      speakTopic(`Langkah ${stepData.stepNumber}: ${stepData.title}. Clue: ${cluesText}`, stepData.category);
    }
  }, 100);
}

function updateActionButtonLabels(isNgajarMode) {
  if (isNgajarMode) {
    btnMarkDone.querySelector('.btn-title span:first-of-type').textContent = '← Step Sblmnya';
    btnMarkDone.querySelector('.btn-subtitle').textContent = 'Kembali ke langkah sebelumnya';
    btnMarkDone.querySelector('.kbd-shortcut').textContent = '←';

    btnNextTopic.querySelector('.btn-title span:first-of-type').textContent = 'Step Lanjut →';
    btnNextTopic.querySelector('.btn-subtitle').textContent = 'Lanjut ke langkah berikutnya';
    btnNextTopic.querySelector('.kbd-shortcut').textContent = 'Space / →';
  } else {
    btnMarkDone.querySelector('.btn-title span:first-of-type').textContent = 'Tandai Selesai';
    btnMarkDone.querySelector('.btn-subtitle').textContent = 'Keluarkan dari rotasi';
    btnMarkDone.querySelector('.kbd-shortcut').textContent = '← / D';

    btnNextTopic.querySelector('.btn-title span:first-of-type').textContent = 'Lanjutkan';
    btnNextTopic.querySelector('.btn-subtitle').textContent = 'Simpan & acak topik baru';
    btnNextTopic.querySelector('.kbd-shortcut').textContent = 'Space / →';
  }
}

function handleNextAction() {
  if (state.selectedMode === 'ngajar') {
    nextStep();
    renderNgajarMode();
  } else {
    renderTopicView();
  }
}

function handlePrevOrDoneAction() {
  if (state.selectedMode === 'ngajar') {
    prevStep();
    renderNgajarMode();
  } else {
    markCurrentTopicDone();
  }
}

function setMode(modeId) {
  state.selectedMode = modeId;
  dropdownItems.forEach(item => {
    item.classList.toggle('active', item.dataset.mode === modeId);
  });
  if (topicCategoryLabel) {
    topicCategoryLabel.textContent = MODE_LABELS[modeId] || '✨ Semua Topik';
  }
  closeCategoryDropdown();
  updateBadgeCounts();
  renderTopicView();
}

// --- STOPWATCH TIMER ---
function startTimer() {
  if (state.timerInterval) clearInterval(state.timerInterval);
  state.timerSeconds = 0;
  state.timerInterval = setInterval(() => {
    state.timerSeconds++;
    const mins = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
    const secs = String(state.timerSeconds % 60).padStart(2, '0');
    if (practiceTimerDisplay) practiceTimerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}

function resetTimer() {
  state.timerSeconds = 0;
  if (practiceTimerDisplay) practiceTimerDisplay.textContent = '00:00';
}

// --- SPEECH & VOICE RECOGNITION ---
function speakTopic(text, category) {
  speakText(text, category, state.settings.ttsRate, () => {
    if (speakCurrentBtn) speakCurrentBtn.classList.add('speaking');
  }, () => {
    if (speakCurrentBtn) speakCurrentBtn.classList.remove('speaking');
  });
}

function toggleAutoTTS() {
  state.settings.autoTTS = !state.settings.autoTTS;
  saveSettings(state.settings);
  if (state.settings.autoTTS) {
    toggleTTSBtn.classList.add('active');
    showToast('🔊 Baca otomatis: Aktif');
    if (state.currentTopic) {
      const textToSpeak = state.selectedMode === 'ngajar'
        ? `Langkah ${state.currentTopic.stepNumber}: ${state.currentTopic.title}`
        : (state.currentTopic.prompt ? `${state.currentTopic.quote}. Pertanyaan: ${state.currentTopic.prompt}` : state.currentTopic.text);
      speakTopic(textToSpeak, state.currentTopic.category);
    }
  } else {
    toggleTTSBtn.classList.remove('active');
    stopSpeech();
    showToast('🔇 Baca otomatis: Nonaktif');
  }
}

function setupVoiceControl() {
  initSpeechRecognition((transcript) => {
    console.log('[Voice Command]', transcript);
    if (transcript.includes('lanjut') || transcript.includes('next') || transcript.includes('skip') || transcript.includes('ganti')) {
      showToast('🗣️ "Lanjut"');
      handleNextAction();
    } else if (transcript.includes('sebelumnya') || transcript.includes('kembali') || transcript.includes('back')) {
      showToast('🗣️ "Sebelumnya"');
      if (state.selectedMode === 'ngajar') handlePrevOrDoneAction();
    } else if (transcript.includes('selesai') || transcript.includes('done') || transcript.includes('sudah') || transcript.includes('tandai')) {
      showToast('🗣️ "Selesai"');
      handlePrevOrDoneAction();
    } else if (transcript.includes('ulang') || transcript.includes('baca') || transcript.includes('repeat')) {
      showToast('🗣️ "Bacakan Ulang"');
      if (state.currentTopic) {
        const textToSpeak = state.selectedMode === 'ngajar' ? state.currentTopic.title : state.currentTopic.text;
        speakTopic(textToSpeak, state.currentTopic.category);
      }
    }
  }, (statusMessage, active) => {
    if (voiceStatusText) voiceStatusText.textContent = statusMessage;
    if (toggleVoiceBtn) toggleVoiceBtn.classList.toggle('mic-active', active);
    state.isListeningVoice = active;
  }, (errorMsg) => {
    showToast(errorMsg);
  });
}

function markCurrentTopicDone() {
  if (!state.currentTopic || state.selectedMode === 'ngajar') return;

  const topicToDone = state.currentTopic;
  state.activeTopics = state.activeTopics.filter(t => t.id !== topicToDone.id);
  state.doneTopics.push(topicToDone);
  saveTopicsToStore();

  showToast('✓ Topik ditandai selesai');
  renderTopicView();
}

// --- DROPDOWN & MODAL HANDLERS ---
function toggleCategoryDropdown() {
  const isOpen = categoryDropdownMenu.classList.contains('open');
  if (isOpen) closeCategoryDropdown();
  else openCategoryDropdown();
}

function openCategoryDropdown() {
  categoryDropdownMenu.classList.add('open');
  topicCategoryBtn.classList.add('open');
  topicCategoryBtn.setAttribute('aria-expanded', 'true');
}

function closeCategoryDropdown() {
  categoryDropdownMenu.classList.remove('open');
  topicCategoryBtn.classList.remove('open');
  topicCategoryBtn.setAttribute('aria-expanded', 'false');
}

function openModal() {
  renderActiveTopicsList();
  renderDoneTopicsList();
  topicModal.classList.add('open');
}

function closeModal() {
  topicModal.classList.remove('open');
}

function openTipsModal() {
  if (tipsModal) tipsModal.classList.add('open');
}

function closeTipsModal() {
  if (tipsModal) tipsModal.classList.remove('open');
}

function switchTab(tabId) {
  modalTabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
  tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === tabId));

  if (tabId === 'tab-active') renderActiveTopicsList();
  if (tabId === 'tab-done') renderDoneTopicsList();
}

function renderActiveTopicsList(filterQuery = '') {
  activeTopicsList.innerHTML = '';
  const query = filterQuery.trim().toLowerCase();
  const filtered = query
    ? state.activeTopics.filter(t => (t.text || '').toLowerCase().includes(query) || (t.category && t.category.toLowerCase().includes(query)))
    : state.activeTopics;

  if (filtered.length === 0) {
    activeTopicsList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 24px;">Tidak ada topik aktif.</div>';
    return;
  }

  filtered.forEach(topic => {
    const item = document.createElement('div');
    item.className = 'topic-item-card';
    item.innerHTML = `
      <div class="topic-item-text">
        <div>${escapeHTML(topic.text || '')}</div>
        <div class="topic-item-meta">
          <span>🏷️ ${escapeHTML(topic.category || 'General')}</span>
        </div>
      </div>
      <button class="item-action-btn" data-action="mark-done-item" data-id="${topic.id}">Selesai</button>
    `;
    activeTopicsList.appendChild(item);
  });
}

function renderDoneTopicsList() {
  doneTopicsList.innerHTML = '';
  if (state.doneTopics.length === 0) {
    doneTopicsList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 24px;">Belum ada topik yang selesai.</div>';
    return;
  }

  state.doneTopics.forEach(topic => {
    const item = document.createElement('div');
    item.className = 'topic-item-card';
    item.innerHTML = `
      <div class="topic-item-text">
        <div>${escapeHTML(topic.text || '')}</div>
        <div class="topic-item-meta">
          <span>🏷️ ${escapeHTML(topic.category || 'General')}</span>
        </div>
      </div>
      <button class="item-action-btn restore" data-action="restore-item" data-id="${topic.id}">Kembalikan</button>
    `;
    doneTopicsList.appendChild(item);
  });
}

function addNewTopic(category, text) {
  if (!text.trim()) return;
  const newTopic = {
    id: 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    category: category || 'Custom',
    text: text.trim()
  };
  state.activeTopics.unshift(newTopic);
  saveTopicsToStore();
  showToast('+ Topik baru ditambahkan');
  renderActiveTopicsList();
}

function restoreTopic(id) {
  const topic = state.doneTopics.find(t => t.id === id);
  if (!topic) return;
  state.doneTopics = state.doneTopics.filter(t => t.id !== id);
  state.activeTopics.push(topic);
  saveTopicsToStore();
  renderDoneTopicsList();
  showToast('Topik dikembalikan ke rotasi aktif');
  if (!state.currentTopic) renderTopicView();
}

function restoreAllTopics() {
  if (state.doneTopics.length === 0) return;
  state.activeTopics = [...state.activeTopics, ...state.doneTopics];
  state.doneTopics = [];
  saveTopicsToStore();
  renderDoneTopicsList();
  showToast('Semua topik berhasil dikembalikan!');
  if (!state.currentTopic) renderTopicView();
}

function hardResetToDefault() {
  if (!confirm('Apakah kamu yakin ingin mereset seluruh topik ke daftar default awal? Semua topik kustom & progres akan di-reset.')) return;
  state.activeTopics = [...DEFAULT_TOPICS];
  state.doneTopics = [];
  saveTopicsToStore();
  closeModal();
  showToast('Daftar topik berhasil direset ke awal');
  renderTopicView();
}

// --- TOAST UTILITY ---
let toastTimeout = null;
function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2200);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  btnNextTopic.addEventListener('click', handleNextAction);
  btnMarkDone.addEventListener('click', handlePrevOrDoneAction);

  speakCurrentBtn.addEventListener('click', () => {
    if (state.currentTopic) {
      if (getIsSpeaking()) stopSpeech();
      else {
        const textToSpeak = state.selectedMode === 'ngajar'
          ? `Langkah ${state.currentTopic.stepNumber}: ${state.currentTopic.title}`
          : (state.currentTopic.prompt ? `${state.currentTopic.quote}. Pertanyaan: ${state.currentTopic.prompt}` : state.currentTopic.text);
        speakTopic(textToSpeak, state.currentTopic.category);
      }
    }
  });

  toggleTTSBtn.addEventListener('click', toggleAutoTTS);
  toggleVoiceBtn.addEventListener('click', () => {
    toggleVoiceRecognition((msg, active) => {
      if (voiceStatusText) voiceStatusText.textContent = msg;
      if (toggleVoiceBtn) toggleVoiceBtn.classList.toggle('mic-active', active);
      state.isListeningVoice = active;
    }, (err) => showToast(err));
  });

  if (topicCategoryBtn) {
    topicCategoryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCategoryDropdown();
    });
  }

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const mode = item.dataset.mode || 'all';
      setMode(mode);
      showToast(`Kategori: ${MODE_LABELS[mode] || 'Semua Topik'}`);
    });
  });

  document.addEventListener('click', (e) => {
    if (categoryDropdownWrapper && !categoryDropdownWrapper.contains(e.target)) {
      closeCategoryDropdown();
    }
  });

  if (resetAllTopicsBtn) resetAllTopicsBtn.addEventListener('click', restoreAllTopics);
  if (addMoreFromEmptyBtn) {
    addMoreFromEmptyBtn.addEventListener('click', () => {
      openModal();
      switchTab('tab-add');
    });
  }

  openTopicsBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  topicModal.addEventListener('click', (e) => {
    if (e.target === topicModal) closeModal();
  });

  if (openTipsBtn) openTipsBtn.addEventListener('click', openTipsModal);
  if (closeTipsBtn) closeTipsBtn.addEventListener('click', closeTipsModal);
  if (tipsModal) {
    tipsModal.addEventListener('click', (e) => {
      if (e.target === tipsModal) closeTipsModal();
    });
  }

  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  searchActiveInput.addEventListener('input', (e) => {
    renderActiveTopicsList(e.target.value);
  });

  addTopicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = document.getElementById('new-topic-category').value;
    const text = document.getElementById('new-topic-text').value;
    addNewTopic(cat, text);
    document.getElementById('new-topic-text').value = '';
  });

  bulkAddBtn.addEventListener('click', () => {
    const raw = bulkTopicsText.value;
    if (!raw.trim()) return;
    const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    lines.forEach(line => {
      state.activeTopics.unshift({
        id: 'bulk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        category: 'Custom',
        text: line
      });
    });
    saveTopicsToStore();
    bulkTopicsText.value = '';
    showToast(`+ Berhasil menambahkan ${lines.length} topik`);
    switchTab('tab-active');
  });

  activeTopicsList.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action="mark-done-item"]');
    if (!target) return;
    const id = target.dataset.id;
    const topic = state.activeTopics.find(t => t.id === id);
    if (topic) {
      state.activeTopics = state.activeTopics.filter(t => t.id !== id);
      state.doneTopics.push(topic);
      saveTopicsToStore();
      renderActiveTopicsList(searchActiveInput.value);
      showToast('Topik ditandai selesai');
      if (state.currentTopic && state.currentTopic.id === id) {
        renderTopicView();
      }
    }
  });

  doneTopicsList.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action="restore-item"]');
    if (!target) return;
    restoreTopic(target.dataset.id);
  });

  if (restoreAllBtn) restoreAllBtn.addEventListener('click', restoreAllTopics);
  if (hardResetStorageBtn) hardResetStorageBtn.addEventListener('click', hardResetToDefault);

  if (ttsRateSelect) {
    ttsRateSelect.addEventListener('change', (e) => {
      state.settings.ttsRate = parseFloat(e.target.value);
      saveSettings(state.settings);
      showToast(`Kecepatan suara: ${e.target.value}x`);
    });
  }

  // Touch Swipe Gestures
  let touchStartX = 0;
  let touchStartY = 0;

  topicCard.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  topicCard.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaY) < 70) {
      if (deltaX > 0) handleNextAction();
      else handlePrevOrDoneAction();
    }
  }, { passive: true });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
    if (isInput) return;

    if (e.code === 'Space' || e.code === 'ArrowRight') {
      e.preventDefault();
      handleNextAction();
    } else if (e.code === 'ArrowLeft' || e.code === 'KeyD') {
      e.preventDefault();
      handlePrevOrDoneAction();
    } else if (e.code === 'ArrowDown') {
      if (state.selectedMode === 'ngajar') {
        e.preventDefault();
        toggleDetailExpand();
        renderNgajarMode();
      }
    } else if (e.code === 'KeyR') {
      e.preventDefault();
      if (state.currentTopic) {
        const textToSpeak = state.selectedMode === 'ngajar' ? state.currentTopic.title : state.currentTopic.text;
        speakTopic(textToSpeak, state.currentTopic.category);
      }
    } else if (e.code === 'Escape') {
      closeCategoryDropdown();
      if (topicModal.classList.contains('open')) closeModal();
      if (tipsModal && tipsModal.classList.contains('open')) closeTipsModal();
    }
  });
}

// --- SERVICE WORKER REGISTRATION ---
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('[SW] Registered successfully', reg.scope))
        .catch((err) => console.warn('[SW] Registration failed', err));
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    registerServiceWorker();
  });
} else {
  init();
  registerServiceWorker();
}
