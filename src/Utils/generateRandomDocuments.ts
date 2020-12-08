import { BeerDocument } from "src/Schemas";
import { ObjectID } from 'mongodb';
import { Container } from "src/Interfaces";

export const generateRandomBeerDocument = () => {
    return{
      _id: JSON.stringify(Math.random()),
      name: JSON.stringify(Math.random()),
      brewery: new ObjectID(),
      style: new ObjectID(),
      container: Container.bottle,
      quantity: 0,
      historicQuantity: 0
    } as BeerDocument;
}