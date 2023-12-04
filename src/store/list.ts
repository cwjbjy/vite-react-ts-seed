import { produce } from 'immer';
import { create } from 'zustand';

const getData = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random() * 100);
    }, 200);
  });
};

interface ListState {
  list: number[];
  updateList: () => void;
}

const useListStore = create<ListState>((set) => ({
  list: [],
  updateList: async () => {
    try {
      const data = await getData();
      set(
        produce((state) => {
          state.list.push(data);
        }),
      );
    } catch {
      /* empty */
    }
  },
}));

export default useListStore;
