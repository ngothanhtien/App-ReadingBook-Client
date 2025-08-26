export interface User {
  fullname: string;
  email: string;
  username: string;
}
export interface loginUser {
  username: string;
  password: string;
}
export interface APIresLogin {
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
    fullname: string;
  }
  accessToken?: string;
}