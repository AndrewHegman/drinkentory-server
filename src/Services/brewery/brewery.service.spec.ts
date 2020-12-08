import { Test, TestingModule } from "@nestjs/testing";
import { BreweryService } from "./brewery.service";
import { Brewery as BrewerySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";

describe("BreweryService", () => {
  let service: BreweryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BreweryService, {
        provide: getModelToken(BrewerySchema.name),
        useValue: new BrewerySchema
      }],
    }).compile();

    service = module.get<BreweryService>(BreweryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
