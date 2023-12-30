import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { RickandmortyController } from './rickandmorty.controller';
import { RickandmortyService } from './rickandmorty.service';

@Module({
  imports: [HttpModule],
  controllers: [RickandmortyController],
  providers: [RickandmortyService],
})
export class RickandmortyModule {}
