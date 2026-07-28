'use client';

import { useState } from 'react';
import styles from './Pricing.module.css';
import type { PricingGroup } from '@/../sanity/lib/queries';

const WA_NUMBER = '972512060874';

// ─── Встроенные данные (fallback до настройки CMS) ────────────────────────────
const FALLBACK_GROUPS: PricingGroup[] = [
  {
    _id: 'group-offline',
    order: 1,
    title: 'Групповые офлайн-занятия · 90 минут',
    cards: [
      {
        title: 'Разовое посещение',
        price: 85,
        priceSubtitle: 'одно занятие',
        note: 'Попробуйте без обязательств',
        whatsappMessage: 'Здравствуйте, Ирина! Хочу записаться на разовое групповое занятие хатха-йоги за 85₪. Подскажите расписание?',
      },
      {
        title: 'Абонемент 4 занятия',
        price: 300,
        priceSubtitle: '1 месяц · 75₪ / занятие',
        note: 'Популярный выбор',
        isPopular: true,
        whatsappMessage: 'Здравствуйте, Ирина! Хочу оформить абонемент на 4 групповых занятия за 300₪. Как записаться?',
      },
      {
        title: 'Абонемент 8 занятий',
        price: 560,
        priceSubtitle: '1 месяц · 70₪ / занятие',
        note: 'Регулярная практика',
        whatsappMessage: 'Здравствуйте, Ирина! Интересует абонемент на 8 групповых занятий за 560₪. Как оформить?',
      },
      {
        title: 'Абонемент 10 занятий',
        price: 650,
        priceSubtitle: '1.5 месяца · 65₪ / занятие',
        note: 'Лучшая цена',
        whatsappMessage: 'Здравствуйте, Ирина! Хочу абонемент на 10 групповых занятий за 650₪. Как записаться?',
      },
    ],
  },
  {
    _id: 'group-individual',
    order: 2,
    title: 'Адаптивные занятия · 90 минут',
    cards: [
      {
        title: 'Офлайн · индивидуальное',
        price: 250,
        note: 'Персональная работа в студии',
        whatsappMessage: 'Здравствуйте, Ирина! Хочу записаться на индивидуальное занятие офлайн за 250₪. Когда есть свободное время?',
      },
      {
        title: 'Онлайн · индивидуальное',
        price: 230,
        note: 'Из любой точки мира',
        whatsappMessage: 'Здравствуйте, Ирина! Интересует индивидуальное занятие онлайн за 230₪. Как записаться?',
      },
      {
        title: 'Йогатерапия ОДА · первое',
        price: 300,
        note: 'Диагностика + протокол (~90 мин)',
        whatsappMessage: 'Здравствуйте, Ирина! Хочу записаться на первый сеанс йогатерапии ОДА (~90 мин) за 300₪. Когда возможно?',
      },
      {
        title: 'Йогатерапия ОДА · повторное',
        price: 250,
        note: 'По индивидуальной программе (60 мин)',
        whatsappMessage: 'Здравствуйте, Ирина! Хочу записаться на повторное занятие по йогатерапии ОДА за 250₪. Когда есть место?',
      },
    ],
  },
  {
    _id: 'group-club',
    order: 3,
    title: 'Онлайн-клуб «Йога Путь с Ириной Yogamoon», абонемент на месяц',
    cards: [
      {
        title: 'Заглянуть внутрь',
        price: 70,
        period: 'ознакомительная неделя',
        features: ['Одно занятие в группе', 'Знакомство с форматом', 'Доступ ко всем записям'],
        whatsappMessage: 'Здравствуйте, Ирина! Хочу попробовать ознакомительную неделю онлайн-клуба «Йога Путь» за 70₪. Как присоединиться?',
      },
      {
        title: 'Спокойный ритм',
        price: 230,
        period: 'в месяц',
        features: ['1 живое занятие в неделю', 'Все записи в библиотеке', 'Ответы на вопросы', 'Telegram-группа', 'Личные рекомендации'],
        whatsappMessage: 'Здравствуйте, Ирина! Интересует тариф «Спокойный ритм» онлайн-клуба за 230₪/месяц. Как оформить подписку?',
      },
      {
        title: 'Гармония',
        price: 300,
        period: 'в месяц',
        isBest: true,
        features: ['2 живых занятия в неделю', 'Все записи в библиотеке', 'Ответы на вопросы', 'Telegram-группа', 'Личные рекомендации и разборы техники'],
        whatsappMessage: 'Здравствуйте, Ирина! Хочу подключить тариф «Гармония» онлайн-клуба за 300₪/месяц. Как оформить?',
      },
    ],
  },
];

