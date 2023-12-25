import { Module } from '@nestjs/common';
import { RickandmortyModule } from './rickandmorty/rickandmorty.module';

@Module({
  imports: [RickandmortyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
