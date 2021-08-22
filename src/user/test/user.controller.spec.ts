import { Test } from '@nestjs/testing';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user.module';
import { JwtAuthGuard } from '../../auth/jwt-guard.guard';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { userStub } from './stubs/user.stub';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

jest.mock('../user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }),
        AuthModule,
        JwtAuthGuard,
        UserModule,
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUser by id', () => {
    describe('when findById is called', () => {
      let user;

      beforeEach(async () => {
        user = await userController.findById(userStub()._id);
      });

      test('then it should call userService,', () => {
        expect(userService.findById).toBeCalledWith(userStub()._id);
      });

      test('then is shoud return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUsers', () => {
    describe('when findAll is called', () => {
      let users;

      beforeEach(async () => {
        users = await userController.findAll();
      });
      test('then it should call userService', () => {
        expect(userService.findAll).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when create is called', () => {
      let user;
      let createUser: CreateUserDto;

      beforeEach(async () => {
        createUser = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await userController.create(createUser);
      });
      test('then it should call userService', () => {
        expect(userService.create).toHaveBeenCalledWith({
          name: createUser.name,
          email: createUser.email,
          password: createUser.password,
        });
      });

      test('the it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUser', () => {
    describe('when update is called', () => {
      let user;
      let updateUserDto: CreateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          name: 'Thiago Bussola da Silva',
          email: 'thiagobussola@gmail.com',
          password: 'TenMoreDays',
        };
        user = await userController.update(userStub()._id, updateUserDto);
      });

      test('then it should call userService', () => {
        expect(userService.update).toHaveBeenCalledWith(
          userStub()._id,
          updateUserDto,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('deleteUser', () => {
    describe('when update is called', () => {
      let user;

      beforeEach(async () => {
        user = await userController.remove(userStub()._id);
      });

      test('then it should call userService', () => {
        expect(userService.remove).toBeCalledTimes(1);
        expect(userService.remove).toBeCalledWith(userStub()._id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
