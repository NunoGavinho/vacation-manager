import { signIn, signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth'

export const login = async (email: string, password: string) => {
    const user = await signIn({ username: email, password })
    const session = await fetchAuthSession()
    const token = session.tokens?.idToken?.toString() || ''
    return { user, token }
}

export const logout = async () => {
    await signOut()
}

export const getCurrentUserSession = async () => {
    return await getCurrentUser()
}
