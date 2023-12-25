import { Test, TestingModule } from '@nestjs/testing';
import { RickandmortyService } from '../rickandmorty.service';

describe('RickandmortyService', () => {
  let service: RickandmortyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RickandmortyService],
    }).compile();

    service = module.get<RickandmortyService>(RickandmortyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
