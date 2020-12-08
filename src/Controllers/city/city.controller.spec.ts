import { Test, TestingModule } from "@nestjs/testing";
import { CityController } from "./city.controller";
import { CityService } from 'src/Services';
import { City as CitySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";

describe("CityController", () => {
  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [CityService, {
        provide: getModelToken(CitySchema.name),
        useValue: new CitySchema
      }]

    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
