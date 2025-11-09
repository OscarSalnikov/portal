# Collaby — gamified project management UI

Адаптивный HTML + CSS шаблон для 4 страниц: index, dashboard, kanban, profile. Все экраны используют единую сетку (макс. 1200 px), общие цвета и плавные анимации (adeIn, adeInUp, slideIn). В комплекте: базовые ассеты (/assets) и глобальный стиль styles.css.

## Структура

- index.html — регистрация/вход с имитацией логина (кнопка Login ведёт на dashboard.html).
- dashboard.html — обзор проектов, XP, карточки задач, достижения.
- kanban.html — канбан с колонками To Do / In Progress / Done, drag-визуал без JS.
- profile.html — профиль пользователя с XP, достижениями и виртуальным питомцем.
- styles.css — общие стили, сетка, анимации и компоненты.
- ssets/ — SVG аватар и питомец (можно заменить своими иллюстрациями).

## Инструкция по публикации на GitHub Pages

1. Создай открытый репозиторий collaby в профиле GitHub.
2. Загрузить (или запушить через Git) все файлы проекта в корень ветки main.
3. Открой Settings → Pages.
4. В секции **Build and deployment** выбери:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
5. Сохрани. Через 1–2 минуты шаблон станет доступен по адресу http://OscarSalnikov.github.io/collaby/.

После подключения собственного домена просто укажи CNAME в тех же настройках Pages. Обновления публикуются автоматически при каждом push в main.
