import { Test, TestingModule } from '@nestjs/testing';
import { BeerService } from './beer.service';
import { Beer as BeerModel, Brewery as BrewerySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";
import { Types } from 'mongoose';

describe('BeerService', () => {
  let service: BeerService;
  const beerModel = {
    find: jest.fn().mockReturnThis(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeerService, {
        provide: getModelToken(BeerModel.name),
        useValue: beerModel
      },
      {
        provide: getModelToken(BrewerySchema.name),
        useValue: new BrewerySchema
      }],
    }).compile();

    service = module.get<BeerService>(BeerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    describe('when current is specified', () => {
      beforeEach(() => {
        service.find({}, true);
      });

      it('should only return items whose "current" value is >= to 1', () => {
        expect(beerModel.find).toHaveBeenCalledWith({ quantity: { $gte: 1 } });
      });
    });

    describe('when current is not specified', () => {
      beforeEach(() => {
        service.find({}, false);
      });

      it('should return all items regardless of "current"', () => {
        expect(beerModel.find).toHaveBeenCalledWith({ quantity: { $gte: 0 } });
      });
    });
  })
});
