import { Test, TestingModule } from '@nestjs/testing';
import { StyleService } from './style.service';
import { Style as StyleSchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";

describe('StyleService', () => {
  let service: StyleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StyleService, {
        provide: getModelToken(StyleSchema.name),
        useValue: new StyleSchema
      }]
    }).compile();

    service = module.get<StyleService>(StyleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
