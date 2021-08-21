import { Cep } from '../schemas/cep.schema';

export const cepStub = (): Cep => {
  return {
    cep: '123456',
    city: 'maringa',
  };
};
