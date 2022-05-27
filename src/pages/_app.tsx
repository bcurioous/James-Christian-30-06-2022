import "../../styles/globals.css";

import { RootStoreProvider } from "../providers/RootStoreProvider";
import { NextPage } from "next";
import Layout from "../components/Layout";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
    <RootStoreProvider hydrationData={{}}>
      <Layout>
        <>
          <Component {...pageProps} />
        </>
      </Layout>
    </RootStoreProvider>
  );
}

export default MyApp;
