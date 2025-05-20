import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="title" content="Mini Jira" />
        <meta name="description" content="mini Jira for DSR course" />
        <meta name="theme-color" content="#ffffff" />
        {/* Load Geist fonts via CDN or local files */}
        <link href="https://fonts.cdnfonts.com/css/geist" rel="stylesheet" />
        <link
          href="https://fonts.cdnfonts.com/css/geist-mono"
          rel="stylesheet"
        />
        <style>
          {`
            :root {
              --font-geist-sans: 'Geist', sans-serif;
              --font-geist-mono: 'Geist Mono', monospace;
            }
          `}
        </style>
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
