import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {},
});

export const testDate = atom({
  key: 'testDate',
  default: '',
});
