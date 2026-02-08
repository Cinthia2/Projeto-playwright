import { test, expect, request } from '@playwright/test'
import { AuthApi } from '../../services/token.api'

let apiContext;
let authApi;
let token: string;

test.beforeAll(async ()=>{
    apiContext = await request.newContext()

    authApi = new AuthApi(apiContext);

    const response = await authApi.login(
        'fulano@qa.com',
        'teste'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    //token ou access_token ou auth_token etc...
    token = body.authorization;
    console.log("Sou o token: "+ token);

});

test('Capturar token com sucesso', async ()=>{
    //Teste para verificar se tem algum valor definido na variável, ou seja, para verificar se não gera um undefined
    expect(token).toBeDefined();
})