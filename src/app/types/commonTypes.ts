export type LoginModel = {
    username: string;
    password: string;
};

export type RegisterModel = {
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
};
