/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing'
import { RickandmortyService } from '../rickandmorty.service'
import { HttpService } from '@nestjs/axios'

describe.skip('RickandmortyService', () => {
  let rickandMortyService: RickandmortyService
  let httpService: HttpService

  const mockRetrieveRicks = { retrieveRicks: jest.fn() }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService, RickandmortyService],
    }).compile()

    rickandMortyService = module.get<RickandmortyService>(RickandmortyService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(rickandMortyService).toBeDefined()
  })
})
