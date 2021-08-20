import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { validationCep } from '../util/validCep';
import { User } from './interfaces/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
      password: hash,
    });

    const newUser = await this.userModel
      .findOne({ email: email })
      .select('-password');

    return newUser;
  }

  async update(userId: string, updateUserDto: CreateUserDto): Promise<User> {
    await this.userExists(userId);

    const { name, email, password } = updateUserDto;

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    const userUpdated = {
      name,
      email,
      password: hash,
    };

    return await this.userModel.findByIdAndUpdate(
      userId,
      { $set: userUpdated },
      { new: true },
    );
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find().select('-password');
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findById(userId: string): Promise<User> {
    return await this.userExists(userId);
  }

  async remove(userId: string): Promise<User> {
    await this.userExists(userId);

    return await this.userModel.findByIdAndRemove(userId);
  }

  private async userExists(userId: string): Promise<User> {
    const findedUser = await this.userModel.findById(userId);
    if (!findedUser) {
      throw new NotFoundException(
        `O jogador de id: ${userId} não está cadastrado no sistema`,
      );
    }
    return findedUser;
  }
}
