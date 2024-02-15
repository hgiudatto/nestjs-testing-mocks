/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { RickandmortyService } from '../rickandmorty.service'

describe('RickandmortyService', () => {
  let rickandMortyService: RickandmortyService
  let httpService: DeepMocked<HttpService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RickandmortyService],
    })
      .useMocker(createMock)
      .compile()

    rickandMortyService = module.get<RickandmortyService>(RickandmortyService)
    httpService = module.get(HttpService)
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
      httpService.axiosRef.mockResolvedValueOnce({
        data: [
          {
            id: 19,
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
          },
          {
            id: 267,
            name: 'Plumber Rick',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'unknown',
              url: '',
            },
            location: {
              name: 'Citadel of Ricks',
              url: 'https://rickandmortyapi.com/api/location/3',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/267.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/28'],
            url: 'https://rickandmortyapi.com/api/character/267',
            created: '2017-12-31T13:50:57.337Z',
          },
          {
            id: 103,
            name: 'Doofus Rick',
            status: 'unknown',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (J19ζ7)',
              url: 'https://rickandmortyapi.com/api/location/31',
            },
            location: {
              name: 'Earth (Replacement Dimension)',
              url: 'https://rickandmortyapi.com/api/location/20',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/103.jpeg',
            episode: [
              'https://rickandmortyapi.com/api/episode/10',
              'https://rickandmortyapi.com/api/episode/22',
            ],
            url: 'https://rickandmortyapi.com/api/character/103',
            created: '2017-12-01T12:29:27.984Z',
          },
          {
            id: 825,
            name: 'Young Jerry',
            status: 'unknown',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
              name: 'Earth (Unknown dimension)',
              url: 'https://rickandmortyapi.com/api/location/30',
            },
            location: {
              name: 'Earth (Unknown dimension)',
              url: 'https://rickandmortyapi.com/api/location/30',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/825.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/51'],
            url: 'https://rickandmortyapi.com/api/character/825',
            created: '2021-11-02T17:20:14.305Z',
          },
          {
            id: 30,
            name: 'Baby Poopybutthole',
            status: 'Alive',
            species: 'Poopybutthole',
            type: '',
            gender: 'Male',
            origin: {
              name: 'unknown',
              url: '',
            },
            location: {
              name: 'unknown',
              url: '',
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/30.jpeg',
            episode: ['https://rickandmortyapi.com/api/episode/31'],
            url: 'https://rickandmortyapi.com/api/character/30',
            created: '2017-11-05T09:13:16.483Z',
          },
        ],
      })
      const ram = rickandMortyService.fetchEveryRickAndMorty({
        rickMortyIds: ['19', '267', '103', '825', '30'],
      })
      await expect(ram).not.toBeNull()
    })

    it('if RickAndMorty API unexpectedly changes, throw an error', async () => {
      const goodRicks = ['827']
      httpService.axiosRef.mockResolvedValueOnce({
        data: 'Unexpected data',
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      })

      const ram = rickandMortyService.fetchEveryRickAndMorty(goodRicks)
      await expect(ram).rejects.toBeInstanceOf(TypeError)
    })
  })

  describe('fetchFilteredRickAndMorty', () => {
    /* it('search parameter not available should throw an error', async () => {
      const name = 'rick'
      const url = 'https://rickandmortyapi.com/api/character/19'
      const ram = rickandMortyService.fetchFilteredRickAndMorty(name, url)
      await expect(ram).rejects.toBeInstanceOf(InternalServerErrorException)
    }) */
    it('valid search parameter to return the rickandmortys', async () => {
      const name = 'rick'
      const status = 'alive'

      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          results: [
            {
              id: 1,
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth (C-137)',
                url: 'https://rickandmortyapi.com/api/location/1',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
                'https://rickandmortyapi.com/api/episode/3',
                'https://rickandmortyapi.com/api/episode/4',
                'https://rickandmortyapi.com/api/episode/5',
                'https://rickandmortyapi.com/api/episode/6',
                'https://rickandmortyapi.com/api/episode/7',
                'https://rickandmortyapi.com/api/episode/8',
                'https://rickandmortyapi.com/api/episode/9',
                'https://rickandmortyapi.com/api/episode/10',
                'https://rickandmortyapi.com/api/episode/11',
                'https://rickandmortyapi.com/api/episode/12',
                'https://rickandmortyapi.com/api/episode/13',
                'https://rickandmortyapi.com/api/episode/14',
                'https://rickandmortyapi.com/api/episode/15',
                'https://rickandmortyapi.com/api/episode/16',
                'https://rickandmortyapi.com/api/episode/17',
                'https://rickandmortyapi.com/api/episode/18',
                'https://rickandmortyapi.com/api/episode/19',
                'https://rickandmortyapi.com/api/episode/20',
                'https://rickandmortyapi.com/api/episode/21',
                'https://rickandmortyapi.com/api/episode/22',
                'https://rickandmortyapi.com/api/episode/23',
                'https://rickandmortyapi.com/api/episode/24',
                'https://rickandmortyapi.com/api/episode/25',
                'https://rickandmortyapi.com/api/episode/26',
                'https://rickandmortyapi.com/api/episode/27',
                'https://rickandmortyapi.com/api/episode/28',
                'https://rickandmortyapi.com/api/episode/29',
                'https://rickandmortyapi.com/api/episode/30',
                'https://rickandmortyapi.com/api/episode/31',
                'https://rickandmortyapi.com/api/episode/32',
                'https://rickandmortyapi.com/api/episode/33',
                'https://rickandmortyapi.com/api/episode/34',
                'https://rickandmortyapi.com/api/episode/35',
                'https://rickandmortyapi.com/api/episode/36',
                'https://rickandmortyapi.com/api/episode/37',
                'https://rickandmortyapi.com/api/episode/38',
                'https://rickandmortyapi.com/api/episode/39',
                'https://rickandmortyapi.com/api/episode/40',
                'https://rickandmortyapi.com/api/episode/41',
                'https://rickandmortyapi.com/api/episode/42',
                'https://rickandmortyapi.com/api/episode/43',
                'https://rickandmortyapi.com/api/episode/44',
                'https://rickandmortyapi.com/api/episode/45',
                'https://rickandmortyapi.com/api/episode/46',
                'https://rickandmortyapi.com/api/episode/47',
                'https://rickandmortyapi.com/api/episode/48',
                'https://rickandmortyapi.com/api/episode/49',
                'https://rickandmortyapi.com/api/episode/50',
                'https://rickandmortyapi.com/api/episode/51',
              ],
              url: 'https://rickandmortyapi.com/api/character/1',
              created: '2017-11-04T18:48:46.250Z',
            },
            {
              id: 48,
              name: 'Black Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/48.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/22',
                'https://rickandmortyapi.com/api/episode/28',
              ],
              url: 'https://rickandmortyapi.com/api/character/48',
              created: '2017-11-05T11:15:26.044Z',
            },
            {
              id: 72,
              name: 'Cool Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth (K-83)',
                url: 'https://rickandmortyapi.com/api/location/26',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/72.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/72',
              created: '2017-11-30T11:41:11.542Z',
            },
            {
              id: 74,
              name: 'Cop Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/74.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/74',
              created: '2017-11-30T11:48:18.950Z',
            },
            {
              id: 78,
              name: 'Cowboy Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image: 'https://rickandmortyapi.com/api/character/avatar/78.jpeg',
              episode: [
                'https://rickandmortyapi.com/api/episode/10',
                'https://rickandmortyapi.com/api/episode/28',
              ],
              url: 'https://rickandmortyapi.com/api/character/78',
              created: '2017-11-30T14:15:18.347Z',
            },
            {
              id: 220,
              name: 'Mega Fruit Farmer Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/220.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/220',
              created: '2017-12-30T14:35:30.736Z',
            },
            {
              id: 265,
              name: 'Pickle Rick',
              status: 'Alive',
              species: 'unknown',
              type: 'Pickle',
              gender: 'Male',
              origin: {
                name: 'Earth (C-137)',
                url: 'https://rickandmortyapi.com/api/location/1',
              },
              location: {
                name: 'Earth (Replacement Dimension)',
                url: 'https://rickandmortyapi.com/api/location/20',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/265.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/24'],
              url: 'https://rickandmortyapi.com/api/character/265',
              created: '2017-12-31T13:47:10.617Z',
            },
            {
              id: 267,
              name: 'Plumber Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/267.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/267',
              created: '2017-12-31T13:50:57.337Z',
            },
            {
              id: 288,
              name: 'Rick D716-B',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth (D716-B)',
                url: 'https://rickandmortyapi.com/api/location/60',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/288.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/288',
              created: '2017-12-31T19:55:25.101Z',
            },
            {
              id: 289,
              name: 'Rick D716-C',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth (D716-C)',
                url: 'https://rickandmortyapi.com/api/location/61',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/289.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/289',
              created: '2017-12-31T19:57:36.546Z',
            },
            {
              id: 291,
              name: 'Rick J-22',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth (J-22)',
                url: 'https://rickandmortyapi.com/api/location/62',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/291.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/291',
              created: '2017-12-31T20:16:52.337Z',
            },
            {
              id: 292,
              name: 'Rick K-22',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth (K-22)',
                url: 'https://rickandmortyapi.com/api/location/52',
              },
              location: {
                name: 'Earth (Replacement Dimension)',
                url: 'https://rickandmortyapi.com/api/location/20',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/292.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/292',
              created: '2017-12-31T20:20:40.484Z',
            },
            {
              id: 328,
              name: 'Slow Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/328.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/328',
              created: '2018-01-10T16:14:16.331Z',
            },
            {
              id: 345,
              name: 'Teacher Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/345.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/345',
              created: '2018-01-10T17:33:23.437Z',
            },
            {
              id: 381,
              name: 'Woman Rick',
              status: 'Alive',
              species: 'Alien',
              type: 'Chair',
              gender: 'Female',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'unknown',
                url: '',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/381.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/10'],
              url: 'https://rickandmortyapi.com/api/character/381',
              created: '2018-01-10T19:46:00.622Z',
            },
            {
              id: 472,
              name: 'Baby Rick',
              status: 'Alive',
              species: 'Human',
              type: 'Clone',
              gender: 'Male',
              origin: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/472.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/472',
              created: '2018-05-22T17:11:53.084Z',
            },
            {
              id: 477,
              name: 'Hairdresser Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/477.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/477',
              created: '2018-05-22T17:19:36.127Z',
            },
            {
              id: 478,
              name: 'Journalist Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/478.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/478',
              created: '2018-05-22T17:22:18.417Z',
            },
            {
              id: 482,
              name: 'Secret Service Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/482.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/482',
              created: '2018-05-22T17:32:32.561Z',
            },
            {
              id: 483,
              name: 'Steve Jobs Rick',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'unknown',
                url: '',
              },
              location: {
                name: 'Citadel of Ricks',
                url: 'https://rickandmortyapi.com/api/location/3',
              },
              image:
                'https://rickandmortyapi.com/api/character/avatar/483.jpeg',
              episode: ['https://rickandmortyapi.com/api/episode/28'],
              url: 'https://rickandmortyapi.com/api/character/483',
              created: '2018-05-22T17:33:33.815Z',
            },
          ],
        },
      })

      const ram = rickandMortyService.fetchFilteredRickAndMorty(name, status)
      await expect(ram).not.toBeNull()
    })
  })
})
