export default class customError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}