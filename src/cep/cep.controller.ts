import { Body, Controller, Get, Post } from '@nestjs/common';
import { CepService } from './cep.service';
import { CreateCepDto } from './dtos/create-cep.dto';
import { Cep } from './interfaces/cep.interface';

@Controller('ceps')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Post()
  async createCep(@Body() createCepDto: CreateCepDto): Promise<Cep> {
    return await this.cepService.createCep(createCepDto);
  }

  @Get()
  async getAllCeps(): Promise<Array<Cep>> {
    return await this.cepService.findAll();
  }
}
