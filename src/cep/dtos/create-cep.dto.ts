import { IsNotEmpty } from 'class-validator';

export class CreateCepDto {
  @IsNotEmpty()
  cep: string;

  cidade: string;
}
