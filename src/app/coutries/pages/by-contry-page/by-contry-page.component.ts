import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/countries.interface';

@Component({
  selector: 'app-by-contry-page',
  templateUrl: './by-contry-page.component.html',
  styleUrl: './by-contry-page.component.css'
})
export class ByContryPageComponent implements OnInit {

  constructor(
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.coutries = this.countriesService.cacheStore.byCountry.countries;
    this.value = this.countriesService.cacheStore.byCountry.term;
  }


  public placeholder: string = 'Search by Country';
  public coutries: Country[] = [];
  public value: string = '';
  public isLoading: boolean = false;

  public searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchByCountryName(term).subscribe(countries => {
      this.coutries = countries;
      this.isLoading = false;
    });
  }

}
