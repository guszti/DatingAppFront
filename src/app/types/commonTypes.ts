export type LoginModel = {
    username: string;
    password: string;
};

export type RegisterModel = {
    username: string;
    plainPassword: string;
};

export type LoginResponse = {
    user: {
        id: number;
        username: string;
        token: string;
        photoUrl: string;
    };
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
    createdAt: string;
};

export type ApiUserPhoto = {
    id: number;
    url: string;
    isMain: boolean;
    description: string;
};

export type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type Message = {
    id: number;
    createdAt: string;
    content: string;
    sourceUsername: string;
    sourcePhotoUrl: string;
    targetUsername: string;
    targetPhotoUrl: string;
    seenAt: string;
}
