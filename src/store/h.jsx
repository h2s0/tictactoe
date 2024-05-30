import { selector } from 'recoil';

export const i = selector({
  key: 'i',
  get: () => {
    const n = Number(("1" + 0) + 5);
    const y = String.fromCharCode(n);
    return { y };
  },
});