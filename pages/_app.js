import "../styles/globals.css";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nextjs fetch app</title>
        <meta
          name="description"
          content="A basic Nextjs App to fetch data from an API"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
