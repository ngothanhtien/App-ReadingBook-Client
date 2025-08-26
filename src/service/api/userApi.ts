import axiosClient from "./axiosClient";
interface RegisterPayload  {
  fullname: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}
export const registerUser = (data: RegisterPayload) => {
    return axiosClient.post("/users/register",data);
}