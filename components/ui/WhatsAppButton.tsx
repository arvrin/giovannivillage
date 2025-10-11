'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';
import { siteConfig } from '@/lib/data';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({
  phoneNumber = siteConfig.contact.whatsapp,
  message = "Hi, I'd like to inquire about booking at Giovanni Village",
}: WhatsAppButtonProps = {}) => {
  const whatsappLink = getWhatsAppLink(phoneNumber, message);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-green)] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl md:h-16 md:w-16"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
