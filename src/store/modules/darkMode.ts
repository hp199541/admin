// store/modules/darkMode.ts
import { defineStore } from 'pinia';

export interface DarkModeState {
  isDark: boolean;
}

export const useDarkModeStore = defineStore('darkMode', {
  state: (): DarkModeState => ({
    isDark: localStorage.getItem('darkMode') === 'true' ||
      (localStorage.getItem('darkMode') === null &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  }),

  actions: {
    // 设置深色模式（仅用于用户主动切换）
    setDarkMode(isDark: boolean) {
      console.log(`[DarkMode] 用户主动设置模式: ${isDark ? '深色' : '浅色'}`);
      this.isDark = isDark;
      localStorage.setItem('darkMode', isDark.toString());
      this.applyMode();
    },

    // 应用保存的模式
    applySavedMode() {
      this.isDark = localStorage.getItem('darkMode') === 'true';
      this.applyMode();
    },

    // 应用模式到DOM（不修改localStorage）
    applyMode() {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    },

    // 切换深色模式
    toggleDarkMode() {
      const newMode = !this.isDark;
      console.log(`[DarkMode] 切换模式: ${newMode ? '深色' : '浅色'}`);
      this.setDarkMode(newMode);
    },

    // 仅应用模式到DOM（用于登录页，不保存到localStorage）
    applyModeWithoutSaving(isDark: boolean) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  }
});
