import { Country } from "./countries.interface";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: TermCountries;
  byRegion: TermRegion;
  byCountry: TermCountries;
}


export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface TermRegion{
  term: Region;
  countries: Country[];
}
