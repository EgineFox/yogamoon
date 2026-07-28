'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './CertModal.module.css';

export const CERTS = [
  { src: '/cert-1.png', title: 'Yoga Teacher Certificate, Yoga University of Moscow' },
  { src: '/cert-2.png', title: 'Certificate, International Yoga Federation' },
  { src: '/cert-3.png', title: 'Certificate, Школа йоги ЧАТУРАНГА' },
  { src: '/cert-4.png', title: 'Диплом Московского Университета Йоги' },
  { src: '/cert-5.png', title: 'Сертификат по йогатерапии' },
  { src: '/cert-6.png', title: 'Сертификат по йогатерапии' },
  { src: '/cert-7.png', title: 'Сертификат' },
  { src: '/cert-8.png', title: 'Israel Yoga Federation' },
];

interface Props {
  initialIndex?: number;
  onClose: () => void;
}

export default function CertModal({ initialIndex = 0, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const prev = () => setIndex(i => (i - 1 + CERTS.length) % CERTS.length);
  const next = () => setIndex(i => (i + 1) % CERTS.length);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const cert = CERTS[index];

  return (
    <div
      ref={dialogRef}
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
    >

      
      <button className={styles.prevBtn} onClick={e => { e.stopPropagation(); prev(); }} aria-label="Предыдущий">
        &lt;
      </button>

      
      <div className={styles.card} onClick={e => e.stopPropagation()}>

        
        <button ref={closeButtonRef} className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">x</button>

        
        <div className={styles.imageWrapper}>
          <Image
            src={cert.src}
            alt={cert.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 90vw, 550px"
          />
        </div>

        
        <h2 id="certificate-title" className={styles.title}>{cert.title}</h2>

        
        <div className={styles.footer}>
          <span className={styles.counter}>{index + 1} / {CERTS.length}</span>
          <div className={styles.dots}>
            {CERTS.map((_, i) => (
              <button
                key={i}
                className={i === index ? styles.dotOn : styles.dotOff}
                onClick={() => setIndex(i)}
                aria-label={`Сертификат ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      
      <button className={styles.nextBtn} onClick={e => { e.stopPropagation(); next(); }} aria-label="Следующий">
        &gt;
      </button>

    </div>
  );
}
