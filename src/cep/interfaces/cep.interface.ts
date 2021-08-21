import { Document } from 'mongoose';

export interface Cep extends Document {
  cep: string;
  city: string;
}
