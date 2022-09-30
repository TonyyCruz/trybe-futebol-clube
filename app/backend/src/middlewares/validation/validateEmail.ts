import HttpError from '../../shared/HttpError';

export default function validateEmail(email: string): void {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const emailVerify: boolean = regexEmail.test(email);
  if (!emailVerify) throw new HttpError(400, 'Invalid email');
}
