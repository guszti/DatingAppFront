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

export interface RegisterComponentInterface {
    model: LoginModel;

    register: () => void;
    cancel: () => void;
}

export interface HomeComponentInterface {
    isRegistering: boolean;

    onRegister: () => void;
}
