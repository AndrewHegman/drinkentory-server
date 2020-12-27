import { Brewery, Beer, Style, Place } from "src/Schemas";

export type SortDir = "asc" | "desc";

export type _SortCol<DocType> = keyof DocType;

export type BeerSortCol = keyof Beer;
export const beerExpandFields = ["brewery", "style"];

export type BrewerySortCol = keyof Brewery;
export const breweryExpandFields = ["place"];

export type StyleSortCol = keyof Style;
export const styleExpandFields = ["baseStyle"];

export type PlaceSortCol = keyof Omit<Place, "country" | "state">;
export const placeExpandFields = [];
