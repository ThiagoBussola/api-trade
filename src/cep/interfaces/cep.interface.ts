import { Document } from 'mongoose';

export interface Cep extends Document {
  cep: string;
  cidade: string;
}
