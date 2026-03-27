import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { SITE_CONFIG } from '@/constants/navigation';
import { BLOG_CATEGORIES } from '@/types';
import { mdxComponents } from '@/lib/mdx-components';
import BlogPostLayout from '@/components/blog/BlogPostLayout';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const categoryLabel = BLOG_CATEGORIES[post.frontmatter.category]?.label ?? '';

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.frontmatter.title} | 스냅플러그 블로그`,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt || post.frontmatter.date,
      authors: [post.frontmatter.author],
      section: categoryLabel,
      url: `${SITE_CONFIG.url}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .filter((p) => p.frontmatter.category === post.frontmatter.category)
    .slice(0, 2);

  const categoryLabel = BLOG_CATEGORIES[post.frontmatter.category]?.label ?? '';

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    articleSection: categoryLabel,
    inLanguage: 'ko-KR',
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt || post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
      url: `${SITE_CONFIG.url}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: '스냅플러그(SnapPlug)',
      url: SITE_CONFIG.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/blog/${slug}`,
    wordCount: post.content.split(/\s+/).length,
    ...(post.frontmatter.tags && { keywords: post.frontmatter.tags.join(', ') }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <BlogPostLayout post={post} relatedPosts={relatedPosts}>
        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </BlogPostLayout>
    </>
  );
}
