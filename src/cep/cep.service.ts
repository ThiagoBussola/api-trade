import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCepDto } from './dtos/create-cep.dto';
import { Cep } from './interfaces/cep.interface';
import { validationCep } from '../util/validCep';

@Injectable()
export class CepService {
  constructor(@InjectModel('Cep') private readonly cepModel: Model<Cep>) {}

  async create(createCepDto: CreateCepDto): Promise<Cep> {
    const { cep } = createCepDto;

    const validCep = validationCep(cep);

    const findCep = await this.cepModel.findOne({ cep: validCep.cep });

    if (findCep) {
      throw new BadRequestException(
        `Cep: ${validCep} já cadastrado no sistema`,
      );
    }

    const createdCep = new this.cepModel(createCepDto);

    return await createdCep.save();
  }

  async findAll(): Promise<Array<Cep>> {
    return await this.cepModel.find();
  }

  /* para seguir as boas práticas de construção de API's Rest, 
     vamos atualizar, buscar e deletar pelo id do registro no banco e não pelo número do Cep, mesmo esse sendo único
  */
  async update(cepId: string, updateCepDto: CreateCepDto): Promise<Cep> {
    await this.cepExists(cepId);

    return await this.cepModel.findByIdAndUpdate(
      cepId,
      { $set: updateCepDto },
      { new: true },
    );
  }

  async findById(cepId: string): Promise<Cep> {
    return await this.cepExists(cepId);
  }

  async findByCep(cep: string): Promise<Cep> {
    return await this.cepModel.findOne({ cep });
  }

  async remove(cepId: string): Promise<any> {
    await this.cepExists(cepId);

    return await this.cepModel.findByIdAndRemove(cepId);
  }

  private async cepExists(cepId: string): Promise<Cep> {
    const findedCep = await this.cepModel.findById(cepId);

    if (!findedCep) {
      throw new NotFoundException(`O Cep de id: ${cepId} não encontrado`);
    }

    return findedCep;
  }
}
