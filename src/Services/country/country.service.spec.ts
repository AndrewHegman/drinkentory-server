import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { Country as CountrySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryService, {
          provide: getModelToken(CountrySchema.name),
          useValue: new CountrySchema
        }],
    }).compile();

    service = module.get<CountryService>(CountryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
