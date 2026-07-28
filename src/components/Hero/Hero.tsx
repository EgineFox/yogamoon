'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import type { HeroSlide } from '@/../sanity/lib/queries';

interface SlideProps {
  slide?: HeroSlide;
}

// ─── Слайд 1: Знакомство ─────────────────────────────────────────────────────
const FALLBACK_BODY_1 = [
  'Привет! Меня зовут Ирина.',
  'Я пришла в йогу после 42 лет, чтобы справиться с болью, бессонницей и стрессом. Йога изменила моё состояние и качество жизни, и с тех пор я знаю точно: практика подходит каждому, независимо от возраста и уровня подготовки.',
  'Уже более пяти лет я помогаю людям становиться сильнее, гибче и спокойнее. В занятиях соединяю классическую хатха‑йогу с современными знаниями о движении, чтобы практика была безопасной, осознанной и по‑настоящему полезной.',
  'Рада познакомиться, и буду рада стать вашим проводником на этом пути.',
];

function Slide1({ slide }: SlideProps) {
  const label        = slide?.label         ?? 'YOGAMOON , ОКРУГ АШАРОН';
  const heading      = slide?.heading       ?? 'Ирина Лындина';
  const subtitle     = slide?.subtitle      ?? 'Хатха-йога , Йогатерапия , Йога-нидра';
  const body         = slide?.bodyItems?.map(i => i.description ?? i.title) ?? FALLBACK_BODY_1;
  const primaryBtn   = slide?.primaryButton  ?? { text: 'Записаться на занятие', href: '#contact' };
  const secondaryBtn = slide?.secondaryButton ?? { text: 'Узнать обо мне', href: '#about' };
  const desktopSrc   = slide?.desktopImage?.asset?.url ?? '/hero-slide-1.png';
  const mobileSrc    = slide?.mobileImage?.asset?.url  ?? '/hero-mobile-1.jpg';

  return (
    <div className={`${styles.slide} ${styles.slide1}`}>
      <div className={styles.mobileSlide1}>
        <div className={styles.mobilePhoto}>
          <Image
            src={mobileSrc}
            alt="Ирина Лындина занимается йогой"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={styles.mobileCopy}>
          <p className={styles.mobileLabel}>YOGAMOON · РААНАНА, ОКРУГ АШАРОН</p>
          <h1 className={styles.mobileHeading}>{heading}</h1>
          <p className={styles.mobileSubtitle}>{subtitle}</p>
          <p className={styles.mobileBody}>{body[1] ?? body[0]}</p>
          <a href={primaryBtn.href} className={styles.mobileCta}>✦&nbsp;&nbsp;{primaryBtn.text}</a>
        </div>
      </div>

      <svg
        className={styles.bgBlob}
        viewBox="0 0 1440 700"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="-80" cy="820" r="870" fill="#EDE8F7" />
        <ellipse cx="1150" cy="290" rx="450" ry="430" fill="#D0C9E8" opacity="0.85" />
      </svg>

      <p className={styles.s1Label}>{label}</p>
      <h1 className={styles.s1Heading}>{heading}</h1>
      <p className={styles.s1Subtitle}>{subtitle}</p>

      <div className={styles.s1Body}>
        {body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className={styles.s1Btns}>
        <a href={primaryBtn.href} className={styles.btnPrimary}>{primaryBtn.text}</a>
        <a href={secondaryBtn.href} className={styles.btnOutline}>{secondaryBtn.text}</a>
      </div>

      <div className={styles.s1Photo}>
        <Image
          src={desktopSrc}
          alt="Ирина Лындина"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          priority
        />
      </div>
    </div>
  );
}

// ─── Слайд 2: Принципы ───────────────────────────────────────────────────────
const FALLBACK_PRINCIPLES: [string, string][] = [
  ['Возвращаем подвижность',           'Суставам: гибкость, телу: лёгкость движения'],
  ['Развиваем силу и выносливость',     'Мягко и постепенно, без перегрузок'],
  ['Улучшаем концентрацию',            'Учимся управлять эмоциями и реакциями'],
  ['Расслабляем тело и ум',            'Останавливаемся после напряжения и стресса'],
  ['Травмобезопасность',               'Уважение к телу и его границам'],
  ['Работа с усилием, но без насилия', 'Каждое движение с пониманием'],
  ['Честность',                        'Без обещаний чудес, но с реальными изменениями'],
];

function Slide2({ slide }: SlideProps) {
  const label      = slide?.label       ?? 'МОИ ПРИНЦИПЫ';
  const heading    = slide?.heading     ?? 'Что происходит на практике';
  const primaryBtn = slide?.primaryButton ?? { text: 'Начать практику вместе', href: '#contact' };
  const desktopSrc = slide?.desktopImage?.asset?.url ?? '/hero-slide-2.jpg';
  const mobileSrc  = slide?.mobileImage?.asset?.url  ?? '/hero-mobile-2.png';
  const principles: [string, string][] = slide?.bodyItems
    ? slide.bodyItems.map(i => [i.title, i.description ?? ''] as [string, string])
    : FALLBACK_PRINCIPLES;

  return (
    <div className={`${styles.slide} ${styles.slide2}`}>
      <div className={`${styles.mobileSlide} ${styles.mobileSlide2}`}>
        <div className={styles.mobilePhoto}>
          <Image src={mobileSrc} alt="Ирина в медитации" fill sizes="100vw" style={{ objectFit: 'fill' }} />
        </div>
        <div className={styles.mobileApproach}>
          <h2>{heading}</h2>
          <div className={styles.mobilePrinciples}>
            {principles.map(([title, desc]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
          <a href={primaryBtn.href} className={styles.mobileCta}>{primaryBtn.text}</a>
        </div>
      </div>

      <p className={styles.s2Label}>{label}</p>
      <h2 className={styles.s2Heading}>{heading}</h2>

      <div className={styles.s2List}>
        {principles.map(([title, desc], i) => (
          <div key={i} className={styles.s2Item}>
            <span className={styles.s2ItemTitle}>{title}</span>
            <span className={styles.s2ItemDesc}>{desc}</span>
          </div>
        ))}
      </div>

      <a href={primaryBtn.href} className={`${styles.btnPrimary} ${styles.s2Btn}`}>
        {primaryBtn.text}
      </a>

      <div className={styles.s2Photo}>
        <Image
          src={desktopSrc}
          alt="Ирина в медитации"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
      </div>
    </div>
  );
}

// ─── Слайд 3: Результаты ─────────────────────────────────────────────────────
const FALLBACK_RESULTS = [
  'Гибкость и лёгкость в теле без перегрузки суставов',
  'Снижение стресса и тревоги через дыхание',
  'Работа с хроническими болями (спина, шея, колени)',
  'Осознанность и спокойствие в повседневной жизни',
];

function Slide3({ slide }: SlideProps) {
  const label      = slide?.label    ?? 'РЕЗУЛЬТАТЫ';
  const heading    = slide?.heading  ?? 'Что вы получите';
  const sub        = slide?.subtitle ?? 'После регулярных занятий';
  const primaryBtn = slide?.primaryButton ?? { text: 'Записаться на занятие', href: '#contact' };
  const desktopSrc = slide?.desktopImage?.asset?.url ?? '/hero-slide-3.jpg';
  const mobileSrc  = slide?.mobileImage?.asset?.url  ?? '/hero-slide-3.jpg';
  const results    = slide?.bodyItems ? slide.bodyItems.map(i => i.title) : FALLBACK_RESULTS;

  return (
    <div className={`${styles.slide} ${styles.slide3}`}>
      <div className={`${styles.mobileSlide} ${styles.mobileSlide3}`}>
        <div className={styles.mobilePhoto}>
          <Image
            src={mobileSrc}
            alt="Групповое занятие йогой"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
          />
        </div>
        <div className={styles.mobileResults}>
          <p className={styles.mobileResultsLabel}>РЕЗУЛЬТАТЫ</p>
          <h2>{heading}</h2>
          <p className={styles.mobileResultsSub}>{sub}</p>
          <ul>
            {results.map(item => <li key={item}>✦&nbsp;&nbsp;{item}</li>)}
          </ul>
          <a href={primaryBtn.href} className={`${styles.mobileCta} ${styles.mobileCtaGold}`}>
            ✦&nbsp;&nbsp;{primaryBtn.text}
          </a>
        </div>
      </div>

      <p className={styles.s3Label}>{label}</p>
      <h2 className={styles.s3Heading}>{heading}</h2>
      <p className={styles.s3Sub}>{sub}</p>

      <ul className={styles.s3List}>
        {results.map((item, i) => (
          <li key={i} className={styles.s3Item}>
            <span className={styles.s3Star}>✦</span>
            {item}
          </li>
        ))}
      </ul>

      <a href={primaryBtn.href} className={styles.btnGold}>{primaryBtn.text}</a>

      <div className={styles.s3Moon} aria-hidden="true" />

      <div className={styles.s3Photo}>
        <Image
          src={desktopSrc}
          alt="Групповое занятие"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="eager"
        />
      </div>
    </div>
  );
}

// ─── Карусель ────────────────────────────────────────────────────────────────
interface Props {
  slides?: HeroSlide[];
}

export default function Hero({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);
  const next = useCallback(() => setCurrent(c => Math.min(c + 1, 2)), []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % 3), 6000);
    return () => clearInterval(t);
  }, [paused, reducedMotion]);

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-roledescription="карусель"
      aria-label="Знакомство с Yogamoon"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {current === 0 && <Slide1 slide={slides?.[0]} />}
      {current === 1 && <Slide2 slide={slides?.[1]} />}
      {current === 2 && <Slide3 slide={slides?.[2]} />}

      {current > 0 && (
        <button
          className={`${styles.arrow} ${styles.arrowL} ${current === 2 ? styles.arrowOnDark : ''}`}
          onClick={prev}
          aria-label="Назад"
        >
          ‹
        </button>
      )}
      {current < 2 && (
        <button className={`${styles.arrow} ${styles.arrowR}`} onClick={next} aria-label="Вперёд">
          ›
        </button>
      )}

      <div className={styles.dots}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={i === current ? styles.dotOn : styles.dotOff}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
