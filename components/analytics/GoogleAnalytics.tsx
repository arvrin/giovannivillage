import Script from 'next/script';

/**
 * Google Analytics 4. Mounted in the root layout.
 *
 * Loads only if `NEXT_PUBLIC_GA_ID` env var is set (e.g. `G-XXXXXXXXXX`).
 * That makes it a no-op during local development unless you opt in. The
 * `afterInteractive` strategy means the script doesn't block first paint.
 *
 * If/when you add a cookie-consent banner, gate the second <Script> on the
 * user's consent state — Google's lib will swallow events until then.
 */
export default function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
