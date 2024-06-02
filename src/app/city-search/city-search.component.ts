import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { WeatherService } from '../services/weather.service';

import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent {

  search = new FormControl('', [Validators.required, Validators.minLength(2)])

  constructor (private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        filter(() => this.search.valid),
        debounceTime(1000),
        tap((searchValue) => this.doSearch(searchValue)),
        takeUntilDestroyed()
      )
      .subscribe()
  }

  doSearch(searchValue: string | null) {
    if (searchValue === null) return
    const userInput = searchValue.split(',').map((s) => s.trim())
    const searchText = userInput[0]
    const country = userInput.length > 1 ? userInput[1] : undefined
    this.weatherService.updateCurrentWeather(searchText, country)
  }

  // ngOnInit(): void {
  //  this.search.valueChanges.subscribe(data => console.log(data))
  // }
}

