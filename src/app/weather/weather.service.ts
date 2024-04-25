import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { OpenWeather, WeatherCard } from './weather'

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  getWeather(city: string, country: string): Observable<WeatherCard> {
    const params = new HttpParams()
      .set('q', `${city},${country}`)
      .set('appid', environment.appId)

    return this.httpClient
      .get<OpenWeather>(`${environment.baseUrl}api.openweathermap.org/data/2.5/weather`, {
        params: params,
      })
      .pipe(
        tap(console.log),
        map((data) => this.transformToICurrentWeather(data))
      )
  }

  private transformToICurrentWeather(data: OpenWeather) {
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
    return Math.round(kelvin - 273.15)
  }
}
