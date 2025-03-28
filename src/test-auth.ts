import { getCurrentUserSession } from './services/auth'

async function test() {
    const user = await getCurrentUserSession()
    console.log(user)
}
test()
