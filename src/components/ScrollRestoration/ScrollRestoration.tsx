'use client';

import { useEffect } from 'react';

/**
 * Отключает браузерное восстановление позиции прокрутки
 * и всегда стартует с верхней части страницы.
 *
 * Необходимо при scroll-snap: браузер может «допрыгивать»
 * до запомненной позиции, попадая в середину сайта.
 */
export default function ScrollRestoration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Отключаем авто-восстановление позиции браузером
    window.history.scrollRestoration = 'manual';
    // Гарантируем старт с нуля
    window.scrollTo(0, 0);
  }, []);

  return null;
}
