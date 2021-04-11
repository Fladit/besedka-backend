export class CreateUserDto {
  id: string;
  role_code: number;
  marital_status_id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDay: Date;
}
