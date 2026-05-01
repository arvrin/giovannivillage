import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

interface LegalLayoutProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

const LegalLayout = ({ title, updated, children }: LegalLayoutProps) => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-background)] pt-32 pb-20">
        <Container maxWidth="narrow">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ lineHeight: '1.1' }}>
            {title}
          </h1>
          {updated && (
            <p className="text-sm text-[var(--color-text-tertiary)] mb-12">Last updated: {updated}</p>
          )}
          <div className="prose prose-lg max-w-none [&_p]:text-[var(--color-text-secondary)] [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:text-[var(--color-text-secondary)] [&_li]:mb-2 [&_a]:text-[var(--color-bronze)] [&_a]:underline">
            {children}
          </div>
        </Container>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default LegalLayout;
