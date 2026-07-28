'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';

const WA_NUMBER = '972512060874';

const GROUP = [
  {
    key: 'g1',
    title: 'Разовое посещение',
    price: '85',
    sub: 'одно занятие',
    note: 'Попробуйте без обязательств',
    wa: 'Здравствуйте, Ирина! Хочу записаться на разовое групповое занятие хатха-йоги за 85₪. Подскажите расписание?',
  },
  {
    key: 'g2',
    title: 'Абонемент 4 занятия',
    price: '300',
    sub: '1 месяц · 75₪ / занятие',
    note: 'Популярный выбор',
    popular: true,
    wa: 'Здравствуйте, Ирина! Хочу оформить абонемент на 4 групповых занятия за 300₪. Как записаться?',
  },
  {
    key: 'g3',
    title: 'Абонемент 8 занятий',
    price: '560',
    sub: '1 месяц · 70₪ / занятие',
    note: 'Регулярная практика',
    wa: 'Здравствуйте, Ирина! Интересует абонемент на 8 групповых занятий за 560₪. Как оформить?',
  },
  {
    key: 'g4',
    title: 'Абонемент 10 занятий',
    price: '650',
    sub: '1.5 месяца · 65₪ / занятие',
    note: 'Лучшая цена',
    wa: 'Здравствуйте, Ирина! Хочу абонемент на 10 групповых занятий за 650₪. Как записаться?',
  },
];

const INDIVIDUAL = [
  {
    key: 'i1',
    title: 'Офлайн · индивидуальное',
    price: '250',
    note: 'Персональная работа в студии',
    wa: 'Здравствуйте, Ирина! Хочу записаться на индивидуальное занятие офлайн за 250₪. Когда есть свободное время?',
  },
  {
    key: 'i2',
    title: 'Онлайн · индивидуальное',
    price: '230',
    note: 'Из любой точки мира',
    wa: 'Здравствуйте, Ирина! Интересует индивидуальное занятие онлайн за 230₪. Как записаться?',
  },
  {
    key: 'i3',
    title: 'Йогатерапия ОДА · первое',
    price: '300',
    note: 'Диагностика + протокол (~90 мин)',
    wa: 'Здравствуйте, Ирина! Хочу записаться на первый сеанс йогатерапии ОДА (~90 мин) за 300₪. Когда возможно?',
  },
  {
    key: 'i4',
    title: 'Йогатерапия ОДА · повторное',
    price: '250',
    note: 'По индивидуальной программе (60 мин)',
    wa: 'Здравствуйте, Ирина! Хочу записаться на повторное занятие по йогатерапии ОДА за 250₪. Когда есть место?',
  },
];

const CLUB = [
  {
    key: 'c1',
    title: 'Заглянуть внутрь',
    price: '70',
    period: 'ознакомительная неделя',
    features: ['Одно занятие в группе', 'Знакомство с форматом', 'Доступ ко всем записям'],
    wa: 'Здравствуйте, Ирина! Хочу попробовать ознакомительную неделю онлайн-клуба «Йога Путь» за 70₪. Как присоединиться?',
  },
  {
    key: 'c2',
    title: 'Спокойный ритм',
    price: '230',
    period: 'в месяц',
    features: ['1 живое занятие в неделю', 'Все записи в библиотеке', 'Ответы на вопросы', 'Telegram-группа', 'Личные рекомендации'],
    wa: 'Здравствуйте, Ирина! Интересует тариф «Спокойный ритм» онлайн-клуба за 230₪/месяц. Как оформить подписку?',
  },
  {
    key: 'c3',
    title: 'Гармония',
    price: '300',
    period: 'в месяц',
    best: true,
    features: ['2 живых занятия в неделю', 'Все записи в библиотеке', 'Ответы на вопросы', 'Telegram-группа', 'Личные рекомендации и разборы техники'],
    wa: 'Здравствуйте, Ирина! Хочу подключить тариф «Гармония» онлайн-клуба за 300₪/месяц. Как оформить?',
  },
];


export default function Pricing() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const isGroupActive = (key: string, popular?: boolean) =>
    selectedKey !== null ? selectedKey === key : !!popular;

  const isClubActive = (key: string, best?: boolean) =>
    selectedKey !== null ? selectedKey === key : !!best;

  const selectWithKeyboard = (
    event: React.KeyboardEvent<HTMLDivElement>,
    key: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedKey(key);
    }
  };

  return (
    <section id="pricing" className={styles.section}>

      <p className={styles.label}>ЦЕНЫ</p>
      <h2 className={styles.heading}>Прайс 2026</h2>
      <p className={styles.sub}>
        Прозрачные цены без скрытых платежей. Выберите формат, который подходит вашему ритму жизни.
      </p>

      {/* Групповые занятия */}
      <h3 className={styles.sectionTitle}>Групповые офлайн-занятия · 90 минут</h3>
      <hr className={styles.divider} />
      <div className={styles.gridGroup}>
        {GROUP.map(({ key, title, price, sub, note, popular, wa }) => (
          <div
            key={key}
            className={`${styles.card} ${isGroupActive(key, popular) ? styles.cardActive : ''}`}
            onClick={() => setSelectedKey(key)}
            role="button"
            tabIndex={0}
            onKeyDown={event => selectWithKeyboard(event, key)}
          >
            {popular && <span className={styles.badge}>Популярный</span>}
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardPrice}>{price}₪</p>
            <p className={styles.cardSub}>{sub}</p>
            <p className={styles.cardNote}>{note}</p>
            {selectedKey === key && (
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(wa)}`}
                className={styles.cardWaBtn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                Записаться
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Индивидуальные занятия */}
      <h3 className={styles.sectionTitle}>Адаптивные занятия · 90 минут</h3>
      <hr className={styles.divider} />
      <div className={styles.gridGroup}>
        {INDIVIDUAL.map(({ key, title, price, note, wa }) => (
          <div
            key={key}
            className={`${styles.card} ${selectedKey === key ? styles.cardActive : ''}`}
            onClick={() => setSelectedKey(key)}
            role="button"
            tabIndex={0}
            onKeyDown={event => selectWithKeyboard(event, key)}
          >
            <p className={styles.cardTitle}>{title}</p>
            <p className={styles.cardPrice}>{price}₪</p>
            <p className={styles.cardNote}>{note}</p>
            {selectedKey === key && (
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(wa)}`}
                className={styles.cardWaBtn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                Записаться
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Онлайн-клуб */}
      <h3 className={styles.sectionTitle}>
        Онлайн-клуб «Йога Путь с Ириной Yogamoon», абонемент на месяц
      </h3>
      <hr className={styles.divider} />
      <div className={styles.gridClub}>
        {CLUB.map(({ key, title, price, period, features, best, wa }) => (
          <div
            key={key}
            className={`${styles.clubCard} ${isClubActive(key, best) ? styles.clubCardActive : ''}`}
            onClick={() => setSelectedKey(key)}
            role="button"
            tabIndex={0}
            onKeyDown={event => selectWithKeyboard(event, key)}
          >
            {best && <span className={styles.badgeBest}>Лучший выбор</span>}
            <p className={styles.clubTitle}>{title}</p>
            <p className={styles.clubPrice}>{price}₪</p>
            <p className={styles.clubPeriod}>{period}</p>
            <ul className={styles.clubFeatures}>
              {features.map(f => (
                <li key={f}><span className={styles.star}>★</span>{f}</li>
              ))}
            </ul>
            {selectedKey === key && (
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(wa)}`}
                className={styles.cardWaBtn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                Записаться
              </a>
            )}
          </div>
        ))}
      </div>


    </section>
  );
}
