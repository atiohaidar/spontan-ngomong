/*
  Spontan Ngomong - Storage Module
  Handles LocalStorage operations for topics, settings, and teaching state.
*/

export const STORAGE_KEYS = {
  ACTIVE: 'spontan_active_topics_v7',
  DONE: 'spontan_done_topics_v7',
  SETTINGS: 'spontan_settings_v7',
  TEACHING_STEP: 'spontan_teaching_step_v7'
};

export const defaultSettings = {
  autoTTS: true,
  ttsRate: 1.0,
  voiceCommand: false
};

export function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('[Storage] Failed to load settings from localStorage', e);
  }
  return { ...defaultSettings };
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('[Storage] Failed to save settings', e);
  }
}

export function loadTopics(defaultTopics = []) {
  try {
    const savedActive = localStorage.getItem(STORAGE_KEYS.ACTIVE);
    const savedDone = localStorage.getItem(STORAGE_KEYS.DONE);

    let activeTopics = savedActive ? JSON.parse(savedActive) : null;
    let doneTopics = savedDone ? JSON.parse(savedDone) : [];

    if (!activeTopics) {
      activeTopics = [...defaultTopics];
      saveTopics(activeTopics, doneTopics);
    }

    return { activeTopics, doneTopics };
  } catch (e) {
    console.error('[Storage] Error loading topics', e);
    return { activeTopics: [...defaultTopics], doneTopics: [] };
  }
}

export function saveTopics(activeTopics, doneTopics) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE, JSON.stringify(activeTopics));
    localStorage.setItem(STORAGE_KEYS.DONE, JSON.stringify(doneTopics));
  } catch (e) {
    console.error('[Storage] Failed to save topics', e);
  }
}

export function loadTeachingStep() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TEACHING_STEP);
    return saved ? parseInt(saved, 10) : 0;
  } catch (e) {
    return 0;
  }
}

export function saveTeachingStep(stepIndex) {
  try {
    localStorage.setItem(STORAGE_KEYS.TEACHING_STEP, stepIndex.toString());
  } catch (e) {}
}
