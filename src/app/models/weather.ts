export interface OpenWeather {
    coord: Coord
    weather: Weather[]
    base: string
    main: Main
    visibility: number
    wind: Wind
    clouds: Clouds
    dt: number
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
  }
  
  export interface Coord {
    lon: number
    lat: number
  }
  
  export interface Weather {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  
  export interface Wind {
    speed: number
    deg: number
  }
  
  export interface Clouds {
    all: number
  }
  
  export interface Sys {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  
  export interface WeatherCard {
    city: string
    country: string
    date: number
    image: string
    temperature: number
    description: string
  }


  export const fakeWeather = {
    city: 'London',
    country: 'GB',
    date: 1714077455000,
    image: 'http://openweathermap.org/img/w/04n.png',
    temperature: 7,
    description: 'overcast clouds',
  }
  


export interface IPostalCode {
    countryCode: string
    postalCode: string
    placeName: string
    lng: number
    lat: number
  }
  
  export const defaultPostalCode: IPostalCode = {
    countryCode: '--',
    postalCode: '--',
    placeName: '--',
    lng: 0,
    lat: 0,
  }
  
  export interface IPostalCodeData {
    postalCodes: [IPostalCode]
  }

  export interface ICurrentWeatherData {
    // exported to support unit testing
    weather: [
      {
        description: string
        icon: string
      },
    ]
    main: {
      temp: number
    }
    sys: {
      country: string
    }
    dt: number
    name: string
  }
