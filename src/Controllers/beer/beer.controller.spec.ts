import { Test, TestingModule } from "@nestjs/testing";
import { BeerController } from "./beer.controller";
import { BeerService } from "src/Services";
import { Beer as BeerSchema, BeerDocument, Brewery as BrewerySchema } from "src/Schemas";
import { getModelToken } from "@nestjs/mongoose";
import { FetchSomeBeerDto, CreateBeerDto, UpdateBeerDto } from "src/Dto";
import { generateRandomBeerDocument } from "src/Utils/generateRandomDocuments";
import { Container } from "src/Interfaces";
import { ObjectID } from "mongodb";
import { Types } from "mongoose";

describe("BeerController", () => {
  let controller: BeerController;
  let service: BeerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeerController],
      providers: [
        BeerService,
        {
          provide: getModelToken(BeerSchema.name),
          useValue: new BeerSchema(),
        },
        {
          provide: getModelToken(BrewerySchema.name),
          useValue: new BrewerySchema(),
        },
      ],
    }).compile();

    controller = module.get<BeerController>(BeerController);
    service = module.get<BeerService>(BeerService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("GET", () => {
    describe("find all", () => {
      const expectedResult: BeerDocument[] = [generateRandomBeerDocument()];
      let result: BeerDocument[];
      beforeEach(async () => {
        jest.spyOn(service, "find").mockImplementation(() => Promise.resolve(expectedResult));
        result = await controller.find({} as FetchSomeBeerDto);
      });

      it("should call find on the BeerService", () => {
        expect(service.find).toHaveBeenCalled();
      });

      it("should return an array of BeerDocuments", async () => {
        expect(result).toBe(expectedResult);
      });
    });

    describe("find by id", () => {
      const expectedResult: BeerDocument = generateRandomBeerDocument();
      let result: BeerDocument;
      beforeEach(async () => {
        jest.spyOn(service, "findOne").mockImplementation(() => Promise.resolve(expectedResult));
        result = await controller.findOne(expectedResult._id);
      });

      it("should call findOne on the BeerService", () => {
        expect(service.findOne).toHaveBeenCalled();
      });

      it("should return an array of BeerDocuments", async () => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe("POST", () => {
    const newDocument: CreateBeerDto = {
      name: "foo",
      brewery: "123",
      style: "123",
      container: Container.bottle,
      quantity: 0,
    };

    const returnValue: BeerDocument = {
      _id: "123",
      name: "foo",
      brewery: Types.ObjectId(),
      style: Types.ObjectId(),
      container: Container.bottle,
      quantity: 0,
      historicQuantity: 0,
    } as BeerDocument;

    let result: BeerDocument;
    beforeEach(async () => {
      jest.spyOn(service, "create").mockImplementation(() => Promise.resolve(returnValue));
      result = await controller.create(newDocument);
    });

    it("should call find on the BeerService", () => {
      expect(service.create).toHaveBeenCalled();
    });

    it("should return an array of BeerDocuments", async () => {
      expect(result).toBe(returnValue);
    });
  });

  describe("PUT", () => {
    const updatedDocument: UpdateBeerDto = {
      quantity: 0,
      historicQuantity: 0,
    };

    const returnValue: BeerDocument = {
      _id: "123",
      name: "foo",
      brewery: Types.ObjectId(),
      style: Types.ObjectId(),
      container: Container.bottle,
      quantity: 0,
      historicQuantity: 0,
    } as BeerDocument;

    let result: BeerDocument;
    beforeEach(async () => {
      jest.spyOn(service, "update").mockImplementation(() => Promise.resolve(returnValue));
      result = await controller.update("123", updatedDocument);
    });

    it("should call find on the BeerService", () => {
      expect(service.update).toHaveBeenCalled();
    });

    it("should return an array of BeerDocuments", async () => {
      expect(result).toBe(returnValue);
    });
  });
});
