import { defineField, defineType } from 'sanity';

export const pricingGroup = defineType({
  name: 'pricingGroup',
  title: 'Группа тарифов',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Порядок (1 = первый)',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Заголовок группы',
      type: 'string',
      description: 'Например: Групповые офлайн-занятия · 90 минут',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Карточки тарифов',
      type: 'array',
      of: [{ type: 'pricingCard' }],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  orderings: [{ title: 'Порядок', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', order: 'order' },
    prepare: ({ title, order }) => ({
      title: `${order}. ${title}`,
    }),
  },
});
