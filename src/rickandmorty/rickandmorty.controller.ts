import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RickandmortyService } from './rickandmorty.service';
import { RicksAndMortysResponse } from './dto/read-rickandmorty.dto';
@Controller('rickandmorty')
export class RickandmortyController {
  constructor(private readonly rickAndMortyService: RickandmortyService) {}

  @HttpCode(HttpStatus.OK)
  @Post('fetch_rickmortys')
  async fetchEveryRickAndMorty(
    @Body() userData,
  ): Promise<RicksAndMortysResponse> {
    return await this.rickAndMortyService.fetchEveryRickAndMorty(userData);
  }
}
