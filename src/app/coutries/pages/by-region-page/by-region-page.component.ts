import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interface/countries.interface';
import { Region } from '../../interface/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {

  constructor(
    private countriesService: CountriesService
  ) {}


  ngOnInit(): void {
    this.coutries = this.countriesService.cacheStore.byRegion.countries;
    this.activeRegion = this.countriesService.cacheStore.byRegion.term;
  }

  public placeholder: string = 'Search by Region';
  public coutries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public activeRegion?: Region;

  public searchByRegion(term: Region): void {
    this.activeRegion = term;
    this.countriesService.searchByRegion(term).subscribe(countries => {
      this.coutries = countries;
    });
  }

}
