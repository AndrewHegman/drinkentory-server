import { Test, TestingModule } from "@nestjs/testing";
import { CityService } from "./city.service";
import { City as CitySchema } from 'src/Schemas';
import { getModelToken } from "@nestjs/mongoose";

describe("CityService", () => {
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityService, {
        provide: getModelToken(CitySchema.name),
        useValue: new CitySchema
      }],
    }).compile();

    service = module.get<CityService>(CityService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
