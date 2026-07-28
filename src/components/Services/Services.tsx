import Image from 'next/image';
import styles from './Services.module.css';

const SERVICES = [
  {
    icon: '/serv-icon-1.png',
    width: 148,
    height: 106,
    title: 'Групповая хатха-йога',
    desc: 'Занятия в студии Раананы, парк «Экологи Ход аШарон». Мини-группы до 10 человек, каждый в поле зрения, практика адаптирована для вас.',
    tag: 'Офлайн , Раанана и парк Экологи Од аШарон',
  },
  {
    icon: '/serv-icon-2.png',
    width: 120,
    height: 104,
    title: 'Йога-нидра',
    desc: 'Глубокая практика расслабления для восстановления нервной системы, улучшения сна и снижения стресса. Подходит всем.',
    tag: 'Для всех уровней',
  },
  {
    icon: '/serv-icon-3.png',
    width: 122,
    height: 118,
    title: 'Онлайн-клуб Yogamoon',
    desc: 'Закрытый клуб «Йога Путь с Ириной»: живые практики, записи тренировок, разбор техники и тёплое сообщество.',
    tag: 'Онлайн',
  },
  {
    icon: '/serv-icon-4.png',
    width: 130,
    height: 115,
    title: 'Адаптивные занятия',
    desc: 'Персональная программа, разработанная именно для вас с учётом целей, особенностей тела и здоровья.',
    tag: 'Офлайн / Онлайн',
  },
  {
    icon: '/serv-icon-5.png',
    width: 126,
    height: 119,
    title: 'Йогатерапия ОДА',
    desc: 'Специализированная работа с опорно-двигательным аппаратом. Помогает при болях в спине, шее, коленях. Без насилия над телом.',
    tag: 'Терапевтическая',
  },
];

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <p className={styles.label}>УСЛУГИ</p>
      <h2 className={styles.heading}>Форматы занятий</h2>
      <p className={styles.sub}>
        Выберите тот формат, который подходит именно вам, в студии, онлайн или индивидуально.
      </p>

      <div className={styles.grid}>
        {SERVICES.map(({ icon, width, height, title, desc, tag }) => (
          <div key={title} className={styles.card}>
            <div className={styles.cardTop} />
            <div className={styles.cardIcon}>
              <Image
                src={icon}
                alt={title}
                width={width}
                height={height}
                className={styles.cardIconImage}
              />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
            <span className={styles.cardTag}>{tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
