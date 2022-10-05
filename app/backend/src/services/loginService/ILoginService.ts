export default interface ILoginService {
  getUser(userData: { email: string, password: string }): Promise<string>;
}
