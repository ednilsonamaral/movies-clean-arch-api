import { registerDecorator } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

export function IsDocument () {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isDocument',
      target: object.constructor,
      propertyName,
      options: {
        message: 'Invalid document CPF',
      },
      validator: {
        validate (value: string) {
          return cpf.isValid(value);
        },
      },
    });
  };
}
