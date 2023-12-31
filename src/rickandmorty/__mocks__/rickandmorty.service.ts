/* eslint-disable prettier/prettier */
import { rickandmortyStub } from '../test/stubs/rickandmorty.stub';

/* eslint-disable prettier/prettier */
export const RickandmortyService = jest.fn().mockReturnValue({
  fetchEveryRickAndMorty: jest.fn().mockResolvedValue(rickandmortyStub()),
});
