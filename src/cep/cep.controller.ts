import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import { ParameterValidationPipe } from '../common/pipes/parameters-validation.pipe';
import { CepService } from './cep.service';
import { CreateCepDto } from './dtos/create-cep.dto';
import { Cep } from './interfaces/cep.interface';

@Controller('ceps')
export class CepController {
  constructor(private readonly cepService: CepService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCepDto: CreateCepDto): Promise<Cep> {
    return await this.cepService.create(createCepDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Array<Cep>> {
    return await this.cepService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:cepId')
  async findById(
    @Param('cepId', ParameterValidationPipe) cepId: string,
  ): Promise<Cep> {
    return await this.cepService.findById(cepId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:cep')
  async findByCep(
    @Param('cep', ParameterValidationPipe) cep: string,
  ): Promise<Cep> {
    return await this.cepService.findByCep(cep);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:cepId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('cepId', ParameterValidationPipe) cepId: string,
    @Body() updatedCepDto: CreateCepDto,
  ): Promise<Cep> {
    return await this.cepService.update(cepId, updatedCepDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:cepId')
  async remove(
    @Param('cepId', ParameterValidationPipe) cepId: string,
  ): Promise<Cep> {
    return await this.cepService.remove(cepId);
  }
}
