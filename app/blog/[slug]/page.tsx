import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { siteConfig } from '@/lib/data';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `/blog/${post.slug}`,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : undefined,
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** BlogPosting JSON-LD for rich-snippet eligibility + AI parsing. */
function jsonLd(post: ReturnType<typeof getPostBySlug>): string | null {
  if (!post) return null;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.cover
      ? `${siteConfig.url}${post.frontmatter.cover}`
      : undefined,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: post.frontmatter.author ?? 'Giovanni Village Resort',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Giovanni Village Resort',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo/gvr-final-logo.webp`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
    keywords: post.frontmatter.tags.join(', '),
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const ld = jsonLd(post);

  return (
    <>
      <Header />

      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ld }}
        />
      )}
      <BreadcrumbSchema
        items={[
          { name: 'Journal', href: '/blog' },
          { name: post.frontmatter.title, href: `/blog/${slug}` },
        ]}
      />

      <main className="min-h-screen bg-[var(--color-background)] pt-32 md:pt-40">
        {/* Article header */}
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/blog"
              className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-tertiary)] hover:text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              ← The journal
            </Link>
            <p
              className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              {formatDate(post.frontmatter.date)}
              {post.frontmatter.tags.length > 0 && <> · {post.frontmatter.tags.join(' · ')}</>}
            </p>
            <h1 className="display-italic mt-4 text-4xl leading-[1.05] md:text-6xl md:leading-[1.02]">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.description && (
              <p
                className="mt-6 text-lg text-[var(--color-text-secondary)] md:text-xl"
                style={{ lineHeight: 1.7 }}
              >
                {post.frontmatter.description}
              </p>
            )}
            {post.frontmatter.author && (
              <p
                className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                {post.frontmatter.author}
              </p>
            )}
          </div>
        </Container>

        {/* Cover */}
        {post.frontmatter.cover && (
          <div className="mx-auto mt-16 max-w-[1280px] px-5 md:px-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image
                src={post.frontmatter.cover}
                alt={post.frontmatter.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <Container>
          <article
            className="prose-blog mx-auto mt-16 max-w-3xl pb-16 text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>
        </Container>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-[color:var(--color-border)] bg-[var(--color-background-secondary)] py-20">
            <Container>
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Read next
              </p>
              <h2 className="display-italic mb-12 text-3xl md:text-4xl">More from the journal</h2>
              <div className="grid gap-10 md:grid-cols-3">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block">
                    {p.frontmatter.cover && (
                      <div className="relative aspect-[5/4] overflow-hidden rounded-lg">
                        <Image
                          src={p.frontmatter.cover}
                          alt={p.frontmatter.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    )}
                    <h3 className="display-italic mt-4 text-xl leading-[1.15]">{p.frontmatter.title}</h3>
                    <p
                      className="mt-2 text-sm text-[var(--color-text-secondary)]"
                      style={{ lineHeight: 1.6 }}
                    >
                      {p.frontmatter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
