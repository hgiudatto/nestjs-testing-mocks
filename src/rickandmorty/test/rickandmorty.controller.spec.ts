import { Test, TestingModule } from '@nestjs/testing';
import { RickandmortyController } from '../rickandmorty.controller';

describe('RickandmortyController', () => {
  let controller: RickandmortyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RickandmortyController],
    }).compile();

    controller = module.get<RickandmortyController>(RickandmortyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
