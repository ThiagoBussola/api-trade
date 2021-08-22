import { IsNotEmpty } from 'class-validator';

export class CreateCepDto {
  @IsNotEmpty()
  cep: string;

  city: string;
}
