/* eslint-disable prettier/prettier */

import { SuperpowerService } from 'src/superpower/superpower.service'

export type Superheroe = {
  name: string
  strenght: number
  speed: number
  superpower?: string
}
export class SuperheroService {
  calculatePowerLevel(strenght: number, speed: number): number {
    return strenght * speed * Math.random()
  }
  createSuperhero(
    name: string,
    strenght: number,
    speed: number,
    superpower: string,
  ): Superheroe {
    const superHeroe: Superheroe = {
      name: name,
      strenght: strenght,
      speed: speed,
      superpower: superpower,
    }
    return superHeroe
  }
}
