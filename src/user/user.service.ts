import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { validationCep } from '../util/validCep';
import { User } from './interfaces/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    const findedUser = await this.userModel.findOne({ email: email });

    if (findedUser) {
      throw new BadRequestException(
        `Usuário com email ${email}, já cadastrado`,
      );
    }

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    const createUser = await this.userModel.create({
      name,
      email,
      hash,
    });

    return createUser;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find().select('-password');
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }
}
