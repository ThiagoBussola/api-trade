const validationCep = (cep: any): any => {
  cep = cep.replace(/\D+/g, '');

  const isValid = [];

  const cepFormat = cep > 100000 && cep < 999999 && cep.length === 6;

  // garantindo o valor correto do cep
  if (cepFormat) {
    /*
            cep.length -2 é igual a 4, pois depois da quarta posição, 
            se somarmos + 2 não tem como o numero se repetir
        */

    for (let i = 0; i < cep.length - 2; i++) {
      if (cep[i] === cep[i + 2]) {
        isValid.push(false);
      } else {
        isValid.push(true);
      }
    }
  } else {
    throw new Error(`Esse CEP está inválido: ${cep}`);
  }

  // todos os itens do array devem ser verdadeiros, caso contrario existem repetições indesejaveis
  const finalValidation = isValid.every((valid) => valid === true);

  if (!finalValidation) throw new Error(`Esse CEP está inválido: ${cep}`);

  return {
    finalValidation,
    cep,
  };
};

export { validationCep };
