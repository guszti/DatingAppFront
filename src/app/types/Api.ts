export type LoginModel = {
    username: string;
    password: string;
};

export interface NavComponentInterface {
    model: LoginModel;
    login: () => void;
}

export type LoginResponse = {
    token: string;
};
