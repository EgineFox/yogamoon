import styles from './Footer.module.css';
import type { SiteSettings } from '@/../sanity/lib/queries';

interface Props {
  siteSettings?: SiteSettings;
}

const NAV_LINKS = [
  { label: 'Обо мне',  href: '#about'   },
  { label: 'Услуги',   href: '#services' },
  { label: 'Цены',     href: '#pricing'  },
  { label: 'Отзывы',   href: '#reviews'  },
  { label: 'Контакты', href: '#contact'  },
];

export default function Footer({ siteSettings }: Props) {
  const siteName = siteSettings?.siteName ?? 'Yogamoon';

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <p className={styles.logo}>{siteName}</p>
          <p className={styles.tagline}>
            «Мягко, безопасно, осознанно, ваш путь к здоровому телу и спокойному уму»
          </p>
          <p className={styles.copy}>
            (c) 2026 Ирина Лындина | {siteName} | Раанана, Израиль
          </p>
        </div>

        <nav className={styles.nav} aria-label="Навигация в подвале">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className={styles.navLink}>
              {label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  );
}
