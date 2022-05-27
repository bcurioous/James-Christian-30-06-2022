import { makeAutoObservable, runInAction } from "mobx";

import { City } from "../types";
import { RootStore } from "./RootStore";

const API_KEY = "J6y2RtBwI2uTEMjFtg7MijnGBvSCzpc6";

export type FavouriteStoreHydration = {
  favourites: Map<string, City>;
};
export default class FavouriteStore {
  root: RootStore;
  favourites: Map<string, City> = new Map();

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  toogleFavourite = (city: City) => {
    runInAction(() => {
      console.log(" adding this.favourites");
      if (this.favourites.has(city.Key)) {
        this.favourites.delete(city.Key);
        const oldValues = Object.fromEntries(this.favourites.entries());
        this.favourites = new Map(Object.entries(oldValues));
      } else {
        const oldValues = Object.fromEntries(this.favourites.entries());

        this.favourites = new Map(
          Object.entries({ ...oldValues, [city.Key]: city })
        );
      }
    });
  };

  hydrate(data?: FavouriteStoreHydration) {
    if (data) {
      console.log('hydrate favourites', data);
      this.favourites = data.favourites;
    }
  }
}

const DEFAULT_SELECTED = {
  "202438": {
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
  "126865": {
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
};
