/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from '../superhero.service';

describe('SuperheroService', () => {
  let superheroService: SuperheroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroService],
    }).compile();

    superheroService = module.get<SuperheroService>(SuperheroService);
  });

  it('should calculate the power level of superheroes', () => {
    // Arrange
    const strenght = 5;
    const speed = 10;

    // Act
    const powerLevel = superheroService.calculatePowerLevel(strenght, speed);

    // Assert
    expect(powerLevel).not.toBeGreaterThanOrEqual(strenght * speed);
    expect(powerLevel).toBeLessThanOrEqual(strenght * speed * 10);
    expect(superheroService.calculatePowerLevel(0, speed)).toBe(0);
  });
});
