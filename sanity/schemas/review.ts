import { defineField, defineType } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Порядок отображения',
      type: 'number',
    }),
    defineField({
      name: 'name',
      title: 'Имя ученика',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Формат занятий / подпись',
      type: 'string',
      description: 'Например: Групповые занятия, 2 года',
    }),
    defineField({
      name: 'rating',
      title: 'Оценка (из 5)',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'text',
      title: 'Текст отзыва',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Фото ученика (опционально)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [{ title: 'Порядок', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'meta', rating: 'rating' },
    prepare: ({ title, subtitle, rating }) => ({
      title,
      subtitle: `${'★'.repeat(rating ?? 5)} · ${subtitle ?? ''}`,
    }),
  },
});
