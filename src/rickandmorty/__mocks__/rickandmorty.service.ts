/* eslint-disable prettier/prettier */
import { onerickandmortyStub } from '../test/stubs/onerickandmorty.stub';
import { rickandmortyStub } from '../test/stubs/rickandmorty.stub';

/* eslint-disable prettier/prettier */
export const RickandmortyService = jest.fn().mockReturnValue({
  fetchEveryRickAndMorty: jest.fn().mockResolvedValue(rickandmortyStub()),
  fetchOneRickAndMorty: jest.fn().mockResolvedValue(onerickandmortyStub()),
});
