import { test, expect } from '../../fixtures/auth.fixture';

import { UsuariosApi } from '../../services/usuarios.api';
import { gerarUsuario, UsuarioPayload } from '../../utils/faker';

test.describe.serial('CRUD Usuários API', () => {
  let usuariosApi: UsuariosApi;
  let userId: string;
  let payload: UsuarioPayload;

  test.beforeEach(async ({ authRequest }) => {
    usuariosApi = new UsuariosApi(authRequest);
  });

  test('MÉTODO POST', async () => {
    payload = gerarUsuario();

    const response = await usuariosApi.criarUsuario(payload);
    const body = await response.json();

    userId = body._id;
    console.log('POST:', userId);

    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
  });

  test('MÉTODO PUT', async () => {
    const response = await usuariosApi.alterarUsuario(userId, payload);
    const body = await response.json();

    console.log('PUT:', userId);

    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  test('GET', async () => {
    const response = await usuariosApi.buscarUsuarioPorId(userId);

    console.log('GET:', userId);

    expect(response.status()).toBe(200);
  });

  test('DELETE', async () => {
    const response = await usuariosApi.deletarUsuarioPorId(userId);

    console.log('DELETE:', userId);

    expect(response.status()).toBe(200);
  });
});
