import { StateCreator } from 'zustand'
import { IAuth, IUser } from './model'
import {  sliceResetFns } from 'lib/zustand/resetSlices';

const deepClone = <T>(obj:T) => JSON.parse(JSON.stringify(obj));
export type AuthSlice = IAuth & {
    setToken: (data: Omit<IAuth, 'user'>) => void;
    setUser: (data: IUser|null) => void;
}

let initalState:IAuth = {
    expiresAt: null,
    refreshToken: null,
    roleId: null,
    token: null,
    user: null,
}
export const createAuthSlice: StateCreator<AuthSlice> = (set) => {
    sliceResetFns.add(() => set(deepClone<IAuth>(initalState)))
    return {
        ...initalState,
        setToken: (data) => set((state) => {
            const { expiresAt, refreshToken, roleId, token } = data;
            return {
                ...state,
                expiresAt,
                refreshToken,
                roleId,
                token
            }
        }),
        setUser: (user) => set((state) => {
            return {
                ...state,
                user
            }
            
        }),
    }
}