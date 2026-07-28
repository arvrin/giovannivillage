import Script from 'next/script';

/**
 * Google Analytics 4. Mounted in the root layout.
 *
 * Loads only if `NEXT_PUBLIC_GA_ID` env var is set (e.g. `G-XXXXXXXXXX`).
 * That makes it a no-op during local development unless you opt in. The
 * `lazyOnload` strategy fetches gtag (163KB) after window 'load' + idle so it
 * never competes with the hero media or holds up the first-visit loader —
 * every visit is still recorded, just tagged a moment later.
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
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
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
