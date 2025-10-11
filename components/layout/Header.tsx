'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
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
      setIsScrolled(window.scrollY > 50);
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
            ? 'bg-[var(--color-ivory)] shadow-sm'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-24">
          <div className="relative flex h-20 items-center justify-between md:h-24">

            {/* LEFT: Hamburger Button - Gold brand color */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(true)}
              className={`relative z-50 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20'
                  : 'bg-[var(--color-gold)]/20 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/30 backdrop-blur-md'
              }`}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </motion.button>

            {/* CENTER: Logo - Connected to PageLoader - EXPERT OPTIMIZED */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <a href="/" className="focus:outline-none">
                <motion.img
                  layoutId="main-logo"
                  src="/images/logo/gvr-final-logo.png"
                  alt={siteConfig.name}
                  className="h-12 w-auto md:h-14"
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    scale: { duration: 0.3 },
                    layout: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
                  }}
                />
              </a>
            </div>

            {/* RIGHT: Book Now Button - Matching Hero CTA */}
            <div className="relative z-50">
              <Button
                size="sm"
                variant="primary"
                className="shadow-lg transition-transform duration-600 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-charcoal)',
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontSize: '0.875rem',
                }}
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
              className="fixed left-0 top-0 bottom-0 z-[70] w-80 md:w-[400px] bg-[var(--color-ivory)] shadow-2xl overflow-y-auto"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-8 border-b border-[var(--color-text-tertiary)]/10">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bronze)]/10 text-[var(--color-text-primary)] hover:bg-[var(--color-bronze)]/20 transition-colors"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="px-8 py-12">
                <ul className="space-y-2">
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
                        className="group relative block w-full text-left py-4 font-heading text-3xl font-semibold text-[var(--color-text-primary)] transition-colors duration-300 hover:text-[var(--color-bronze)]"
                      >
                        {item.label}
                        <span className="absolute bottom-2 left-0 h-0.5 w-0 bg-[var(--color-bronze)] transition-all duration-300 group-hover:w-12" />
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
                className="absolute bottom-0 left-0 right-0 p-8 border-t border-[var(--color-text-tertiary)]/10 bg-[var(--color-background-secondary)]"
              >
                <Button
                  size="lg"
                  className="w-full bg-[var(--color-gold)] text-[var(--color-charcoal)] hover:bg-[var(--color-bronze)] hover:text-white"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Book Your Stay
                </Button>

                <div className="mt-6 space-y-2 text-center">
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[var(--color-bronze)] transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[var(--color-bronze)] transition-colors">
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
