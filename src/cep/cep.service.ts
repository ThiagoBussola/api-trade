import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCepDto } from './dtos/create-cep.dto';
import { Cep } from './interfaces/cep.interface';

@Injectable()
export class CepService {
  constructor(@InjectModel('Cep') private readonly cepModel: Model<Cep>) {}

  async createCep(createCepDto: CreateCepDto): Promise<Cep> {
    const { cep } = createCepDto;

    const findCep = await this.cepModel.findOne({ cep: cep });

    if (findCep) {
      throw new BadRequestException(`Cep: ${cep} já cadastrado no sistema`);
    }

    const createdCep = new this.cepModel(createCepDto);

    return await createdCep.save();
  }

  async findAll(): Promise<Array<Cep>> {
    return await this.cepModel.find();
  }
}
