import { Test } from '@nestjs/testing';
import { CepService } from '../cep.service';
import { CepController } from '../cep.controller';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../user/user.module';
import { JwtAuthGuard } from '../../auth/jwt-guard.guard';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { cepStub } from './stubs/cep.stub';

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

  it('should be defined', () => {
    expect(cepController).toBeDefined();
  });

  describe('getCep', () => {
    describe('when getCep is called', () => {
      let cep;

      beforeEach(async () => {
        cep = await cepController.getCepByNumber(cepStub().cep);
      });

      test('then it should call cepService,', () => {
        expect(cepService.findByCep).toBeCalledWith(cepStub().cep);
      });

      test('then is shoud return a cep', () => {
        expect(cep).toEqual(cepStub());
      });
    });
  });
});
