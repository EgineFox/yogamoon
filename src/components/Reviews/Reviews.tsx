import Image from 'next/image';
import styles from './Reviews.module.css';
import type { Review } from '@/../sanity/lib/queries';

// ─── Встроенные данные (fallback до настройки CMS) ────────────────────────────
const FALLBACK_REVIEWS: Review[] = [
  { _id: 'r1', name: 'Яир Родион Копял',    meta: 'Групповые занятия · 2 года',                 rating: 5, text: '«Без малого два года тянусь, стою, пыхчу, потею, осознаю умом и телом. Мне нравится твой подход, то как ты ведёшь занятие. Спасибо огромное!»' },
  { _id: 'r2', name: 'Дана Креман',          meta: 'Индивидуальные/онлайн занятия · 3+ года',     rating: 5, text: '«Занимаемся с Ирой уже больше 3 лет, это стало частью жизни. Я порвала мениск, занятия с Ирой в течение года просто кардинально помогли мне!»' },
  { _id: 'r3', name: 'Оксана Овчинникова',  meta: 'Руководитель клуба «Бахира»',                 rating: 5, text: '«Ирина очень внимательна и чутка к своим ученикам. Программу подбирает исходя из физической подготовки каждого. Очень хороший специалист!»' },
  { _id: 'r4', name: 'Марина Голосовски',   meta: 'Онлайн-клуб',                                 rating: 5, text: '«На тренировках с Ириной ощущение полной вовлечённости и присутствия учителя рядом. Ирина постоянно корректирует ошибки, поправляет и подсказывает.»' },
  { _id: 'r5', name: 'Розалия Король',      meta: 'Индивидуальные (адаптивные) занятия',          rating: 5, text: '«Вы помогли мне полюбить практики, вернуть гибкость! Спасибо за внимание, терпение и нескончаемую бьющую солнечную энергию!»' },
  { _id: 'r6', name: 'Лариса Гусакова',    meta: 'Йогатерапия ОДА',                              rating: 5, text: '«Очень помогли ваши занятия справиться со спиной и коленями. До сих пор выполняю все ваши рекомендации. Большие подвижки, спасибо огромное!»' },
];

function initials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('');
}

interface Props {
  reviews?: Review[];
}

export default function Reviews({ reviews }: Props) {
  const items = reviews ?? FALLBACK_REVIEWS;

  return (
    <section id="reviews" className={styles.section}>
      <p className={styles.label}>ОТЗЫВЫ</p>
      <h2 className={styles.heading}>Что говорят ученики</h2>

      <div className={styles.grid}>
        {items.map(({ _id, name, meta, rating, text, photo }) => (
          <div key={_id} className={styles.card}>
            <div className={styles.stars} aria-label={`Оценка ${rating} из 5`}>
              <span aria-hidden="true">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
            </div>
            <p className={styles.text}>{text}</p>
            <div className={styles.author}>
              {photo?.asset?.url ? (
                <Image
                  src={photo.asset.url}
                  alt={name}
                  width={40}
                  height={40}
                  className={styles.avatar}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                />
              ) : (
                <div className={styles.avatar}>{initials(name)}</div>
              )}
              <div>
                <p className={styles.name}>{name}</p>
                {meta && <p className={styles.meta}>{meta}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
