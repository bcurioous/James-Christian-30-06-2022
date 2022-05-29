import { makeAutoObservable, runInAction } from "mobx";

import { City, Condition } from "../types";
import { RootStore } from "./RootStore";

const API_KEY = "J6y2RtBwI2uTEMjFtg7MijnGBvSCzpc6";

export type FavouriteStoreHydration = {
  favourites: Map<string, City>;
  conditions: Map<string, Condition>;
};
export default class FavouriteStore {
  root: RootStore;
  favourites: Map<string, City> = new Map();
  conditions: Map<string, Condition> = new Map();

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  // addWeatherDetailsForLocation = async (city: City) => {
  //   runInAction(() => {
  //     this.conditions = new Map(
  //       Object.entries({ [city.Key]: responseJson[0] })
  //     );
  //   });
  // };

  addWeatherDetailsForLocation = async (city: City) => {
    const searchParams = new URLSearchParams({
      apikey: API_KEY,
      details: "true",
    });
    const response = await fetch(
      `/api/currentconditions/v1/${city.Key}?${searchParams}`
    );

    const responseJson = await response.json();

    runInAction(() => {
      const oldValues = Object.fromEntries(this.conditions.entries());

      this.conditions = new Map(
        Object.entries({ ...oldValues, [city.Key]: responseJson[0] })
      );
    });
  };

  toogleFavourite = (city: City) => {
    runInAction(() => {
      console.log("adding this.favourites");
      if (this.favourites.has(city.Key)) {
        this.favourites.delete(city.Key);
        const oldValues = Object.fromEntries(this.favourites.entries());
        this.favourites = new Map(Object.entries(oldValues));
      } else {
        const oldValues = Object.fromEntries(this.favourites.entries());
        this.favourites = new Map(
          Object.entries({ ...oldValues, [city.Key]: city })
        );
        if (!this.conditions.has(city.Key)) {
          this.addWeatherDetailsForLocation(city);
        }
      }
    });
  };

  hydrate(data?: FavouriteStoreHydration) {
    if (data) {
      console.log("hydrate favourites", data);
      this.favourites = data.favourites;
    }
  }
}

const responseJson = [
  {
    LocalObservationDateTime: "2022-05-29T20:03:00+05:30",
    EpochTime: 1653834780,
    WeatherText: "Clear",
    WeatherIcon: 33,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 36.6,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 98,
        Unit: "F",
        UnitType: 18,
      },
    },
    RealFeelTemperature: {
      Metric: {
        Value: 36.8,
        Unit: "C",
        UnitType: 17,
        Phrase: "Hot",
      },
      Imperial: {
        Value: 98,
        Unit: "F",
        UnitType: 18,
        Phrase: "Hot",
      },
    },
    RealFeelTemperatureShade: {
      Metric: {
        Value: 36.8,
        Unit: "C",
        UnitType: 17,
        Phrase: "Hot",
      },
      Imperial: {
        Value: 98,
        Unit: "F",
        UnitType: 18,
        Phrase: "Hot",
      },
    },
    RelativeHumidity: 39,
    IndoorRelativeHumidity: 39,
    DewPoint: {
      Metric: {
        Value: 20.8,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 69,
        Unit: "F",
        UnitType: 18,
      },
    },
    Wind: {
      Direction: {
        Degrees: 203,
        Localized: "SSW",
        English: "SSW",
      },
      Speed: {
        Metric: {
          Value: 19.6,
          Unit: "km/h",
          UnitType: 7,
        },
        Imperial: {
          Value: 12.2,
          Unit: "mi/h",
          UnitType: 9,
        },
      },
    },
    WindGust: {
      Speed: {
        Metric: {
          Value: 42.7,
          Unit: "km/h",
          UnitType: 7,
        },
        Imperial: {
          Value: 26.5,
          Unit: "mi/h",
          UnitType: 9,
        },
      },
    },
    UVIndex: 0,
    UVIndexText: "Low",
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
    CloudCover: 1,
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
        Value: 1001,
        Unit: "mb",
        UnitType: 14,
      },
      Imperial: {
        Value: 29.56,
        Unit: "inHg",
        UnitType: 12,
      },
    },
    PressureTendency: {
      LocalizedText: "Rising",
      Code: "R",
    },
    Past24HourTemperatureDeparture: {
      Metric: {
        Value: 0.7,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 1,
        Unit: "F",
        UnitType: 18,
      },
    },
    ApparentTemperature: {
      Metric: {
        Value: 41.1,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 106,
        Unit: "F",
        UnitType: 18,
      },
    },
    WindChillTemperature: {
      Metric: {
        Value: 36.7,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 98,
        Unit: "F",
        UnitType: 18,
      },
    },
    WetBulbTemperature: {
      Metric: {
        Value: 25,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 77,
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
            Value: 36.6,
            Unit: "C",
            UnitType: 17,
          },
          Imperial: {
            Value: 98,
            Unit: "F",
            UnitType: 18,
          },
        },
        Maximum: {
          Metric: {
            Value: 42.6,
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
      Past12HourRange: {
        Minimum: {
          Metric: {
            Value: 33.2,
            Unit: "C",
            UnitType: 17,
          },
          Imperial: {
            Value: 92,
            Unit: "F",
            UnitType: 18,
          },
        },
        Maximum: {
          Metric: {
            Value: 42.6,
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
      Past24HourRange: {
        Minimum: {
          Metric: {
            Value: 29.6,
            Unit: "C",
            UnitType: 17,
          },
          Imperial: {
            Value: 85,
            Unit: "F",
            UnitType: 18,
          },
        },
        Maximum: {
          Metric: {
            Value: 42.6,
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
  },
];
