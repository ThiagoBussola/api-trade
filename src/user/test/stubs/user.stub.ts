import { User } from '../schemas/user.schema';

export const userStub = (): User => {
  return {
    _id: '790317e5-1b31-4ef8-ae65-01de439dc878',
    email: 'thiago.bussola@hotmail.com',
    name: 'Thiago Bussola',
    password: 'padoca',
  };
};
