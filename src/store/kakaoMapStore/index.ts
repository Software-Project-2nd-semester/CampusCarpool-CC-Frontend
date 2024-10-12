import { create } from "zustand";

interface Point {
    address_name: string;
    x: string;
    y: string;
  }
  
  interface StartEndPoint {
    startPoint: Point;
    endPoint: Point;
  }
  
interface KakaoMapState {
    // 현재 위치
    location: { latitude: number; longitude: number };
    setLocation: (location: { latitude: number; longitude: number }) => void;

    // 출발지, 도착지
    startEndPoint: {
        startPoint: { address_name: string; x: string; y: string };
        endPoint: { address_name: string; x: string; y: string };
    };
    setStartPoint: (
        newStartPoint: any
    ) => void;
    setEndPoint: (
        newEndPoint: any
    ) => void;
}

const useKakaoMapStore = create<KakaoMapState>((set) => ({
    location: {
        latitude: 33.450701,
        longitude: 126.570667,
    },
    setLocation: (location) => set({ location }), 

    startEndPoint: {
        startPoint: { address_name: "", x: "", y: "" },
        endPoint: { address_name: "", x: "", y: "" },
    },

    setStartPoint: (newStartPoint:any) =>
        set((state) => ({
          startEndPoint: {
            ...state.startEndPoint,
            startPoint: newStartPoint, // 필요한 부분만 업데이트
          },
        })),
         
    setEndPoint: (newEndPoint:any) =>
        set((state) => ({
        startEndPoint: {
            ...state.startEndPoint,
            endPoint: {
            ...newEndPoint, // 필요한 부분만 업데이트
            },
        },
        })),
}));

export default useKakaoMapStore;
