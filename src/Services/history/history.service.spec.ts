import { Test, TestingModule } from "@nestjs/testing";
import { HistoryService } from "./history.service";
import { History as HistorySchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";
import { Types } from "mongoose";

describe("HistoryService", () => {
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getModelToken(HistorySchema.name),
          useValue: new HistorySchema(),
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
