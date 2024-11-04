import { create } from 'zustand'; // 명명된 내보내기로 가져오기

const userStore = create((set) => ({
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
}));

export default userStore;



