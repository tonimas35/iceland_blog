import { getPost } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function PostPage({ params }: { params: { slug: string } }) {
  const { meta, content } = getPost(params.slug);
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{meta.title}</h1>
      <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [] } }} />
    </article>
  );
}
