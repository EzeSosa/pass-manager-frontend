export interface User {
    id: string;
    username: string;
    role: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}