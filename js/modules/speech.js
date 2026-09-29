/*
  Spontan Ngomong - Speech Module
  Handles Text-to-Speech (TTS) and Web Speech Voice Commands.
*/

let speechSynth = typeof window !== 'undefined' ? window.speechSynthesis || null : null;
let recognition = null;
let isSpeaking = false;
let isListening = false;

export function speakText(text, category = '', rate = 1.0, onStart, onEnd) {
  if (!speechSynth) return;

  speechSynth.cancel(); // Stop active speech

  const isEnglish = (category && category.toLowerCase().includes('english')) || /^[A-Za-z0-9\s.,!?'"-]+$/.test(text.substring(0, 30));
  const lang = isEnglish ? 'en-US' : 'id-ID';

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = parseFloat(rate || 1.0);

  const voices = speechSynth.getVoices();
  if (voices && voices.length > 0) {
    const matchedVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (matchedVoice) utterance.voice = matchedVoice;
  }

  utterance.onstart = () => {
    isSpeaking = true;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    isSpeaking = false;
    if (onEnd) onEnd();
  };

  speechSynth.speak(utterance);
}

export function stopSpeech() {
  if (speechSynth) {
    speechSynth.cancel();
  }
  isSpeaking = false;
}

export function getIsSpeaking() {
  return isSpeaking;
}

export function initSpeechRecognition(onCommand, onStatusChange, onError) {
  const SpeechRecognition = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;
  if (!SpeechRecognition) {
    if (onStatusChange) onStatusChange('Perintah suara tidak didukung browser ini', false);
    return false;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'id-ID';

  recognition.onstart = () => {
    isListening = true;
    if (onStatusChange) onStatusChange('🎙️ Mendengarkan: Katakan "Lanjut", "Sebelumnya", atau "Selesai"', true);
  };

  recognition.onresult = (event) => {
    const lastResultIndex = event.results.length - 1;
    const transcript = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
    if (onCommand) onCommand(transcript);
  };

  recognition.onerror = (event) => {
    console.warn('[Speech] Recognition error:', event.error);
    if (event.error === 'not-allowed') {
      if (onError) onError('Izin mikrofon ditolak');
      stopVoiceRecognition(onStatusChange);
    }
  };

  recognition.onend = () => {
    if (isListening) {
      try {
        recognition.start();
      } catch (e) {}
    } else {
      if (onStatusChange) onStatusChange('Perintah suara nonaktif', false);
    }
  };

  return true;
}

export function startVoiceRecognition(onStatusChange) {
  if (!recognition) return;
  try {
    isListening = true;
    recognition.start();
  } catch (e) {
    console.warn('[Speech] Start error', e);
  }
}

export function stopVoiceRecognition(onStatusChange) {
  isListening = false;
  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {}
  }
  if (onStatusChange) onStatusChange('Perintah suara nonaktif', false);
}

export function toggleVoiceRecognition(onStatusChange, onError) {
  if (!recognition) {
    if (onError) onError('Browser belum mendukung Web Speech');
    return false;
  }

  if (isListening) {
    stopVoiceRecognition(onStatusChange);
    return false;
  } else {
    startVoiceRecognition(onStatusChange);
    return true;
  }
}
