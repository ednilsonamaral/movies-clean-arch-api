import { registerDecorator } from 'class-validator';

export function IsPassword () {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: {
        message: 'The password must contain at least one capital letter, one number, one special character and be at least 6 characters long',
      },
      validator: {
        validate (value: string) {
          return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/.test(value);
        },
      },
    });
  };
}
