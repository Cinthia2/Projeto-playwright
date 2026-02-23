import { APIRequestContext, APIResponse } from '@playwright/test';

export interface CriarUsuarioPayload {
  nome: string;
  email: string;
  password: string;
}

export interface AlterarUsuarioPayload {
  nome?: string;
  email?: string;
}

export class UsuariosApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  listarUsuarios(): Promise<APIResponse> {
    return this.request.get('/usuarios');
  }

  criarUsuario(payload: CriarUsuarioPayload): Promise<APIResponse> {
    return this.request.post('/usuarios', {
      data: payload
    });
  }

  alterarUsuario(id: string, payload: AlterarUsuarioPayload): Promise<APIResponse> {
    return this.request.put(`/usuarios/${id}`, {
      data: payload
    });
  }

  buscarUsuarioPorId(id: string): Promise<APIResponse> {
    return this.request.get(`/usuarios/${id}`);
  }

  deletarUsuarioPorId(id: string): Promise<APIResponse> {
    return this.request.delete(`/usuarios/${id}`);
  }
}
