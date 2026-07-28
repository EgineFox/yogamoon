import { defineField, defineType } from 'sanity';

// Используется как вложенный объект внутри pricingGroup
export const pricingCard = defineType({
  name: 'pricingCard',
  title: 'Карточка тарифа',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Название тарифа',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Цена (₪)',
      type: 'number',
      validation: Rule => Rule.required().positive(),
    }),
    defineField({
      name: 'priceSubtitle',
      title: 'Подпись к цене',
      type: 'string',
      description: 'Например: 1 месяц · 75₪ / занятие',
    }),
    defineField({
      name: 'note',
      title: 'Пометка',
      type: 'string',
      description: 'Например: Популярный выбор',
    }),
    defineField({
      name: 'isPopular',
      title: 'Отметить как «Популярный»',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isBest',
      title: 'Отметить как «Лучший выбор»',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'period',
      title: 'Период (для клубных тарифов)',
      type: 'string',
      description: 'Например: в месяц',
    }),
    defineField({
      name: 'features',
      title: 'Список включённого (для клубных тарифов)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Текст для WhatsApp',
      type: 'text',
      rows: 2,
      description: 'Сообщение, которое откроется при нажатии «Записаться»',
    }),
  ],
  preview: {
    select: { title: 'title', price: 'price' },
    prepare: ({ title, price }) => ({
      title: `${title} — ${price}₪`,
    }),
  },
});
