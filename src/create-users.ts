import { Amplify } from 'aws-amplify'
import { signUp } from '@aws-amplify/auth'
import awsconfig from './aws-exports.js'

Amplify.configure(awsconfig)

async function createUser(username, password, email, position, type) {
    try {
        const { user } = await signUp({
            username,
            password,
            options: {
                userAttributes: {
                    email,
                    'custom:position': position,
                    'custom:type': type
                }
            }
        })
        console.log(`✅ Utilizador criado: ${username}`)
    } catch (error) {
        console.error(`❌ Erro ao criar ${username}:`, error)
    }
}

async function main() {
    await createUser('admin@projeto.com', 'Admin123!', 'admin@projeto.com', 'CTO', 'admin')
    await createUser('maria@projeto.com', 'User123!', 'maria@projeto.com', 'Designer', 'user')
    await createUser('joao@projeto.com', 'User123!', 'joao@projeto.com', 'Developer', 'user')
}

main()
