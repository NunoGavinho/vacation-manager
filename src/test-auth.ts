import authService from './services/authService';

async function test() {
    const user = await authService.getCurrentUser();
    console.log('Usuário atual:', user);
    console.log('Token:', await authService.getToken());
}

test();