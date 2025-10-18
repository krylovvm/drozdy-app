export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string;
}

export const users: User[] = [];
