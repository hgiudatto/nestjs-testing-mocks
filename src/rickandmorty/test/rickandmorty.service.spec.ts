/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { RickandmortyService } from '../rickandmorty.service'
import { BadRequestException } from '@nestjs/common'
import { ReadRickandmorty } from '../dto/read-rickandmorty.dto'

describe('RickandmortyService', () => {
  let rickandMortyService: RickandmortyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RickandmortyService],
    }).compile()

    rickandMortyService = module.get<RickandmortyService>(RickandmortyService)
  })

  it('should be defined', () => {
    expect(rickandMortyService).toBeDefined()
  })

  describe('fetchEveryRickAndMorty', () => {
    it('rickandmorty ID less than 1 should throw error', async () => {
      const goodRicks = ['0']
      const ram = rickandMortyService.fetchEveryRickAndMorty(goodRicks)
      await expect(ram).rejects.toBeInstanceOf(TypeError)
    })
    it('rickandmorty ID greater than 826 should throw error', async () => {
      const goodRicks = ['827']
      const ram = rickandMortyService.fetchEveryRickAndMorty(goodRicks)
      await expect(ram).rejects.toBeInstanceOf(TypeError)
    })
    it('valid rickandmorty ID to return the rickandmorty name', async () => {
      const goodRicks = ['19']
      /* const antennaRick = {
        id: '19',
        name: 'Antenna Rick',
        status: 'unknown',
        species: 'Human',
        type: 'Human with antennae',
        gender: 'Male',
        origin: {
          name: 'unknown',
          url: '',
        },
        location: {
          name: 'unknown',
          url: '',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
        episode: ['https://rickandmortyapi.com/api/episode/10'],
        url: 'https://rickandmortyapi.com/api/character/19',
        created: '2017-11-04T22:28:13.756Z',
      } */
      const ram = rickandMortyService.fetchEveryRickAndMorty(goodRicks)
      await expect(ram).not.toBeNull()
    })
  })
})
