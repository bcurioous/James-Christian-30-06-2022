export type City = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
};

export interface Condition {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: any;
  IsDayTime: boolean;
  Temperature: Unit;
  RealFeelTemperature: Unit;
  RealFeelTemperatureShade: Unit;
  RelativeHumidity: number;
  IndoorRelativeHumidity: number;
  DewPoint: Unit;
  Wind: Wind;
  WindGust: WindGust;
  UVIndex: number;
  UVIndexText: string;
  Visibility: Unit;
  ObstructionsToVisibility: string;
  CloudCover: number;
  Ceiling: Unit;
  Pressure: Unit;
  PressureTendency: PressureTendency;
  Past24HourTemperatureDeparture: Unit;
  ApparentTemperature: Unit;
  WindChillTemperature: Unit;
  WetBulbTemperature: Unit;
  Precip1hr: Unit;
  PrecipitationSummary: PrecipitationSummary;
  TemperatureSummary: TemperatureSummary;
  MobileLink: string;
  Link: string;
}
export interface Unit {
  Metric: Metric;
  Imperial: Imperial;
}

export interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase?: string;
}

export interface Imperial {
  Value: number;
  Unit: string;
  UnitType: number;
  Phrase?: string;
}

export interface Wind {
  Direction: Direction;
  Speed: Unit;
}

export interface Direction {
  Degrees: number;
  Localized: string;
  English: string;
}

export interface WindGust {
  Speed: Unit;
}
export interface PressureTendency {
  LocalizedText: string;
  Code: string;
}

export interface PrecipitationSummary {
  Precipitation: Unit;
  PastHour: Unit;
  Past3Hours: Unit;
  Past6Hours: Unit;
  Past9Hours: Unit;
  Past12Hours: Unit;
  Past18Hours: Unit;
  Past24Hours: Unit;
}

export interface TemperatureSummary {
  Past6HourRange: PastHourRange;
  Past12HourRange: PastHourRange;
  Past24HourRange: PastHourRange;
}

export interface PastHourRange {
  Minimum: Unit;
  Maximum: Unit;
}
