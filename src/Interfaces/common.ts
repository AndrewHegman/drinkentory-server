import { Brewery, Beer, Style, Country, State } from "src/Schemas";

export type SortDir = "asc" | "desc";

export type BeerSortCol = keyof Beer;
export type BrewerySortCol = keyof Brewery;
export type StyleSortCol = keyof Style;
export type StateSortCol = keyof State;
export type CountrySortCol = keyof Country;
