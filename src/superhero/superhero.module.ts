/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';

@Module({
  imports: [HttpModule],
  controllers: [SuperheroController],
  providers: [SuperheroService],
})
export class SuperheroModule {}
