import React from "react";

// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

import LockClosedIcon from "@heroicons/react/outline/LockClosedIcon";
import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon";

import { City } from "../../types";

import { useFavouriteStore } from "../../providers/RootStoreProvider";
import { makePrePadding } from "../../utils";

type Props = {
  city: City;
};

const Weather = observer(({ city }: Props) => {
  const { conditions } = useFavouriteStore();

  const weather = conditions.get(city.Key);

  const date = new Date(weather?.LocalObservationDateTime || "");

  const time = `${makePrePadding(date.getHours() % 12)}:${makePrePadding(
    date.getMinutes()
  )} ${date.getHours() < 12 ? "PM" : "AM"}`;

  return (
    <div className="w-full flex flex-col items-center select-none border-2 rounded-md px-4 py-2">
      <div className="w-full bg-white text-black">
        <div className="flex justify-between items-center text-xs">
          <h1 className="uppercase font-bold">Current Weather</h1>
          <p className="font-bold text-gray-500">{time}</p>
        </div>

        <div className="flex flex-col items-center justify-center text-black tracking-normal">
          <div className="w-1/2">
            <div className="flex justify-center items-center">
              <img
                className="h-14 w-14 fill-white pointer-events-none"
                src={`https://www.accuweather.com/images/weathericons/${makePrePadding(
                  weather?.WeatherIcon
                )}.svg`}
              />
              <div className="text-5xl font-bold tracking-tighter">
                <div className="display-temp">
                  {Math.floor(weather?.Temperature.Metric.Value || 0)}°
                  <span className="text-sm text-gray-500 -mx-3">C</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center tracking-wide mb-3">
              {weather?.WeatherText}
            </div>
          </div>
          <div className="text-center w-full text-sm font-medium mb-3">
            <div>
              RealFeel® {weather?.RealFeelTemperature.Metric.Value}°
              <div className="label-tooltip" data-js="prevent-accordion-toggle">
                <div className="label clickable ">
                  {weather?.RealFeelTemperature.Metric.Phrase}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="current-weather-details">
          <div className="left">
            <div className="weather-line-item">
              <div>Max UV Index</div>
              <div>
                {weather?.UVIndex} {weather?.UVIndexText}
              </div>
            </div>
            <div className="weather-line-item">
              <div>Wind</div>
              <div>
                {weather?.Wind.Direction.English}{" "}
                {weather?.Wind.Speed.Metric.Value}{" "}
                {weather?.Wind.Speed.Metric.Unit}
              </div>
            </div>
            <div className="weather-line-item">
              <div>Wind Gusts</div>
              <div>
                {weather?.WindGust.Speed.Metric.Value}{" "}
                {weather?.WindGust.Speed.Metric.Unit}
              </div>
            </div>
            <div className="weather-line-item">
              <div>Humidity</div>
              <div>{weather?.RelativeHumidity}%</div>
            </div>
            <div className="weather-line-item">
              <div>Indoor Humidity</div>
              <div>{weather?.IndoorRelativeHumidity}%</div>
            </div>
            <div className="weather-line-item">
              <div>Dew Point</div>
              <div>
                {weather?.DewPoint.Metric.Value}°{" "}
                {weather?.DewPoint.Metric.Unit}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="weather-line-item">
              <div>Pressure</div>
              <div>
              ↔ {weather?.Pressure.Metric.Value}{" "}
                {weather?.Pressure.Metric.Unit}
              </div>
            </div>
            <div className="weather-line-item">
              <div>Cloud Cover</div>
              <div>{weather?.CloudCover}%</div>
            </div>
            <div className="weather-line-item">
              <div>Visibility</div>
              <div>
                {weather?.Visibility.Metric.Value}{" "}
                {weather?.Visibility.Metric.Unit}
              </div>
            </div>
            <div className="weather-line-item">
              <div>Cloud Ceiling</div>
              <div>
                {weather?.Ceiling.Metric.Value} {weather?.Ceiling.Metric.Unit}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Weather;
