import LegalLayout from '@/components/ui/LegalLayout';

export const metadata = {
  title: 'Cancellation & Refund Policy — Giovanni Village Resort',
  description: 'Booking cancellation, returned deposit and non-arrival conditions at Giovanni Village.',
};

export default function CancellationPage() {
  return (
    <LegalLayout title="Cancellation & Refund Policy">
      <p>
        Guests who need to cancel a booking should contact us as soon as possible.
      </p>

      <h2>Cancellation Conditions</h2>
      <ul>
        <li>
          <strong>15 days or more before arrival:</strong> the booking will be amended and can be re-booked for a
          future date subject to availability.
        </li>
        <li>
          <strong>72 hours or more before check-in:</strong> 50% of the deposit is forfeited and held as a credit for
          a future weekday booking.
        </li>
        <li>
          <strong>Within 72 hours of check-in:</strong> no refund issued — the full amount of the booking will be due.
        </li>
      </ul>

      <h2>No-Show</h2>
      <p>
        Guests who are unable to attend or fail to attend for any reason forfeit their deposit and the full amount of
        the booking will be due.
      </p>

      <p>
        We suggest that booking guests take out appropriate holiday or cancellation insurance where required.
      </p>

      <h2>Cancellation by the Resort</h2>
      <p>
        In the rare event we need to cancel your booking with us, please be aware that we cannot be held liable for
        circumstances beyond our control and that our liability to you is limited to the refund of any payment
        already made.
      </p>

      <h2>Contact</h2>
      <p>
        To request a cancellation, contact reservations at{' '}
        <a href="tel:+919039037300">+91 90390 37300</a> or{' '}
        <a href="mailto:reservations@giovannivillage.com">reservations@giovannivillage.com</a>.
      </p>
    </LegalLayout>
  );
}
