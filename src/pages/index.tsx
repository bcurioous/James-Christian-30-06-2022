import React, { Fragment, useCallback } from "react";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head";
import SearchIcon from "@heroicons/react/outline/SearchIcon";

import { observer } from "mobx-react-lite";
import SearchResults from "../components/SearchResults";

import { useWeatherStore } from "../providers/RootStoreProvider";

const Home: NextPage = observer(() => {
  const { onSearchCities, searchResults } = useWeatherStore();
  const onSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchCities(e.target.value);
    },
    [onSearchCities]
  );
  return (
    <Fragment>
      <Head>
        <title>ElestIO React Challenge</title>
        <meta name="description" content="ElestIO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-grow items-center content-center justify-center h-44 w-full">
        <div className="relative text-gray-600 ">
          <input
            type="search"
            name="serch"
            placeholder="Search"
            className="bg-white h-10 px-5 pr-10 w-96 rounded-full text-sm focus:outline-none"
            onChange={onSearchTermChange}
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <SearchIcon className="block h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <SearchResults />
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
