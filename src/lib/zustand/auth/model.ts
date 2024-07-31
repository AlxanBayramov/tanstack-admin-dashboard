export interface IAuth {

    token: string | null
    expiresAt: string| null
    roleId: string | number| null
    refreshToken: string| null
    user : IUser | null;

}

export interface IUser {

    email:string
    fullName : string
    id : string | number
    roleName : string
    userName : string
    roleId: string | number
    
}