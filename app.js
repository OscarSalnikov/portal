const THEME_KEY = 'portal-theme';

const includePartials = async () => {
  const includeNodes = document.querySelectorAll('[data-include]');
  const tasks = Array.from(includeNodes).map(async (node) => {
    const file = node.getAttribute('data-include');
    if (!file) return;
    try {
      const response = await fetch(file);
      if (response.ok) {
        node.innerHTML = await response.text();
      }
    } catch (error) {
      console.warn('Не удалось загрузить компонент', file, error);
    }
  });
  await Promise.all(tasks);
};

const initNavigation = () => {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === currentPage);
  });
};

const initTabs = () => {
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabTarget;
        buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
        group.parentElement
          .querySelectorAll('[data-tab-panel]')
          .forEach((panel) => {
            panel.classList.toggle('active', panel.dataset.tabPanel === target);
          });
      });
    });
  });
};

const initWeekPicker = () => {
  document.querySelectorAll('.week-day').forEach((day) => {
    day.addEventListener('click', () => {
      day.parentElement
        .querySelectorAll('.week-day')
        .forEach((item) => item.classList.toggle('active', item === day));
    });
  });
};

const applyTheme = (theme, persist = true) => {
  document.body.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.warn('Storage недоступен', error);
    }
  }
  document.querySelectorAll('[data-theme-target]').forEach((button) => {
    button.classList.toggle('active', button.dataset.themeTarget === theme);
  });
};

const initThemeSwitcher = () => {
  const stored = localStorage.getItem(THEME_KEY);
  applyTheme(stored || document.body.dataset.theme || 'light', false);

  document.querySelectorAll('[data-theme-target]').forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(button.dataset.themeTarget || 'light');
    });
  });
};

const boot = async () => {
  await includePartials();
  if (window.feather) {
    window.feather.replace();
  }
  initNavigation();
  initTabs();
  initWeekPicker();
  initThemeSwitcher();
};

document.addEventListener('DOMContentLoaded', boot);
