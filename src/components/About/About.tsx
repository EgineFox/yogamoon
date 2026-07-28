'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import CertModal from '../CertModal/CertModal';

const CERTS = [
  { text: 'Диплом Московского университета Йоги, специализация: коррекция и оздоровление позвоночника методами хатха-йоги', icon: '/cert-icon-1.png', width: 62, height: 63, certIndex: 0 },
  { text: 'Международный диплом IYF, International Yoga Federation', icon: '/cert-icon-2.png', width: 74, height: 91, certIndex: 1 },
  { text: 'Сертификат по Йогатерапии ОДА, опорно-двигательного аппарата', icon: '/cert-icon-3.png', width: 66, height: 56, certIndex: 4 },
  { text: 'Член Израильской ассоциации преподавателей йоги (IYAI)', icon: '/cert-icon-4.png', width: 48, height: 71, certIndex: 7 },
];

const STORY = [
  'Долгие часы за компьютером, постоянные дедлайны, боли в спине и шее, онемевшие пальцы привели меня к черте, когда тело буквально кричало о помощи.',
  'Впервые я встала на коврик в осознанном возрасте, после 42 лет. Тогда я не верила, что йога способна изменить что-то серьёзно. Мне хотелось лишь уменьшить боль.',
  'Прошли годы, и сегодня я точно знаю: йога работает. Она возвращает гибкость, облегчает боль, улучшает сон, помогает справляться со стрессом и даёт ощущение внутренней устойчивости.',
  'Теперь я делюсь этим опытом с другими, чтобы каждый мог почувствовать такие же перемены.',
];

export default function About() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>

        
        <div className={styles.left}>
          <p className={styles.label}>ОБО МНЕ</p>
          <h2 className={styles.heading}>Мой путь начался после&nbsp;42&nbsp;лет</h2>

          <div className={styles.certs}>
            {CERTS.map(({ text, icon, width, height, certIndex }, i) => (
              <button
                key={i}
                type="button"
                className={styles.certCard}
                onClick={() => setModalIndex(certIndex)}
                aria-label="Открыть сертификат"
              >
                <div className={styles.certBar} />
                <div className={styles.certIcon}>
                  <Image
                    src={icon}
                    alt=""
                    width={width}
                    height={height}
                    className={styles.certIconImage}
                  />
                </div>
                <p className={styles.certText}>{text}</p>
              </button>
            ))}
          </div>
        </div>

        
        <div className={styles.right}>
          <blockquote className={styles.quote}>
            «Я пришла в йогу не за философией, а чтобы справиться с болью в спине,
            бессонницей и постоянным стрессом. Йога стала тем, что вернуло мне жизнь.»
          </blockquote>

          <div className={styles.story}>
            {STORY.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <button className={styles.certsNote} onClick={() => setModalIndex(0)}>
            Мои дипломы и сертификаты можно посмотреть здесь (представлена основная часть обучений)
          </button>

          <a href="#contact" className={styles.cta}>
            Начать практику вместе
          </a>
        </div>

      </div>

      
      {modalIndex !== null && (
        <CertModal
          initialIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </section>
  );
}