interface Props {
  groups?: PricingGroup[];
}

export default function Pricing({ groups }: Props) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const allGroups = groups ?? FALLBACK_GROUPS;

  function isActive(groupId: string, cardIdx: number, isPopular?: boolean, isBest?: boolean) {
    const key = `${groupId}-${cardIdx}`;
    if (selectedKey !== null) return selectedKey === key;
    return !!(isPopular || isBest);
  }

  function selectWithKeyboard(event: React.KeyboardEvent<HTMLDivElement>, key: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedKey(key);
    }
  }

  return (
    <section id="pricing" className={styles.section}>
      <p className={styles.label}>ЦЕНЫ</p>
      <h2 className={styles.heading}>Прайс 2026</h2>
      <p className={styles.sub}>
        Прозрачные цены без скрытых платежей. Выберите формат, который подходит вашему ритму жизни.
      </p>

      {allGroups.map(group => {
        const isClub = group.cards.some(c => c.features && c.features.length > 0);

        return (
          <div key={group._id}>
            <h3 className={styles.sectionTitle}>{group.title}</h3>
            <hr className={styles.divider} />

            {isClub ? (
              <div className={styles.gridClub}>
                {group.cards.map((card, idx) => {
                  const cardKey = `${group._id}-${idx}`;
                  const active = isActive(group._id, idx, card.isPopular, card.isBest);
                  const waMsg = card.whatsappMessage ?? '';
                  return (
                    <div
                      key={cardKey}
                      className={`${styles.clubCard} ${active ? styles.clubCardActive : ''}`}
                      onClick={() => setSelectedKey(cardKey)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => selectWithKeyboard(e, cardKey)}
                    >
                      {card.isBest && <span className={styles.badgeBest}>Лучший выбор</span>}
                      <p className={styles.clubTitle}>{card.title}</p>
                      <p className={styles.clubPrice}>{card.price}₪</p>
                      {card.period && <p className={styles.clubPeriod}>{card.period}</p>}
                      <ul className={styles.clubFeatures}>
                        {(card.features ?? []).map(f => (
                          <li key={f}><span className={styles.star}>★</span>{f}</li>
                        ))}
                      </ul>
                      {selectedKey === cardKey && (
                        <a
                          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                          className={styles.cardWaBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                        >
                          Записаться
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.gridGroup}>
                {group.cards.map((card, idx) => {
                  const cardKey = `${group._id}-${idx}`;
                  const active = isActive(group._id, idx, card.isPopular, card.isBest);
                  const waMsg = card.whatsappMessage ?? '';
                  return (
                    <div
                      key={cardKey}
                      className={`${styles.card} ${active ? styles.cardActive : ''}`}
                      onClick={() => setSelectedKey(cardKey)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => selectWithKeyboard(e, cardKey)}
                    >
                      {card.isPopular && <span className={styles.badge}>Популярный</span>}
                      <p className={styles.cardTitle}>{card.title}</p>
                      <p className={styles.cardPrice}>{card.price}₪</p>
                      {card.priceSubtitle && <p className={styles.cardSub}>{card.priceSubtitle}</p>}
                      {card.note && <p className={styles.cardNote}>{card.note}</p>}
                      {selectedKey === cardKey && (
                        <a
                          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                          className={styles.cardWaBtn}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                        >
                          Записаться
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
