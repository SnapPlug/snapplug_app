import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogCategory } from '@/types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(CONTENT_DIR);
    const mdxFiles = files.filter((f) => f.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = path.join(CONTENT_DIR, filename);
        const raw = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(raw);
        const stats = readingTime(content);

        return {
          slug: filename.replace(/\.mdx$/, ''),
          frontmatter: data as BlogPost['frontmatter'],
          content,
          readingTime: Math.ceil(stats.minutes),
        };
      })
    );

    return posts
      .filter((p) => p.frontmatter.published)
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    const post: BlogPost = {
      slug,
      frontmatter: data as BlogPost['frontmatter'],
      content,
      readingTime: Math.ceil(stats.minutes),
    };

    if (!post.frontmatter.published) return undefined;
    return post;
  } catch {
    return undefined;
  }
}

export async function getPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.frontmatter.category === category);
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((p) => p.frontmatter.category));
  return Array.from(categories);
}
