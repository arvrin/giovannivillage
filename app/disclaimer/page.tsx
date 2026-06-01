import LegalLayout from '@/components/ui/LegalLayout';

export const metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Giovanni Village Resort — A Venture of Sudesh The Village Resort.',
  alternates: { canonical: '/disclaimer' },
  openGraph: {
    title: 'Disclaimer — Giovanni Village Resort',
    description: 'Disclaimer for Giovanni Village Resort, Bhopal.',
    url: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer">
      <h2>Disclaimer for Giovanni Village — A Venture of Sudesh The Village Resort</h2>
      <p>
        All the information on this website — <a href="https://giovannivillage.com">https://giovannivillage.com</a> —
        is published in good faith and for general information purposes only. Giovanni Village — A Venture of Sudesh
        The Village Resort does not make any warranties about the completeness, reliability and accuracy of this
        information.
      </p>
      <p>
        Any action you take upon the information you find on this website is strictly at your own risk. Giovanni
        Village — A Venture of Sudesh The Village Resort will not be liable for any losses or damages in connection
        with the use of our website.
      </p>

      <h2>External Links</h2>
      <p>
        From our website, you can visit other websites by following hyperlinks to such external sites. While we strive
        to provide only quality links to useful and ethical websites, we have no control over the content and nature
        of these sites. These links to other websites do not imply a recommendation for all the content found on these
        sites. Site owners and content may change without notice and may occur before we have the opportunity to
        remove a link which may have gone bad.
      </p>
      <p>
        Please be aware that when you leave our website, other sites may have different privacy policies and terms
        which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their
        Terms of Service before engaging in any business or uploading any information.
      </p>

      <h2>Consent</h2>
      <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>

      <h2>Update</h2>
      <p>
        Should we update, amend or make any changes to this document, those changes will be prominently posted here.
      </p>

      <h2>Contact</h2>
      <p>
        If you require more information or have any questions about this disclaimer, please contact us at{' '}
        <a href="mailto:reservations@giovannivillage.com">reservations@giovannivillage.com</a>.
      </p>
    </LegalLayout>
  );
}
