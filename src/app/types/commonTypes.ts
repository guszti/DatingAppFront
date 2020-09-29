export type LoginModel = {
    username: string;
    password: string;
};

export type RegisterModel = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export enum Gender {
    MALE = 1,
    FEMALE = 2,
    UNKNOWN = 3
}

export type ApiUser = {
    id: number;
    username: string;
    gender: Gender;
    age: number;
    knownAs: string;
    lastActive: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    mainPhotoUrl: string;
    photos: ApiUserPhoto[];
};

export type ApiUserPhoto = {
    id: number;
    url: string;
    isMain: boolean;
    description: string;
};
