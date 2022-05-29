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
    <div className="flex flex-col items-center select-none border-2 p-2">
      <div className="current-weather-card card-module content-module non-ad">
        <div className="flex justify-between items-center text-xs">
          <h1 className="uppercase font-bold">Current Weather</h1>
          <p className="font-bold text-gray-500">{time}</p>
        </div>

        <div className="flex flex-col items-center justify-center text-black tracking-normal">
          <div className="w-1/2">
            <div className="flex justify-center items-center">
              <img className="h-14 w-14 fill-white pointer-events-none" src={`https://www.accuweather.com/images/weathericons/${makePrePadding(weather?.WeatherIcon)}.svg`} />
              <div className="text-5xl font-bold tracking-tighter">
                <div className="display-temp">
                  {weather?.WeatherIcon}°<span className="text-sm text-gray-500 -mx-3">C</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center tracking-wide">{weather?.WeatherText}</div>
          </div>
          <div className="current-weather-extra">
            <div>
              RealFeel® ${weather?.RealFeelTemperature.Metric.Value}°
              <div className="label-tooltip" data-js="prevent-accordion-toggle">
                <div className="label clickable ">
                  Quite {weather?.RealFeelTemperature.Metric.Phrase}
                </div>
                <div className="label-tooltip-overlay ">
                  <div className="label-tooltip-header spaced-content">
                    <span>RealFeel Guide</span>
                    <LockClosedIcon
                      className={`h-6 w-6 fill-white pointer-events-none`}
                    />
                  </div>
                  <div className="label-tooltip-content">
                    <div className="label-tooltip-content__subtitle spaced-content">
                      <div>Quite Hot</div>
                      <div className="label-tooltip-content__reference">
                        38° to 41°
                      </div>
                    </div>
                    <div className="label-tooltip-content__content">
                      Caution advised. Danger of dehydration, heat stroke, heat
                      exhaustion and heat cramps if outside for extended
                      periods, and especially while doing strenuous activities.
                    </div>
                  </div>
                  <a className="label-tooltip-cta" href="/en/realfeel-guide">
                    LEARN MORE{" "}
                    <ArrowLeftIcon
                      className={`h-6 w-6 fill-white pointer-events-none`}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="realfeel-shade-details">
              RealFeel Shade™ {weather?.RealFeelTemperatureShade.Metric.Value}°
              <div className="label-tooltip" data-js="prevent-accordion-toggle">
                <div className="label clickable ">
                  Quite {weather?.RealFeelTemperatureShade.Metric.Phrase}
                </div>
                <div className="label-tooltip-overlay ">
                  <div className="label-tooltip-header spaced-content">
                    <span>RealFeel Guide</span>
                    <LockClosedIcon
                      className={`h-6 w-6 fill-white pointer-events-none`}
                    />
                  </div>
                  <div className="label-tooltip-content">
                    <div className="label-tooltip-content__subtitle spaced-content">
                      <div>Quite Hot</div>
                      <div className="label-tooltip-content__reference">
                        38° to 41°
                      </div>
                    </div>
                    <div className="label-tooltip-content__content">
                      Caution advised. Danger of dehydration, heat stroke, heat
                      exhaustion and heat cramps if outside for extended
                      periods, and especially while doing strenuous activities.
                    </div>
                  </div>
                  <a className="label-tooltip-cta" href="/en/realfeel-guide">
                    LEARN MORE{" "}
                    <ArrowLeftIcon
                      className={`h-6 w-6 fill-white pointer-events-none`}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="current-weather-details">
          <div className="left">
            <div className="detail-item spaced-content">
              <div>Max UV Index</div>
              <div>
                {weather?.UVIndex} {weather?.UVIndexText}
              </div>
            </div>
            <div className="detail-item spaced-content">
              <div>Wind</div>
              <div>
                {weather?.Wind.Direction.English}{" "}
                {weather?.Wind.Speed.Metric.Value}{" "}
                {weather?.Wind.Speed.Metric.Unit}
              </div>
            </div>
            <div className="detail-item spaced-content">
              <div>Wind Gusts</div>
              <div>
                {weather?.WindGust.Speed.Metric.Value}{" "}
                {weather?.WindGust.Speed.Metric.Unit}
              </div>
            </div>
            <div className="detail-item spaced-content">
              <div>Humidity</div>
              <div>{weather?.RelativeHumidity}%</div>
            </div>
            <div className="detail-item spaced-content">
              <div>Indoor Humidity</div>
              <div>{weather?.IndoorRelativeHumidity}%</div>
            </div>
          </div>
          <div className="right">
            <div className="detail-item spaced-content">
              <div>Dew Point</div>
              <div>
                {weather?.DewPoint.Metric.Value}°{" "}
                {weather?.DewPoint.Metric.Unit}
              </div>
            </div>
            <div className="detail-item spaced-content">
              <div>Pressure</div>
              <div>
                ↓ {weather?.Pressure.Metric.Value}{" "}
                {weather?.Pressure.Metric.Unit}
              </div>
              <div className="detail-item spaced-content">
                <div>Cloud Cover</div>
                <div>{weather?.CloudCover}%</div>
              </div>
              <div className="detail-item spaced-content">
                <div>Visibility</div>
                <div>
                  {weather?.Visibility.Metric.Value}{" "}
                  {weather?.Visibility.Metric.Unit}
                </div>
              </div>
              <div className="detail-item spaced-content">
                <div>Cloud Ceiling</div>
                <div>
                  {weather?.Ceiling.Metric.Value} {weather?.Ceiling.Metric.Unit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Weather;
