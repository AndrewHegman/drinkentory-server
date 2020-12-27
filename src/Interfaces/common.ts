import { Brewery, Beer, Style, Country, State, Place } from "src/Schemas";

export type SortDir = "asc" | "desc";

export type _SortCol<DocType> = keyof DocType;

export type BeerSortCol = keyof Beer;
export const beerExpandFields = ["brewery", "style"];

export type BrewerySortCol = keyof Brewery;
export const breweryExpandFields = ["country", "state", "city"];

export type StyleSortCol = keyof Style;
export const styleExpandFields = ["baseStyle"];

export type CountrySortCol = keyof Country;
export const countryExpandFields = [];

export type StateSortCol = keyof State;
export const stateExpandFields = ["country"];

export type PlaceSortCol = keyof Omit<Place, "country" | "state">;
