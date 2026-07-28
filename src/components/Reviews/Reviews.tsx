import styles from './Reviews.module.css';

const REVIEWS = [
  {
    text: '«Без малого два года тянусь, стою, пыхчу, потею, осознаю умом и телом. Мне нравится твой подход, то как ты ведёшь занятие. Спасибо огромное!»',
    name: 'Яир Родион Копял',
    meta: 'Групповые занятия , 2 года',
    initials: 'ЯК',
  },
  {
    text: '«Занимаемся с Ирой уже больше 3 лет, это стало частью жизни. Я порвала мениск, занятия с Ирой в течение года просто кардинально помогли мне!»',
    name: 'Дана Креман',
    meta: 'Индивидуальные/онлайн занятия , 3+ года',
    initials: 'ДК',
  },
  {
    text: '«Ирина очень внимательна и чутка к своим ученикам. Программу подбирает исходя из физической подготовки каждого. Очень хороший специалист!»',
    name: 'Оксана Овчинникова',
    meta: 'Руководитель клуба «Бахира»',
    initials: 'ОО',
  },
  {
    text: '«На тренировках с Ириной ощущение полной вовлечённости и присутствия учителя рядом. Ирина постоянно корректирует ошибки, поправляет и подсказывает.»',
    name: 'Марина Голосовски',
    meta: 'Онлайн-клуб',
    initials: 'МГ',
  },
  {
    text: '«Вы помогли мне полюбить практики, вернуть гибкость! Спасибо за внимание, терпение и нескончаемую бьющую солнечную энергию!»',
    name: 'Розалия Король',
    meta: 'Индивидуальные (адаптивные) занятия',
    initials: 'РК',
  },
  {
    text: '«Очень помогли ваши занятия справиться со спиной и коленями. До сих пор выполняю все ваши рекомендации. Большие подвижки, спасибо огромное!»',
    name: 'Лариса Гусакова',
    meta: 'Йогатерапия ОДА',
    initials: 'ЛГ',
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className={styles.section}>
      
      <p className={styles.label}>ОТЗЫВЫ</p>
      <h2 className={styles.heading}>Что говорят ученики</h2>

      <div className={styles.grid}>
        {REVIEWS.map(({ text, name, meta, initials }) => (
          <div key={name} className={styles.card}>
            <div className={styles.stars} aria-label="Оценка 5 из 5">
              <span aria-hidden="true">★★★★★</span>
            </div>
            <p className={styles.text}>{text}</p>
            <div className={styles.author}>
              <div className={styles.avatar}>{initials}</div>
              <div>
                <p className={styles.name}>{name}</p>
                <p className={styles.meta}>{meta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
