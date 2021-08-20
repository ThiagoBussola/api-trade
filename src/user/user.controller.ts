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
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { ParameterValidationPipe } from 'src/common/pipes/parameters-validation.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async getAllCeps(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @Get('/:userId')
  async getCepById(
    @Param('userId', ParameterValidationPipe) userId: string,
  ): Promise<User> {
    return await this.userService.findById(userId);
  }

  @Put('/:userId')
  @UsePipes(ValidationPipe)
  async updateCep(
    @Param('userId', ParameterValidationPipe) userId: string,
    @Body() updatedUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.update(userId, updatedUserDto);
  }

  @Delete('/:userId')
  async deleteCep(
    @Param('userId', ParameterValidationPipe) userId: string,
  ): Promise<User> {
    return await this.userService.remove(userId);
  }
}
