/* eslint-disable prettier/prettier */
import { fiteredrickandmortyStub } from '../test/stubs/filteredrickandmorty.stub';
import { onerickandmortyStub } from '../test/stubs/onerickandmorty.stub';
import { rickandmortyStub } from '../test/stubs/rickandmorty.stub';

/* eslint-disable prettier/prettier */
export const RickandmortyService = jest.fn().mockReturnValue({
  fetchEveryRickAndMorty: jest.fn().mockResolvedValue(rickandmortyStub()),
  fetchOneRickAndMorty: jest.fn().mockResolvedValue(onerickandmortyStub()),
  fetchFilteredRickAndMorty: jest
    .fn()
    .mockResolvedValue(fiteredrickandmortyStub()),
});
