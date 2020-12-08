import { Test, TestingModule } from "@nestjs/testing";
import { BreweryController } from "./brewery.controller";
import { BreweryService } from 'src/Services';
import { Brewery as BrewerySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";

describe("BreweryController", () => {
  let controller: BreweryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BreweryController],
      providers: [BreweryService, {
        provide: getModelToken(BrewerySchema.name),
        useValue: new BrewerySchema
      }]
    }).compile();

    controller = module.get<BreweryController>(BreweryController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
