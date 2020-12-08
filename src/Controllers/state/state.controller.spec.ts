import { Test, TestingModule } from "@nestjs/testing";
import { StateController } from "./state.controller";
import { StateService } from "src/Services";
import { State as StateSchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";

describe("StateController", () => {
  let controller: StateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [StateService, {
        provide: getModelToken(StateSchema.name),
        useValue: new StateSchema
      }]
    }).compile();

    controller = module.get<StateController>(StateController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
