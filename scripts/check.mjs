// 記事の frontmatter を検証する。使い方: npm run check
import { readdirSync, readFileSync } from 'node:fs';

const statuses = ['draft', 'unlisted', 'published'];
const errors = [];
const files = readdirSync('articles').filter((f) => f.endsWith('.md'));

for (const f of files) {
  const name = f.replace(/\.md$/, '');
  if (!/^[a-z0-9-]+$/.test(name)) errors.push(`${f}: ファイル名は半角の英小文字・数字・ハイフンにしてください`);

  const fm = readFileSync(`articles/${f}`, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  if (fm === undefined) {
    errors.push(`${f}: 先頭に frontmatter(--- で囲んだ部分)がありません`);
    continue;
  }
  const get = (key) => new RegExp(`^${key}:[ \t]*(.*)$`, 'm').exec(fm)?.[1].trim();

  if (!get('title')) errors.push(`${f}: title が空です`);
  if (!get('description')) errors.push(`${f}: description が空です`);
  if (!/^"?\d{4}-\d{2}-\d{2}"?$/.test(get('date') ?? '')) errors.push(`${f}: date は YYYY-MM-DD の形式にしてください`);
  const status = get('status');
  if (status !== undefined && !statuses.includes(status)) errors.push(`${f}: status は ${statuses.join(' / ')} のどれかにしてください`);
}

if (files.length === 0) errors.push('articles/ に記事がありません');
if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${files.length}本の記事を確認しました`);
