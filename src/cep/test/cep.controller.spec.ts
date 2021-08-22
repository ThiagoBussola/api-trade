import { Test } from '@nestjs/testing';
import { CepService } from '../cep.service';
import { CepController } from '../cep.controller';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../user/user.module';
import { JwtAuthGuard } from '../../auth/jwt-guard.guard';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { cepStub } from './stubs/cep.stub';
import { CreateCepDto } from '../dtos/create-cep.dto';

jest.mock('../cep.service');

describe('CepController', () => {
  let cepController: CepController;
  let cepService: CepService;

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
      controllers: [CepController],
      providers: [CepService],
    }).compile();

    cepController = moduleRef.get<CepController>(CepController);
    cepService = moduleRef.get<CepService>(CepService);
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(cepController).toBeDefined();
  });

  describe('getCep', () => {
    describe('when findByCep is called', () => {
      let cep;

      beforeEach(async () => {
        cep = await cepController.findByCep(cepStub().cep);
      });

      test('then it should call cepService,', () => {
        expect(cepService.findByCep).toBeCalledWith(cepStub().cep);
      });

      test('then is shoud return a cep', () => {
        expect(cep).toEqual(cepStub());
      });
    });
  });

  describe('getCep by id', () => {
    describe('when findById is called', () => {
      let cep;

      beforeEach(async () => {
        cep = await cepController.findById(cepStub()._id);
      });

      test('then it should call cepService,', () => {
        expect(cepService.findById).toBeCalledWith(cepStub()._id);
      });

      test('then is shoud return a cep', () => {
        expect(cep).toEqual(cepStub());
      });
    });
  });

  describe('getCeps', () => {
    describe('when findAll is called', () => {
      let ceps;

      beforeEach(async () => {
        ceps = await cepController.findAll();
      });
      test('then it should call cepService', () => {
        expect(cepService.findAll).toHaveBeenCalled();
      });

      test('then it should return ceps', () => {
        expect(ceps).toEqual([cepStub()]);
      });
    });
  });

  describe('createCep', () => {
    describe('when create is called', () => {
      let cep;
      let createCepDto: CreateCepDto;

      beforeEach(async () => {
        createCepDto = {
          cep: cepStub().cep,
          city: cepStub().city,
        };
        cep = await cepController.create(createCepDto);
      });
      test('then it should call cepService', () => {
        expect(cepService.create).toHaveBeenCalledWith({
          cep: createCepDto.cep,
          city: createCepDto.city,
        });
      });

      test('the it should return a cep', () => {
        expect(cep).toEqual(cepStub());
      });
    });
  });

  describe('updateCep', () => {
    describe('when update is called', () => {
      let cep;
      let updateCepDto: CreateCepDto;

      beforeEach(async () => {
        updateCepDto = {
          cep: '234567',
          city: 'Cianorte',
        };
        cep = await cepController.update(cepStub()._id, updateCepDto);
      });

      test('then it should call cepService', () => {
        expect(cepService.update).toHaveBeenCalledWith(
          cepStub()._id,
          updateCepDto,
        );
      });

      test('then it should return a cep', () => {
        expect(cep).toEqual(cepStub());
      });
    });
  });

  describe('deleteCep', () => {
    describe('when update is called', () => {
      let cep;

      beforeEach(async () => {
        cep = await cepController.remove(cepStub()._id);
      });

      test('then it should call cepService', () => {
        expect(cepService.remove).toBeCalledTimes(1);
        expect(cepService.remove).toBeCalledWith(cepStub()._id);
      });

      test('then it should return a cep', () => {
        expect(cep).toEqual(cepStub());
      });
    });
  });
});
