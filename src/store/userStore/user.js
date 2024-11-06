import { create } from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';

const userStore = create(
  persist(
    (set) => ({
      name: '',
      nickname: '',
      gender: '',
      age: '',
      intro: '',
      setName: (newName) => set((state) => ({ ...state, name: newName })),
      setNickname: (newNickname) => set((state) => ({ ...state, nickname: newNickname })),
      setGender: (newGender) => set((state) => ({ ...state, gender: newGender })),
      setAge: (newAge) => set((state) => ({ ...state, age: newAge })),
      setIntro: (newIntro) => set((state) => ({ ...state, intro: newIntro })),
    }),
    {
      name: 'user-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default userStore;
