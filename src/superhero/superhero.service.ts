/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

export class SuperheroService {
  calculatePowerLevel(strenght: number, speed: number): number {
    return strenght * speed * Math.random();
  }
}
