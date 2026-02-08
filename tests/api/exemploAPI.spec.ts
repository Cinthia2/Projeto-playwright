import { test, expect } from '@playwright/test';

import { UsuariosApi } from '../../services/usuarios.api';
import { gerarUsuario } from '../../utils/faker';


test('MÉTODO GET', async ({ request }) => {
const usuariosApi = new UsuariosApi(request);

const response = await usuariosApi.listarUsuarios();
const body = await response.json();

const usuario = body.usuarios[0];

expect(response.status()).toBe(200);

expect(usuario).toHaveProperty('_id');
expect(usuario).toHaveProperty('nome');
expect(usuario).toHaveProperty('email');
expect(usuario).toHaveProperty('password');
expect(usuario).toHaveProperty('administrador');
});


test('MÉTODO POST', async ({ request }) => {

const usuariosApi = new UsuariosApi(request);
const payload = gerarUsuario();

const response = await usuariosApi.criarUsuario(payload);
const body = await response.json();

expect(response.status()).toBe(201);
expect(body.message).toBe('Cadastro realizado com sucesso');



});//test
