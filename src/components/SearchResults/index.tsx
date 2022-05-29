import React from "react";

import { observer } from "mobx-react-lite";

import SunIcon from "@heroicons/react/outline/SunIcon";
// import CloudIcon from "@heroicons/react/outline/CloudIcon";
import LocationMarkerIcon from "@heroicons/react/outline/LocationMarkerIcon";
import HeartIcon from "@heroicons/react/outline/HeartIcon";
import {
  useFavouriteStore,
  useWeatherStore,
} from "../../providers/RootStoreProvider";

type Props = {
  listFavourites?: boolean;
};

const SearcResults = observer(({ listFavourites }: Props) => {
  const { searchResults: cities } = useWeatherStore();
  const { toogleFavourite, favourites, conditions } = useFavouriteStore();

  const onToggleFavourite = React.useCallback(
    // (e: React.MouseEvent<HTMLButtonElement>) => {
    (e: React.SyntheticEvent<HTMLButtonElement>) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }

      const key = e.target.dataset.key;
      const city = cities?.find((city) => city.Key === key);
      console.log("city :>> ", city);
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
            className="flex w-full items-center justify-between max-w-md lg:max-w-lg bg-gray-700 border-4 border-opacity-30 border-gray-600 rounded-2xl overflow-hidden px-3 my-3"
          >
            {/* <div className="w-1/5 bg-cover bg-landscape flex justify-center">
              <LocationMarkerIcon
                className="h-1/2 w-1/2 fill-indigo-400 text-gray-200"
                aria-hidden="true"
              />
            </div> */}
            <div className="w-full p-4">
              <div className="w-2/3 h-1/2 p-1 text-gray-200 font-thin">
                <p>{city.LocalizedName}</p>
                {/* {WEATHER.WeatherIcon === 2 && (
                  <SunIcon
                    className="h-6 w-6 fill-white pointer-events-none"
                    aria-hidden="true"
                  />
                )} */}
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${String(
                    WEATHER.WeatherIcon
                  ).padStart(2, "0")}-s.png`}
                  alt={WEATHER.WeatherText}
                />
                {WEATHER.WeatherText}
              </div>

              <div className="flex item-center justify-between mt-3">
                <h1 className="text-gray-300 font-light text-base">
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

              {listFavourites && <div>list condtions</div>}
            </div>
          </div>
        ))}
    </div>
  );
});

export default SearcResults;

const WEATHER = {
  LocalObservationDateTime: "2022-05-27T11:22:00+05:30",
  EpochTime: 1653630720,
  WeatherText: "Mostly sunny",
  WeatherIcon: 2,
  HasPrecipitation: false,
  PrecipitationType: null,
  IsDayTime: true,
  Temperature: {
    Metric: {
      Value: 36.3,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 97,
      Unit: "F",
      UnitType: 18,
    },
  },
  RealFeelTemperature: {
    Metric: {
      Value: 39.9,
      Unit: "C",
      UnitType: 17,
      Phrase: "Quite Hot",
    },
    Imperial: {
      Value: 104,
      Unit: "F",
      UnitType: 18,
      Phrase: "Quite Hot",
    },
  },
  RealFeelTemperatureShade: {
    Metric: {
      Value: 36.1,
      Unit: "C",
      UnitType: 17,
      Phrase: "Hot",
    },
    Imperial: {
      Value: 97,
      Unit: "F",
      UnitType: 18,
      Phrase: "Hot",
    },
  },
  RelativeHumidity: 39,
  IndoorRelativeHumidity: 39,
  DewPoint: {
    Metric: {
      Value: 20.2,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 68,
      Unit: "F",
      UnitType: 18,
    },
  },
  Wind: {
    Direction: {
      Degrees: 225,
      Localized: "SW",
      English: "SW",
    },
    Speed: {
      Metric: {
        Value: 20.1,
        Unit: "km/h",
        UnitType: 7,
      },
      Imperial: {
        Value: 12.5,
        Unit: "mi/h",
        UnitType: 9,
      },
    },
  },
  WindGust: {
    Speed: {
      Metric: {
        Value: 41.2,
        Unit: "km/h",
        UnitType: 7,
      },
      Imperial: {
        Value: 25.6,
        Unit: "mi/h",
        UnitType: 9,
      },
    },
  },
  UVIndex: 11,
  UVIndexText: "Extreme",
  Visibility: {
    Metric: {
      Value: 16.1,
      Unit: "km",
      UnitType: 6,
    },
    Imperial: {
      Value: 10,
      Unit: "mi",
      UnitType: 2,
    },
  },
  ObstructionsToVisibility: "",
  CloudCover: 16,
  Ceiling: {
    Metric: {
      Value: 9144,
      Unit: "m",
      UnitType: 5,
    },
    Imperial: {
      Value: 30000,
      Unit: "ft",
      UnitType: 0,
    },
  },
  Pressure: {
    Metric: {
      Value: 1006,
      Unit: "mb",
      UnitType: 14,
    },
    Imperial: {
      Value: 29.71,
      Unit: "inHg",
      UnitType: 12,
    },
  },
  PressureTendency: {
    LocalizedText: "Steady",
    Code: "S",
  },
  Past24HourTemperatureDeparture: {
    Metric: {
      Value: 1.3,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 2,
      Unit: "F",
      UnitType: 18,
    },
  },
  ApparentTemperature: {
    Metric: {
      Value: 40,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 104,
      Unit: "F",
      UnitType: 18,
    },
  },
  WindChillTemperature: {
    Metric: {
      Value: 36.1,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 97,
      Unit: "F",
      UnitType: 18,
    },
  },
  WetBulbTemperature: {
    Metric: {
      Value: 24.6,
      Unit: "C",
      UnitType: 17,
    },
    Imperial: {
      Value: 76,
      Unit: "F",
      UnitType: 18,
    },
  },
  Precip1hr: {
    Metric: {
      Value: 0,
      Unit: "mm",
      UnitType: 3,
    },
    Imperial: {
      Value: 0,
      Unit: "in",
      UnitType: 1,
    },
  },
  PrecipitationSummary: {
    Precipitation: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    PastHour: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    Past3Hours: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    Past6Hours: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    Past9Hours: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    Past12Hours: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    Past18Hours: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
    Past24Hours: {
      Metric: {
        Value: 0,
        Unit: "mm",
        UnitType: 3,
      },
      Imperial: {
        Value: 0,
        Unit: "in",
        UnitType: 1,
      },
    },
  },
  TemperatureSummary: {
    Past6HourRange: {
      Minimum: {
        Metric: {
          Value: 28.4,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 83,
          Unit: "F",
          UnitType: 18,
        },
      },
      Maximum: {
        Metric: {
          Value: 36.3,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 97,
          Unit: "F",
          UnitType: 18,
        },
      },
    },
    Past12HourRange: {
      Minimum: {
        Metric: {
          Value: 28.4,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 83,
          Unit: "F",
          UnitType: 18,
        },
      },
      Maximum: {
        Metric: {
          Value: 36.3,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 97,
          Unit: "F",
          UnitType: 18,
        },
      },
    },
    Past24HourRange: {
      Minimum: {
        Metric: {
          Value: 28.4,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 83,
          Unit: "F",
          UnitType: 18,
        },
      },
      Maximum: {
        Metric: {
          Value: 42.7,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 109,
          Unit: "F",
          UnitType: 18,
        },
      },
    },
  },
  MobileLink:
    "http://www.accuweather.com/en/in/ahmedabad/202438/current-weather/202438?lang=en-us",
  Link: "http://www.accuweather.com/en/in/ahmedabad/202438/current-weather/202438?lang=en-us",
};

const WEATHER_MINI = [
  {
    LocalObservationDateTime: "2022-05-29T18:03:00+05:30",
    EpochTime: 1653827580,
    WeatherText: "Sunny",
    WeatherIcon: 1,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 40.4,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 105,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink:
      "http://www.accuweather.com/en/in/ahmedabad/202438/current-weather/202438?lang=en-us",
    Link: "http://www.accuweather.com/en/in/ahmedabad/202438/current-weather/202438?lang=en-us",
  },
];
