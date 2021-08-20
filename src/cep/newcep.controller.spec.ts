import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { CepController } from './cep.controller';
import { CepModule } from './cep.module';
import { CepService } from './cep.service';

describe('CepController', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CepController],
      providers: [UserService],
    }).compile();

    service = moduleRef.get<CepService>(CepService);
    controller = moduleRef.get<CepController>(CepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
