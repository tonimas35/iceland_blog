import { getPost } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const { meta, content } = post;
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{meta.title}</h1>
      <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [] } }} />
    </article>
  );
}
