import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Формат занятий',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Иконка',
      type: 'image',
      description: 'PNG или SVG, рекомендуется прозрачный фон',
    }),
    defineField({
      name: 'tag',
      title: 'Тег (внизу карточки)',
      type: 'string',
      description: 'Например: Офлайн / Онлайн',
    }),
  ],
  orderings: [{ title: 'Порядок', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'tag' },
  },
});
