import React from "react";

import { observer } from "mobx-react-lite";

// import SunIcon from "@heroicons/react/outline/SunIcon";
// import CloudIcon from "@heroicons/react/outline/CloudIcon";
// import LocationMarkerIcon from "@heroicons/react/outline/LocationMarkerIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";
import Weather from "../Weather";
import {
  useFavouriteStore,
  useWeatherStore,
} from "../../providers/RootStoreProvider";

type Props = {
  listFavourites?: boolean;
};

const SearcResults = observer(({ listFavourites }: Props) => {
  const { searchResults: cities } = useWeatherStore();
  const { toogleFavourite, favourites } = useFavouriteStore();

  const onToggleFavourite = React.useCallback(
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }

      const key = e.target.dataset.key;
      const city = cities?.find((city) => city.Key === key);
      if (city) {
        toogleFavourite(city);
      }
    },
    [cities]
  );

  let _cities = cities;
  if (listFavourites) {
    _cities = Array.from(favourites.values());
  }

  return (
    <div className="flex flex-col items-center select-none">
      {cities &&
        _cities.map((city) => (
          <div
            key={city.Key}
            className="flex w-full items-center justify-between max-w-md lg:max-w-lg bg-white text-gray-600 border-1 border-black rounded-xl overflow-hidden px-3 my-3"
          >
            <div className="w-full p-4">
              <div className="w-2/3 h-1/2 p-1">
                <p>{city.LocalizedName}</p>
              </div>

              <div className="flex item-center justify-between mt-3">
                <h1 className="font-light text-base">
                  {city.AdministrativeArea.LocalizedName},
                  {city.Country.LocalizedName}
                </h1>
                <button
                  type="button"
                  className="bg-purple-300 p-1 rounded-full text-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-900 focus:ring-purple-300"
                  onClick={onToggleFavourite}
                  data-key={city.Key}
                >
                  <HeartIcon
                    className={`h-6 w-6 fill-white pointer-events-none ${
                      favourites.has(city.Key) ? "fill-purple-800" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {listFavourites && <Weather city={city} />}
            </div>
          </div>
        ))}
    </div>
  );
});

export default SearcResults;
