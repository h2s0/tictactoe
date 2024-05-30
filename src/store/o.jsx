import { selector } from 'recoil';

export const k = selector({
  key: 'k',
  get: () => {
    const x = "yOur eff0rts Will make @ diFfer3nce".substr(13,2);
    return { x };
  },
});