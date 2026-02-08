import {test as base, request, expect, APIRequestContext  } from '@playwright/test'
import { AuthApi } from '../services/token.api'



export const test = base.extend<{
  authRequest: APIRequestContext
}>({
    authRequest: async ({}, use) =>{
        // Contexto SEM token
        const apiContexto = await request.newContext();
        
        //Service de autenticação
        const authApi = new AuthApi(apiContexto);

        const response = await authApi.login(
            'fulano@qa.com',
            'teste'
        );

        expect(response.status()).toBe(200);

        const body = await response.json();
        const token = body.authorization;

        //Contexto COM token
        const authContexto = await request.newContext({
            extraHTTPHeaders: {
                Authorization: token
            }
        });

        //Entrega o request autenticado ao teste
        await use(authContexto);

        console.log("token gerado: ",token);
        //Limpeza
        await apiContexto.dispose();
        await authContexto.dispose();
    }
});

export {expect};