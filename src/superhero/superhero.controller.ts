/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SuperheroService } from './superhero.service';

@Controller('superhero')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @HttpCode(HttpStatus.OK)
  @Get('calculate_power_level')
  calculatePowerLevel(
    @Query('strenght') strenght: number,
    @Query('speed') speed: number,
  ): number {
    return this.superheroService.calculatePowerLevel(strenght, speed);
  }
}
