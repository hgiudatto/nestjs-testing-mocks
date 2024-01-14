/* eslint-disable prettier/prettier */
import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from '@nestjs/testing';
import { RickandmortyService } from '../rickandmorty.service';

describe('RickandmortyService', () => {
  let rickandMortyService: RickandmortyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RickandmortyService],
    }).compile();

    rickandMortyService = module.get<RickandmortyService>(RickandmortyService);
  })

  it('should be defined', () => {
    expect(rickandMortyService).toBeDefined();
  })
})
