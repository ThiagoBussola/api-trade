import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParameterValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `o valor do paramentro ${metadata.data} deve ser informado`,
      );
    }

    return value;
  }
}
