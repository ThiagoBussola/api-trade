import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CepDocument = Cep & Document;

@Schema()
export class Cep {
  _id: string;

  @Prop()
  cep: string;

  @Prop()
  city: string;
}

export const CepSchema = SchemaFactory.createForClass(Cep);
