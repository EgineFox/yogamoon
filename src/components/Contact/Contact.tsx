'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Contact.module.css';
import type { ContactSectionData, SiteSettings } from '@/../sanity/lib/queries';

interface ContactRow {
  icon: string;
  width: number;
  height: number;
  label: string;
  value: string;
  href: string | null;
}

const FALLBACK_CONTACTS: ContactRow[] = [
  { icon: '/contact-icon-whatsapp.png', width: 48, height: 48, label: 'WhatsApp / Телефон', value: '+972-51-206-0874',                     href: 'https://wa.me/972512060874' },
  { icon: '/contact-icon-telegram.svg',  width: 24, height: 24, label: 'Telegram',           value: '@irenyarovaya',                        href: 'https://t.me/irenyarovaya' },
  { icon: '/contact-icon-instagram.png', width: 48, height: 48, label: 'Instagram',          value: '@irina_yogamoon',                      href: 'https://instagram.com/irina_yogamoon' },
  { icon: '/contact-icon-facebook.png',  width: 48, height: 48, label: 'Facebook',           value: 'Irina_yoga_israel',                    href: 'https://www.facebook.com/IrinaYogamoon' },
  { icon: '/contact-icon-location.png',  width: 36, height: 48, label: 'Студия офлайн',      value: 'Раанана, парк «Экологи», Ход аШарон', href: 'https://maps.app.goo.gl/TAuWqvfm16k3NS316' },
];

const FALLBACK_WA = '972512060874';

function buildContacts(data: ContactSectionData): ContactRow[] {
  const clean = (s: string) => s.replace(/\D/g, '');
  const stripAt = (s: string) => s.replace(/^@/, '');
  const rows: ContactRow[] = [];

  if (data.whatsappNumber) {
    const num = clean(data.whatsappNumber);
    rows.push({ icon: '/contact-icon-whatsapp.png', width: 48, height: 48, label: 'WhatsApp / Телефон', value: `+${num}`, href: `https://wa.me/${num}` });
  }
  if (data.telegramHandle) {
    const handle = stripAt(data.telegramHandle);
    rows.push({ icon: '/contact-icon-telegram.svg', width: 24, height: 24, label: 'Telegram', value: `@${handle}`, href: `https://t.me/${handle}` });
  }
  if (data.instagramHandle) {
    const handle = stripAt(data.instagramHandle);
    rows.push({ icon: '/contact-icon-instagram.png', width: 48, height: 48, label: 'Instagram', value: `@${handle}`, href: `https://instagram.com/${handle}` });
  }
  if (data.facebookPage) {
    rows.push({ icon: '/contact-icon-facebook.png', width: 48, height: 48, label: 'Facebook', value: data.facebookPage, href: `https://facebook.com/${data.facebookPage}` });
  }
  if (data.studioAddress) {
    rows.push({ icon: '/contact-icon-location.png', width: 36, height: 48, label: 'Студия офлайн', value: data.studioAddress, href: data.studioMapLink ?? null });
  }

  return rows.length > 0 ? rows : FALLBACK_CONTACTS;
}

interface Props {
  contactData?: ContactSectionData;
  siteSettings?: SiteSettings;
}

export default function Contact({ contactData, siteSettings }: Props) {
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [message, setMessage] = useState('');

  const contacts = contactData ? buildContacts(contactData) : FALLBACK_CONTACTS;
  const waNumber = (
    contactData?.whatsappNumber ?? siteSettings?.whatsappNumber ?? FALLBACK_WA
  ).replace(/\D/g, '');
  const heading = contactData?.heading ?? 'Записаться на занятие';
  const desc    = contactData?.description ?? 'Напишите мне в любой удобный мессенджер, отвечу быстро и помогу выбрать подходящий формат.';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Здравствуйте, Ирина! Меня зовут ${name}.`,
      `Мой телефон / WhatsApp: ${phone}.`,
      message ? `Меня интересует: ${message}` : 'Хочу записаться на занятие.',
    ].join('\n');

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.left}>
          <p className={styles.label}>КОНТАКТЫ</p>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.desc}>{desc}</p>

          <div className={styles.contacts}>
            {contacts.map(({ icon, width, height, label, value, href }) => {
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
