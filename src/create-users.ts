import { Amplify } from 'aws-amplify';
import { signUp } from '@aws-amplify/auth';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

async function createUser(email: string, password: string, position: string, type: string) {
    try {
        const result = await signUp({
            username: email,
            password,
            options: {
                userAttributes: {
                    email,
                    'custom:position': position,
                    'custom:type': type,
                },
            },
        });
        console.log(`✅ Criado: ${email}`, result);
    } catch (error) {
        console.error(`❌ Erro ao criar ${email}:`, error);
    }
}

async function main() {
    await createUser('admin@projeto.com', 'Admin123!', 'CTO', 'admin');
    await createUser('maria@projeto.com', 'User123!', 'Designer', 'user');
    await createUser('joao@projeto.com', 'User123!', 'Developer', 'user');
}

main();
