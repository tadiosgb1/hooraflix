import emitter from '@/eventBus';

export const themeMixin = {
  data() {
    return {
      isDark: localStorage.getItem('hooraflix-theme') !== 'light',
    };
  },
  mounted() {
    this._themeHandler = (isDark) => { this.isDark = isDark; };
    emitter.on('theme-changed', this._themeHandler);
  },
  beforeUnmount() {
    emitter.off('theme-changed', this._themeHandler);
  },
};
