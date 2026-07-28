import { defineField, defineType } from 'sanity';

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Секция «Контакты»',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок секции',
      type: 'string',
      initialValue: 'Записаться на занятие',
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Номер WhatsApp (только цифры, без +)',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Телефон для отображения',
      type: 'string',
    }),
    defineField({
      name: 'telegramHandle',
      title: 'Telegram handle (без @)',
      type: 'string',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram handle (без @)',
      type: 'string',
    }),
    defineField({
      name: 'facebookPage',
      title: 'Facebook (slug страницы)',
      type: 'string',
    }),
    defineField({
      name: 'studioAddress',
      title: 'Адрес студии',
      type: 'string',
    }),
    defineField({
      name: 'studioMapLink',
      title: 'Ссылка на карту',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Контакты' }),
  },
});
