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
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { ParameterValidationPipe } from '../common/pipes/parameters-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllCeps(): Promise<Array<User>> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async getCepById(
    @Param('userId', ParameterValidationPipe) userId: string,
  ): Promise<User> {
    return await this.userService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:userId')
  @UsePipes(ValidationPipe)
  async updateCep(
    @Param('userId', ParameterValidationPipe) userId: string,
    @Body() updatedUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.update(userId, updatedUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteCep(
    @Param('userId', ParameterValidationPipe) userId: string,
  ): Promise<User> {
    return await this.userService.remove(userId);
  }
}
