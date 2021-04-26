import React, { ComponentType } from "https://esm.sh/react@17.0.2";

export default function App({ Page, pageProps }: { Page: ComponentType<any>; pageProps: any }) {
  return (
    <main style={{ width: "100%", height: "100%" }}>
      <head>
        <meta name="viewport" content="width=device-width" />
        <link rel="stylesheet" href="./style/site.css" />
        <link rel="stylesheet" href="./style/reset.css" />
      </head>
      <Page {...pageProps} />
    </main>
  );
}
