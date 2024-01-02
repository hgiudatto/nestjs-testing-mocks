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
import {
  RickAndMortyResponse,
  RicksAndMortysResponse,
} from './dto/read-rickandmorty.dto';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
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

  @HttpCode(HttpStatus.OK)
  @Post('fetch_onerickmorty')
  async fetchOneRickAndMorty(@Body() userData): Promise<RickAndMortyResponse> {
    return await this.rickAndMortyService.fetchOneRickAndMorty(userData);
  }

  @HttpCode(HttpStatus.OK)
  @Get('fetch_filtered_rickmorty')
  async fetchFilteredRickAndMorty(
    @Param('name') name: string,
    @Param('status') status: string,
  ): Promise<Observable<AxiosResponse<RickAndMortyResponse[], any>>> {
    return await this.rickAndMortyService.fetchFilteredRickAndMorty(
      name,
      status,
    );
  }
}
