import { create } from 'zustand'; // 명명된 내보내기로 가져오기


// 사용자 인터페이스 정의
// interface UserInter {
//   name: string;
//   nickname: string;
// }

const userStore = create((set) => ({
  name: '',
  nickname: '',
  gender:'',
  age:'',
  bio:'',
  setName: (name) => set({ name }), 
  setNickname: (nickname) => set({ nickname }), 
  setGender: (gender) => set({ gender }), 
  setAge: (age) => set({ age }), 
  setBio: (bio) => set({ bio }), 
}));

export default userStore;
