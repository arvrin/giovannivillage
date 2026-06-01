import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getAllPosts, getAllTags } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Notes from Giovanni Village Resort — Royalton Farms, the kitchen, Ratapani safari days, the people behind the estate. Slow reading from a luxury wildlife retreat near Bhopal.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'The Journal — Giovanni Village Resort',
    description: 'Notes from the estate.',
    url: '/blog',
    images: ['/images/about/landscape-1.webp'],
  },
};

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--color-background)] pb-24 pt-32 md:pt-36">
        <Container>
          <SectionHeader
            level="h1"
            eyebrow="The journal"
            title="Notes from the estate"
            description="The kitchen, the farm, the reserve, the people behind the front desk. Slow reading for guests who keep coming back, and for the ones who haven't found the place yet."
          />

          {posts.length === 0 ? (
            <div className="mt-20 mx-auto max-w-xl text-center">
              <p
                className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-tertiary)]"
                style={{ fontFamily: 'var(--font-eyebrow)' }}
              >
                Coming soon
              </p>
              <p className="mt-6 text-base text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
                The first pieces will land here shortly — a farm walk, a fire-pit dinner, a Ratapani morning. Check back soon, or follow us on Instagram in the meantime.
              </p>
            </div>
          ) : (
            <>
              {/* Featured (most recent) */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group mt-16 block overflow-hidden rounded-lg"
                >
                  <article className="grid gap-8 md:grid-cols-5 md:gap-12">
                    {featured.frontmatter.cover && (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:col-span-3">
                        <Image
                          src={featured.frontmatter.cover}
                          alt={featured.frontmatter.title}
                          fill
                          priority
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <p
                        className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[var(--color-bronze)]"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        Latest · {formatDate(featured.frontmatter.date)}
                      </p>
                      <h2 className="display-italic text-3xl leading-[1.1] md:text-5xl">
                        {featured.frontmatter.title}
                      </h2>
                      <p
                        className="mt-5 text-base text-[var(--color-text-secondary)]"
                        style={{ lineHeight: 1.7 }}
                      >
                        {featured.frontmatter.description}
                      </p>
                      <p
                        className="mt-6 text-xs uppercase tracking-[0.18em] text-[var(--color-bronze)] group-hover:underline"
                        style={{ fontFamily: 'var(--font-eyebrow)' }}
                      >
                        Read this piece →
                      </p>
                    </div>
                  </article>
                </Link>
              )}

              {/* Tag chips */}
              {tags.length > 0 && (
                <div className="mt-16 mb-8 flex flex-wrap items-center gap-2 border-t border-[color:var(--color-border)] pt-8">
                  <span
                    className="mr-3 text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-tertiary)]"
                    style={{ fontFamily: 'var(--font-eyebrow)' }}
                  >
                    Browse by
                  </span>
                  {tags.map((t) => (
                    <Link
                      key={t}
                      href={`/blog/tag/${encodeURIComponent(t.toLowerCase())}`}
                      className="rounded-full bg-[var(--color-background-secondary)] px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)] transition hover:bg-[var(--color-bronze)]/10 hover:text-[var(--color-bronze)]"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              )}

              {/* Rest of posts */}
              {rest.length > 0 && (
                <div className="mt-4 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
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
                        {p.frontmatter.tags.length > 0 && <> · {p.frontmatter.tags[0]}</>}
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
              )}
            </>
          )}
        </Container>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
