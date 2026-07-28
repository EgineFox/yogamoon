import Image from 'next/image';
import styles from './Services.module.css';
import type { Service } from '@/../sanity/lib/queries';

// ─── Встроенные данные (fallback до настройки CMS) ────────────────────────────
const FALLBACK_SERVICES = [
  {
    _id: 'f1',
    order: 1,
    icon: { asset: { url: '/serv-icon-1.png' } },
    title: 'Групповая хатха-йога',
    description: 'Занятия в студии Раананы, парк «Экологи Ход аШарон». Мини-группы до 10 человек, каждый в поле зрения, практика адаптирована для вас.',
    tag: 'Офлайн · Раанана и парк Экологи Ход аШарон',
  },
  {
    _id: 'f2',
    order: 2,
    icon: { asset: { url: '/serv-icon-2.png' } },
    title: 'Йога-нидра',
    description: 'Глубокая практика расслабления для восстановления нервной системы, улучшения сна и снижения стресса. Подходит всем.',
    tag: 'Для всех уровней',
  },
  {
    _id: 'f3',
    order: 3,
    icon: { asset: { url: '/serv-icon-3.png' } },
    title: 'Онлайн-клуб Yogamoon',
    description: 'Закрытый клуб «Йога Путь с Ириной»: живые практики, записи тренировок, разбор техники и тёплое сообщество.',
    tag: 'Онлайн',
  },
  {
    _id: 'f4',
    order: 4,
    icon: { asset: { url: '/serv-icon-4.png' } },
    title: 'Адаптивные занятия',
    description: 'Персональная программа, разработанная именно для вас с учётом целей, особенностей тела и здоровья.',
    tag: 'Офлайн / Онлайн',
  },
  {
    _id: 'f5',
    order: 5,
    icon: { asset: { url: '/serv-icon-5.png' } },
    title: 'Йогатерапия ОДА',
    description: 'Специализированная работа с опорно-двигательным аппаратом. Помогает при болях в спине, шее, коленях. Без насилия над телом.',
    tag: 'Терапевтическая',
  },
] satisfies Service[];

interface Props {
  services?: Service[];
}

export default function Services({ services }: Props) {
  const items = services ?? FALLBACK_SERVICES;

  return (
    <section id="services" className={styles.section}>
      <p className={styles.label}>УСЛУГИ</p>
      <h2 className={styles.heading}>Форматы занятий</h2>
      <p className={styles.sub}>
        Выберите тот формат, который подходит именно вам — в студии, онлайн или индивидуально.
      </p>

      <div className={styles.grid}>
        {items.map(({ _id, icon, title, description, tag }) => (
          <div key={_id} className={styles.card}>
            <div className={styles.cardTop} />
            <div className={styles.cardIcon}>
              {icon?.asset?.url && (
                <Image
                  src={icon.asset.url}
                  alt={title}
                  width={120}
                  height={100}
                  className={styles.cardIconImage}
                />
              )}
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            {description && <p className={styles.cardDesc}>{description}</p>}
            {tag && <span className={styles.cardTag}>{tag}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
