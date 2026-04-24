// Simple event emitter for cross-component communication
// Compatible with Vue 3 without requiring external dependencies

const listeners = {};

const emitter = {
  on(event, handler) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(handler);
  },
  off(event, handler) {
    if (!listeners[event]) return;
    listeners[event] = listeners[event].filter(h => h !== handler);
  },
  emit(event, ...args) {
    if (!listeners[event]) return;
    listeners[event].forEach(h => h(...args));
  }
};

export default emitter;
