'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Contact.module.css';

const CONTACTS = [
  { icon: '/contact-icon-whatsapp.png', width: 48, height: 48, label: 'WhatsApp / Телефон', value: '+972-51-206-0874',                     href: 'https://wa.me/972512060874' },
  { icon: '/contact-icon-telegram.svg',  width: 24, height: 24, label: 'Telegram',           value: '@irenyarovaya',                        href: 'https://t.me/irenyarovaya' },
  { icon: '/contact-icon-instagram.png', width: 48, height: 48, label: 'Instagram',          value: '@irina_yogamoon',                      href: 'https://instagram.com/irina_yogamoon' },
  { icon: '/contact-icon-facebook.png',  width: 48, height: 48, label: 'Facebook',           value: 'Irina_yoga_israel',                    href: 'https://facebook.com/Irina_yoga_israel' },
  { icon: '/contact-icon-location.png',  width: 36, height: 48, label: 'Студия офлайн',      value: 'Раанана, парк «Экологи», Ход аШарон', href: null },
];

const WA_NUMBER = '972512060874';

export default function Contact() {
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Здравствуйте, Ирина! Меня зовут ${name}.`,
      `Мой телефон / WhatsApp: ${phone}.`,
      message ? `Меня интересует: ${message}` : 'Хочу записаться на занятие.',
    ].join('\n');

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        
        <div className={styles.left}>
          <p className={styles.label}>КОНТАКТЫ</p>
          <h2 className={styles.heading}>Записаться на занятие</h2>
          <p className={styles.desc}>
            Напишите мне в любой удобный мессенджер, отвечу быстро и помогу выбрать подходящий формат.
          </p>

          <div className={styles.contacts}>
            {CONTACTS.map(({ icon, width, height, label, value, href }) => {
              const content = (
                <>
                <span className={styles.contactIcon}>
                  <Image
                    src={icon}
                    alt=""
                    width={width}
                    height={height}
                    className={styles.contactIconImage}
                  />
                </span>
                <span className={styles.contactText}>
                  <span className={styles.contactLabel}>{label}</span>
                  <span className={styles.contactValue}>{value}</span>
                </span>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  className={styles.contactRow}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={label} className={styles.contactRow}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Написать Ирине</h3>

            <label className={styles.fieldLabel}>
              Ваше имя
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </label>

            <label className={styles.fieldLabel}>
              Телефон / WhatsApp
              <input
                className={styles.input}
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </label>

            <label className={styles.fieldLabel}>
              Что вас интересует?
              <textarea
                className={styles.textarea}
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={5}
              />
            </label>

            <button type="submit" className={styles.submit}>
              Написать в WhatsApp
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
