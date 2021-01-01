import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./history.controller";
import { PlaceService } from "src/Services";
import { Place as PlaceSchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";

describe("PlaceController", () => {
  let controller: PlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [
        PlaceService,
        {
          provide: getModelToken(PlaceSchema.name),
          useValue: new PlaceSchema(),
        },
      ],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
