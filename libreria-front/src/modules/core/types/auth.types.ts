export interface IUser {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    ci: string;
    is_staff: boolean;
}

export interface IAuthContext {
    user: IUser | null | false;
    loading: boolean;
    login: (username: string, password: string) => Promise<IUser>;
    logout: () => void;
    refreshToken: () => Promise<void>;
}