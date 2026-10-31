export interface RegisterDto {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    remember_me?: boolean;
}
