import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import { CepController } from './cep.controller';
import { CepModule } from './cep.module';
import { CepService } from './cep.service';

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
        JwtAuthGuard,
        CepModule,
      ],
    }).compile();

    cepService = moduleRef.get<CepService>(CepService);
    cepController = moduleRef.get<CepController>(CepController);
  });

  it('should be defined', () => {
    expect(cepController).toBeDefined();
    expect(cepService).toBeDefined();
  });

  describe('getCeps', () => {
    describe('when getAllCeps is called', () => {
      let ceps;

      beforeEach(async () => {
        ceps = await cepController.getAllCeps();
        console.log(ceps);
      });

      test('then it should call cepService,', () => {
        expect(cepService.findAll).toHaveBeenCalled();
      });
    });
  });
});
