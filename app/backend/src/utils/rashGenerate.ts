import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashGenerate = (password: string): string => bcrypt.hashSync(password, salt);

//  ======  VALIDATE PASSWORD ======  //
// bcrypt.compareSync("B4c0/\/", hash); // true
// bcrypt.compareSync("not_bacon", hash); // false

export default hashGenerate;
