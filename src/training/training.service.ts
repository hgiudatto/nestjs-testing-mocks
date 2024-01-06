/* eslint-disable prettier/prettier */

export class TrainingService {
  async trainSuperhero(
    strength: number,
    durationInMinutes: number,
  ): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve(strength + durationInMinutes * 0.1);
        },
        durationInMinutes * 60 * 1000,
      );
    });
  }
}
