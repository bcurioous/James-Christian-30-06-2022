import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from "./RootStore";

import { City } from "../types";

const API_KEY = "J6y2RtBwI2uTEMjFtg7MijnGBvSCzpc6";

export type WeatherStoreHydration = {
  searchResults: City[];
};

export default class WeatherStore {
  root: RootStore;
  searchResults: City[] = [];

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  onSearchCities = async (term: string) => {
    console.log("before searchResult ::", this);
    // const searchParams = new URLSearchParams({
    //   apikey: API_KEY,
    //   q: term,
    // });

    // const response = await fetch(
    //   "/api/locations/v1/cities/autocomplete?" + searchParams
    // );

    // const responseJson = await response.json();

    runInAction(() => {
      // this.searchResults = responseJson;
      this.searchResults = results;
    });
  };

  hydrate(data?: WeatherStoreHydration) {
    if (data) {
      console.log('hydrate weather ::', data);

      this.searchResults = data.searchResults;
    }
  }
}

const results = [
  {
    Version: 1,
    Key: "202438",
    Type: "City",
    Rank: 15,
    LocalizedName: "Ahmedabad",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "GJ",
      LocalizedName: "Gujarat",
    },
  },
  {
    Version: 1,
    Key: "210047",
    Type: "City",
    Rank: 31,
    LocalizedName: "Ahvaz",
    Country: {
      ID: "IR",
      LocalizedName: "Iran",
    },
    AdministrativeArea: {
      ID: "10",
      LocalizedName: "Khuzestan",
    },
  },
  {
    Version: 1,
    Key: "189314",
    Type: "City",
    Rank: 35,
    LocalizedName: "Ahmadnagar",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "MH",
      LocalizedName: "Maharashtra",
    },
  },
  {
    Version: 1,
    Key: "235510",
    Type: "City",
    Rank: 35,
    LocalizedName: "Ahome",
    Country: {
      ID: "MX",
      LocalizedName: "Mexico",
    },
    AdministrativeArea: {
      ID: "SIN",
      LocalizedName: "Sinaloa",
    },
  },
  {
    Version: 1,
    Key: "3379391",
    Type: "City",
    Rank: 45,
    LocalizedName: "Ahuntsic",
    Country: {
      ID: "CA",
      LocalizedName: "Canada",
    },
    AdministrativeArea: {
      ID: "QC",
      LocalizedName: "Quebec",
    },
  },
  {
    Version: 1,
    Key: "3554467",
    Type: "City",
    Rank: 45,
    LocalizedName: "Ahuntsic-Cartierville",
    Country: {
      ID: "CA",
      LocalizedName: "Canada",
    },
    AdministrativeArea: {
      ID: "QC",
      LocalizedName: "Quebec",
    },
  },
  {
    Version: 1,
    Key: "207163",
    Type: "City",
    Rank: 45,
    LocalizedName: "Ahar",
    Country: {
      ID: "IR",
      LocalizedName: "Iran",
    },
    AdministrativeArea: {
      ID: "01",
      LocalizedName: "East Azarbaijan",
    },
  },
  {
    Version: 1,
    Key: "225833",
    Type: "City",
    Rank: 45,
    LocalizedName: "Ahyeon-dong",
    Country: {
      ID: "KR",
      LocalizedName: "South Korea",
    },
    AdministrativeArea: {
      ID: "11",
      LocalizedName: "Seoul",
    },
  },
  {
    Version: 1,
    Key: "259613",
    Type: "City",
    Rank: 45,
    LocalizedName: "Ahmadpur East",
    Country: {
      ID: "PK",
      LocalizedName: "Pakistan",
    },
    AdministrativeArea: {
      ID: "PB",
      LocalizedName: "Punjab",
    },
  },
  {
    Version: 1,
    Key: "126865",
    Type: "City",
    Rank: 51,
    LocalizedName: "Ahuachapan",
    Country: {
      ID: "SV",
      LocalizedName: "El Salvador",
    },
    AdministrativeArea: {
      ID: "AH",
      LocalizedName: "Ahuachapán",
    },
  },
];
