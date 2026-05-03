'use client';

import dynamic from 'next/dynamic';
import MonographHero from '@/components/themes/monograph/Hero';

const TheLand = dynamic(() => import('@/components/themes/monograph/home/TheLand'));
const ADayHere = dynamic(() => import('@/components/themes/monograph/home/ADayHere'));
const SignatureMoments = dynamic(() => import('@/components/themes/monograph/home/SignatureMoments'));
const TheStay = dynamic(() => import('@/components/themes/monograph/home/TheStay'));
const Elysium = dynamic(() => import('@/components/themes/monograph/home/Elysium'));
const Celebrations = dynamic(() => import('@/components/themes/monograph/home/Celebrations'));
const PlanYourStay = dynamic(() => import('@/components/themes/monograph/home/PlanYourStay'));

/**
 * Monograph homepage — experiential walkthrough.
 * Eight-section arc: arrival → place → time → moments → rest → care →
 * gather → invitation. Replaces the rooms grid, testimonials carousel and
 * sister-properties block from the default home (those live on dedicated
 * pages).
 */
const MonographHome = () => {
  return (
    <>
      <MonographHero />
      <TheLand />
      <ADayHere />
      <SignatureMoments />
      <TheStay />
      <Elysium />
      <Celebrations />
      <PlanYourStay />
    </>
  );
};

export default MonographHome;
