'use client';

/**
 * Sanity Studio — доступна по адресу /studio во время разработки.
 * В продакшене /studio должна быть закрыта или защищена паролем.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
