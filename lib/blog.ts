/**
 * Blog content loader. Posts live as MDX files at `/content/blog/*.mdx`,
 * each with a YAML frontmatter block:
 *
 *   ---
 *   title: ...
 *   description: ...
 *   date: 2026-06-01           # ISO date
 *   tags: ["Food", "Wildlife"]
 *   cover: /images/blog/foo.webp
 *   author: Giovanni Village Team
 *   ---
 *
 * Posts where `draft: true` are excluded from production builds.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFaq {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  /** Last substantive revision — feeds dateModified in BlogPosting JSON-LD. */
  updated?: string;
  tags: string[];
  cover?: string;
  author?: string;
  draft?: boolean;
  /**
   * Optional FAQ pairs mirroring an FAQ section in the post body — emitted
   * as FAQPage JSON-LD on the post page for rich-snippet eligibility.
   * Keep answers in sync with the body copy; Google requires the schema
   * content to be visible on the page.
   */
  faq?: PostFaq[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Raw MDX source — pass to <MDXRemote source={post.content} /> */
  content: string;
}

export interface PostListing {
  slug: string;
  frontmatter: PostFrontmatter;
}

function listFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'));
}

function readOne(file: string): Post | null {
  const slug = file.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  if (data.draft === true) return null;
  const frontmatter: PostFrontmatter = {
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    updated: data.updated ? String(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    author: data.author ? String(data.author) : 'Giovanni Village Team',
    draft: data.draft === true,
    faq: Array.isArray(data.faq)
      ? data.faq
          .filter((f: unknown): f is { q: unknown; a: unknown } =>
            typeof f === 'object' && f !== null && 'q' in f && 'a' in f,
          )
          .map((f) => ({ q: String(f.q), a: String(f.a) }))
      : undefined,
  };
  return { slug, frontmatter, content };
}

/** All posts, newest first. Drafts are filtered out. */
export function getAllPosts(): PostListing[] {
  return listFiles()
    .map((f) => readOne(f))
    .filter((p): p is Post => p !== null)
    .map(({ slug, frontmatter }) => ({ slug, frontmatter }))
    .sort((a, b) =>
      a.frontmatter.date < b.frontmatter.date ? 1 : a.frontmatter.date > b.frontmatter.date ? -1 : 0,
    );
}

/** Single post by slug; returns null when missing or in draft. */
export function getPostBySlug(slug: string): Post | null {
  try {
    return readOne(`${slug}.mdx`);
  } catch {
    return null;
  }
}

/** Distinct sorted tag list, derived from all published posts. */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((p) => p.frontmatter.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}

/** Suggest 3 next posts to read — same tag overlap, exclude current. */
export function getRelatedPosts(slug: string, limit = 3): PostListing[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const currentTags = new Set(current.frontmatter.tags);
  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.frontmatter.tags.reduce((n, t) => n + (currentTags.has(t) ? 1 : 0), 0),
    }))
    .sort((a, b) =>
      b.score !== a.score
        ? b.score - a.score
        : a.post.frontmatter.date < b.post.frontmatter.date
          ? 1
          : -1,
    );
  return scored.slice(0, limit).map((s) => s.post);
}
