/* eslint-disable @next/next/no-sync-scripts */
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <>
          <title>Invoice Builder</title>
        </>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
