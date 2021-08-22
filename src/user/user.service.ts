import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    await this.userModel.create({
      name,
      email,
      password: hash,
    });

    const newUser = await this.userModel
      .findOne({ email: email })
      .select('-password');

    return newUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userExists(userId);
    console.log('asdasdad', user);

    const updatedUser = updateUserDto;

    if (updatedUser.password) {
      const salt = genSaltSync(10);
      const hash = hashSync(updatedUser.password, salt);

      const userUpdated = {
        name: updatedUser.name,
        email: updatedUser.email,
        password: hash,
      };
      return await this.userModel
        .findByIdAndUpdate(userId, { $set: userUpdated }, { new: true })
        .select('-password');
    }
    const userUpdated = {
      name: updatedUser.name ? updatedUser.name : user.name,
      email: updatedUser.email ? updatedUser.email : user.email,
    };

    return await this.userModel
      .findByIdAndUpdate(userId, { $set: userUpdated }, { new: true })
      .select('-password');
  }

  async findAll(): Promise<Array<User>> {
    return await this.userModel.find().select('-password');
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async findById(userId: string): Promise<User> {
    return await this.userModel.findById(userId).select('-password');
  }

  async remove(userId: string): Promise<User> {
    await this.userExists(userId);

    return await this.userModel.findByIdAndRemove(userId).select('-password');
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
