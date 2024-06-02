import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, first, map, Observable, switchMap, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { PostCodeService } from './post-code.service'
import { defaultPostalCode, WeatherCard } from '../models/weather'

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

export interface ICurrentWeather {
  city: string
  country: string
  date: number
  image: string
  temperature: number | any
  description: string
}



export interface IWeatherService {
  readonly currentWeather$: BehaviorSubject<WeatherCard>
  getCurrentWeather(search: string, country?: string): Observable<WeatherCard>
  getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<WeatherCard>
  updateCurrentWeather(search: string, country?: string): void
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  // postalCodeService: any
  // currentWeather$: any

  readonly currentWeather$ = new BehaviorSubject<WeatherCard>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  })

  constructor(
    private httpClient: HttpClient,
    private postalCodeService: PostCodeService
  ) {}

  // getWeather(city: string, country: string): Observable<WeatherCard> {
  //   const params = new HttpParams()
  //     .set('q', `${city},${country}`)
  //     .set('appid', environment.appId)

  //   return this.httpClient
  //     .get<OpenWeather>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, {
  //       params: params,
  //     })
  //     .pipe(
  //       tap(console.log),
  //       map((data) => this.transformToICurrentWeather(data))
  //     )
  // }

  // private transformToICurrentWeather(data: OpenWeather) {
  //   return {
  //     city: data.name,
  //     country: data.sys.country,
  //     date: data.dt * 1000,
  //     image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
  //     temperature: this.convertKelvinToCelsius(data.main.temp),
  //     description: data.weather[0].description,
  //   }
  // }

  getCurrentWeather(searchText: string, country?: string): Observable<WeatherCard> {
    console.log(searchText, country)
    return this.postalCodeService.resolvePostalCode(searchText).pipe(
      switchMap((postalCode) => {
        if (postalCode && postalCode !== defaultPostalCode) {
          return this.getCurrentWeatherByCoords({
            latitude: postalCode.lat,
            longitude: postalCode.lng,
          } as GeolocationCoordinates)
        } else {
          const uriParams = new HttpParams().set(
            'q',
            country ? `${searchText},${country}` : searchText
          )
          return this.getCurrentWeatherHelper(uriParams)
        }
      })
    )
  }

  getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<WeatherCard> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString())

    return this.getCurrentWeatherHelper(uriParams)
  }

  updateCurrentWeather(search: string, country?: string): void {
    this.getCurrentWeather(search, country)
      .pipe(first())
      .subscribe((weather) => this.currentWeather$.next(weather))
  }

  private getCurrentWeatherHelper(uriParams: HttpParams): Observable<WeatherCard> {
    uriParams = uriParams.set('appid', environment.appId)
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => this.transformToICurrentWeather(data)))
  }

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToCelsius(data.main.temp),
      description: data.weather[0].description,
    }
  }
 

  private convertKelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15
  }
}
