'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/data';

/**
 * Header - LUXURY SIDEBAR EDITION
 * Centered logo with hamburger navigation
 * Full-screen sidebar with elegant slide animation
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle scroll to add background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Rooms', href: '/rooms/king-room-pool-garden' },
    { label: 'Dining', href: '/dining' },
    { label: 'Spa', href: '/spa' },
    { label: 'Weddings', href: '/weddings' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = (href: string) => {
    window.location.href = href;
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-600 ${
          isScrolled
            ? 'bg-[var(--color-bg)] shadow-sm'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-screen-2xl px-4 md:px-12 lg:px-24">
          <div className="relative flex h-16 items-center justify-between md:h-24">

            {/* LEFT: Hamburger Button - Gold brand color */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(true)}
              className={`relative z-50 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20'
                  : 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/30 backdrop-blur-md'
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>

            {/* CENTER: Logo - Connected to PageLoader - EXPERT OPTIMIZED */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <a href="/" className="focus:outline-none">
                <motion.img
                  layoutId="main-logo"
                  src="/images/logo/gvr-final-logo.png"
                  alt={siteConfig.name}
                  className="h-10 w-auto md:h-14"
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    scale: { duration: 0.3 },
                    layout: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
                  }}
                />
              </a>
            </div>

            {/* RIGHT: Book Now Button - Matching Hero CTA (Hidden on mobile) */}
            <div className="relative z-50 hidden md:block">
              <Button
                size="sm"
                variant="cta"
                href={siteConfig.booking.resort}
                className="shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="fixed left-0 top-0 bottom-0 z-[70] flex w-80 md:w-[400px] flex-col bg-[var(--color-bg)] shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="flex shrink-0 items-center justify-between p-8 border-b border-[var(--color-text-tertiary)]/10">
                <motion.img
                  src="/images/logo/gvr-final-logo.png"
                  alt={siteConfig.name}
                  className="h-10 w-auto"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-text-secondary)]/10 text-[var(--color-text-primary)] hover:bg-[var(--color-text-secondary)]/20 transition-colors"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-8 py-10">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.5,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="group relative block w-full text-left py-3 font-heading text-2xl font-semibold text-[var(--color-text-primary)] transition-colors duration-300 hover:text-[var(--color-text-secondary)]"
                      >
                        {item.label}
                        <span className="absolute bottom-1.5 left-0 h-0.5 w-0 bg-[var(--color-text-secondary)] transition-all duration-300 group-hover:w-10" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="shrink-0 p-7 border-t border-[var(--color-text-tertiary)]/10 bg-[var(--color-bg-alt)]"
              >
                <Button
                  size="lg"
                  variant="cta"
                  fullWidth
                  href={siteConfig.booking.resort}
                >
                  Book Your Stay
                </Button>

                <div className="mt-6 space-y-2 text-center">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[var(--color-text-secondary)] transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[var(--color-text-secondary)] transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
