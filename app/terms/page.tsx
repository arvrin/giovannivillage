import LegalLayout from '@/components/ui/LegalLayout';

export const metadata = {
  title: 'Terms & Conditions — Giovanni Village Resort',
  description: 'Resort policies, check-in / check-out times and house rules for guests staying at Giovanni Village.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <h2>Check-in & Check-out</h2>
      <ul>
        <li>Check-in time: 14:00 hrs</li>
        <li>Check-out time: 11:00 hrs</li>
      </ul>

      <h2>House Rules</h2>
      <ul>
        <li>Outside liquor is not permissible.</li>
        <li>Pets are not allowed except for service animals.</li>
        <li>Outside food and speakers are not allowed in the premises.</li>
      </ul>

      <h2>Security Deposit</h2>
      <p>
        As per our resort policy, a security deposit of ₹3,000 per room is applicable at the time of check-in.
        Rest assured that this amount will be promptly refunded to you upon checking out of the hotel.
      </p>

      <h2>Late Check-out</h2>
      <p>
        Please be advised that any check-out after 12:00 noon and before 17:00 hrs will incur half-day charges plus
        applicable taxes. For check-outs post 17:00 hrs, the full tariff along with taxes will be applicable.
      </p>

      <h2>Contact</h2>
      <p>
        For any questions about these terms, please contact our concierge at{' '}
        <a href="tel:+919039037302">+91 90390 37302</a> or{' '}
        <a href="mailto:reservations@giovannivillage.com">reservations@giovannivillage.com</a>.
      </p>
    </LegalLayout>
  );
}
