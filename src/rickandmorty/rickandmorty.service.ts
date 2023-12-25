import { Injectable } from '@nestjs/common';
import { ReadRickandmorty } from './dto/read-rickandmorty.dto';

@Injectable()
export class RickandmortyService {
  retrieveRicks = async (rickId: string): Promise<ReadRickandmorty> => {
    return undefined;
  };
}
