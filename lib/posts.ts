import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export type Post = { slug: string; meta: { title: string; date?: string; cover?: string; summary?: string } };

export function getAllPosts(): Post[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
  return files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    const { data } = matter(fs.readFileSync(path.join(contentDir, file), 'utf8'));
    return { slug, meta: data as any };
  }).sort((a,b) => (a.meta.date || '').localeCompare(b.meta.date || ''));
}

export function getPost(slug: string) {
  const full = path.join(contentDir, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(full, 'utf8'));
  return { meta: data as any, content };
}
