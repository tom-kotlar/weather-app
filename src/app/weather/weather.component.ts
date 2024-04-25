import { Component } from '@angular/core'
import { WeatherService } from './weather.service'
import { CardModule } from 'primeng/card'
import { fakeWeather, WeatherCard } from './weather'
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common'

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, CardModule, DecimalPipe, DatePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  weather!: WeatherCard

  constructor(private weatherService: WeatherService) {
    //  this.weatherService.getWeather('London', 'UK').subscribe(data => this.weather = data)

     this.weather = fakeWeather
  }
}
