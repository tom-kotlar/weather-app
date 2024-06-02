import { Component } from '@angular/core'
import { CardModule } from 'primeng/card'

import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'
import { CitySearchComponent } from '../city-search/city-search.component'
import { WeatherService } from '../services/weather.service'
import { Observable } from 'rxjs'
import { WeatherCard } from '../models/weather'


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, CardModule, DecimalPipe, DatePipe, CitySearchComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  weather!: WeatherCard
  current$!: Observable<WeatherCard>


  constructor(private weatherService: WeatherService) {
      // this.weatherService.getWeather('Manchester', 'UK').subscribe(data => this.weather = data)
      this.current$ = this.weatherService.currentWeather$
    //  this.weather = fakeWeather

    this.current$.subscribe(console.log)
  }
}
