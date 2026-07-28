
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const TOKEN   = process.env.FIGMA_TOKEN;
const FILE_ID = 'gcyKHDkzf9yo8XfuIvUYH2';
const ICONS = [
  { id: '35:43', name: 'cert-icon-1' }, // поза лотоса
  { id: '35:49', name: 'cert-icon-2' }, // воин
  { id: '35:55', name: 'cert-icon-3' }, // скрутка
  { id: '35:74', name: 'cert-icon-4' }, // стоя
  { id: '40:92',  name: 'serv-icon-1' }, // групповая хатха-йога
  { id: '40:266', name: 'serv-icon-2' }, // йога-нидра
  { id: '44:268', name: 'serv-icon-3' }, // онлайн-клуб
  { id: '44:543', name: 'serv-icon-4' }, // адаптивные занятия
  { id: '44:859', name: 'serv-icon-5' }, // йогатерапия ОДА
  { id: '113:420', name: 'contact-icon-whatsapp' },
  { id: '113:436', name: 'contact-icon-telegram'  },
  { id: '113:447', name: 'contact-icon-instagram' },
  { id: '113:453', name: 'contact-icon-facebook'  },
  { id: '113:459', name: 'contact-icon-location'  },
  { id: '211:18', name: 'cert-1' }, // Yoga University of Moscow
  { id: '211:23', name: 'cert-2' }, // International Yoga Federation
  { id: '211:24', name: 'cert-3' }, // Школа йоги Чатуранга
  { id: '259:45', name: 'cert-4' }, // Диплом МГУ Йоги
  { id: '211:27', name: 'cert-5' },
  { id: '211:28', name: 'cert-6' },
  { id: '211:29', name: 'cert-7' },
  { id: '211:30', name: 'cert-8' }, // Israel Yoga Federation
];

async function main() {
  if (!TOKEN) { console.error(' FIGMA_TOKEN не найден в .env.local'); process.exit(1); }

  const ids = ICONS.map(i => i.id.replace(':', '-')).join(',');
  console.log(' Запрашиваю URL иконок из Figma...');

  const res = await fetch(
    `https://api.figma.com/v1/images/${FILE_ID}?ids=${encodeURIComponent(ICONS.map(i=>i.id).join(','))}&format=png&scale=2`,
    { headers: { 'X-Figma-Token': TOKEN } }
  );
  const data = await res.json();
  if (data.err) { console.error(' Ошибка Figma API:', data.err); process.exit(1); }

  const outDir = path.join(process.cwd(), 'public');
  fs.mkdirSync(outDir, { recursive: true });

  for (const icon of ICONS) {
    const url = data.images[icon.id];
    if (!url) { console.log(`️  Нет URL для ${icon.name}`); continue; }

    const imgRes = await fetch(url);
    const buf    = Buffer.from(await imgRes.arrayBuffer());
    const dest   = path.join(outDir, `${icon.name}.png`);
    fs.writeFileSync(dest, buf);
    console.log(` ${icon.name}.png`);
  }
  console.log('\n Готово! Иконки в public/');
}

main().catch(e => { console.error('', e.message); process.exit(1); });
