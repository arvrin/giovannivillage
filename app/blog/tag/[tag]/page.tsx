import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getAllPosts, getAllTags } from '@/lib/blog';

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: encodeURIComponent(t.toLowerCase()) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const title = `${decoded[0].toUpperCase()}${decoded.slice(1)} — The Journal`;
  return {
    title,
    description: `Stories tagged "${decoded}" from the Giovanni Village journal.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag).toLowerCase();
  const posts = getAllPosts().filter((p) =>
    p.frontmatter.tags.some((t) => t.toLowerCase() === decoded),
  );
  if (posts.length === 0) notFound();

  const label = `${decoded[0].toUpperCase()}${decoded.slice(1)}`;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pb-24 pt-32 md:pt-36">
        <Container>
          <SectionHeader
            level="h1"
            eyebrow={`Tag · ${label}`}
            title={`Stories on ${label}`}
            description={`Pieces from the journal tagged "${label}". ${posts.length} ${posts.length === 1 ? 'story' : 'stories'}.`}
          />

          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
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
                <p
                  className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]"
                  style={{ fontFamily: 'var(--font-eyebrow)' }}
                >
                  {formatDate(p.frontmatter.date)}
                </p>
                <h3 className="display-italic mt-2 text-2xl leading-[1.15]">
                  {p.frontmatter.title}
                </h3>
                <p
                  className="mt-3 text-sm text-[var(--color-text-secondary)]"
                  style={{ lineHeight: 1.7 }}
                >
                  {p.frontmatter.description}
                </p>
              </Link>
            ))}
          </div>

          <p className="mt-16 text-center">
            <Link
              href="/blog"
              className="text-xs uppercase tracking-[0.2em] text-[var(--color-bronze)] hover:underline"
              style={{ fontFamily: 'var(--font-eyebrow)' }}
            >
              ← Back to the journal
            </Link>
          </p>
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
