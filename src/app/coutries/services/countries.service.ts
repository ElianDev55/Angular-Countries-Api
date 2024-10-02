import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, count, delay, map, Observable, of, retry, tap } from 'rxjs';
import { Country } from '../interface/countries.interface';
import { CacheStore } from '../interface/cache-store.interface';
import { Region } from '../interface/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private url: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byRegion: {
      term: '',
      countries: []
    },
    byCountry: {
      term: '',
      countries: []
    },
  }


  constructor(private httpClient: HttpClient) {}


  private getHttpReques(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(err => of([])),
      delay(300),
    );
  }


  public sarchByCapital(capital: string): Observable<Country[]> {
    return this.getHttpReques(`${this.url}/capital/${capital}`)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term: capital, countries}),
    );
  }

  public searchByCountryName(name: string): Observable<Country[]> {
    return this.getHttpReques(`${this.url}/name/${name}`)
    .pipe(
      tap(countries => this.cacheStore.byCountry = {term: name, countries}),
    );
  }

  public searchByRegion(region: Region): Observable<Country[]> {
    return this.getHttpReques(`${this.url}/region/${region}`)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {term: region, countries}),
    );
  }

  public  searchByAlphaCode(id: string): Observable<Country | null > {
    return this.httpClient.get<Country[]>(`${this.url}/alpha/${id}`).pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(err => of(null))

    );
  }


}
