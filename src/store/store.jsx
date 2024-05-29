import { create } from "zustand";

export const useStore = create(() => ({
  items: [ '10', 'a', 'b', 'c', 'd', 0, 1, 2, '-', '@' ],
}));