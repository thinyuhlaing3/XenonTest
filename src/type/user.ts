export interface User {
    id :number
    name:string
    email:string
    password:string;
    code:string
}

export interface RegisterUser {
    name:string
    email:string
    password:string;
}
export interface LoginUser {
    email:string
    password:string;
}


export interface UserData {
    id :number
    username:string
    email:string
    code:string
}