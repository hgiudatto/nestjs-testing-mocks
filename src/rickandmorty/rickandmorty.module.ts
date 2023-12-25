import { Module } from '@nestjs/common';
import { RickandmortyController } from './rickandmorty.controller';
import { RickandmortyService } from './rickandmorty.service';

@Module({
  controllers: [RickandmortyController],
  providers: [RickandmortyService],
})
export class RickandmortyModule {}
