export interface LoginInterface {
  id?: number;
  email: string;
  password: string;
}

export default interface UserInterface extends LoginInterface {
  username: string;
  role: string;
}
