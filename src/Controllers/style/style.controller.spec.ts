import { Test, TestingModule } from '@nestjs/testing';
import { StyleController } from './style.controller';
import { StyleService } from 'src/Services';
import { getModelToken } from "@nestjs/mongoose";
import { Style as StyleSchema } from 'src/Schemas';

describe('StyleController', () => {
  let controller: StyleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StyleController],
      providers: [StyleService, {
        provide: getModelToken(StyleSchema.name),
        useValue: new StyleSchema
      }]
    }).compile();

    controller = module.get<StyleController>(StyleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
