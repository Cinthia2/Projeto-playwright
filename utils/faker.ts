import { faker } from '@faker-js/faker';

export interface UsuarioPayload {
  nome: string;
  email: string;
  password: string;
  administrador: string;
}

export function gerarUsuario(): UsuarioPayload {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: '123456',
    administrador: 'true'
  };
}
