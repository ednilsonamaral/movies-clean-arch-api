import { cnpj, cpf } from 'cpf-cnpj-validator';

export function isPersonalDocument (document: string): boolean {
  return cpf.isValid(document);
}

export function isBusinessDocument (document: string): boolean {
  return cnpj.isValid(document);
}

export function isDocument (document: string): boolean {
  if (!isBusinessDocument(document) && !isPersonalDocument(document)) {
    return false;
  }

  return true;
}