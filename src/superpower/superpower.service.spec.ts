/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing'
import { SuperpowerService } from './superpower.service'
import { SuperheroService, Superheroe } from '../superhero/superhero.service'

describe.skip('SuperheroService', () => {
  let superpowerService: SuperpowerService
  let superheroeService: SuperheroService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperpowerService, SuperheroService],
    }).compile()

    superpowerService = module.get<SuperpowerService>(SuperpowerService)
    superheroeService = module.get<SuperheroService>(SuperheroService)
  })

  it('should grant a random superpower to superheroes', () => {
    jest
      .spyOn(superpowerService, 'getSuperpower')
      .mockReturnValueOnce('Super Strength')

    const strength = 5
    const speed = 10
    const superpower = 'Super Strength'

    const superhero: Superheroe = superheroeService.createSuperhero(
      'John Doe',
      strength,
      speed,
      superpower,
    )

    expect(superhero.name).toBe('John Doe')
    expect(superhero.superpower).toBe('Super Strength')
  })
})
