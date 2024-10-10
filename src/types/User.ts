export interface User {
  id: number;
  image: string;
  username: string;
  accessToken: string;
}

export interface LoginInput {
  username: string;
  password: string;
}
