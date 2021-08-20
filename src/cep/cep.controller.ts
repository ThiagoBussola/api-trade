import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParameterValidationPipe } from 'src/common/pipes/parameters-validation.pipe';
import { CepService } from './cep.service';
import { CreateCepDto } from './dtos/create-cep.dto';
import { Cep } from './interfaces/cep.interface';

@Controller('ceps')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCep(@Body() createCepDto: CreateCepDto): Promise<Cep> {
    return await this.cepService.create(createCepDto);
  }

  @Get()
  async getAllCeps(): Promise<Array<Cep>> {
    return await this.cepService.findAll();
  }

  @Get('/:cepId')
  async getCepById(
    @Param('cepId', ParameterValidationPipe) cepId: string,
  ): Promise<Cep> {
    return await this.cepService.findById(cepId);
  }

  @Put('/:cepId')
  @UsePipes(ValidationPipe)
  async updateCep(
    @Param('cepId', ParameterValidationPipe) cepId: string,
    @Body() updatedCepDto: CreateCepDto,
  ): Promise<Cep> {
    return await this.cepService.update(cepId, updatedCepDto);
  }

  @Delete('/:cepId')
  async deleteCep(
    @Param('cepId', ParameterValidationPipe) cepId: string,
  ): Promise<Cep> {
    return await this.cepService.remove(cepId);
  }
}
