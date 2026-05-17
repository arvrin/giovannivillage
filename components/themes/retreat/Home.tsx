'use client';

import dynamic from 'next/dynamic';
import RetreatHero from '@/components/themes/retreat/Hero';
import ScrollProgress from '@/components/themes/retreat/ScrollProgress';
import AmbientInterlude from '@/components/themes/retreat/home/AmbientInterlude';

const WhereYouAre = dynamic(() => import('@/components/themes/retreat/home/WhereYouAre'));
const Discover = dynamic(() => import('@/components/themes/retreat/home/Discover'));
const ADayHere = dynamic(() => import('@/components/themes/retreat/home/ADayHere'));
const TheSenses = dynamic(() => import('@/components/themes/retreat/home/TheSenses'));
const Celebrations = dynamic(() => import('@/components/themes/retreat/home/Celebrations'));
const QuietPleasures = dynamic(() => import('@/components/themes/retreat/home/QuietPleasures'));
const GiovanniFamily = dynamic(() => import('@/components/themes/retreat/home/GiovanniFamily'));
const InstagramStrip = dynamic(() => import('@/components/themes/retreat/home/InstagramStrip'));

/**
 * Retreat homepage — cinematic experience flow.
 * Ambient video interludes punctuate the section arc, giving the page the
 * pacing of a short film instead of a brochure.
 */
const RetreatHome = () => (
  <>
    <ScrollProgress />
    <RetreatHero />
    <WhereYouAre />
    <AmbientInterlude
      src="/videos/golden-lawn.mp4"
      poster="/images/weddings/cocktail-lawn.webp"
      alt="Golden hour through the trees"
      eyebrow="A pause"
      lead="The light slows down here"
      accent="long"
      tail="before it leaves."
      height="md"
    />
    <Discover />
    <ADayHere />
    <TheSenses />
    <AmbientInterlude
      src="/videos/twilight-path.mp4"
      poster="/images/dining/the-den.jpg"
      alt="Estate path at twilight"
      eyebrow="An invitation"
      lead="Walk the estate by"
      accent="lantern"
      tail="light."
      height="md"
    />
    <Celebrations />
    <QuietPleasures />
    <GiovanniFamily />
    <InstagramStrip />
  </>
);

export default RetreatHome;
