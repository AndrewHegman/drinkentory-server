import { Test, TestingModule } from "@nestjs/testing";
import { PlaceService } from "./place.service";
import { Place as PlaceSchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";

describe("PlaceService", () => {
  let service: PlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceService,
        {
          provide: getModelToken(PlaceSchema.name),
          useValue: new PlaceSchema(),
        },
      ],
    }).compile();

    service = module.get<PlaceService>(PlaceService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
