import { defineField, defineType } from 'sanity';

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Слайд главной страницы',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Порядок (1, 2, 3)',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'label',
      title: 'Верхний ярлык (золотой текст)',
      type: 'string',
      description: 'Например: YOGAMOON · РААНАНА, ОКРУГ АШАРОН',
    }),
    defineField({
      name: 'heading',
      title: 'Заголовок',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'string',
      description: 'Например: Хатха-йога · Йогатерапия · Йога-нидра',
    }),
    defineField({
      name: 'bodyItems',
      title: 'Текстовые блоки / список',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textItem',
          fields: [
            { name: 'title', title: 'Заголовок пункта', type: 'string' },
            { name: 'description', title: 'Описание пункта', type: 'string' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
      description: 'Для слайда 1: оставьте пустым. Для слайда 2: принципы. Для слайда 3: результаты (только title).',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Основная кнопка',
      type: 'object',
      fields: [
        { name: 'text', title: 'Текст кнопки', type: 'string' },
        { name: 'href', title: 'Ссылка', type: 'string' },
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Вторая кнопка (опционально)',
      type: 'object',
      fields: [
        { name: 'text', title: 'Текст кнопки', type: 'string' },
        { name: 'href', title: 'Ссылка', type: 'string' },
      ],
    }),
    defineField({
      name: 'desktopImage',
      title: 'Фото (десктоп)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mobileImage',
      title: 'Фото (мобильный)',
      type: 'image',
      options: { hotspot: true },
      description: 'Если не задано — используется десктопное фото',
    }),
    defineField({
      name: 'background',
      title: 'Фон слайда',
      type: 'string',
      options: {
        list: [
          { title: 'Белый', value: 'white' },
          { title: 'Светло-фиолетовый', value: 'light' },
          { title: 'Тёмно-фиолетовый', value: 'dark' },
        ],
        layout: 'radio',
      },
    }),
  ],
  orderings: [{ title: 'Порядок', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'heading', subtitle: 'label', order: 'order' },
    prepare: ({ title, subtitle, order }) => ({
      title: `Слайд ${order}: ${title ?? '—'}`,
      subtitle,
    }),
  },
});
