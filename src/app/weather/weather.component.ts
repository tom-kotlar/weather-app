import { Component } from '@angular/core'
import { WeatherService } from './weather.service'

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  constructor(private weatherService: WeatherService) {
    this.weatherService.getWeather('London', 'UK').subscribe(console.log)
  }
}
