import FavouriteStore, { FavouriteStoreHydration } from "./FavouritesStore";
import WeatherStore, { WeatherStoreHydration } from "./WeatherStore";

export type RootStoreHydration = {
  weatherStore?: WeatherStoreHydration;
  favouriteStore?: FavouriteStoreHydration;
};
export class RootStore {
  weatherStore: WeatherStore;
  favouriteStore: FavouriteStore;

  constructor() {
    this.weatherStore = new WeatherStore(this);
    this.favouriteStore = new FavouriteStore(this);
  }

  hydrate(data: RootStoreHydration) {
    console.log("hydrate :: root ", data);
    if (data.weatherStore) {
      console.log("hydrating weather store");
      this.weatherStore.hydrate(data.weatherStore);
    }
    if (data.favouriteStore) {
      console.log("hydrating favourite store");
      this.favouriteStore.hydrate(data.favouriteStore);
    }
  }
}
