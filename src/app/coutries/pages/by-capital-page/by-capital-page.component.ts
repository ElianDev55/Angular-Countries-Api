import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/countries.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public value:string = '';

  constructor(
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.coutries = this.countriesService.cacheStore.byCapital.countries;
    this.value = this.countriesService.cacheStore.byCapital.term;
  }

  public placeholder: string = 'Search by Capital';
  public coutries: Country[] = [];
  public isLoading: boolean = false;

  public searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.sarchByCapital(term).subscribe(countries => {
    this.coutries = countries;
    this.isLoading = false;
    });
  }

}
