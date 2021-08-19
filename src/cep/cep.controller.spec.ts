import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CepController } from './cep.controller';
import { CepModule } from './cep.module';
import { CepService } from './cep.service';

describe('CepController', () => {
  let controller: CepController;
  let service: CepService;

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
        CepModule,
      ],
    }).compile();

    service = moduleRef.get<CepService>(CepService);
    controller = moduleRef.get<CepController>(CepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
