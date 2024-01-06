/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from '../training/training.service';

describe('TrainingService', () => {
  let trainingService: TrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingService],
    }).compile();

    trainingService = module.get<TrainingService>(TrainingService);
  });

  it('should enhance superhero power through training', async () => {
    // Arrange
    const initialStrength = 10;
    const trainingDuration = 30; // minutes

    // Act
    const trainedStrength = await trainingService.trainSuperhero(
      initialStrength,
      trainingDuration,
    );

    // Assert
    expect(trainedStrength).toBeCloseTo(
      initialStrength + trainingDuration * 0.1,
      2,
    );
  });
});
