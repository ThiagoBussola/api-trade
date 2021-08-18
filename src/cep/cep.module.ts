import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { CepSchema } from './interfaces/cep.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cep', schema: CepSchema }])],
  controllers: [CepController],
  providers: [CepService],
})
export class CepModule {}
