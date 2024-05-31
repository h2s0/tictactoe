import { selector } from 'recoil';

export const m = selector({
  key: 'm',
  get: () => {
    const items = ["\u0053", "\u0074", "\u0072", "\u0065", "\u006e", "\u0067", "\u0074", "\u0068"];
    const z = items.join('').match(/(?<=.)n(?=.)/g);
    return { z };
  },
});