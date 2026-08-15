/*
  Spontan Ngomong - Application Logic
  Zero-distraction spontaneous speaking tool with Speech APIs and LocalStorage.
*/

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_ACTIVE = 'spontan_active_topics_v1';
  const STORAGE_KEY_DONE = 'spontan_done_topics_v1';
  const STORAGE_KEY_SETTINGS = 'spontan_settings_v1';

  // Application State
  let state = {
    activeTopics: [],
    doneTopics: [],
    currentTopic: null,
    history: [],
    timerSeconds: 0,
    timerInterval: null,
    isListeningVoice: false,
    settings: {
      autoTTS: true,
      ttsRate: 1.0,
      voiceCommand: false
    }
  };

  // Speech Recognition & Synthesis Instances
  let speechSynth = window.speechSynthesis || null;
  let recognition = null;
  let isSpeaking = false;

  // DOM Elements
  const topicCard = document.getElementById('topic-card');
  const allCompletedView = document.getElementById('all-completed-view');
  const actionControlsContainer = document.getElementById('action-controls-container');
  const topicTextDisplay = document.getElementById('topic-text-display');
  const topicCategoryBadge = document.getElementById('topic-category-badge');
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

  // --- INITIALIZATION ---
  function init() {
    loadSettings();
    loadTopicsFromStorage();
    initSpeechRecognition();
    setupEventListeners();
    startTimer();
    renderNextTopic();
  }

  // --- STATE & STORAGE MANAGEMENT ---
  function loadSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        state.settings = { ...state.settings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage', e);
    }

    // Apply UI state for settings
    if (state.settings.autoTTS) {
      toggleTTSBtn.classList.add('active');
    } else {
      toggleTTSBtn.classList.remove('active');
    }

    if (ttsRateSelect) {
      ttsRateSelect.value = state.settings.ttsRate || '1.0';
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(state.settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }

  function loadTopicsFromStorage() {
    try {
      const savedActive = localStorage.getItem(STORAGE_KEY_ACTIVE);
      const savedDone = localStorage.getItem(STORAGE_KEY_DONE);

      if (savedDone) {
        state.doneTopics = JSON.parse(savedDone);
      } else {
        state.doneTopics = [];
      }

      if (savedActive) {
        state.activeTopics = JSON.parse(savedActive);
        
        // Smart Sync: Check if there are newly added default topics in topics.js
        if (typeof DEFAULT_TOPICS !== 'undefined' && Array.isArray(DEFAULT_TOPICS)) {
          const existingTexts = new Set([
            ...state.activeTopics.map(t => t.text.trim().toLowerCase()),
            ...state.doneTopics.map(t => t.text.trim().toLowerCase())
          ]);
          
          let newlyAddedCount = 0;
          DEFAULT_TOPICS.forEach(defTopic => {
            if (!existingTexts.has(defTopic.text.trim().toLowerCase())) {
              state.activeTopics.push(defTopic);
              newlyAddedCount++;
            }
          });

          if (newlyAddedCount > 0) {
            saveTopicsToStorage();
          }
        }
      } else {
        // First time load: use DEFAULT_TOPICS from topics.js
        if (typeof DEFAULT_TOPICS !== 'undefined' && Array.isArray(DEFAULT_TOPICS)) {
          state.activeTopics = [...DEFAULT_TOPICS];
        } else {
          state.activeTopics = [
            { id: 'fallback_1', category: 'General', text: 'Ceritakan satu hal paling menarik yang kamu pelajari minggu ini.' }
          ];
        }
        saveTopicsToStorage();
      }
    } catch (e) {
      console.error('Error loading topics from storage', e);
      state.activeTopics = typeof DEFAULT_TOPICS !== 'undefined' ? [...DEFAULT_TOPICS] : [];
      state.doneTopics = [];
    }

    updateBadgeCounts();
  }

  function saveTopicsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(state.activeTopics));
      localStorage.setItem(STORAGE_KEY_DONE, JSON.stringify(state.doneTopics));
    } catch (e) {
      console.error('Failed to save topics to storage', e);
    }
    updateBadgeCounts();
  }

  function updateBadgeCounts() {
    const activeCount = state.activeTopics.length;
    const doneCount = state.doneTopics.length;

    topicCountBadge.textContent = `${activeCount} Topik`;
    if (countActiveTab) countActiveTab.textContent = activeCount;
    if (countDoneTab) countDoneTab.textContent = doneCount;
  }

  // --- TOPIC NAVIGATION LOGIC ---
  function getRandomTopic() {
    if (state.activeTopics.length === 0) return null;
    if (state.activeTopics.length === 1) return state.activeTopics[0];

    // Pick random topic that is not the current one (if possible)
    let candidates = state.activeTopics;
    if (state.currentTopic) {
      candidates = state.activeTopics.filter(t => t.id !== state.currentTopic.id);
      if (candidates.length === 0) candidates = state.activeTopics;
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }

  function renderNextTopic() {
    resetTimer();

    if (state.activeTopics.length === 0) {
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

    const next = getRandomTopic();
    state.currentTopic = next;

    // Smooth transition
    topicTextDisplay.style.opacity = '0';
    setTimeout(() => {
      topicTextDisplay.textContent = next.text;
      topicCategoryBadge.textContent = next.category || 'General';
      cardProgressHint.textContent = `${state.activeTopics.length} Tersisa`;
      topicTextDisplay.style.opacity = '1';

      if (state.settings.autoTTS) {
        speakTopic(next.text, next.category);
      }
    }, 120);
  }

  function markCurrentTopicDone() {
    if (!state.currentTopic) return;

    const topicToDone = state.currentTopic;
    state.activeTopics = state.activeTopics.filter(t => t.id !== topicToDone.id);
    state.doneTopics.push(topicToDone);
    saveTopicsToStorage();

    showToast('✓ Topik ditandai selesai');
    renderNextTopic();
  }

  // --- PRACTICE TIMER (STOPWATCH) ---
  function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerSeconds = 0;
    state.timerInterval = setInterval(() => {
      state.timerSeconds++;
      const mins = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
      const secs = String(state.timerSeconds % 60).padStart(2, '0');
      practiceTimerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function resetTimer() {
    state.timerSeconds = 0;
    practiceTimerDisplay.textContent = '00:00';
  }

  // --- TEXT-TO-SPEECH (TTS) ---
  function speakTopic(text, category) {
    if (!speechSynth) return;

    speechSynth.cancel(); // stop any ongoing speech

    const isEnglish = (category && category.toLowerCase().includes('english')) || /^[A-Za-z0-9\s.,!?'"-]+$/.test(text.substring(0, 30));
    const lang = isEnglish ? 'en-US' : 'id-ID';

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = parseFloat(state.settings.ttsRate || 1.0);

    // Try to match appropriate voice if available
    const voices = speechSynth.getVoices();
    if (voices && voices.length > 0) {
      const matchedVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
      if (matchedVoice) utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      isSpeaking = true;
      speakCurrentBtn.classList.add('speaking');
    };

    utterance.onend = () => {
      isSpeaking = false;
      speakCurrentBtn.classList.remove('speaking');
    };

    utterance.onerror = () => {
      isSpeaking = false;
      speakCurrentBtn.classList.remove('speaking');
    };

    speechSynth.speak(utterance);
  }

  function toggleAutoTTS() {
    state.settings.autoTTS = !state.settings.autoTTS;
    saveSettings();
    if (state.settings.autoTTS) {
      toggleTTSBtn.classList.add('active');
      showToast('🔊 Baca otomatis: Aktif');
      if (state.currentTopic) speakTopic(state.currentTopic.text, state.currentTopic.category);
    } else {
      toggleTTSBtn.classList.remove('active');
      if (speechSynth) speechSynth.cancel();
      showToast('🔇 Baca otomatis: Nonaktif');
    }
  }

  // --- VOICE COMMAND RECOGNITION (HANDS-FREE) ---
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      voiceStatusText.textContent = 'Perintah suara tidak didukung browser ini';
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'id-ID';

    recognition.onstart = () => {
      state.isListeningVoice = true;
      toggleVoiceBtn.classList.add('mic-active');
      voiceStatusText.textContent = '🎙️ Mendengarkan: Katakan "Lanjut" atau "Selesai"';
    };

    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
      console.log('Voice Command recognized:', transcript);

      handleVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        showToast('Izin mikrofon ditolak.');
        stopVoiceRecognition();
      }
    };

    recognition.onend = () => {
      if (state.isListeningVoice) {
        // Auto restart for continuous listening
        try {
          recognition.start();
        } catch (e) {
          // ignore
        }
      }
    };
  }

  function toggleVoiceRecognition() {
    if (!recognition) {
      showToast('Browser ini belum mendukung Web Speech Recognition');
      return;
    }

    if (state.isListeningVoice) {
      stopVoiceRecognition();
      showToast('Mic nonaktif');
    } else {
      startVoiceRecognition();
      showToast('🎙️ Mic aktif: Silakan katakan "Lanjut" / "Selesai"');
    }
  }

  function startVoiceRecognition() {
    if (!recognition) return;
    try {
      state.isListeningVoice = true;
      recognition.start();
    } catch (e) {
      console.warn('Recognition start error', e);
    }
  }

  function stopVoiceRecognition() {
    state.isListeningVoice = false;
    toggleVoiceBtn.classList.remove('mic-active');
    voiceStatusText.textContent = 'Perintah suara nonaktif';
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
  }

  function handleVoiceCommand(transcript) {
    if (transcript.includes('lanjut') || transcript.includes('next') || transcript.includes('skip') || transcript.includes('ganti')) {
      showToast('🗣️ "Lanjut"');
      renderNextTopic();
    } else if (transcript.includes('selesai') || transcript.includes('done') || transcript.includes('sudah') || transcript.includes('tandai')) {
      showToast('🗣️ "Selesai"');
      markCurrentTopicDone();
    } else if (transcript.includes('ulang') || transcript.includes('baca') || transcript.includes('repeat') || transcript.includes('read')) {
      showToast('🗣️ "Bacakan Ulang"');
      if (state.currentTopic) speakTopic(state.currentTopic.text, state.currentTopic.category);
    }
  }

  // --- MODAL & TOPIC MANAGEMENT UI ---
  function openModal() {
    renderActiveTopicsList();
    renderDoneTopicsList();
    topicModal.classList.add('open');
  }

  function closeModal() {
    topicModal.classList.remove('open');
  }

  function switchTab(tabId) {
    modalTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    if (tabId === 'tab-active') renderActiveTopicsList();
    if (tabId === 'tab-done') renderDoneTopicsList();
  }

  function renderActiveTopicsList(filterQuery = '') {
    activeTopicsList.innerHTML = '';
    const query = filterQuery.trim().toLowerCase();
    const filtered = query
      ? state.activeTopics.filter(t => t.text.toLowerCase().includes(query) || (t.category && t.category.toLowerCase().includes(query)))
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
          <div>${escapeHTML(topic.text)}</div>
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
          <div>${escapeHTML(topic.text)}</div>
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
    saveTopicsToStorage();
    showToast('+ Topik baru ditambahkan');
    renderActiveTopicsList();
  }

  function restoreTopic(id) {
    const topic = state.doneTopics.find(t => t.id === id);
    if (!topic) return;
    state.doneTopics = state.doneTopics.filter(t => t.id !== id);
    state.activeTopics.push(topic);
    saveTopicsToStorage();
    renderDoneTopicsList();
    showToast('Topik dikembalikan ke rotasi aktif');
    if (!state.currentTopic) renderNextTopic();
  }

  function restoreAllTopics() {
    if (state.doneTopics.length === 0) return;
    state.activeTopics = [...state.activeTopics, ...state.doneTopics];
    state.doneTopics = [];
    saveTopicsToStorage();
    renderDoneTopicsList();
    showToast('Semua topik berhasil dikembalikan!');
    if (!state.currentTopic) renderNextTopic();
  }

  function hardResetToDefault() {
    if (!confirm('Apakah kamu yakin ingin mereset seluruh topik ke daftar default awal? Semua topik kustom & progres akan di-reset.')) {
      return;
    }
    state.activeTopics = (typeof DEFAULT_TOPICS !== 'undefined') ? [...DEFAULT_TOPICS] : [];
    state.doneTopics = [];
    saveTopicsToStorage();
    closeModal();
    showToast('Daftar topik berhasil direset ke awal');
    renderNextTopic();
  }

  // --- UTILITY: TOAST ---
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
    // Primary Action Buttons
    btnNextTopic.addEventListener('click', () => renderNextTopic());
    btnMarkDone.addEventListener('click', () => markCurrentTopicDone());

    // Single click on speaker icon to repeat speech
    speakCurrentBtn.addEventListener('click', () => {
      if (state.currentTopic) speakTopic(state.currentTopic.text, state.currentTopic.category);
    });

    // Toggle controls
    toggleTTSBtn.addEventListener('click', toggleAutoTTS);
    toggleVoiceBtn.addEventListener('click', toggleVoiceRecognition);

    // Empty state actions
    if (resetAllTopicsBtn) resetAllTopicsBtn.addEventListener('click', restoreAllTopics);
    if (addMoreFromEmptyBtn) {
      addMoreFromEmptyBtn.addEventListener('click', () => {
        openModal();
        switchTab('tab-add');
      });
    }

    // Modal Events
    openTopicsBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    topicModal.addEventListener('click', (e) => {
      if (e.target === topicModal) closeModal();
    });

    modalTabBtns.forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Active Topic Search
    searchActiveInput.addEventListener('input', (e) => {
      renderActiveTopicsList(e.target.value);
    });

    // Add Topic Form
    addTopicForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = document.getElementById('new-topic-category').value;
      const text = document.getElementById('new-topic-text').value;
      addNewTopic(cat, text);
      document.getElementById('new-topic-text').value = '';
    });

    // Bulk Add
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
      saveTopicsToStorage();
      bulkTopicsText.value = '';
      showToast(`+ Berhasil menambahkan ${lines.length} topik`);
      switchTab('tab-active');
    });

    // Active Topics Item Actions (Delegation)
    activeTopicsList.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action="mark-done-item"]');
      if (!target) return;
      const id = target.dataset.id;
      const topic = state.activeTopics.find(t => t.id === id);
      if (topic) {
        state.activeTopics = state.activeTopics.filter(t => t.id !== id);
        state.doneTopics.push(topic);
        saveTopicsToStorage();
        renderActiveTopicsList(searchActiveInput.value);
        showToast('Topik ditandai selesai');
        if (state.currentTopic && state.currentTopic.id === id) {
          renderNextTopic();
        }
      }
    });

    // Done Topics Item Actions (Delegation)
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
        saveSettings();
        showToast(`Kecepatan suara diatur ke ${e.target.value}x`);
      });
    }

    // Keyboard Shortcuts (Laptop friendly)
    window.addEventListener('keydown', (e) => {
      // Don't trigger if typing in an input or textarea or modal is open
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);
      if (isInput) return;

      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        renderNextTopic();
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyD') {
        e.preventDefault();
        markCurrentTopicDone();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        if (state.currentTopic) speakTopic(state.currentTopic.text, state.currentTopic.category);
      } else if (e.code === 'Escape') {
        if (topicModal.classList.contains('open')) closeModal();
      }
    });
  }

  // --- SERVICE WORKER REGISTRATION (OFFLINE SUPPORT) ---
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[SW] Service Worker registered successfully', reg.scope);
          })
          .catch((err) => {
            console.warn('[SW] Service Worker registration failed', err);
          });
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      registerServiceWorker();
    });
  } else {
    init();
    registerServiceWorker();
  }
})();
