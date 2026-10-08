// 新しい記事のひな形を作る。使い方: npm run new <記事名(半角英数字とハイフン)>
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('記事名を、半角の英小文字・数字・ハイフンで指定してください。例: npm run new my-first-article');
  process.exit(1);
}

const file = `articles/${slug}.md`;
if (existsSync(file)) {
  console.error(`すでに存在します: ${file}`);
  process.exit(1);
}

const today = new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD
writeFileSync(
  file,
  `---\ntitle: \ndescription: \ndate: "${today}"\nstatus: draft\ntags: []\n---\n\n`,
);
mkdirSync(`images/${slug}`, { recursive: true });
console.log(`作成しました: ${file}(画像は images/${slug}/ に置きます)`);
