'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
function Slide1() {
  return (
    <div className={`${styles.slide} ${styles.slide1}`}>
      <div className={styles.mobileSlide1}>
        <div className={styles.mobilePhoto}>
          <Image
            src="/hero-mobile-1.jpg"
            alt="Ирина Лындина занимается йогой"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={styles.mobileCopy}>
          <p className={styles.mobileLabel}>YOGAMOON · РААНАНА, ОКРУГ АШАРОН</p>
          <h1 className={styles.mobileHeading}>Ирина Лындина</h1>
          <p className={styles.mobileSubtitle}>Хатха-йога · Йогатерапия · Йога-нидра</p>
          <p className={styles.mobileBody}>
            Сертифицированный преподаватель хатха-йоги и йогатерапии. Помогаю вернуть телу гибкость и силу, а уму - спокойствие.
          </p>
          <a href="#contact" className={styles.mobileCta}>✦&nbsp;&nbsp;Записаться на занятие</a>
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

      <p className={styles.s1Label}>YOGAMOON , ОКРУГ АШАРОН</p>

      <h1 className={styles.s1Heading}>Ирина Лындина</h1>

      <p className={styles.s1Subtitle}>Хатха-йога , Йогатерапия , Йога-нидра</p>

      <div className={styles.s1Body}>
        <p>Привет! Меня зовут Ирина.</p>
        <p>Я пришла в йогу после 42 лет, чтобы справиться с болью, бессонницей и стрессом. Йога изменила моё состояние и качество жизни, и с тех пор я знаю точно: практика подходит каждому, независимо от возраста и уровня подготовки.</p>
        <p>Уже более пяти лет я помогаю людям становиться сильнее, гибче и спокойнее. В занятиях соединяю классическую хатха‑йогу с современными знаниями о движении, чтобы практика была безопасной, осознанной и по‑настоящему полезной.</p>
        <p>Рада познакомиться, и буду рада стать вашим проводником на этом пути.</p>
      </div>

      <div className={styles.s1Btns}>
        <a href="#contact" className={styles.btnPrimary}>Записаться на занятие</a>
        <a href="#about"   className={styles.btnOutline}>Узнать обо мне</a>
      </div>

      
      <div className={styles.s1Photo}>
        <Image
          src="/hero-slide-1.png"
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
const PRINCIPLES = [
  ['Возвращаем подвижность',           'Суставам: гибкость, телу: лёгкость движения'],
  ['Развиваем силу и выносливость',     'Мягко и постепенно, без перегрузок'],
  ['Улучшаем концентрацию',            'Учимся управлять эмоциями и реакциями'],
  ['Расслабляем тело и ум',            'Останавливаемся после напряжения и стресса'],
  ['Травмобезопасность',               'Уважение к телу и его границам'],
  ['Работа с усилием, но без насилия', 'Каждое движение с пониманием'],
  ['Честность',                        'Без обещаний чудес, но с реальными изменениями'],
];

function Slide2() {
  return (
    <div className={`${styles.slide} ${styles.slide2}`}>
      <div className={`${styles.mobileSlide} ${styles.mobileSlide2}`}>
        <div className={styles.mobilePhoto}>
          <Image src="/hero-mobile-2.png" alt="Ирина в медитации" fill sizes="100vw" style={{ objectFit: 'fill' }} />
        </div>
        <div className={styles.mobileApproach}>
          <h2>Что происходит на практике</h2>
          <div className={styles.mobilePrinciples}>
            {PRINCIPLES.map(([title, desc]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className={styles.mobileCta}>Начать практику вместе</a>
        </div>
      </div>
      <p className={styles.s2Label}>МОИ ПРИНЦИПЫ</p>
      <h2 className={styles.s2Heading}>Что происходит на практике</h2>

      <div className={styles.s2List}>
        {PRINCIPLES.map(([title, desc], i) => (
          <div key={i} className={styles.s2Item}>
            <span className={styles.s2ItemTitle}>{title}</span>
            <span className={styles.s2ItemDesc}>{desc}</span>
          </div>
        ))}
      </div>

      <a href="#contact" className={`${styles.btnPrimary} ${styles.s2Btn}`}>
        Начать практику вместе
      </a>

      <div className={styles.s2Photo}>
        <Image src="/hero-slide-2.jpg" alt="Ирина в медитации" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" loading="eager"/>
      </div>
    </div>
  );
}
const RESULTS = [
  'Гибкость и лёгкость в теле без перегрузки суставов',
  'Снижение стресса и тревоги через дыхание',
  'Работа с хроническими болями (спина, шея, колени)',
  'Осознанность и спокойствие в повседневной жизни',
];

function Slide3() {
  return (
    <div className={`${styles.slide} ${styles.slide3}`}>
      <div className={`${styles.mobileSlide} ${styles.mobileSlide3}`}>
        <div className={styles.mobilePhoto}>
          <Image src="/hero-slide-3.jpg" alt="Групповое занятие йогой" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 42%' }} />
        </div>
        <div className={styles.mobileResults}>
          <p className={styles.mobileResultsLabel}>РЕЗУЛЬТАТЫ</p>
          <h2>Что вы получите</h2>
          <p className={styles.mobileResultsSub}>После регулярных занятий</p>
          <ul>
            {RESULTS.map(item => <li key={item}>✦&nbsp;&nbsp;{item}</li>)}
          </ul>
          <a href="#contact" className={`${styles.mobileCta} ${styles.mobileCtaGold}`}>✦&nbsp;&nbsp;Записаться на занятие</a>
        </div>
      </div>
      <p className={styles.s3Label}>РЕЗУЛЬТАТЫ</p>

        <h2 className={styles.s3Heading}>Что вы получите</h2>

      <p className={styles.s3Sub}>После регулярных занятий</p>

      <ul className={styles.s3List}>
        {RESULTS.map((item, i) => (
          <li key={i} className={styles.s3Item}>
            <span className={styles.s3Star}>✦</span>
            {item}
          </li>
        ))}
      </ul>

      <a href="#contact" className={styles.btnGold}>Записаться на занятие</a>

      <div className={styles.s3Moon} aria-hidden="true" />
      
      <div className={styles.s3Photo}>
        <Image src="/hero-slide-3.jpg" alt="Групповое занятие" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" loading="eager"/>
      </div>
    </div>
  );
}
const SLIDES = [Slide1, Slide2, Slide3];

export default function Hero() {
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

  const Slide = SLIDES[current];

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
      <Slide />

      
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
        <button className={`${styles.arrow} ${styles.arrowR}`} onClick={next} aria-label="Вперёд">›</button>
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
