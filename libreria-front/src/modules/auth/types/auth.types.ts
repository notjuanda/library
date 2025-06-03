export interface ILoginPayload {
    username: string;
    password: string;
}

export interface ILoginResponse {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    ci: string;
    is_staff: boolean;
}
