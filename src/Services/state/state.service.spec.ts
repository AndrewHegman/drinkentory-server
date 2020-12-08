import { Test, TestingModule } from "@nestjs/testing";
import { StateService } from "./state.service";
import { State as StateSchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";

describe("StateService", () => {
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService, {
        provide: getModelToken(StateSchema.name),
        useValue: new StateSchema
      }]
    }).compile();

    service = module.get<StateService>(StateService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
