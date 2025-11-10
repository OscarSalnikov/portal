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

const boot = async () => {
  await includePartials();
  if (window.feather) {
    window.feather.replace();
  }
  initNavigation();
  initTabs();
  initWeekPicker();
};

document.addEventListener('DOMContentLoaded', boot);
