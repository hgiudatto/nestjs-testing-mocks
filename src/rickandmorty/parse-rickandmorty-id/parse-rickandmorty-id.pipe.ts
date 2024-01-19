import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'

@Injectable()
export class ParseRickandmortyIdPipe implements PipeTransform {
  transform(value: string): number {
    const id = parseInt(value)
    if (isNaN(id)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      )
    }
    if (id < 1 || id > 827) {
      throw new BadRequestException('ID must be between 1 and 827')
    }
    return id
  }
}
