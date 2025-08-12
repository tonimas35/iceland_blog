import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function Itinerario() {
  const posts = getAllPosts();
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Itinerario por días</h1>
      <ul className="grid md:grid-cols-2 gap-4">
        {posts.map(p => (
          <li key={p.slug} className="border border-gray-800 rounded-xl p-4 hover:bg-gray-900">
            <Link href={`/itinerario/${p.slug}`}>{p.meta.title}</Link>
            <p className="text-xs text-gray-400">{p.meta.date}</p>
            <p className="text-sm text-gray-300">{p.meta.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
