import React, { Fragment } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";

import { observer } from "mobx-react-lite";
import SearchResults from "../components/SearchResults";

const Home: NextPage = observer(() => {
  return (
    <Fragment>
      <Head>
        <title>Favourites</title>
        <meta name="description" content="ElestIO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchResults listFavourites />
    </Fragment>
  );
});

export default Home;

export const getServerSideProps: GetServerSideProps =
  async function getServerSideProps() {
    return {
      props: {
        hydrationData: {
          weatherStore: {
            searchResults: [],
          },
        },
      },
    };
  };
