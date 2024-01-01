/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { RickandmortyController } from '../rickandmorty.controller';
import { RickandmortyService } from '../rickandmorty.service';
import {
  RickAndMortyResponse,
  RicksAndMortysResponse,
} from '../dto/read-rickandmorty.dto';
import { rickandmortyStub } from './stubs/rickandmorty.stub';
import { onerickandmortyStub } from './stubs/onerickandmorty.stub';

jest.mock('../rickandmorty.service');
describe('RickandmortyController', () => {
  let rickandmortyController: RickandmortyController;
  let rickandmortyService: RickandmortyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [RickandmortyController],
      providers: [RickandmortyService],
    }).compile();

    rickandmortyController = module.get<RickandmortyController>(
      RickandmortyController,
    );
    rickandmortyService = module.get<RickandmortyService>(RickandmortyService);
    jest.clearAllMocks();
  });

  describe('fetchEveryRickAndMorty', () => {
    describe('when fetchEveryRickAndMorty is called', () => {
      const rickMortyIds: string[] = ['19', '38', '47', '240', '328', '407'];
      let goodRicks: RicksAndMortysResponse;
      beforeEach(async () => {
        goodRicks =
          await rickandmortyController.fetchEveryRickAndMorty(rickMortyIds);
      });

      test('then it should call rickAndMortyService', () => {
        expect(rickandmortyService.fetchEveryRickAndMorty).toHaveBeenCalledWith(
          rickMortyIds,
        );
      });

      test('then it should return all Rick And Mortys', () => {
        expect(goodRicks).toEqual(rickandmortyStub());
      });
    });
  });

  describe('fetchOneRickAndMorty', () => {
    describe('when fetchOneRickAndMorty is called', () => {
      const rickMortyId: string = '19';
      let goodRick: RickAndMortyResponse;
      beforeEach(async () => {
        goodRick =
          await rickandmortyController.fetchOneRickAndMorty(rickMortyId);
      });

      test('then it should call rickAndMortyService', () => {
        expect(rickandmortyService.fetchOneRickAndMorty).toHaveBeenCalledWith(
          rickMortyId,
        );
      });

      test('then it should return one Rick and Morty', () => {
        expect(goodRick).toEqual(onerickandmortyStub());
      });
    });
  });
});
