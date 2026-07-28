import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Название сайта',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-заголовок',
      type: 'string',
      description: 'Показывается во вкладке браузера и в поиске',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Номер WhatsApp (только цифры, без +)',
      type: 'string',
      description: 'Например: 972512060874',
    }),
    defineField({
      name: 'phone',
      title: 'Телефон для отображения',
      type: 'string',
      description: 'Например: +972-51-206-0874',
    }),
    defineField({
      name: 'telegramHandle',
      title: 'Telegram (handle без @)',
      type: 'string',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram (handle без @)',
      type: 'string',
    }),
    defineField({
      name: 'facebookPage',
      title: 'Facebook (slug страницы)',
      type: 'string',
    }),
    defineField({
      name: 'youtubeChannel',
      title: 'Ссылка на YouTube-канал',
      type: 'url',
    }),
    defineField({
      name: 'studioAddress',
      title: 'Адрес студии',
      type: 'string',
    }),
    defineField({
      name: 'studioMapLink',
      title: 'Ссылка на Google Maps',
      type: 'url',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Настройки сайта' }),
  },
});
