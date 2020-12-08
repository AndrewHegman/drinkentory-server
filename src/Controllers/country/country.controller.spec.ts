import { Test, TestingModule } from "@nestjs/testing";
import { CountryController } from "./country.controller";
import { CountryService } from 'src/Services';
import { Country as CountrySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";

describe("CountryController", () => {
  let controller: CountryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [CountryService, {
        provide: getModelToken(CountrySchema.name),
        useValue: new CountrySchema
      }]
    }).compile();

    controller = module.get<CountryController>(CountryController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
