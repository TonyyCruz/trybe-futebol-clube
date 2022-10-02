import * as bcrypt from 'bcryptjs';

// const salt = bcrypt.genSaltSync(10);

export function hashGenerate(password: string): string { return bcrypt.hashSync(password); }

export function hashValidate(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

//  ======  VALIDATE PASSWORD ======  //
// bcrypt.compareSync("B4c0/\/", hash); // true
// bcrypt.compareSync("not_bacon", hash); // false
