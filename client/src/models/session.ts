import * as myFetch from './myFetch';

export function api<T>(action: string): Promise<T> {
    return myFetch.rest<T>(`/api/v1/session/${action}`);
}

const session = ref({
    user: null as User | null,
    token: null as string | null
});

export function refSession() {
    return session
}

export const isAdmin = () => session.value.user?.role === 'admin'

export const isLoggedIn = () => session.value.user !== null

export function login(id: string) {
    return get(id).then((user) => {
        session.value.user = user
    })
}

export function logout() {
    session.value.user = null
    session.value.token = null
}