import { cepStub } from '../test/stubs/cep.stub';

export const CepService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(cepStub()),
  findAll: jest.fn().mockResolvedValue([cepStub()]),
  update: jest.fn().mockResolvedValue(cepStub()),
  findById: jest.fn().mockResolvedValue(cepStub()),
  findByCep: jest.fn().mockResolvedValue(cepStub()),
  remove: jest.fn().mockResolvedValue(cepStub()),
});
