import { Brewery, Beer, Style, Country, State, City } from "src/Schemas";

export type SortDir = "asc" | "desc";

export type BeerSortCol = keyof Beer;
export type BrewerySortCol = keyof Brewery;
export type StyleSortCol = keyof Style;
export type CountrySortCol = keyof Country;
export type StateSortCol = keyof State;
export type CitySortCol = keyof City;
