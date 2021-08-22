import { cepStub } from '../test/stubs/cep.stub';
// import { invalidCepStub } from '../test/stubs/invalidCep.stub';

export const CepService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(cepStub()),
  // createInvalid: jest.fn().mockResolvedValue(invalidCepStub()),
  findAll: jest.fn().mockResolvedValue([cepStub()]),
  update: jest.fn().mockResolvedValue(cepStub()),
  findById: jest.fn().mockResolvedValue(cepStub()),
  findByCep: jest.fn().mockResolvedValue(cepStub()),
  remove: jest.fn().mockResolvedValue(cepStub()),
});
