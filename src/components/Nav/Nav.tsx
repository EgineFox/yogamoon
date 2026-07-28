'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '#about',    label: 'Обо мне'  },
  { href: '#services', label: 'Услуги'   },
  { href: '#pricing',  label: 'Цены'     },
  { href: '#reviews',  label: 'Отзывы'   },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const handleLinkClick = () => setMenuOpen(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>

        
        <Link href="#hero" className={styles.logo} onClick={handleLinkClick}>
          <Image
            src="/logo.svg"
            alt="Yogamoon"
            width={70}
            height={44}
             style={{ width: 'auto', height: '56px' }} 
            className={styles.logoImg}
            unoptimized
            priority
          />
          <span className={styles.logoText}>Yogamoon</span>
        </Link>

        
        <nav className={styles.links} aria-label="Основная навигация">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={styles.link}>
              {label}
            </a>
          ))}
        </nav>

        
        <a href="#contact" className={styles.cta}>
          Записаться
        </a>

        
        <button
          ref={burgerRef}
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      
      {menuOpen && <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${styles.mobileMenuOpen}`}
      >
        <nav className={styles.mobileLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={styles.mobileLink}
              onClick={handleLinkClick}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className={styles.mobileCta} onClick={handleLinkClick}>
            Записаться
          </a>
        </nav>
      </div>}

      
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
