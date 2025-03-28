import { get } from 'aws-amplify/api'
import { fetchAuthSession } from 'aws-amplify/auth'

export const fetchData = async (endpoint: string) => {
    const session = await fetchAuthSession()
    const token = session.tokens?.idToken?.toString() || ''

    const response = await get({
        apiName: 'AdminQueries',
        path: endpoint,
        options: {
            headers: {
                Authorization: token,
            },
        },
    }).response

    const data = await response.body.json()
    return Array.isArray(data) ? data : []
}
