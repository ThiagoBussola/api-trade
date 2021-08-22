import { Cep } from '../schemas/cep.schema';

export const invalidCepStub = (): Cep => {
  return {
    _id: '790317e5-1b31-4ef8-ae65-01de439dc879',
    cep: '012345',
    city: 'Jundiai',
  };
};
