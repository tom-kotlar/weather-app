import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap, defaultIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPostalCode, IPostalCodeData, defaultPostalCode } from '../models/weather';

export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode>
}

@Injectable({
  providedIn: 'root'
})

export class PostCodeService {
  constructor(private httpClient: HttpClient) {}

  resolvePostalCode(postalCode: string): Observable<IPostalCode> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.username)
      .set('postalcode', postalCode)

    return this.httpClient
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(defaultPostalCode)
      )
  }
}
