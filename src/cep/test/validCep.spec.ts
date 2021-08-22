import { validationCep } from '../../util/validCep';

describe('must return true for a valid cep', () => {
  test('valid cep value', () => {
    //arrange

    const cep = {
      cep: '123456',
      city: 'maringa',
    };

    const cepIsValid = validationCep(cep.cep);

    expect(cepIsValid.finalValidation).toEqual(true);
  });
});

describe('must return exception for a invalid cep', () => {
  test('invald cep value (to small)', () => {
    //arrange

    const cep = {
      cep: '012345',
      city: 'maringa',
    };

    expect(() => validationCep(cep.cep)).toThrowError(
      `Esse CEP está inválido: ${cep.cep}`,
    );
  });

  test('invald cep value (very large)', () => {
    //arrange
    const cep = {
      cep: '9999999',
      city: 'maringa',
    };

    expect(() => validationCep(cep.cep)).toThrowError(
      `Esse CEP está inválido: ${cep.cep}`,
    );
  });

  test('invalid values by pairs ', () => {
    //arrange
    const cep = {
      cep: '352523',
      city: 'maringa',
    };

    expect(() => validationCep(cep.cep)).toThrowError(
      `Esse CEP está inválido: ${cep.cep}`,
    );
  });
});
