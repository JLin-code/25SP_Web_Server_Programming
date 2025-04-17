import * as myFetch from './myFetch';

export function api<T>(action: string): Promise<T> {
    return myFetch.rest<T>(`/api/v1/session/${action}`);
}