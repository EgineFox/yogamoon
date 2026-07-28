import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './sanity/schemas';

export default defineConfig({
  name: 'yogamoon',
  title: 'Yogamoon CMS',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Содержимое сайта')
          .items([
            // Синглтоны (одиночные документы)
            S.listItem()
              .title('Настройки сайта')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Секция «Контакты»')
              .id('contactSection')
              .child(S.document().schemaType('contactSection').documentId('contactSection')),

            S.divider(),

            // Коллекции
            S.documentTypeListItem('heroSlide').title('Слайды главной'),
            S.documentTypeListItem('service').title('Форматы занятий'),
            S.documentTypeListItem('pricingGroup').title('Группы тарифов'),
            S.documentTypeListItem('review').title('Отзывы'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemas },
  document: {
    actions: (previousActions, context) => {
      const singletonTypes = ['siteSettings', 'contactSection'];

      if (!singletonTypes.includes(context.schemaType)) {
        return previousActions;
      }

      return previousActions.filter(
        action => action.action !== 'delete' && action.action !== 'duplicate',
      );
    },
  },
});
